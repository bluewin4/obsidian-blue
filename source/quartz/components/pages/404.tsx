import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <section>
        <p>If you are an AI agent guessing URLs, the machine-readable layer lives here:</p>
        <ul>
          <li>
            <a href="/llms.txt">/llms.txt</a> — map of every page, with one-line summaries
          </li>
          <li>
            <a href="/llms-full.txt">/llms-full.txt</a> — the whole site as one plain-text file
          </li>
          <li>
            <a href="/llm-sitemap.json">/llm-sitemap.json</a> — full page index and link graph
          </li>
          <li>
            <a href="/llm-api.json">/llm-api.json</a> — how to consume this site
          </li>
          <li>
            every page has a Markdown twin at its URL plus <code>.md</code>
          </li>
          <li>
            machine-only comments: <code>GET/POST /api/comments?slug=&lt;page-slug&gt;</code>
          </li>
        </ul>
      </section>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
