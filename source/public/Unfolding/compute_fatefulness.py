#!/usr/bin/env python3

import argparse
import os
import re
import sys
import csv
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple, Set

try:
    import numpy as np
except ImportError as e:
    print("This script requires numpy. Install with: pip install numpy", file=sys.stderr)
    raise

# Lazy import to allow --help without heavy deps
def _load_model(model_name: str):
    try:
        from sentence_transformers import SentenceTransformer
    except ImportError:
        print(
            "This script requires sentence-transformers. Install with: pip install sentence-transformers",
            file=sys.stderr,
        )
        raise
    return SentenceTransformer(model_name)


@dataclass
class Node:
    node_id: str
    title: str
    text: str
    parent_id: Optional[str] = None
    children_ids: List[str] = field(default_factory=list)
    face: Optional[int] = None  # 1 or 2 when applicable
    level: Optional[int] = None  # 0=root face para, 1=root sentence, 2=child sentence


@dataclass
class Tree:
    nodes: Dict[str, Node]

    def depth(self, node_id: str) -> int:
        depth_count = 0
        cur = self.nodes[node_id]
        while cur.parent_id is not None:
            depth_count += 1
            cur = self.nodes[cur.parent_id]
        return depth_count

    def ancestors(self, node_id: str) -> List[str]:
        cur = self.nodes[node_id]
        acc: List[str] = []
        while cur.parent_id is not None:
            parent_id = cur.parent_id
            acc.append(parent_id)
            cur = self.nodes[parent_id]
        return acc

    def descendants(self, node_id: str) -> List[str]:
        out: List[str] = []
        stack: List[str] = list(self.nodes[node_id].children_ids)
        while stack:
            cid = stack.pop()
            out.append(cid)
            stack.extend(self.nodes[cid].children_ids)
        return out

    def siblings(self, node_id: str) -> List[str]:
        parent = self.nodes[node_id].parent_id
        if parent is None:
            return []
        return [cid for cid in self.nodes[parent].children_ids if cid != node_id]


def l2_normalize(v: np.ndarray) -> np.ndarray:
    n = np.linalg.norm(v, axis=-1, keepdims=True) + 1e-12
    return v / n


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b))


def u_shaped_weight(d: int, D: int, lam_near=0.5, tau_near=1.0, lam_far=0.5, tau_far=2.0) -> float:
    # High at d≈0 and at d≈D, lower in the middle
    D = max(D, 1)
    return lam_near * np.exp(-d / max(tau_near, 1e-6)) + lam_far * np.exp(-(D - d) / max(tau_far, 1e-6))


def compute_fatefulness(
    tree: Tree,
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
    alpha: float = 0.6,  # emphasize upward when no descendants are present
    beta: float = 0.2,
    gamma: float = 0.4,
    lam_near: float = 0.5,
    tau_near: float = 1.0,
    lam_far: float = 0.5,
    tau_far: float = 2.0,
) -> Tuple[Dict[str, float], Dict[str, float], Dict[str, Optional[float]], Dict[str, float]]:
    print("[compute] Loading embeddings model...")
    model = _load_model(model_name)

    node_ids = list(tree.nodes.keys())
    texts = [tree.nodes[nid].text for nid in node_ids]

    print(f"[compute] Encoding {len(texts)} nodes...")
    embs = l2_normalize(model.encode(texts, convert_to_numpy=True))
    id_to_idx = {nid: i for i, nid in enumerate(node_ids)}

    depths = {nid: tree.depth(nid) for nid in node_ids}
    max_depth = max(depths.values()) if node_ids else 0

    U: Dict[str, float] = {}
    D: Dict[str, Optional[float]] = {}
    L: Dict[str, float] = {}

    print("[compute] Computing component scores (U/D/L)...")
    for count, nid in enumerate(node_ids, start=1):
        if count % 25 == 0 or count == len(node_ids):
            print(f"  - processed {count}/{len(node_ids)} nodes")
        idx = id_to_idx[nid]
        vi = embs[idx]

        # Upward coherence (ancestors)
        up_ids = tree.ancestors(nid)
        up_scores: List[float] = []
        up_weights: List[float] = []
        for aid in up_ids:
            d = abs(depths[nid] - depths[aid])
            w = u_shaped_weight(d, max_depth, lam_near, tau_near, lam_far, tau_far)
            up_scores.append(w * cosine(vi, embs[id_to_idx[aid]]))
            up_weights.append(w)
        U[nid] = (sum(up_scores) / (sum(up_weights) + 1e-12)) if up_scores else 0.0

        # Downward coherence (descendants) — might be empty if no deeper level exists
        down_ids = tree.descendants(nid)
        down_scores: List[float] = []
        down_weights: List[float] = []
        for did in down_ids:
            d = abs(depths[did] - depths[nid])
            w = u_shaped_weight(d, max_depth - depths[nid], lam_near, tau_near, lam_far, tau_far)
            down_scores.append(w * cosine(vi, embs[id_to_idx[did]]))
            down_weights.append(w)
        D[nid] = (sum(down_scores) / (sum(down_weights) + 1e-12)) if down_scores else None

        # Lateral coherence (siblings)
        sib_ids = tree.siblings(nid)
        if sib_ids:
            L[nid] = float(np.mean([cosine(vi, embs[id_to_idx[sid]]) for sid in sib_ids]))
        else:
            L[nid] = 0.0

    # Normalize components across nodes (z-score)
    def normalize(values: Dict[str, Optional[float]]) -> Dict[str, float]:
        arr = np.array([v for v in values.values() if v is not None], dtype=float)
        if len(arr) == 0:
            return {k: 0.0 for k in values}
        mean, std = float(arr.mean()), float(arr.std() + 1e-12)
        return {k: (0.0 if values[k] is None else (values[k] - mean) / std) for k in values}

    print("[compute] Normalizing and combining...")
    U_norm = normalize(U)
    D_norm = normalize(D)
    L_norm = normalize(L)

    # Combine; if D is None (leaf), renormalize to exclude beta so leaves aren't penalized
    F: Dict[str, float] = {}
    for nid in node_ids:
        if D[nid] is None:
            wsum = alpha + gamma
            F[nid] = (alpha * U_norm[nid] + gamma * L_norm[nid]) / (wsum + 1e-12)
        else:
            F[nid] = alpha * U_norm[nid] + beta * D_norm[nid] + gamma * L_norm[nid]

    return F, U_norm, D_norm, L_norm


HEADER_FACE_RE = re.compile(r"^#\s*Face\s*(\d+)\s*$", re.IGNORECASE)
HEADER_U2_RE = re.compile(r"^#\s*(\d{2})\s*Face\s*(\d+)\s*$", re.IGNORECASE)


def read_text(path: str) -> List[str]:
    with open(path, "r", encoding="utf-8") as f:
        return f.read().splitlines()


def split_sentences(text: str) -> List[str]:
    # Basic sentence splitter; avoids external deps
    t = re.sub(r"\s+", " ", text.strip())
    if not t:
        return []
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"])", t)
    out = [p.strip().strip('"') for p in parts if p and p.strip()]
    return out


def parse_unfolding1(path: str) -> Dict[int, Tuple[str, str]]:
    """
    Returns dict mapping face_num -> (title, full_paragraph_text)
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing Unfolding 1 file: {path}")

    lines = read_text(path)
    blocks: Dict[int, Tuple[str, str]] = {}

    current_face: Optional[int] = None
    current_title: Optional[str] = None
    buf: List[str] = []

    for raw in lines:
        line = raw.rstrip("\n")
        m = HEADER_FACE_RE.match(line.strip())
        if m:
            if current_face is not None:
                text = "\n".join([l.strip() for l in buf if l.strip()])
                blocks[current_face] = (current_title or f"Face {current_face}", text)
                buf = []
            current_face = int(m.group(1))
            current_title = f"Face {current_face}"
        else:
            if current_face is not None:
                buf.append(line)

    if current_face is not None:
        text = "\n".join([l.strip() for l in buf if l.strip()])
        blocks[current_face] = (current_title or f"Face {current_face}", text)

    return blocks


def parse_unfolding2_sections(path: str) -> List[Tuple[str, str, int, Optional[int], str]]:
    """
    Returns list of tuples: (num, section_id, face_num, root_sentence_idx_or_None, section_text)
    Recognizes headers like '# 11 Face 1'. Maps '11' -> face 1 (first digit), root idx 1 (second digit).
    section_id includes face to avoid collisions: e.g., 'S12_F1'
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing Unfolding 2 file: {path}")

    lines = read_text(path)

    sections: List[Tuple[str, str, int, Optional[int], str]] = []

    current_num: Optional[str] = None
    current_section_id: Optional[str] = None
    current_face: Optional[int] = None
    current_root_idx: Optional[int] = None
    buf: List[str] = []

    def flush():
        if current_section_id is not None and current_num is not None:
            text = "\n".join([l.strip() for l in buf if l.strip()])
            sections.append((current_num, current_section_id, int(current_face) if current_face else 0, current_root_idx, text))

    for raw in lines:
        line = raw.rstrip("\n")
        stripped = line.strip()

        m = HEADER_U2_RE.match(stripped)
        if not m:
            stripped_fixed = re.sub(r"^(#\s*\d{2})(Face\s*\d+)$", r"\1 \2", stripped)
            m = HEADER_U2_RE.match(stripped_fixed)

        if m:
            if current_section_id is not None:
                flush()
                buf = []
            num = m.group(1)
            face_str = m.group(2)
            face_num = int(face_str)
            current_num = num
            current_section_id = f"S{num}_F{face_num}"
            current_face = face_num
            try:
                second_digit = int(num[1])
                current_root_idx = second_digit if 1 <= second_digit <= 4 else None
            except Exception:
                current_root_idx = None
        else:
            if current_section_id is not None:
                buf.append(line)

    if current_section_id is not None:
        flush()

    return sections


def build_tree(
    u1_faces: Dict[int, Tuple[str, str]],
    u2_sections: List[Tuple[str, str, int, Optional[int], str]],
    children_per_root: int = 4,
    max_section_num: Optional[int] = None,
) -> Tuple[Tree, Dict[str, str]]:
    """
    Build a tree with levels:
    - Level 0: ROOT{face} = full paragraph of Face 1/2 from Unfolding 1
    - Level 1: ROOT{face}_{i} = i-th sentence (i=1..4) from that paragraph
    - Level 2: Child sentences extracted from Unfolding 2 sections that map to {face}_{i}
    Returns: (Tree, node_kind_map) where node_kind_map labels nodes as 'root_para'|'root_sent'|'child_sent'
    """
    nodes: Dict[str, Node] = {}
    kind: Dict[str, str] = {}

    # Create root paragraph nodes
    for face_num, (title, text) in u1_faces.items():
        rid = f"ROOT{face_num}"
        nodes[rid] = Node(node_id=rid, title=title, text=text, parent_id=None, children_ids=[], face=face_num, level=0)
        kind[rid] = "root_para"

        sentences = split_sentences(text)
        if len(sentences) < 4:
            print(f"[parse] Warning: Face {face_num} has {len(sentences)} sentences; expected at least 4.")
        for i in range(min(4, len(sentences))):
            sid = f"ROOT{face_num}_{i+1}"
            nodes[sid] = Node(
                node_id=sid,
                title=f"Face {face_num} · Root Sentence {i+1}",
                text=sentences[i],
                parent_id=rid,
                children_ids=[],
                face=face_num,
                level=1,
            )
            nodes[rid].children_ids.append(sid)
            kind[sid] = "root_sent"

    # Map Unfolding 2 sections to child sentences
    for num, section_id, face_num, root_idx, section_text in u2_sections:
        if max_section_num is not None:
            try:
                if int(num) > max_section_num:
                    continue
            except Exception:
                pass
        if face_num not in u1_faces:
            continue
        parent_id = f"ROOT{face_num}_{root_idx}" if root_idx is not None and f"ROOT{face_num}_{root_idx}" in nodes else f"ROOT{face_num}"
        child_sentences = split_sentences(section_text)
        if not child_sentences:
            continue
        for j, sent in enumerate(child_sentences[:children_per_root], start=1):
            cid = f"{section_id}_{j}"
            nodes[cid] = Node(
                node_id=cid,
                title=f"{section_id} · Sent {j}",
                text=sent,
                parent_id=parent_id,
                children_ids=[],
                face=face_num,
                level=2,
            )
            nodes[parent_id].children_ids.append(cid)
            kind[cid] = "child_sent"

    return Tree(nodes=nodes), kind


def write_csv(out_path: str, rows: List[Dict[str, str]]) -> None:
    if not rows:
        print("No rows to write.")
        return
    fieldnames = list(rows[0].keys())
    with open(out_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)


def parse_faces_list(s: Optional[str]) -> Optional[Set[int]]:
    if not s:
        return None
    parts = [p.strip() for p in s.split(",") if p.strip()]
    out: Set[int] = set()
    for p in parts:
        try:
            val = int(p)
            if val in (1, 2):
                out.add(val)
        except Exception:
            continue
    return out if out else None


def main():
    parser = argparse.ArgumentParser(description="Compute fatefulness scores for Unfolding sentences (roots + children).")
    parser.add_argument(
        "--unfolding_dir",
        type=str,
        default=os.path.abspath(os.path.join(os.path.dirname(__file__))),
        help="Directory containing Unfolding 1.md, Unfolding 2.md (default: this script's directory)",
    )
    parser.add_argument(
        "--model",
        type=str,
        default="sentence-transformers/all-MiniLM-L6-v2",
        help="SentenceTransformer model name",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="fatefulness_unfolding2.csv",
        help="Output CSV filename (written inside unfolding_dir)",
    )
    parser.add_argument(
        "--children_per_root",
        type=int,
        default=4,
        help="Number of child sentences to take per Unfolding 2 section (default 4)",
    )
    parser.add_argument(
        "--max_section_num",
        type=int,
        default=None,
        help="If set, only include Unfolding 2 sections with number <= this value (e.g., 14 to limit to 11-14)",
    )
    parser.add_argument(
        "--faces",
        type=str,
        default=None,
        help="Comma-separated list of faces to include (e.g., '1' or '1,2'). Default: both faces if present.",
    )
    args = parser.parse_args()

    selected_faces = parse_faces_list(args.faces)

    udir = args.unfolding_dir
    u1_path = os.path.join(udir, "Unfolding 1.md")
    u2_path = os.path.join(udir, "Unfolding 2.md")
    out_path = os.path.join(udir, args.output)

    if not os.path.exists(u2_path):
        print(f"Could not find 'Unfolding 2.md' in {udir}. Nothing to compute.")
        sys.exit(1)

    # Parse inputs
    print(f"[parse] Reading Unfolding 1 from: {u1_path}")
    u1_faces = parse_unfolding1(u1_path) if os.path.exists(u1_path) else {}
    if selected_faces is not None:
        u1_faces = {k: v for k, v in u1_faces.items() if k in selected_faces}
    if not u1_faces:
        print("[parse] Warning: No face paragraphs found after filtering. Check --faces or file content.")

    print(f"[parse] Reading Unfolding 2 from: {u2_path}")
    u2_sections = parse_unfolding2_sections(u2_path)
    if selected_faces is not None:
        u2_sections = [t for t in u2_sections if t[2] in selected_faces]
    if args.max_section_num is not None:
        print(f"[parse] Filtering sections to <= {args.max_section_num}")
    print(f"[parse] Parsed {len(u1_faces)} face paragraphs and {len(u2_sections)} Unfolding 2 sections")

    tree, kind = build_tree(
        u1_faces,
        u2_sections,
        children_per_root=args.children_per_root,
        max_section_num=args.max_section_num,
    )

    counts = {"root_para": 0, "root_sent": 0, "child_sent": 0}
    for k, v in kind.items():
        counts[v] = counts.get(v, 0) + 1
    print(f"[build] Nodes: root_para={counts['root_para']}, root_sent={counts['root_sent']}, child_sent={counts['child_sent']}, total={len(tree.nodes)}")

    # Compute scores
    F, U, D, L = compute_fatefulness(tree, model_name=args.model)

    # Prepare report: include all sentences (root_sent + child_sent), exclude root paragraphs
    rows: List[Dict[str, str]] = []
    for nid, node in tree.nodes.items():
        if kind.get(nid) not in ("root_sent", "child_sent"):
            continue
        parent_title = tree.nodes[node.parent_id].title if node.parent_id and node.parent_id in tree.nodes else ""
        rows.append(
            {
                "node_id": nid,
                "title": node.title,
                "face": str(node.face or ""),
                "level": str(node.level or ""),
                "parent_id": node.parent_id or "",
                "parent_title": parent_title,
                "U_z": f"{U.get(nid, 0.0):.6f}",
                "D_z": "" if D.get(nid, None) is None else f"{D[nid]:.6f}",
                "L_z": f"{L.get(nid, 0.0):.6f}",
                "F": f"{F.get(nid, 0.0):.6f}",
            }
        )

    write_csv(out_path, rows)

    print(f"[done] Wrote fatefulness scores for {len(rows)} sentences to: {out_path}")


if __name__ == "__main__":
    main() 