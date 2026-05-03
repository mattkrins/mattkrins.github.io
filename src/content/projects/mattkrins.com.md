---
title: Portfolio
summary: A statically generated portfolio website built with SvelteKit to present projects, skills, and technical experience through a fast, content-driven, and maintainable personal web presence.
date: 2026
status: Active
hero: /og-card.jpg
skills: [svelte, typescript, html, css, ai, gui]
links:
  live: https://mattkrins.com
  repo: https://github.com/mattkrins/mattkrins.github.io
---

## Overview

This website is my current portfolio and personal web presence (What you're looking at now).

It was built to provide a clearer, more maintainable way to present projects, technical strengths, and professional identity without relying on a third-party portfolio platform or a heavy CMS.

Rather than treating the site as a one-page profile, the project is structured as a small content-driven application: project entries are stored as markdown, rendered into dedicated pages, and presented through a deliberately minimal interface focused on readability and navigation.

## Key Features

### Personal Landing Page
- Introduces role focus across programming, systems administration, and education
- Provides direct access to portfolio content and social links
- Uses a lightweight interaction model without unnecessary page complexity

### Portfolio Index
- Displays project summaries as a browsable card grid
- Supports filtering by skill tags
- Keeps navigation simple while still allowing visitors to narrow by capability

### Individual Project Pages
- Generates a dedicated page for each portfolio item
- Supports long-form project descriptions, links, status, dates, and galleries
- Makes it possible to document both technical decisions and practical outcomes

### Content-Driven Workflow
- Project content is stored as local markdown files with frontmatter
- New entries can be added without changing the rendering logic
- Skills are normalised through a shared registry for consistent filtering and labelling

### Static Site Delivery
- Site is prerendered for deployment to GitHub Pages
- Low operational overhead
- Fast page delivery with no application server required

### SEO and Metadata

The project includes:

- canonical URLs
- Open Graph metadata
- JSON-LD person schema
- generated sitemap output

This improves discoverability and makes the portfolio more presentable when shared.

### Prompt-Assisted Content Workflow

Prompt engineering was used as part of the content and structure workflow for refining project descriptions, page messaging, and presentation framing.

Rather than replacing authorship, it was used to speed up iteration, improve clarity, and help shape how technical work is communicated to different audiences.

## Technology Stack

- SvelteKit
- Svelte 5
- TypeScript
- Vite
- Static adapter
- Markdown parsing with `marked`
- Frontmatter parsing with `js-yaml`

## Design Philosophy

- **Content first**: the work itself should be easy to read and easy to update.
- **Static by default**: avoid unnecessary infrastructure when the problem is presentation.
- **Small but intentional**: use a limited number of moving parts, but make them feel considered.
- **Readable over flashy**: visual polish should support clarity, not compete with it.
- **Maintainable long-term**: adding projects should be straightforward months or years later.

## Notable Engineering Decisions

### Local Content Instead of CMS

Using markdown files keeps the portfolio portable, versionable, and easy to edit directly in the repository.

### Shared Skill Registry

Skill metadata is defined in one place so labels, colours, and descriptions remain consistent across the portfolio index and project pages.

### Static Prerendering

Using SvelteKit's static build keeps hosting simple and removes runtime dependency on a server or database.
