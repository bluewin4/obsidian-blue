import { visit } from "unist-util-visit"
import { Root, Element } from "hast"
import { QuartzTransformerPlugin } from "../types"

/**
 * Renders Markdown links whose destination is a hex color as colored text.
 * Example: `[terracotta red](#E35336)` becomes a span colored #E35336.
 * Multiple comma-separated colors (e.g. `[silver](#D8D8D8,#AFB1AE)`) render
 * as a gradient. A subtle outline keeps any color legible in light or dark mode.
 *
 * Only 6-digit hex values are recognized, so ordinary heading anchors are not
 * accidentally converted.
 */
const SINGLE_HEX = /^[0-9a-fA-F]{6}$/

function parseColors(href: unknown): string[] | null {
  if (typeof href !== "string") return null
  let raw = href.trim()
  if (raw.length === 0) return null
  // tolerate a leading ./ or / that link resolution may add
  raw = raw.replace(/^\.?\//, "")
  if (!raw.startsWith("#")) return null

  // split on commas or the word "to" (legacy range syntax), allowing stray spaces/#
  const parts = raw
    .replace(/^#/, "")
    .split(/\s*(?:,|\bto\b)\s*/)
    .map((p) => p.replace(/[#\s]/g, ""))
    .filter((p) => p.length > 0)

  if (parts.length === 0) return null
  const colors: string[] = []
  for (const part of parts) {
    if (!SINGLE_HEX.test(part)) return null
    colors.push(`#${part}`)
  }
  return colors
}

export const ColorLinks: QuartzTransformerPlugin = () => {
  return {
    name: "ColorLinks",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName !== "a") return
              const colors = parseColors(node.properties?.href)
              if (!colors) return

              const classes = ["color-ref"]
              let style: string
              if (colors.length === 1) {
                style = `color:${colors[0]}`
              } else {
                const gradient = `linear-gradient(90deg, ${colors.join(", ")})`
                classes.push("color-ref--gradient")
                style = `background-image:${gradient};-webkit-background-clip:text;background-clip:text;color:transparent`
              }

              node.tagName = "span"
              node.properties = {
                className: classes,
                style,
                title: colors.join(", "),
              }
            })
          }
        },
      ]
    },
  }
}
