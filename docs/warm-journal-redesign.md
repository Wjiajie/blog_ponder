# Warm Technical Journal 整站改造 Spec

> Status: implemented in `src/` on 2026-06-26.

## Direction

`blog_ponder` 不再只做文章详情页的 warm reading skin，而是采用整站轻度温暖化：页面像温暖纸面上的技术成长日志，但仍保持 shud/rurikon 的文字优先和轻列表系统。

核心边界：

- 保留普通链接、文章列表、项目列表的 rurikon 克制感。
- aged-brass 只做结构强调，不做品牌大面积金色。
- 首页、列表页、项目页、热点日历、about、文章详情、项目详情共享同一套页面头部节奏。
- 不加 hero 图、3D、装饰动效，不把首页改成 landing page。

## Tokens

Light theme:

- `--bg: #fbfaf7`
- `--bg-muted: #f5f2ec`
- `--border: #ded8ce`
- `--text: #3b4149`
- `--text-muted: #697381`
- `--text-subtle: #aeb5be`

Signal tokens:

- `--signal: #9f6a08`
- `--signal-muted: #c9a45d`
- `--signal-pale: #efe3ca`

Signal 只用于页面短线、二级标题短线、blockquote 左线、热点日历有内容标记、TOC active。普通正文链接不使用 signal。

## Typography

- UI、导航、列表、标题继续使用 Inter。
- 长文正文面使用 `Noto Serif SC`, `Songti SC`, Georgia, serif。
- 代码继续使用 JetBrains Mono。
- `.article-body`, `.project-body`, `.about` 使用 prose 字体；其中标题、表格、代码仍回到 sans/mono。

## Page Rhythm

所有主要页面采用一致的 `page-header` / `page-title` 语言：

- 标题仍小而稳，不恢复 48px hero。
- lede 使用 muted。
- 标题或页面头部下方放一条 40px 的细 signal-muted 结构线。

文章详情使用稍强的 header rule；普通列表页更轻。

## Components

- `Search`、`TableOfContents`、`MobileHeader`、`ThemeToggle` 使用 warm surface 和 `--border`。
- focus 保持 1px dotted，不引入厚重 outline。
- TOC active 使用 `--signal`，但链接文本仍是 `--text`。
- 浮层阴影使用当前文字色的低透明混合，light/dark 同步。

## Prose

- `blockquote` 使用 pale signal 背景、signal 左线、不斜体。
- inline code 使用 warm muted 背景。
- `.article-body` 和 `.project-body` 的 `pre` 使用略深代码块，强化技术对象感；首页和列表不引入深色代码块。
- 二级标题前使用短 signal-muted 结构线，帮助长文扫描。

## Lists

文章和项目列表保持 text row + dot leader，不做卡片。

Hover 节奏：

- 标题 underline 加深。
- leader 从 `--border` 过渡到 `--text-muted`。
- 日期/meta 从 `--text-subtle` 过渡到 `--text-muted`。

## Feeds

热点日历去掉亮蓝 `#3b82f6`，改为 `--signal`。这让热点页融入整站，而不是像另一个产品。

## Verification Checklist

- `npm run build`
- light/dark 检查：`/`, `/blog/`, `/projects/`, `/feeds/`, `/about/`, blog detail, feed detail, project detail
- mobile 390x844 检查：首页、文章详情、feeds 日历
- 交互检查：tag filter、project category filter、feeds month selector、search popover、TOC active、theme toggle
