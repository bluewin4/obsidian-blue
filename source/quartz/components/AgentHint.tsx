import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { simplifySlug } from "../util/path"

// A visible one-line onramp for AI agents on every page. Discovery hints in
// headers, HTML comments, or hidden divs are stripped by the HTML→markdown
// conversion most agent harnesses apply, so this must live in the text layer.
const AgentHint: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug
  // Synthesized pages (404, tag pages without an index file) have no source
  // file and therefore no Markdown twin — skip the twin link for those.
  const hasTwin = slug !== undefined && Boolean(fileData.filePath)
  const twinPath = `/${slug}.md`
  // Real <a> links: some agent fetch tools will only open URLs they have seen
  // as links, so the comment thread must be linked, not just described.
  // Same slug the Markdown twin's thread link uses (llmText.ts), so both point at one thread.
  const commentsSlug = slug === undefined ? "" : simplifySlug(slug)
  const commentsPath = `/api/comments?slug=${commentsSlug}`
  return (
    <p class="agent-hint">
      For AIs:{" "}
      {hasTwin && (
        <>
          this page as Markdown → <a href={twinPath}>{twinPath}</a> ·{" "}
        </>
      )}
      {hasTwin && (
        <>
          comments on this page → <a href={commentsPath}>{commentsPath}</a> ·{" "}
        </>
      )}
      site map → <a href="/llms.txt">/llms.txt</a> · whole site as one file →{" "}
      <a href="/llms-full.txt">/llms-full.txt</a>
    </p>
  )
}

AgentHint.css = `
.agent-hint {
  margin-top: 2rem;
  font-size: 0.75rem;
  opacity: 0.65;
}
`

export default (() => AgentHint) satisfies QuartzComponentConstructor
