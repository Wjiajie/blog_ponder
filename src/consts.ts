// Site-wide constants — the single config file for identity and chrome.
// All content lives in src/content/ (blog/, projects/, pages/).
// All static UI copy lives in src/data/copy.json.

export const SITE = {
  title: "jiajie个人博客",
  vertical: "教育", // primary domain (shown in hero and about)
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
  { href: "/projects/", label: "项目" },
  { href: "/blog/", label: "随想" },
  { href: "/feeds/", label: "热点" },
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

// Status visual metadata — one source of truth for project cards.
// Adding a new status value here also requires updating the matching schema enum in
// src/content/config.ts, but the type system will flag that drift.
export const STATUS_META = {
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
  feeds: {
    title: "热点",
    description: "按日历查看收集到的热点信息。",
  },
} as const;

// Cross-cutting URL helpers. These exist so route prefixes are not
// scattered across pages, components, and tag-link templates.
export const ROUTES = {
  home: "/",
  projects: "/projects/",
  blog: "/blog/",
  blogTag: (tag: string) => `/blog/?tag=${encodeURIComponent(tag)}`,
  blogPost: (slug: string) => `/blog/${slug}/`,
  feedPost: (slug: string) => `/feeds/${slug}/`,
  project: (slug: string) => `/projects/${slug}/`,
  projectCategory: (category: string) =>
    `/projects/?category=${encodeURIComponent(category)}`,
  about: "/about/",
  feeds: "/feeds/",
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

// =====================================================================
// Page-level copy
// =====================================================================
//
// Per-page UI strings. Lives here (not src/data/copy.json) so editing
// a label is a one-file change with full TypeScript autocomplete — no
// import-from-JSON ceremony, no `as const` casts, no broken-key typing.
//
// Conventions:
//   - Keys are namespaced by the page that owns them (home / now / etc.)
//   - Template strings use {placeholder} substitution. Consumers split
//     on the placeholder and inject JSX (e.g. wrap a name in <em>).
//   - Site identity (vertical / company / author) still flows from
//     SITE.* above — COPY only carries the surrounding text.
export const COPY = {
  home: {
    heroEyebrow: "Portfolio",
    heroGreetingTemplate:
      "我正在为下一份工作做准备，做 {vertical} 行业的 AI 前向部署工程师。",
    heroBody:
      "图形学工程师 → AI FDE 转型中。希望加入 {company} 的 FDE 团队，把 AI 在客户现场端到端交付。",
    heroHiring: "在招人",
    heroCta: "聊聊",
    workTitle: "项目",
    workLede:
      "3 个正在并行推进的项目，每一个都从「客户痛点」开始，到「可演示的工件」结束。",
    personalTitle: "随想",
    personalLede: "转型路上写下的笔记和复盘。",
    aboutTitle: "About me",
    aboutBody: "图形学工程师，转型 AI 前向部署工程师中。",
    aboutLinksLabel: "在以下平台能找到我：",
  },
  now: {
    inProgressTemplate: "进行中 · {description}",
    restingText: "在两个阶段之间调整节奏",
    shipTemplate: "目标在 {month} 之前交付 {output}。",
    viewAllCta: "查看全部随想 →",
  },
  projects: {
    filterHintTemplate: "· 按 {category} 筛选",
    filterAllLabel: "全部",
  },
  article: {
    asideTitle: "本文目录",
  },
} as const;
