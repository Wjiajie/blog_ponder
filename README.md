# fde-journey

A personal blog tracking a 6-month journey into a Forward Deployed Engineer role at
[MiniMax](https://www.minimaxi.com), focused on the **education** vertical.

> The visual design borrows from [Shu Ding](https://shud.in) (article list),
> [Delba de Oliveira](https://delba.dev) (home two-column), and
> [Lee Robinson](https://leerob.io) (article body).

---

## Mental model (read this first)

The whole repo follows one rule, and almost every design choice flows from it:

> **Code files = logic. Content files = content.**
> `.astro` / `.ts` files are for *behavior*. `.md` / `.mdx` / `.json` / `.yaml` files
> are for *what the site actually says*.

If you're about to type English prose into a `.astro` file, stop. It belongs in
`src/data/copy.json` or in a content collection file. If you're about to write a URL
into a `.astro` file, stop. It belongs in `ROUTES` inside `src/consts.ts`.

The split is enforced by convention, not lint, so read this README before
editing.

---

## Quick start

```bash
npm install
npm run dev       # http://127.0.0.1:4321
npm run build     # static output → dist/
npm run preview   # serve the build
npm run check     # astro check (type + content schema)
```

## Where to change what (cheat sheet)

| Want to change… | Edit this file |
|---|---|
| Site title, author name, bio, vertical, target company, public URL, locale | `src/consts.ts` → `SITE` |
| Top nav (Home / Journey / Projects / Thoughts / About) | `src/consts.ts` → `NAV` |
| Social link list (shown on /about) | `src/consts.ts` → `SOCIAL` |
| Status symbols (✓ ◐ ○) for journey + projects | `src/consts.ts` → `STATUS_META` |
| Per-page `<title>` and `<meta description>` | `src/consts.ts` → `PAGE_META` |
| URL paths (`/blog/`, `/blog/?tag=`, etc.) — and `category=` query string | `src/consts.ts` → `ROUTES` |
| Date format, reading-time WPM | `src/consts.ts` → `FORMATTING` |
| Hero greeting/sub copy, Now block, Journey preview, Article aside, Projects filter hint, Journey page title/intro | `src/data/copy.json` |
| Color/spacing/typography tokens | `src/styles/global.css` → `:root` / `.dark` |
| Font stacks (Inter, JetBrains Mono) | `tailwind.config.mjs` → `theme.extend.fontFamily` |
| Markdown plugins, sitemap, shiki theme | `astro.config.mjs` |
| The About page body (long prose) | `src/content/pages/about.mdx` |
| A blog post | `src/content/blog/<date>-<slug>.md` |
| A project card on /projects | `src/content/projects/<slug>.md` |
| A month in the journey timeline | `src/content/journey/m<n>-<slug>.md` |
| Content collection schemas (new fields, new collections) | `src/content/config.ts` |

---

## Project structure

```
src/
├── consts.ts                     # ★ single source of truth: SITE, NAV, SOCIAL,
│                                 #   STATUS_META, PAGE_META, ROUTES, FORMATTING
├── data/
│   └── copy.json                 # ★ static UI copy strings (hero, now, aside, etc.)
├── content/
│   ├── config.ts                 # content-collection schemas (zod)
│   ├── blog/                     # blog posts (MD/MDX)
│   ├── projects/                 # project cards (MD)
│   ├── journey/                  # monthly journey entries (MD)
│   └── pages/                    # long-form top-level pages (MDX, e.g. about)
├── components/                   # presentational, no business logic
├── layouts/
│   ├── BaseLayout.astro          # 2-col / 3-col shell + chrome
│   └── ArticleLayout.astro       # blog-post wrapper
├── pages/                        # routes
│   ├── index.astro               # home
│   ├── journey.astro             # /journey
│   ├── projects.astro            # /projects (+ client-side category filter)
│   ├── about.astro               # /about (renders src/content/pages/about.mdx)
│   ├── rss.xml.ts                # /rss.xml (uses @astrojs/rss + consts)
│   └── blog/
│       ├── index.astro           # /blog (Shu-Ding-style list)
│       └── [...slug].astro       # /blog/<slug>
├── styles/global.css             # design tokens + base/component CSS
└── tailwind.config.mjs           # tailwind theme (font stacks live here)
```

Anything under `blog/` at the repo root is **Docusaurus-era leftovers** and is
gitignored — do not edit.

---

## Content collections

Every content file is just a Markdown/MDX document with typed frontmatter
(validated by `src/content/config.ts`). Filenames are slugs, except for
`blog/` which is `YYYY-MM-DD-<slug>.md` so the listing can sort by date.

### Blog post → `src/content/blog/YYYY-MM-DD-slug.md`

```md
---
title: "Post title"
description: "Optional. One-line summary for SEO and article list preview."
pubDate: 2026-06-07
tags: ["FDE", "agent"]     # free-form; appear in tag cloud + article header
draft: false                # true = hidden from /blog and from RSS
---

Body in **Markdown**. Shiki handles code blocks automatically.
```

Rules:
- `pubDate` is required and must be a real date.
- `draft: true` keeps a post out of both `/blog` listing and `/rss.xml`.
- The article URL becomes `/blog/YYYY-MM-DD-slug/`.

### Project card → `src/content/projects/slug.md`

```md
---
title: "AI Tutor MVP for High-School Physics"
summary: "One-line value proposition."
status: "in-progress"        # planning | in-progress | shipped | archived
category: "Education"        # free-form; filter buttons auto-derive from this
stack: ["Python", "FastAPI", "PostgreSQL"]
links:
  post: "/blog/related-post/"
  repo: "https://github.com/..."
  demo: "https://..."
order: 1                     # lower = earlier; controls list order
---

Description body in Markdown (optional).
```

Rules:
- `status` is constrained to the four enum values; the symbol (✓ ◐ ○ ·) and label
  come from `STATUS_META.project` in `src/consts.ts`. To add a new status, add it
  to **both** the schema enum and `STATUS_META.project`.
- `category` is a free string. New categories show up automatically as filter
  buttons in the right aside.
- `order` controls display order. Leave gaps (10, 20, 30…) to make reordering easier.

### Journey month → `src/content/journey/m<n>-slug.md`

```md
---
month: "M1"                  # displayed in the timeline
title: "Foundation — LLM + AI Coding"
status: "done"               # done | in-progress | upcoming
description: "One-line summary shown in the timeline card."
outputs:                      # bullet list under the description
  - "Output 1"
  - "Output 2"
links:                        # optional, shown as tag chips
  - { label: "blog post", href: "/blog/foo/" }
order: 1                      # ascending; lower = earlier
---

Optional Markdown body (currently hidden on the timeline but available for future use).
```

Rules:
- `month` is the human-readable key (M1, M2 …). Set the `order` to match.
- The home page's "Now" / "Next" block is derived automatically:
  - **Now** = the first entry with `status: in-progress`
  - **Next** = the first entry with `status: upcoming`
- The "2 of 6 phases done" counter is derived from `status: done` count.

### Top-level page (MDX) → `src/content/pages/<slug>.mdx`

For long-form pages that need prose + JSX interpolation. Currently only
`about.mdx` lives here.

```mdx
---
title: "About"
description: "About the author"
---

import { SITE, SOCIAL } from '../../consts';

I'm **{SITE.author}**, a software engineer with a background in graphics
and visual effects rendering. …

## Why FDE

…

<ul>
{SOCIAL.map((s) => (
  <li><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
))}
</ul>
```

MDX can `import` from `src/consts.ts` (or any other module) so the page picks
up live config without re-declaring it.

---

## Static UI copy → `src/data/copy.json`

Every English string that's the same on every render (not article prose, not
project description) lives here. Keys are grouped by page. Templates use
`{placeholder}` syntax; consumers do `.replace()` or `.split('{name}')` on them.

| Key | Used on | Template |
|---|---|---|
| `home.heroGreetingTemplate` | `/` | `Hi, I'm {name}.` |
| `home.heroSubTemplate` | `/` | `{shortBio} Targeting {vertical}, joining {company}'s FDE team.` |
| `home.journeyPreviewTitle` | `/` | `Journey` |
| `home.journeyPreviewBodyTemplate` | `/` | `A 6-month ramp from … {doneCount} of {totalCount} phases done, one in progress.` |
| `home.journeyPreviewCta` | `/` | `→ View full journey timeline` |
| `now.latestTitle` | `/` | `Latest` |
| `now.viewAllCta` | `/` | `View all thoughts →` |
| `now.inProgressTemplate` | `/` | `in progress · {description}` |
| `now.restingText` | `/` | `resting before the next phase` |
| `now.shipTemplate` | `/` | `ship {output} by end of {month}.` |
| `article.asideTitle` | `/blog/<slug>/` | `In this post` |
| `article.asideBody` | `/blog/<slug>/` | `A log entry on the journey. …` |
| `projects.filterHintTemplate` | `/projects` (client) | `· filtered by {category}` |
| `projects.filterAllLabel` | `/projects` | `All` |
| `journey.title` | `/journey` | `FDE 转型路径` |
| `journey.introTemplate` | `/journey` | `6 months. … {doneCount} of {totalCount} phases done.` |

If you need a new string, add it here, not in a `.astro` file.

---

## Adding a new top-level page

Say you want a `/now` page or a `/reading` page.

**Step 1.** Decide if it's content-driven or code-driven.

- **Content-driven** (most common — long prose): create
  `src/content/pages/<slug>.mdx` with frontmatter `title` and `description`.
- **Code-driven** (computed content, custom layout): skip MDX, just write
  `src/pages/<slug>.astro`.

**Step 2.** If content-driven, create the thin wrapper at
`src/pages/<slug>.astro`:

```astro
---
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import { PAGE_META } from '../consts';

const entry = await getEntry('pages', '<slug>');
if (!entry) throw new Error('Missing content entry: pages/<slug>');
const { Content } = await entry.render();
---
<BaseLayout
  title={entry.data.title}
  description={entry.data.description}
  showRightAside={true}
>
  <Content />
</BaseLayout>
```

**Step 3.** Wire it up in three places (`src/consts.ts`):

```ts
// 1. add to NAV (left sidebar + mobile menu)
export const NAV = [
  { href: '/', label: 'home' },
  // …
  { href: '/<slug>/', label: '<slug>' },       // ← add this
] as const;

// 2. add to PAGE_META (drives <title> + meta description)
export const PAGE_META = {
  // …
  <slug>: {
    title: '<Display Title>',
    description: 'One-line description.',
  },
} as const;

// 3. add a route helper to ROUTES (used by every link that points at it)
export const ROUTES = {
  // …
  <slug>: '/<slug>/',
} as const;
```

**Step 4.** Anywhere in the codebase that links to the new page, use
`ROUTES.<slug>`. Grep the repo for `/<slug>/` and replace.

**Step 5.** Run `npm run check` to confirm the schema still validates and
`npm run build` to confirm the page is generated.

---

## Adding a new content-collection field

If you want, say, a `cover` image on blog posts:

**Step 1.** Add to the schema in `src/content/config.ts`:

```ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // …
    cover: z.string().optional(),   // ← new
  }),
});
```

**Step 2.** Use it in the consumer (e.g. `src/pages/blog/[...slug].astro` or
`src/layouts/ArticleLayout.astro`).

**Step 3.** Add a `cover:` line to existing frontmatter where it makes sense.
`astro check` will flag any existing entry that needs updating.

---

## Adding a new status enum value

`STATUS_META` in `src/consts.ts` and the zod `z.enum([...])` in
`src/content/config.ts` must stay in sync. The TypeScript compiler will
catch drift for `STATUS_META` (it's imported), but the runtime enums on
journey + projects schemas are independent. If you add a value, update
**both**:

```ts
// src/consts.ts
export const STATUS_META = {
  journey: {
    done:        { symbol: '✓', label: 'done' },
    'in-progress': { symbol: '◐', label: 'in progress' },
    upcoming:    { symbol: '○', label: 'upcoming' },
    blocked:     { symbol: '✕', label: 'blocked' },     // ← new
  },
  // …
} as const;
```

```ts
// src/content/config.ts
const journey = defineCollection({
  type: 'content',
  schema: z.object({
    // …
    status: z.enum(['done', 'in-progress', 'upcoming', 'blocked'])
      .default('upcoming'),                              // ← new
  }),
});
```

---

## Design system

All design tokens live in `src/styles/global.css` as CSS variables. Override
in `:root` for light, `.dark` for dark. The hero/preview components read these
directly via `var(--…)`.

| Token | Purpose |
|---|---|
| `--bg`, `--bg-muted` | Page + surface backgrounds |
| `--text`, `--text-muted`, `--text-subtle` | Text contrast levels |
| `--border` | Default 1px border |
| `--code-bg` | `<pre>` / `<code>` background |
| `--space-1` … `--space-24` | 8px-grid spacing |
| `--max-w`, `--sidebar-w`, `--content-w`, `--aside-w`, `--gap` | Layout widths |
| `--fs-xs` … `--fs-4xl` | Type scale (13 / 14 / 16 / 18 / 20 / 24 / 32 / 40 px) |
| `--t-fast`, `--t-base`, `--t-slow` | Motion timings |

**Layout breakpoints** (set in `global.css`):

- `≥ 1024px` — 3-column (sidebar + main + right aside)
- `768–1023px` — 2-column (sidebar + main, aside hidden)
- `< 768px` — single column, hamburger in mobile header

**Font stacks** are intentionally kept in `tailwind.config.mjs` and consumed
via `@apply font-sans` / `@apply font-mono` in `global.css`. Do not paste a
font-family string into `global.css` — keep `tailwind.config.mjs` as the
single source.

---

## RSS feed

`/rss.xml` is generated by `src/pages/rss.xml.ts` using `@astrojs/rss`. It
auto-collects non-draft blog posts and uses `SITE.title` / `SITE.description`
/ `ROUTES.blogPost(slug)` so it stays in sync with the rest of the site.
The `<link rel="alternate" type="application/rss+xml">` in `BaseLayout`
points at it.

---

## Deployment to Vercel

1. Push to `origin/fde-journey`:
   ```bash
   git push origin fde-journey
   ```
2. Vercel auto-detects Astro on import. Build command `astro build`, output
   `dist/` — `vercel.json` already pins `outputDirectory: "dist"`.
3. Every push to `fde-journey` triggers a Preview deployment.
4. To ship to production, merge `fde-journey` → `main` (or whatever production
   branch Vercel is configured to track).

---

## What's intentionally not here

- **Comments, search, newsletter** — not needed at this scale.
- **3D / Three.js** — the design explicitly avoided visual flash.
- **Server-side rendering** — pure static; deploy anywhere.
- **Analytics** — add Vercel Analytics or Plausible when needed.
- **Auth** — no private content for now.

---

## House rules when contributing

1. **No static English strings in `.astro` files.** Move them to
   `src/data/copy.json`.
2. **No hardcoded URL paths in `.astro` files.** Add to `ROUTES` and import.
3. **No hardcoded site identity in `.astro` files.** Use `SITE.*` from
   `src/consts.ts`.
4. **MDX pages may `import` from `src/consts.ts`** to interpolate live config.
5. **New collection field** → update schema in `src/content/config.ts`. The
   type system will flag drift.
6. **New status enum value** → update both the schema enum and `STATUS_META`.
7. **Run `npm run check` before committing** — it catches missing frontmatter
   fields and broken TS imports.

## License

MIT for code; content (blog posts, project descriptions) is © the author.
