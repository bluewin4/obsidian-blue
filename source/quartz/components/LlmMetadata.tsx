import { QuartzComponentConstructor, QuartzComponent, QuartzComponentProps } from "../components/types"
import { simplifySlug } from "../util/path"
import { summarizeText, normalizeSlug } from "../util/llm"

type Concept = { name?: string; definition?: string }
type Related = { title?: string; url?: string; relationship?: string }

const asString = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return fallback
}

const asStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((v) => asString(v)).filter((v) => v.length > 0)
  if (typeof value === "string" && value.length > 0) return [value]
  return []
}

const toIso = (value: unknown, fallback?: Date): string | undefined => {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.length > 0) {
    const parsed = new Date(value)
    return isNaN(parsed.getTime()) ? value : parsed.toISOString()
  }
  return fallback?.toISOString()
}

export default (() => {
  const LlmMetadata: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
    const fm = fileData.frontmatter ?? ({} as Record<string, unknown>)
    const title = asString(fm.title, fileData.slug ?? "")
    const description = asString(fm.description, summarizeText(asString(fileData.text)))
    const author = asString(fm.author, cfg.pageTitle)
    const dateCreated = toIso(fm.date_created ?? fm.date, fileData.dates?.created)
    const dateModified = toIso(fm.date_modified ?? fm.lastmod, fileData.dates?.modified)
    const section = asString(fm.section)
    const contentType = asString(fm.content_type, "article")
    const themes = asStringArray(fm.themes)
    const aiSummary = asString(fm.ai_summary, description)
    const tags = asStringArray(fm.tags)
    const authoredKeywords = asStringArray(fm.ai_keywords)
    const aiKeywords = authoredKeywords.length > 0 ? authoredKeywords : tags
    const semanticStructure = asString(fm.semantic_structure)
    const aiConcepts: Concept[] = Array.isArray(fm.ai_concepts) ? (fm.ai_concepts as Concept[]) : []

    // Authored relationships, plus auto-derived "directions" from the wikilink graph.
    const urlFor = (slug: string) => `https://${cfg.baseUrl}/${simplifySlug(slug as any)}`
    const selfSlug = simplifySlug(fileData.slug!)
    const selfNorm = normalizeSlug(selfSlug)

    const seen = new Set<string>()
    const relatedContent: Related[] = []
    const addRelated = (r: Related) => {
      const key = (r.url || r.title || "").toLowerCase()
      if (!key || seen.has(key)) return
      seen.add(key)
      relatedContent.push(r)
    }

    if (Array.isArray(fm.related_content)) {
      for (const r of fm.related_content as Related[]) {
        addRelated({
          title: asString(r?.title),
          url: asString(r?.url),
          relationship: asString(r?.relationship, "related"),
        })
      }
    }

    const fileBySlug = new Map<string, (typeof allFiles)[number]>()
    for (const f of allFiles) {
      if (f.slug) fileBySlug.set(normalizeSlug(simplifySlug(f.slug)), f)
    }

    for (const link of fileData.links ?? []) {
      const target = fileBySlug.get(normalizeSlug(link))
      if (!target?.slug || normalizeSlug(simplifySlug(target.slug)) === selfNorm) continue
      addRelated({
        title: asString(target.frontmatter?.title, target.slug),
        url: urlFor(target.slug),
        relationship: "links-to",
      })
    }

    for (const f of allFiles) {
      if (!f.slug || !f.links?.includes(selfSlug)) continue
      if (normalizeSlug(simplifySlug(f.slug)) === selfNorm) continue
      addRelated({
        title: asString(f.frontmatter?.title, f.slug),
        url: urlFor(f.slug),
        relationship: "linked-from",
      })
    }

    // Build JSON-LD, omitting empty fields so the structured data stays clean.
    const structuredData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": contentType === "research" ? "ScholarlyArticle" : "Article",
      headline: title,
      author: { "@type": "Person", name: author },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://${cfg.baseUrl}/${fileData.slug}`,
      },
    }
    if (description) structuredData.description = description
    if (aiKeywords.length > 0) structuredData.keywords = aiKeywords
    if (dateCreated) structuredData.datePublished = dateCreated
    if (dateModified) structuredData.dateModified = dateModified
    if (section) structuredData.isPartOf = { "@type": "Collection", name: section }

    // Only emit data-llm-* markers that actually carry a value.
    const markers: Array<[string, string]> = [
      ["data-llm-title", title],
      ["data-llm-description", description],
      ["data-llm-author", author],
      ["data-llm-date-created", dateCreated ?? ""],
      ["data-llm-date-modified", dateModified ?? ""],
      ["data-llm-section", section],
      ["data-llm-content-type", contentType],
      ["data-llm-themes", themes.join(",")],
      ["data-llm-ai-summary", aiSummary],
      ["data-llm-ai-keywords", aiKeywords.join(",")],
      ["data-llm-semantic-structure", semanticStructure],
    ].filter(([, value]) => value.length > 0)

    return (
      <>
        {/* Hidden metadata specifically for LLMs */}
        <div className="llm-metadata" style={{ display: "none" }}>
          {markers.map(([attr, value]) => (
            <div key={attr} {...{ [attr]: value }}></div>
          ))}

          {aiConcepts.length > 0 && (
            <div data-llm-ai-concepts>
              {aiConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  data-llm-concept-name={asString(concept?.name)}
                  data-llm-concept-definition={asString(concept?.definition)}
                ></div>
              ))}
            </div>
          )}

          {relatedContent.length > 0 && (
            <div data-llm-related-content>
              {relatedContent.map((related, idx) => (
                <div
                  key={idx}
                  data-llm-related-title={asString(related?.title)}
                  data-llm-related-url={asString(related?.url)}
                  data-llm-related-relationship={asString(related?.relationship)}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        ></script>

        {/* Machine-readable hint pointing LLMs at the structured endpoints */}
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<!-- \n LLM-FRIENDLY-CONTENT\n This page exposes data-llm-* attributes and JSON-LD.\n Site-wide machine indexes: /llm-sitemap.json, /llm-api.json, /llms.txt\n -->",
          }}
        ></div>
      </>
    )
  }

  return LlmMetadata
}) satisfies QuartzComponentConstructor
