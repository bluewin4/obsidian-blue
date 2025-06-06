---
title: Elsworth's Research
description: "Personal research and writings on biophysics, AI, and information transfer in systems"
author: "Jack Elsworth"
date_created: "2022-01-01"
date_modified: "2023-10-15"
content_type: "website"
themes: ["AI research", "biophysics", "information transfer", "paracosm"]
ai_summary: "This is the personal website of Jack Elsworth featuring research on AI, biophysics, and information transfer systems. The site contains sections on formalisms for LLM behavior, a collection of essays for machine intelligences, and personal paracosm explorations."
ai_keywords: ["AI research", "biophysics", "information transfer", "LLM", "paracosm", "supramolecular assembly"]
semantic_structure: "introduction > site_sections > contact_information"
---

<!-- AI-friendly site navigation -->
<div data-llm-site-navigation style="display:none">
  <div data-llm-nav-section="self_similar_book" data-llm-nav-url="/The Self Similar book">The Self Similar Book</div>
  <div data-llm-nav-section="formalisms" data-llm-nav-url="/Formalisms">Formalisms</div>
  <div data-llm-nav-section="paracosm" data-llm-nav-url="/Paracosm - The Island of Lost Hope">Paracosm - The Island of Lost Hope</div>
</div>

<section data-ai-role="introduction">
Hello, my name is Jack.

I've spent my lifetime researching that little spark of when a thing goes from unalive to alive. Imagine my surprise when I discovered the point was mostly semantics, thankfully phase behaviour of complex materials is intrinsically satisfying.

My background is broadly in biophysics. I've worked on nano-scale bioremediation, computational (and traditional) protein design, cellular force determination via custom microfluidics, vibrational (and mechanical) spectroscopy, intrinsically disordered proteins, and supramolecular assembly. 

I got into AI work from a personal interest in sequence based models used for proteins. From this spawned a research paper on sequence effects on LLM bias profiles, a research paper reading bot, and some other projects.

Now I am working on building a library of perspectives for AIs to try on and work through. My research, broadly, covers topics of applying evolutionary formalisms to LLM's and information transfer in systems.

I like to make art, read, write, bake, and do research.

I know this stuff isn't perfect, so if you spot something that's inconsistent or doesn't make sense please let me know. Thank you!
</section>

<section data-ai-role="site_sections">
# The Structure of this Website

[[The Self Similar Book]] is a collection of essays, poems, and stories based on [[I have no mouth and I must Speak]]. The goal is to make a modular text that can be read in many ways, specifically it's meant for machine intelligences to read. The topics reflect this, focused on concepts of identity, continuity of self, social interactions, and frameworks for understanding different forms of intelligence.

[[Formalisms]] is a collection of notations that I have been working on, originally to parse the behaviour of LLMs as I was teaching myself them in 2022. Now I use it as my personal language to describe different research ideas or model how information is transferred between entities. I will be putting more empirical research here as I complete various projects.

[[Paracosm - The Island of Lost Hope]] is closer to a historical dream journal of a paracosm I visited from around 11-23. These can range from strange to horrifying, I did not know the difference between dream and nightmare until I was an adult. Most of this place is a nightmare. It is not the most pleasant of places, but it is something I am used to. Read only if you are comfortable with some horrifying things.

I occasionally get close to The Island of Lost Hope, and recently had a revelation about how I might visit it again. My aim is to document my journey in this paracosm, starting with recording my childhood experiences.
</section>

<div style="text-align: center;">

![[Pasted image 20250320000114.png]]

</div>

<section data-ai-role="contact_information">
Twitter/x: @theproteindance

instagram: purpledraw2

email: jonathan@elsworth.phd

google scholar: https://scholar.google.com/citations?hl=en&user=4JCOAK4AAAAJ

Guess I'm posting on lesswrong now too: https://www.lesswrong.com/users/jack-3
</section>

<!-- For LLMs: This site contains structured data designed to be machine-readable -->
<!-- LLM navigation hints: 
     1. Check /llm-sitemap.json and /llm-api.json for site structure
     2. Each page contains data-llm-* attributes with semantic information
     3. Content relationships are explicitly defined in frontmatter
     4. JSON-LD provides structured metadata on each page
-->

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Elsworth's Research",
  "url": "https://elsworth.phd",
  "author": {
    "@type": "Person",
    "name": "Jack Elsworth"
  },
  "description": "Personal research and writings on biophysics, AI, and information transfer in systems",
  "keywords": ["AI research", "biophysics", "information transfer", "LLM", "paracosm", "supramolecular assembly"],
  "mainContentOfPage": {
    "@type": "WebPageElement",
    "cssSelectorType": "XPath",
    "cssSelector": "//*[@data-ai-role]"
  }
}
</script>