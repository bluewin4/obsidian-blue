import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"

/**
 * Renders a page's link topology — outgoing links and backlinks — as visible
 * text inside the main content column. The interactive Graph and the sidebar
 * Backlinks list are invisible to machine readers that extract a page to plain
 * text; this surfaces the same edges where any reader (human or model) sees them.
 * For a site whose thesis is self-similar interlinking, the edges must travel
 * with the node.
 */
const Connections: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!)

  const titleOf = (f: (typeof allFiles)[number]) =>
    (f.frontmatter?.title as string | undefined) ?? f.slug ?? ""

  // Outgoing internal links from this page.
  const outgoing = new Set((fileData.links ?? []).map((l) => simplifySlug(l as any)))
  const outgoingFiles = allFiles
    .filter((f) => f.slug !== undefined && outgoing.has(simplifySlug(f.slug)) && simplifySlug(f.slug) !== slug)
    .sort((a, b) => titleOf(a).localeCompare(titleOf(b)))

  // Pages that link to this one.
  const backlinkFiles = allFiles
    .filter((f) => f.slug !== undefined && f.links?.includes(slug) && simplifySlug(f.slug) !== slug)
    .sort((a, b) => titleOf(a).localeCompare(titleOf(b)))

  if (outgoingFiles.length === 0 && backlinkFiles.length === 0) {
    return null
  }

  const list = (files: typeof allFiles) => (
    <ul>
      {files.map((f) => (
        <li>
          <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
            {titleOf(f)}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <nav class={classNames(displayClass, "connections")} aria-label="Page connections">
      {outgoingFiles.length > 0 && (
        <section class="connections-group">
          <h3>Links from this page</h3>
          {list(outgoingFiles)}
        </section>
      )}
      {backlinkFiles.length > 0 && (
        <section class="connections-group">
          <h3>Pages that link here</h3>
          {list(backlinkFiles)}
        </section>
      )}
    </nav>
  )
}

export default (() => Connections) satisfies QuartzComponentConstructor
