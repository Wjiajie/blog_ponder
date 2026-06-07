// Site-wide constants — the single config file for identity and chrome.
// All content lives in src/content/ (journey/, blog/, projects/, pages/).
// All static UI copy lives in src/data/copy.json.

export const SITE = {
  title: "FDE Journey",
  vertical: "education", // primary domain (shown in hero, about, journey)
  targetCompany: "MiniMax", // goal employer (shown in hero)
  // Personal identity — change these once, propagates everywhere.
  author: "Jiajie", // your name (shown in hero, about, posts byline)
  shortBio: "Graphics engineer turning into an AI FDE.",
  // Public meta
  description: "A log of becoming a Forward Deployed Engineer.",
  url: "https://fde-journey.vercel.app",
  locale: "en",
} as const;

// Primary navigation (also rendered inside MobileHeader)
export const NAV = [
  { href: "/", label: "home" },
  { href: "/journey/", label: "journey" },
  { href: "/projects/", label: "projects" },
  { href: "/blog/", label: "thoughts" },
  { href: "/about/", label: "about" },
] as const;

// Social links — shown in /about page
export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Wjiajie" },
  { label: "X", href: "https://x.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hi@example.com" },
] as const;

// Status visual metadata — one source of truth for both project cards
// (projects collection) and the journey timeline. Adding a new status
// value here also requires updating the matching schema enum in
// src/content/config.ts, but the type system will flag that drift.
export const STATUS_META = {
  // journey collection enum: 'done' | 'in-progress' | 'upcoming'
  journey: {
    done: { symbol: "✓", label: "done" },
    "in-progress": { symbol: "◐", label: "in progress" },
    upcoming: { symbol: "○", label: "upcoming" },
  },
  // projects collection enum: 'planning' | 'in-progress' | 'shipped' | 'archived'
  project: {
    planning: { symbol: "○", label: "planning" },
    "in-progress": { symbol: "◐", label: "in progress" },
    shipped: { symbol: "✓", label: "shipped" },
    archived: { symbol: "·", label: "archived" },
  },
} as const;

// Per-page meta. Each entry feeds <title> and <meta description> via BaseLayout.
// Add a new key when adding a new top-level page; the type system will keep
// the consumer in sync.
export const PAGE_META = {
  journey: {
    title: "Journey",
    description: "6-month ramp into a Forward Deployed Engineer role.",
  },
  projects: {
    title: "Projects",
    description: "Education-focused AI projects on the FDE track.",
  },
  thoughts: {
    title: "Thoughts",
    description: "Articles, notes, and logs.",
  },
  about: {
    title: "About",
    description: "About the author",
  },
} as const;

// Cross-cutting URL helpers. These exist so route prefixes are not
// scattered across pages, components, and tag-link templates.
export const ROUTES = {
  home: "/",
  journey: "/journey/",
  projects: "/projects/",
  blog: "/blog/",
  blogTag: (tag: string) => `/blog/?tag=${encodeURIComponent(tag)}`,
  blogPost: (slug: string) => `/blog/${slug}/`,
  project: (slug: string) => `/projects/${slug}/`,
  projectCategory: (category: string) =>
    `/projects/?category=${encodeURIComponent(category)}`,
  about: "/about/",
} as const;

// Cross-cutting formatters. Locale + wpm live here so every page renders
// dates and reading-time identically.
export const FORMATTING = {
  locale: "en-US",
  dateLong: {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions,
  dateShort: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions,
  readingWpm: 200,
} as const;
