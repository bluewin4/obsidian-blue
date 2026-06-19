import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Synthesis of Some Stuff",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "elsworth.phd",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Spectral",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f4",
          lightgray: "#e7e2d9",
          gray: "#b4ac9d",
          darkgray: "#3a352e",
          dark: "#24201b",
          secondary: "#2f5a72",
          tertiary: "#7a9b91",
          highlight: "rgba(122, 140, 150, 0.12)",
          textHighlight: "#fbe98c88",
        },
        darkMode: {
          light: "#15151b",
          lightgray: "#2b2b34",
          gray: "#5e5e6c",
          darkgray: "#cdccd4",
          dark: "#ececf1",
          secondary: "#8fb3c9",
          tertiary: "#8fb3a6",
          highlight: "rgba(143, 159, 169, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.ColorLinks(),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.LlmIndex({
        enableSitemap: true,
        enableApi: true,
        enableLlmsTxt: true,
      }),
      Plugin.LlmText(),
      Plugin.LlmDiscovery(),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
