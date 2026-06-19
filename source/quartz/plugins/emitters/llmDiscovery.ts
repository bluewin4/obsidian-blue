import { FilePath, FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

interface Options {
  // emit /robots.txt with pointers to the machine-readable indexes
  enableRobots: boolean
  // emit Cloudflare Pages _headers with an RFC 8288 Link header on every response
  enableHeaders: boolean
  // emit Cloudflare Pages _redirects so /.well-known/llms.txt serves /llms.txt
  enableWellKnown: boolean
}

const defaultOptions: Options = {
  enableRobots: true,
  enableHeaders: true,
  enableWellKnown: true,
}

// The machine endpoints we want agents to discover, relative to the site root.
const LLM_ENDPOINTS: Array<{ path: string; rel: string }> = [
  { path: "/llms.txt", rel: "llms-txt" },
  { path: "/llm-api.json", rel: "llm-api" },
  { path: "/llm-sitemap.json", rel: "llm-sitemap" },
]

function generateRobots(baseUrl: string): string {
  const abs = (p: string) => `https://${baseUrl}${p}`
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${abs("/sitemap.xml")}`,
    "",
    "# Machine-readable indexes for language models (llmstxt.org convention).",
    "# Agents: start here for a structured map of this site.",
    `# Guide:   ${abs("/llms.txt")}`,
    `# API:     ${abs("/llm-api.json")}`,
    `# Sitemap: ${abs("/llm-sitemap.json")}`,
    "",
  ].join("\n")
}

function generateHeaders(): string {
  // RFC 8288 Link header, comma-separated, applied to every path.
  const link = LLM_ENDPOINTS.map((e) => `<${e.path}>; rel="${e.rel}"`).join(", ")
  return ["/*", `  Link: ${link}`, "  X-Llms-Txt: /llms.txt", ""].join("\n")
}

function generateRedirects(): string {
  // Cloudflare Pages: status 200 rewrites (proxies) rather than redirects,
  // so the well-known path transparently serves the canonical llms.txt.
  return ["/.well-known/llms.txt   /llms.txt   200", ""].join("\n")
}

export const LlmDiscovery: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LlmDiscovery",
    getQuartzComponents() {
      return []
    },
    async getDependencyGraph(_ctx, _content, _resources) {
      return new DepGraph<FilePath>()
    },
    async emit(ctx, _content, _resources): Promise<FilePath[]> {
      const baseUrl = ctx.cfg.configuration.baseUrl ?? ""
      const emitted: FilePath[] = []

      if (opts.enableRobots) {
        emitted.push(
          await write({
            ctx,
            content: generateRobots(baseUrl),
            slug: "robots" as FullSlug,
            ext: ".txt",
          }),
        )
      }

      if (opts.enableHeaders) {
        emitted.push(
          await write({
            ctx,
            content: generateHeaders(),
            slug: "_headers" as FullSlug,
            ext: "",
          }),
        )
      }

      if (opts.enableWellKnown) {
        emitted.push(
          await write({
            ctx,
            content: generateRedirects(),
            slug: "_redirects" as FullSlug,
            ext: "",
          }),
        )
      }

      return emitted
    },
  }
}
