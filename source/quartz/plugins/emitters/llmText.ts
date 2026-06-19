import fs from "fs"
import matter from "gray-matter"
import { FilePath, FullSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { QuartzPluginData } from "../vfile"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

interface Options {
  // file extension for the plain-text twin (default ".md")
  ext: `.${string}`
}

const defaultOptions: Options = {
  ext: ".md",
}

/**
 * Build a clean, agent-friendly Markdown twin of a page: the original source
 * body (frontmatter stripped) with LaTeX math left intact as $…$, prefixed with
 * a title and a canonical-URL comment so the file is self-describing. This is the
 * "simpler version" for machine readers — no MathML, no HTML, no aria-hidden
 * gymnastics, just the text and its math in the form models read most fluently.
 */
function buildPlainText(cfg: { baseUrl?: string }, data: QuartzPluginData): string | undefined {
  const filePath = data.filePath
  if (!filePath) return undefined

  let raw: string
  try {
    raw = fs.readFileSync(filePath, "utf-8")
  } catch {
    return undefined
  }

  const body = matter(raw).content.trim()
  const fm = data.frontmatter ?? ({} as Record<string, unknown>)
  const title = typeof fm.title === "string" ? fm.title : (data.slug ?? "Untitled")
  const slug = simplifySlug(data.slug!)
  const url = `https://${joinSegments(cfg.baseUrl ?? "", encodeURI(slug))}`

  const header = [`# ${title}`, "", `<!-- canonical: ${url} -->`, ""].join("\n")
  return `${header}\n${body}\n`
}

export const LlmText: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LlmText",
    getQuartzComponents() {
      return []
    },
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()
      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath
        if (!sourcePath || file.data.slug === undefined) continue
        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, file.data.slug + opts.ext) as FilePath,
        )
      }
      return graph
    },
    async emit(ctx, content, _resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []

      for (const [_tree, file] of content) {
        if (file.data.slug === undefined) continue
        const plain = buildPlainText(cfg, file.data)
        if (plain === undefined) continue

        emitted.push(
          await write({
            ctx,
            content: plain,
            slug: file.data.slug as FullSlug,
            ext: opts.ext,
          }),
        )
      }

      return emitted
    },
  }
}
