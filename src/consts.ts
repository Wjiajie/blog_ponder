// Site-wide constants — the single config file for identity and chrome.
// All content lives in src/content/ (journey/, blog/, projects/, pages/).
// All static UI copy lives in src/data/copy.json.

export const SITE = {
  title: "jiajie个人博客",
  vertical: "教育", // primary domain (shown in hero, about, journey)
  targetCompany: "MiniMax", // goal employer (shown in hero)
  // Personal identity — change these once, propagates everywhere.
  author: "jiajie", // your name (shown in hero, about, posts byline)
  shortBio: "图形学工程师，转型 AI 前向部署工程师中",
  // Public meta
  description: "一名图形学工程师转型 AI 前向部署工程师（FDE）的成长日志。",
  url: "https://fde-journey.vercel.app",
  locale: "zh-CN",
} as const;

// Primary navigation (also rendered inside MobileHeader)
export const NAV = [
  { href: "/", label: "首页" },
  { href: "/journey/", label: "路径" },
  { href: "/projects/", label: "项目" },
  { href: "/blog/", label: "随想" },
  { href: "/about/", label: "关于" },
] as const;

// Social links — shown in /about page
export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Wjiajie" },
  { label: "X", href: "https://x.com/jiajiewu233" },
  {
    label: "Jike",
    href: "https://web.okjike.com/u/2febc920-3ed4-4ac1-abbe-7ef68cf533e0",
  },
  {
    label: "xiaohongshu",
    href: "https://www.xiaohongshu.com/user/profile/62ab5e8d000000001b02a158",
  },
  { label: "Email", href: "jiajiewu233@gmail.com" },
] as const;

// Status visual metadata — one source of truth for both project cards
// (projects collection) and the journey timeline. Adding a new status
// value here also requires updating the matching schema enum in
// src/content/config.ts, but the type system will flag that drift.
export const STATUS_META = {
  // journey collection enum: 'done' | 'in-progress' | 'upcoming'
  journey: {
    done: { symbol: "✓", label: "已完成" },
    "in-progress": { symbol: "◐", label: "进行中" },
    upcoming: { symbol: "○", label: "待开始" },
  },
  // projects collection enum: 'planning' | 'in-progress' | 'shipped' | 'archived'
  project: {
    planning: { symbol: "○", label: "规划中" },
    "in-progress": { symbol: "◐", label: "进行中" },
    shipped: { symbol: "✓", label: "已上线" },
    archived: { symbol: "·", label: "已归档" },
  },
} as const;

// Per-page meta. Each entry feeds <title> and <meta description> via BaseLayout.
// Add a new key when adding a new top-level page; the type system will keep
// the consumer in sync.
export const PAGE_META = {
  journey: {
    title: "路径",
    description: "向 FDE 角色进发的 6 个月转型路线。",
  },
  projects: {
    title: "项目",
    description: "围绕教育场景的 AI 项目集。",
  },
  thoughts: {
    title: "随想",
    description: "文章、笔记与日志。",
  },
  about: {
    title: "关于",
    description: "关于作者",
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
  locale: "zh-CN",
  dateLong: {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as Intl.DateTimeFormatOptions,
  dateShort: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions,
  readingWpm: 300, // 中文按字符计
} as const;
