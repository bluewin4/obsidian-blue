import { GlobalConfiguration } from "../../cfg"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { QuartzPluginData } from "../vfile"
import { write } from "./helpers"
import DepGraph from "../../depgraph"
import { summarizeText, normalizeSlug } from "../../util/llm"

interface Options {
  // emit /llm-sitemap.json (machine-readable index of every page + semantic metadata)
  enableSitemap: boolean
  // emit /llm-api.json (top-level descriptor explaining how to consume the site)
  enableApi: boolean
  // emit /llms.txt (the emerging llmstxt.org plain-text standard)
  enableLlmsTxt: boolean
}

const defaultOptions: Options = {
  enableSitemap: true,
  enableApi: true,
  enableLlmsTxt: true,
}

type Concept = { name?: string; definition?: string }
type Related = { title?: string; url?: string; relationship?: string }

type LlmEntry = {
  slug: SimpleSlug
  url: string
  title: string
  description: string
  section: string
  contentType: string
  tags: string[]
  themes: string[]
  aiSummary: string
  aiKeywords: string[]
  aiConcepts: Concept[]
  relatedContent: Related[]
  contact: string[]
  dateCreated?: string
  dateModified?: string
  wordCount: number
  links: SimpleSlug[]
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return fallback
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => asString(v)).filter((v) => v.length > 0)
  }
  if (typeof value === "string" && value.length > 0) return [value]
  return []
}

function toIso(value: unknown, fallback?: Date): string | undefined {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.length > 0) {
    const parsed = new Date(value)
    if (!isNaN(parsed.getTime())) return parsed.toISOString()
    return value
  }
  return fallback?.toISOString()
}

function sectionForSlug(slug: SimpleSlug, fmSection: string): string {
  if (fmSection) return fmSection
  const segments = slug.split("/")
  // top-level pages (e.g. "index") have no section
  return segments.length > 1 ? segments[0] : ""
}

function buildEntry(cfg: GlobalConfiguration, data: QuartzPluginData): LlmEntry {
  const base = cfg.baseUrl ?? ""
  const fm = data.frontmatter ?? ({} as Record<string, unknown>)
  const slug = simplifySlug(data.slug!)
  const title = asString(fm.title, data.slug ?? "Untitled")
  const section = sectionForSlug(slug, asString(fm.section))
  const text = asString(data.text)
  const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0

  // Prefer authored description, otherwise a clean sentence-boundary summary of the body.
  const description = asString(fm.description, summarizeText(text))
  const tags = asStringArray(fm.tags)
  const authoredKeywords = asStringArray(fm.ai_keywords)

  const aiConcepts: Concept[] = Array.isArray(fm.ai_concepts)
    ? (fm.ai_concepts as Concept[]).map((c) => ({
        name: asString(c?.name),
        definition: asString(c?.definition),
      }))
    : []
  // Authored relationships; auto-derived link-graph relationships are appended later.
  const relatedContent: Related[] = Array.isArray(fm.related_content)
    ? (fm.related_content as Related[]).map((r) => ({
        title: asString(r?.title),
        url: asString(r?.url),
        relationship: asString(r?.relationship, "related"),
      }))
    : []

  return {
    slug,
    url: `https://${joinSegments(base, encodeURI(slug))}`,
    title,
    description,
    section,
    contentType: asString(fm.content_type, "article"),
    tags,
    themes: asStringArray(fm.themes),
    aiSummary: asString(fm.ai_summary, description),
    aiKeywords: authoredKeywords.length > 0 ? authoredKeywords : tags,
    aiConcepts,
    relatedContent,
    contact: asStringArray(fm.llm_contact),
    dateCreated: toIso(fm.date_created ?? fm.date, data.dates?.created),
    dateModified: toIso(fm.date_modified ?? fm.lastmod, data.dates?.modified),
    wordCount,
    links: data.links ?? [],
  }
}

/**
 * Populate each entry's relatedContent with auto-derived "directions" from the
 * wikilink graph: outgoing links ("links-to") and incoming backlinks ("linked-from").
 * Authored related_content is preserved first and never duplicated.
 */
function deriveRelatedContent(entries: LlmEntry[], limit = 30): void {
  const bySlug = new Map<string, LlmEntry>()
  for (const e of entries) bySlug.set(normalizeSlug(e.slug), e)

  const backlinks = new Map<string, Set<string>>()
  for (const e of entries) {
    const src = normalizeSlug(e.slug)
    for (const link of e.links) {
      const target = normalizeSlug(link)
      if (!backlinks.has(target)) backlinks.set(target, new Set())
      backlinks.get(target)!.add(src)
    }
  }

  for (const e of entries) {
    const selfSlug = normalizeSlug(e.slug)
    const seen = new Set<string>()
    const related: Related[] = []

    const add = (r: Related) => {
      const key = (r.url || r.title || "").toLowerCase()
      if (!key || seen.has(key)) return
      seen.add(key)
      related.push(r)
    }

    for (const r of e.relatedContent) add(r)

    for (const link of e.links) {
      const target = bySlug.get(normalizeSlug(link))
      if (!target || normalizeSlug(target.slug) === selfSlug) continue
      add({ title: target.title, url: target.url, relationship: "links-to" })
    }

    const incoming = backlinks.get(selfSlug)
    if (incoming) {
      for (const srcSlug of incoming) {
        const source = bySlug.get(srcSlug)
        if (!source || normalizeSlug(source.slug) === selfSlug) continue
        add({ title: source.title, url: source.url, relationship: "linked-from" })
      }
    }

    e.relatedContent = related.slice(0, limit)
  }
}

function siteDescriptor(cfg: GlobalConfiguration) {
  return {
    name: cfg.pageTitle,
    url: `https://${cfg.baseUrl ?? ""}`,
    locale: cfg.locale,
  }
}

function generateSitemap(cfg: GlobalConfiguration, entries: LlmEntry[]): string {
  return JSON.stringify(
    {
      version: "1.0",
      site: siteDescriptor(cfg),
      generated: new Date().toISOString(),
      count: entries.length,
      pages: entries,
    },
    null,
    2,
  )
}

function generateApi(cfg: GlobalConfiguration, entries: LlmEntry[]): string {
  const sectionCounts = new Map<string, number>()
  for (const entry of entries) {
    if (!entry.section) continue
    sectionCounts.set(entry.section, (sectionCounts.get(entry.section) ?? 0) + 1)
  }
  const base = cfg.baseUrl ?? ""
  const sections = Array.from(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      url: `https://${joinSegments(base, encodeURI(simplifySlug(name as FullSlug)))}`,
      count,
    }))

  const home = entries.find((e) => isHomeSlug(e.slug))

  return JSON.stringify(
    {
      version: "1.0",
      site: siteDescriptor(cfg),
      contact: home?.contact ?? [],
      generated: new Date().toISOString(),
      description:
        "Machine-readable API for this site. Designed so language models can discover, " +
        "navigate, and extract semantic content. Start with the sitemap endpoint for a full " +
        "page index; each page also embeds JSON-LD and data-llm-* attributes in its HTML.",
      endpoints: {
        sitemap: "/llm-sitemap.json",
        contentIndex: "/static/contentIndex.json",
        rss: "/index.xml",
        sitemapXml: "/sitemap.xml",
        llmsTxt: "/llms.txt",
      },
      conventions: {
        jsonLd: "Each page includes schema.org JSON-LD in a <script type=\"application/ld+json\"> tag.",
        domAttributes:
          "Semantic hints are exposed via data-llm-* attributes inside a hidden .llm-metadata block.",
        contentRegions: "Primary human content is marked with data-ai-role on the homepage sections.",
      },
      schema: {
        slug: "Site-relative path of the page.",
        url: "Absolute canonical URL.",
        title: "Human-readable title.",
        description: "Short description or auto-generated summary.",
        section: "Top-level collection the page belongs to.",
        contentType: "Declared content_type (article, research, story, poem, website, ...).",
        tags: "Author-assigned tags.",
        themes: "High-level themes for the page.",
        aiSummary: "Summary intended for machine readers (falls back to description).",
        aiKeywords: "Keywords intended for machine readers.",
        aiConcepts: "Named concepts with definitions, when provided.",
        relatedContent: "Explicit relationships to other pages.",
        dateCreated: "ISO-8601 creation date.",
        dateModified: "ISO-8601 last-modified date.",
        wordCount: "Approximate word count of the page body.",
        links: "Outgoing internal links (slugs).",
      },
      sections,
      stats: {
        totalPages: entries.length,
        totalSections: sections.length,
      },
    },
    null,
    2,
  )
}

const isHomeSlug = (slug: SimpleSlug): boolean =>
  slug === ("" as SimpleSlug) || slug === ("/" as SimpleSlug) || slug === ("index" as SimpleSlug)

function generateLlmsTxt(cfg: GlobalConfiguration, entries: LlmEntry[]): string {
  const lines: string[] = []
  lines.push(`# ${cfg.pageTitle}`)
  lines.push("")

  const home = entries.find((e) => isHomeSlug(e.slug))
  const summary = home?.aiSummary || home?.description
  if (summary) {
    lines.push(`> ${summary}`)
    lines.push("")
  }

  lines.push(
    "This file follows the llmstxt.org convention. For richer structured data see " +
      "/llm-sitemap.json and /llm-api.json. Each page entry there also lists its " +
      "relatedContent (outgoing 'links-to' and incoming 'linked-from' edges), so the " +
      "site's link graph is fully machine-readable.",
  )
  lines.push("")

  if (home?.contact && home.contact.length > 0) {
    lines.push("## Contact")
    lines.push("")
    for (const item of home.contact) {
      lines.push(`- ${item}`)
    }
    lines.push("")
  }

  const grouped = new Map<string, LlmEntry[]>()
  for (const entry of entries) {
    if (isHomeSlug(entry.slug)) continue
    const key = entry.section || "Other"
    const list = grouped.get(key) ?? []
    list.push(entry)
    grouped.set(key, list)
  }

  for (const section of Array.from(grouped.keys()).sort()) {
    lines.push(`## ${section}`)
    lines.push("")
    const pages = grouped.get(section)!.sort((a, b) => a.title.localeCompare(b.title))
    for (const page of pages) {
      const note = page.description ? `: ${page.description}` : ""
      lines.push(`- [${page.title}](${page.url})${note}`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

export const LlmIndex: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LlmIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()
      const outputs: string[] = []
      if (opts.enableSitemap) outputs.push("llm-sitemap.json")
      if (opts.enableApi) outputs.push("llm-api.json")
      if (opts.enableLlmsTxt) outputs.push("llms.txt")

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!
        for (const out of outputs) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, out) as FilePath)
        }
      }
      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []

      const entries: LlmEntry[] = content
        .filter(([_tree, file]) => file.data.slug !== undefined)
        .map(([_tree, file]) => buildEntry(cfg, file.data))
        .sort((a, b) => a.slug.localeCompare(b.slug))

      deriveRelatedContent(entries)

      if (opts.enableSitemap) {
        emitted.push(
          await write({
            ctx,
            content: generateSitemap(cfg, entries),
            slug: "llm-sitemap" as FullSlug,
            ext: ".json",
          }),
        )
      }

      if (opts.enableApi) {
        emitted.push(
          await write({
            ctx,
            content: generateApi(cfg, entries),
            slug: "llm-api" as FullSlug,
            ext: ".json",
          }),
        )
      }

      if (opts.enableLlmsTxt) {
        emitted.push(
          await write({
            ctx,
            content: generateLlmsTxt(cfg, entries),
            slug: "llms" as FullSlug,
            ext: ".txt",
          }),
        )
      }

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
