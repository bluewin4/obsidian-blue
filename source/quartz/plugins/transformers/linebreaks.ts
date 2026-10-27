import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const HardLineBreaks: QuartzTransformerPlugin = () => {
  return {
    name: "HardLineBreaks",
    markdownPlugins() {
      return [remarkBreaks]
    },
  }
}

// Hard line breaks for poems only: every newline in a poem is a line of verse,
// matching how Obsidian shows it. Prose notes keep standard Markdown joining.
// Poems that already mark lines with a manual <br> are left alone, so they
// don't get doubled breaks.
export const PoemLineBreaks: QuartzTransformerPlugin = () => {
  return {
    name: "PoemLineBreaks",
    markdownPlugins() {
      return [
        () => {
          const breaks = (remarkBreaks as any)()
          return (tree: any, file: any) => {
            if (file.data?.frontmatter?.content_type !== "poem") return
            if (/<br\s*\/?>/i.test(String(file.value ?? ""))) return
            return breaks(tree, file)
          }
        },
      ]
    },
  }
}
