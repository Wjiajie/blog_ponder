# AGENTS.md — blog_ponder

> **Project type**: Astro 5 + Tailwind + MDX static blog
> **Branch convention**: feature branches off `fde-journey` (NOT `main`)
> **Last updated**: 2026-06-11

---

## Build / dev commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run preview  # preview built site
```

Package manager: **npm** (有 `package-lock.json`)。
Node: 18+ (Astro 5 要求)。

---

## Design language (current state)

**主目标**:"克制 / 文字优先",参考站点:
- shud.in (Shu Ding 的 thought list + projects 排版)
- delba de Oliveira (双栏主页)
- Lee Robinson (正文 + 右侧 sidebar)

**字体**:Inter Variable(sans,400/500/600) + JetBrains Mono(mono) + Lora Italic Variable(斜体说明,需新增 `--font-italic` token)
**调色板**:当前用 `#1a1a1a / #6b6b6b / #a0a0a0` 三档,**改造目标**是 rurikon 8 档(`#3b4149` 正文 / `#697381` muted / `#b3b9c1` subtle),详见 `docs/shud-style-redesign.md` §3。
**容器**:`--content-w: 720px` → 改造目标 42rem(672px);`--sidebar-w: 220px` → 64px(更窄,shud.in 风)。
**字号**:`--fs-4xl: 48px`(H1)→ 改造目标 26px(关键:H1 不再大字号,只靠 weight 区分)。

---

## CSS architecture (do not break)

主样式文件:**`src/styles/global.css`**(515 lines)。

### 关键 class 锚点

| class | 位置 | 角色 |
| --- | --- | --- |
| `.article-row` | global.css:249 | Shu Ding 风格文章列表项(title + leader + date) |
| `.nav-link` | global.css:228 | lowercase italic 左侧导航 |
| `.tag` | global.css:300 | 标签(改造目标:去边框/去背景) |
| `.bullet-list` | global.css:319 | "· 项目名 : 一行描述"列表(Delba 风) |
| `.delba-hero` | global.css:373 | 首页大段 hero 文字(Delba 风,保留) |
| `.about-card` | global.css:402 | 右侧 About me 卡片 |
| `.btn` | global.css:347 | 黑色 CTA 按钮 |

### 已知改造点(已在 docs/shud-style-redesign.md v0 落地)

- `.tag` 边框 + 圆角 → 去掉,只保留 muted color + underline on hover
- `.leader` 用 `border-bottom: 1px dotted` → 改 `radial-gradient` 真正 dot leader + 三色 hover 同步
- H1 = 48px → 26px
- nav 与 main 之间 `border-left` 实心 1px → `mix-blend-multiply` 1px hairline
- nav 链接 → `text-transform: lowercase`

---

## Workflow notes

### Git

- 默认分支:`fde-journey`(FDE 转型博客,**不是** `main`)
- 已有 ~12 个未提交 src/ 改动(Lightbox 删除、5 个 .astro、`global.css` 等)**不要 add 它们除非用户明确要求**——只 add 你负责的目录(本项目: `docs/`)
- commit message: 中文 commit 习惯,`<type>(<scope>): <description>`,scope 用中文(feat/fix/chore/docs/style/refactor)

### Working tree handling

任务只动自己负责的目录。**禁止 `git add .` / `git add -A`**。先 `git status --short <dir>` 确认只动了目标。

### Doc-only 任务(无代码改动)

只产生 markdown / 设计 spec 时,commit 信息用 `docs(...)` 形式,examples:
- `docs(design): shud.in 风格改造 spec`
- `docs(journey): 6 个月 FDE 路径 v2`

### Verification before "done"

任何视觉/样式改动,提交前必须:
1. `npm run build` 跑过
2. (有 dev server 时)`mavis mcp call playwright browser_resize 390x844` + `browser_take_screenshot` 验 4 个页面 light + dark
3. 没 dev server 时,至少 build 过 + CSS 变量 grep 过不漏

### Playwright 后端稳定性

`mavis mcp call playwright browser_navigate` 在本机经常返回 `browserBackend.callTool: Target page, context or browser has been closed`。视觉抓取任务降级方案:
- `webfetch <url>` 拿 HTML + CSS
- `matrix_generate_image` 用真实 token 重绘参考图(在文档里说明"非原站截图")

---

## Files structure

```
src/
  components/         # Now.astro, Sidebar.astro, MobileHeader.astro 等
  layouts/            # ArticleLayout.astro, BaseLayout.astro
  pages/              # index.astro, blog/index.astro, journey.astro, projects.astro, about.astro
  styles/global.css   # ★ 唯一全局样式入口
  data/copy.json      # ★ 站点文案
  content/blog/       # MDX 文章
docs/                 # 设计 spec / 文档
public/               # 静态资源
```

---

## Recent commits (style)

```
7626238 docs(design): shud.in 风格改造 spec
5ca2b2d chore(blog): 清理根目录 blog/ 里 195 个失效的 <ZoomImage> 引用
504c5ac feat(lightbox): 文章图片点击放大（淡入淡出 + 双主题）
4f6f1d6 feat(site): 站点中文化 + 重置 6 个月路径 + 替换 3 个项目
```

---

## Avoid

- **不要在 `global.css` 引入彩色强调**(主目标"克制",所有 link 用 rurikon 色阶)
- **不要在首页加 hero 大图 / 3D 视觉锚点**(用户明确排除)
- **不要给文章详情页加装饰动效**
- **不要把 `--fs-4xl` 设回 48px**(除非用户明确说"恢复 Delba 风")
- **不要 add 全工作树** — `git add docs/` / `git add src/styles/` 等精确路径
