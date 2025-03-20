import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import explorerStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { ExplorerNode, FileNode, Options } from "./ExplorerNode"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = {
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    // Sort order: folders first, then files. Sort folders and files alphabetically
    if ((!a.file && !b.file) || (a.file && b.file)) {
      // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
      // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (a.file && !b.file) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => node.name !== "tags",
  order: ["filter", "map", "sort"],
} satisfies Options

export default ((userOpts?: Partial<Options>) => {
  // Parse config
  const opts: Options = { ...defaultOptions, ...userOpts }

  // memoized
  let fileTree: FileNode
  let jsonTree: string
  let lastBuildId: string = ""

  function constructFileTree(allFiles: QuartzPluginData[]) {
    // Construct tree from allFiles
    fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file))

    // Execute all functions (sort, filter, map) that were provided (if none were provided, only default "sort" is applied)
    if (opts.order) {
      // Order is important, use loop with index instead of order.map()
      for (let i = 0; i < opts.order.length; i++) {
        const functionName = opts.order[i]
        if (functionName === "map") {
          fileTree.map(opts.mapFn)
        } else if (functionName === "sort") {
          fileTree.sort(opts.sortFn)
        } else if (functionName === "filter") {
          fileTree.filter(opts.filterFn)
        }
      }
    }

    // Get all folders of tree. Initialize with collapsed state
    // Stringify to pass json tree as data attribute ([data-tree])
    const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed")
    jsonTree = JSON.stringify(folders)
  }

  const Explorer: QuartzComponent = ({
    ctx,
    cfg,
    allFiles,
    displayClass,
    fileData,
  }: QuartzComponentProps) => {
    if (ctx.buildId !== lastBuildId) {
      lastBuildId = ctx.buildId
      constructFileTree(allFiles)
    }

    const mobileTitle = i18n(cfg.locale).components.explorer.mobileTitle || "Navigation"
    const desktopTitle = opts.title ?? i18n(cfg.locale).components.explorer.title

    return (
      <>
        <div class={classNames(displayClass, "explorer")} id="explorer-container">
          <button
            type="button"
            class="mobile-nav-close"
            aria-label="Close navigation"
            id="explorer-close"
            style={{ display: 'none' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <button
            type="button"
            id="explorer"
            data-behavior={opts.folderClickBehavior}
            data-collapsed={opts.folderDefaultState}
            data-savestate={opts.useSavedState}
            data-tree={jsonTree}
            aria-controls="explorer-content"
            aria-expanded={opts.folderDefaultState === "open"}
          >
            <h2 class="desktop-only">{desktopTitle}</h2>
            <h2 class="mobile-only">{mobileTitle}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="5 8 14 8"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="fold"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div id="explorer-content">
            <ul class="overflow" id="explorer-ul">
              <ExplorerNode node={fileTree} opts={opts} fileData={fileData} />
              <li id="explorer-end" />
            </ul>
          </div>
        </div>
        <div class="mobile-nav-backdrop" id="explorer-backdrop"></div>
      </>
    )
  }

  Explorer.css = explorerStyle
  Explorer.afterDOMLoaded = `
    ${script}
    
    // Mobile navigation toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
      const closeBtn = document.getElementById('explorer-close')
      const backdrop = document.getElementById('explorer-backdrop')
      const explorer = document.getElementById('explorer-container')
      
      // We've removed the toggle button, but let's enable navigation 
      // by making the explorer itself clickable on mobile
      function openNav() {
        explorer.classList.add('active')
        backdrop.classList.add('active')
        document.body.style.overflow = 'hidden' // Prevent scrolling when nav is open
        
        // Show close button when nav is active
        if (closeBtn) closeBtn.style.display = 'block'
      }
      
      function closeNav() {
        explorer.classList.remove('active')
        backdrop.classList.remove('active')
        document.body.style.overflow = ''
        
        // Hide close button when nav is inactive
        if (closeBtn) closeBtn.style.display = 'none'
      }
      
      // Enable tapping on the #explorer button to open navigation on mobile
      const explorerBtn = document.getElementById('explorer')
      if (explorerBtn && window.innerWidth <= 800) {
        explorerBtn.addEventListener('click', function(e) {
          // Prevent default behavior on mobile (which would be to toggle the explorer content)
          if (window.innerWidth <= 800) {
            e.preventDefault()
            openNav()
          }
        })
      }
      
      if (closeBtn) closeBtn.addEventListener('click', closeNav)
      if (backdrop) backdrop.addEventListener('click', closeNav)
      
      // Close nav when a link is clicked
      const navLinks = explorer.querySelectorAll('a')
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Hide the close button immediately to prevent it from showing on next page
          if (closeBtn) closeBtn.style.display = 'none'
          
          // Add slight delay to close the nav after navigation starts
          setTimeout(closeNav, 100)
        })
      })
      
      // Handle page navigation to ensure clean state
      window.addEventListener('pageshow', function() {
        // Reset navigation state when a new page is shown
        if (explorer) explorer.classList.remove('active')
        if (backdrop) backdrop.classList.remove('active')
        if (closeBtn) closeBtn.style.display = 'none'
        document.body.style.overflow = ''
      })
    })
  `
  return Explorer
}) satisfies QuartzComponentConstructor
