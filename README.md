# fde-journey

A personal blog tracking a 6-month journey into a Forward Deployed Engineer role at [MiniMax](https://www.minimaxi.com), focused on the **education** vertical.

> This site is a work in progress. The new framework was built fresh in June 2026; visual design borrows from [Shu Ding](https://shud.in), [Delba de Oliveira](https://delba.dev), and [Lee Robinson](https://leerob.io).

---

## Stack

- **[Astro](https://astro.build) 5** — static-first, content-driven, excellent performance
- **Tailwind CSS 3** — utility classes for layout components
- **MDX** via `@astrojs/mdx` — Markdown with embedded components
- **Shiki** — syntax highlighting (built into Astro, no setup)
- **Inter Variable + JetBrains Mono** — self-hosted via `@fontsource`
- **Content Collections** — type-safe frontmatter for blog posts + projects
- **Vercel** — deploy target

## Local development

```bash
# Install
npm install

# Dev server (hot reload)
npm run dev
# → http://127.0.0.1:4321

# Production build
npm run build
# → dist/ folder

# Preview production build
npm run preview
# → http://127.0.0.1:4321
```

## Project structure

```
src/
├── content/
│   ├── blog/                    # MDX blog posts
│   ├── projects/                # MDX project entries
│   └── config.ts                # Content Collections schema
├── components/
│   ├── Sidebar.astro            # Left nav (italic, current page bolded)
│   ├── RightAside.astro         # Right column (About me + social)
│   ├── MobileHeader.astro       # Hamburger menu on <768px
│   ├── Now.astro                # "Now / Next" section (home page)
│   ├── TimelineItem.astro       # Journey page timeline entry
│   ├── ArticleRow.astro         # Shu Ding-style article list row
│   ├── Tag.astro                # Tag chip
│   └── ThemeToggle.astro        # Dark mode toggle
├── layouts/
│   ├── BaseLayout.astro         # 2-col / 3-col wrapper
│   └── ArticleLayout.astro      # Article body + meta
├── pages/
│   ├── index.astro              # Home (Delba-style 2-col)
│   ├── journey.astro            # 6-month timeline
│   ├── projects.astro           # Project list
│   ├── about.astro              # About
│   └── blog/
│       ├── index.astro          # Shu Ding-style article list
│       └── [...slug].astro      # Lee Robinson-style article body
├── styles/
│   └── global.css               # Design system (CSS variables)
└── consts.ts                    # Site-wide constants (NAV, SOCIAL, SITE)
```

## Design system

All design tokens live in `src/styles/global.css` as CSS variables. Override in
`:root` for light, `.dark` for dark.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--bg-muted` | `#fafafa` | `#111111` |
| `--text` | `#1a1a1a` | `#ededed` |
| `--text-muted` | `#6b6b6b` | `#a0a0a0` |
| `--border` | `#e5e5e5` | `#262626` |
| `--accent` | `#text` (same) | `--text` (same) |
| `--content-w` | 720px | 720px |
| `--gap` | 96px | 96px |

Layout breakpoints:

- `>= 1024px` — 3-col (sidebar + main + aside)
- `768–1023px` — 2-col (sidebar + main, aside hidden)
- `< 768px` — single col, mobile header with hamburger

## Adding content

### A new blog post

Create `src/content/blog/your-slug.mdx`:

```mdx
---
title: 'Your title here'
description: 'One-line description.'
pubDate: 2026-06-06
tags: ['fde', 'education']
---

Your content in **Markdown**. Use `client:load` for any React/Astro components
inside MDX if you need interactivity.
```

### A new project

Create `src/content/projects/your-project.md`:

```mdx
---
title: 'Project name'
summary: 'One-line value proposition.'
status: 'in-progress'  # planning | in-progress | shipped | archived
category: 'Education'
stack: ['FastAPI', 'LangGraph', 'MiniMax M2.5']
links:
  post: '/blog/related-post/'
  repo: 'https://github.com/...'
order: 1
---

Description goes here.
```

## Deployment to Vercel

1. Push this branch to GitHub:
   ```bash
   git push origin fde-journey
   ```
2. In Vercel dashboard, "Import Project" → select the `blog_ponder` repo
3. Vercel auto-detects Astro. Build command: `astro build` (default). Output: `dist/`
4. Vercel will create a Preview deployment for every push to this branch
5. To deploy to production: merge `fde-journey` to `main`

Vercel will give you a URL like `fde-journey-git-fde-journey-<user>.vercel.app`.

## What's intentionally not here

- **Comments, search, newsletter** — not needed at this scale
- **3D / Three.js** — the design explicitly avoided visual flash
- **Server-side rendering** — pure static; deploy anywhere
- **Analytics** — add Vercel Analytics or Plausible when needed
- **Auth** — no private content for now

## License

MIT for code; content (blog posts, project descriptions) is © the author.
