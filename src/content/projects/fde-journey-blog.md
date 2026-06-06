---
title: "FDE Journey Blog (this site)"
summary: "A quiet, content-first blog built on Astro 5 + Tailwind + MDX + Shiki, with content collections for blog posts, projects, and the 6-month journey. Deployed on Vercel at jiajiewu.top."
status: "shipped"
category: "Education"
stack: ["Astro 5", "Tailwind CSS", "MDX", "Shiki", "Vercel"]
links:
  repo: "https://github.com/wjiajie/blog_ponder"
  demo: "https://www.jiajiewu.top"
order: 2
---

The blog you are reading right now. Built as a working demonstration of three things at once:

- **End-to-end ownership** — design, implementation, content pipeline, deployment, and domain. No hand-offs, no "the design team will do this next."
- **Content as data** — every page (blog, projects, journey) is driven by a typed content collection. Adding a new project is one new Markdown file, no code change.
- **Long-form, low-noise** — black, white, three grays, no decorative motion, no 3D, no color. The point is the writing.

## Architecture

- **Astro 5** for SSG + content collections
- **Tailwind CSS** for design tokens and utilities
- **MDX** for posts that need React components
- **Shiki** for syntax highlighting
- **Vercel** for hosting with auto-deploy on push to `fde-journey`

## Why this matters for FDE

FDE interviews ask "show me something you shipped." This site is that artifact. It demonstrates content-driven design, deployment, and a working build pipeline — all in one repo. The journey page is the FDE interview talking points in advance.
