# Matt Krins Portfolio

Welcome to the code behind `mattkrins.com`.

This project is my personal portfolio site: a place to show the things I've built, the systems I've worked on, and the way I think about code, infrastructure, and teaching.

It is designed to be fast, simple, and content-driven. Projects are written as local markdown files, images live in `static/`, and the site is statically generated for deployment to GitHub Pages.

## What This Repo Contains

- A landing page that introduces who I am and what I do
- A portfolio index with skill-based filtering
- Individual project pages generated from markdown content
- Static assets for project galleries, previews, and branding

## Stack

- SvelteKit
- Svelte 5
- TypeScript
- Vite
- Static adapter for GitHub Pages
- `js-yaml` for frontmatter parsing
- `marked` for markdown rendering

## Project Structure

```text
src/
  content/
    projects/      Project writeups in markdown
    skills.ts      Shared skill/tag definitions
  lib/
    components/    Reusable UI components
    data/          Content loading and parsing
    types.ts       Shared TypeScript types
  routes/          Site pages and route handlers

static/
  img/             Portfolio images and galleries
  ...              Favicons, manifest, OG assets
```
