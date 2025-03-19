# My Digital Garden / Knowledge Base

This repository hosts my Obsidian notes as a website using [Quartz](https://quartz.jzhao.xyz/).

Deployed URL: https://yourdomain.com

## About This Site

This is a collection of my notes, thoughts, and knowledge organized as a digital garden. The content is written in Markdown using [Obsidian](https://obsidian.md/) and rendered as a website using Quartz.

## Local Development

To run the site locally:

1. Navigate to the source directory:
   ```
   cd source
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx quartz build --serve
   ```

4. Open your browser to http://localhost:8080

## Adding Content

Add new notes to the `source/content` directory using Obsidian or any text editor. The site will automatically update when changes are pushed to the main branch.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch using GitHub Actions.

## Raw HTML pages

There is a [source/raw_html](./source/raw_html) folder that gets copied into the build folder in CI. This lets you host arbitrary HTML outside of quartz. Example: https://defenderofbasic.github.io/obsidian-quartz-template/raw-html-test.html

I made the "raw HTML" option for people who are generating HTML UI's with Claude/ChatGPT but want to tweak them/host them themselves. Or make a personal archive of web pages, etc.

## Further customization

> Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing quartz.config.ts or changing the layout in quartz.layout.ts.

https://quartz.jzhao.xyz/configuration
