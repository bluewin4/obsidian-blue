/**
 * Shared helpers for the LLM-friendly layer (sitemap/api emitters + LlmMetadata component).
 */

/**
 * Produce a clean, human-readable summary from a block of plain text.
 * Collapses whitespace and cuts at a sentence boundary when possible,
 * otherwise at a word boundary, so summaries never end mid-word.
 */
export function summarizeText(text: string | undefined, maxLen = 300): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim()
  if (clean.length <= maxLen) return clean

  const slice = clean.slice(0, maxLen)
  const boundary = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? "),
  )
  if (boundary > maxLen * 0.5) {
    return slice.slice(0, boundary + 1).trim()
  }

  const lastSpace = slice.lastIndexOf(" ")
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim() + "…"
}

/** Normalize a slug for graph matching (case-insensitive, no surrounding slashes). */
export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/^\/+|\/+$/g, "")
}
