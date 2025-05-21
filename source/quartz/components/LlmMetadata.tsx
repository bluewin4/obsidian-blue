import { QuartzComponentConstructor, QuartzComponent } from "../components/types"
import { classNames } from "../util/lang"
import { JSResource } from "../util/resources"

export default (() => {
  const LlmMetadata: QuartzComponent = ({ fileData, cfg }) => {
    const title = fileData.frontmatter?.title || fileData.slug
    const description = fileData.frontmatter?.description || ""
    const author = fileData.frontmatter?.author || cfg.pageTitle
    const dateCreated = fileData.frontmatter?.date_created || fileData.dates?.created
    const dateModified = fileData.frontmatter?.date_modified || fileData.dates?.modified
    const section = fileData.frontmatter?.section || ""
    const contentType = fileData.frontmatter?.content_type || "article"
    const themes = fileData.frontmatter?.themes || []
    const relatedContent = fileData.frontmatter?.related_content || []
    const aiSummary = fileData.frontmatter?.ai_summary || description
    const aiKeywords = fileData.frontmatter?.ai_keywords || []
    const aiConcepts = fileData.frontmatter?.ai_concepts || []
    const semanticStructure = fileData.frontmatter?.semantic_structure || ""

    const structuredData = {
      "@context": "https://schema.org",
      "@type": contentType === "research" ? "ScholarlyArticle" : "Article",
      "headline": title,
      "author": {
        "@type": "Person",
        "name": author
      },
      "description": description,
      "keywords": aiKeywords,
      "datePublished": dateCreated,
      "dateModified": dateModified,
      "isPartOf": {
        "@type": "Collection",
        "name": section
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${cfg.baseUrl}/${fileData.slug}`
      }
    }

    // Add LLM-specific metadata in comments
    return (
      <>
        {/* Hidden metadata specifically for LLMs */}
        <div className="llm-metadata" style={{ display: "none" }}>
          <div data-llm-title={title}></div>
          <div data-llm-description={description}></div>
          <div data-llm-author={author}></div>
          <div data-llm-date-created={dateCreated}></div>
          <div data-llm-date-modified={dateModified}></div>
          <div data-llm-section={section}></div>
          <div data-llm-content-type={contentType}></div>
          <div data-llm-themes={themes.join(',')}></div>
          <div data-llm-ai-summary={aiSummary}></div>
          <div data-llm-ai-keywords={aiKeywords.join(',')}></div>
          <div data-llm-semantic-structure={semanticStructure}></div>
          
          {aiConcepts.length > 0 && (
            <div data-llm-ai-concepts>
              {aiConcepts.map((concept: any, idx: number) => (
                <div key={idx} data-llm-concept-name={concept.name} data-llm-concept-definition={concept.definition}></div>
              ))}
            </div>
          )}
          
          {relatedContent.length > 0 && (
            <div data-llm-related-content>
              {relatedContent.map((related: any, idx: number) => (
                <div key={idx} data-llm-related-title={related.title} data-llm-related-url={related.url} data-llm-related-relationship={related.relationship}></div>
              ))}
            </div>
          )}
        </div>

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}></script>

        {/* Add machine-readable comment at the beginning of HTML indicating LLM support */}
        <div dangerouslySetInnerHTML={{ __html: '<!-- \n LLM-FRIENDLY-CONTENT\n This page contains structured metadata for LLMs.\n Use data-llm-* attributes and JSON-LD for extracting semantic information.\n -->' }}></div>
      </>
    )
  }

  return LlmMetadata
}) satisfies QuartzComponentConstructor 