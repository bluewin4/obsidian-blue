import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

// Maps the top-level slug segment to a stable section key used for theming.
const sectionKeys: Record<string, string> = {
  Formalisms: "formalisms",
  "The-Self-Similar-book": "self-similar",
  "Paracosm---The-Island-of-Lost-Hope": "paracosm",
}

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  const slug = fileData.slug ?? ""
  const section = sectionKeys[slug.split("/")[0]] ?? ""
  const frontmatterType = (fileData.frontmatter?.content_type as string | undefined) ?? ""
  // Poems live under a "Poetic" folder; stories under a "Stories" folder
  // (including "misc stories"), even when they lack explicit frontmatter.
  const contentType =
    frontmatterType ||
    (slug.includes("/Poetic/")
      ? "poem"
      : slug.toLowerCase().includes("stories/")
        ? "story"
        : "")

  return (
    <article
      class={classString}
      data-section={section || undefined}
      data-content-type={contentType || undefined}
    >
      {content}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
