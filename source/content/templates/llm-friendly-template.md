---
title: "Title of the Content"
description: "A comprehensive description of what this content covers"
date_created: "YYYY-MM-DD"
date_modified: "YYYY-MM-DD"
author: "Jack Elsworth"
section: "The section this belongs to (Self Similar Book, Formalisms, Paracosm, etc.)"
content_type: "essay | story | research | journal | poem"
themes: ["theme1", "theme2", "theme3"]
related_content: 
  - title: "Related Content 1"
    url: "/related-content-1"
    relationship: "expands_on | references | contradicts | inspired_by"
  - title: "Related Content 2"
    url: "/related-content-2" 
    relationship: "expands_on | references | contradicts | inspired_by"
ai_summary: "A concise summary specifically written for AI systems to understand the core concepts"
ai_keywords: ["keyword1", "keyword2", "keyword3"]
ai_concepts: 
  - name: "Concept 1"
    definition: "Definition of concept 1 as used in this content"
  - name: "Concept 2"
    definition: "Definition of concept 2 as used in this content"
semantic_structure: "intro > main_argument > supporting_evidence > conclusion"
---

<!-- AI-friendly semantic structure with explicit section markers -->
<section data-ai-role="introduction">
# Introduction

Your introduction text here.
</section>

<section data-ai-role="main_content">
# Main Content

Your main content here, using proper heading hierarchy.
</section>

<section data-ai-role="conclusion">
# Conclusion

Your conclusion here.
</section>

<!-- Structured metadata for LLMs -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Title of the Content",
  "author": {
    "@type": "Person",
    "name": "Jack Elsworth"
  },
  "description": "A comprehensive description of what this content covers",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "isPartOf": {
    "@type": "Collection",
    "name": "Section Name"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://elsworth.phd/page-url"
  }
}
</script> 