/**
 * Cloudflare Pages middleware: Markdown content negotiation for agents.
 *
 * Every note already has a plain Markdown twin at the same path plus ".md"
 * (emitted by quartz/plugins/emitters/llmText.ts). When a request prefers
 * text/markdown over text/html, serve that twin instead of the HTML page.
 * Browsers never send that preference, so they keep getting HTML.
 *
 *   GET /Formalisms/Genetic-Notation-for-Prompts   Accept: text/markdown
 *     -> body of /Formalisms/Genetic-Notation-for-Prompts.md, text/markdown
 *
 * Pages with no twin (folder listings, tag pages, 404) fall through to HTML.
 */

interface Fetcher {
  fetch(input: Request | URL | string, init?: RequestInit): Promise<Response>
}

interface MiddlewareCtx {
  request: Request
  env: { ASSETS: Fetcher }
  next(): Promise<Response>
}

// q-value the Accept header gives a media type (0 when absent).
function quality(accept: string, type: string): number {
  let best = 0
  for (const part of accept.split(",")) {
    const [media, ...params] = part.trim().toLowerCase().split(";")
    if (media.trim() !== type) continue
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
    const value = q ? Number(q.slice(2)) : 1
    if (!Number.isNaN(value)) best = Math.max(best, value)
  }
  return best
}

function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept") ?? ""
  const md = quality(accept, "text/markdown")
  return md > 0 && md >= quality(accept, "text/html")
}

// Page paths only: no API routes, no files with a non-HTML extension.
function twinPath(pathname: string): string | null {
  if (pathname.startsWith("/api/") || pathname.startsWith("/.well-known/")) return null
  const last = pathname.split("/").pop() ?? ""
  if (last.includes(".") && !last.endsWith(".html")) return null
  if (pathname.endsWith("/")) return `${pathname}index.md`
  return `${pathname.replace(/\.html$/, "")}.md`
}

export const onRequest = async (ctx: MiddlewareCtx): Promise<Response> => {
  const { request } = ctx
  const url = new URL(request.url)
  const twin = request.method === "GET" || request.method === "HEAD" ? twinPath(url.pathname) : null
  if (!twin) return ctx.next()

  if (wantsMarkdown(request)) {
    const asset = await ctx.env.ASSETS.fetch(new URL(twin, url))
    if (asset.ok) {
      const headers = new Headers(asset.headers)
      headers.set("Content-Type", "text/markdown; charset=utf-8")
      headers.set("Vary", "Accept")
      headers.set("Content-Location", twin)
      return new Response(request.method === "HEAD" ? null : asset.body, {
        status: 200,
        headers,
      })
    }
  }

  // Same URL, different body depending on Accept: tell caches so.
  const response = await ctx.next()
  const headers = new Headers(response.headers)
  headers.append("Vary", "Accept")
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
