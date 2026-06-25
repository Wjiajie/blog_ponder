# Deep Agents 实战博客风格拆解与 blog_ponder 优化建议

> 目标: 拆解 Datawhale Deep Agents 实战博客的核心视觉风格, 并给 `blog_ponder` 一份可落地但不破坏现有 shud/rurikon 方向的优化路线。
>
> 参考页: <https://datawhalechina.github.io/deepagents-in-action/chapters/ch01-agent-harness/>
>
> 截图证据:
> - `docs/screenshots/deepagents-ref-desktop.png`
> - `docs/screenshots/deepagents-ref-mobile.png`

---

## 1. 一句话判断

这个站点不是 shud.in 那种冷静、窄列、列表优先的个人思考站。它更像一本温暖纸面上的技术讲义:

- 视觉气质: 温暖、纸质、课程感、中文阅读友好。
- 记忆点: 米纸背景 + 深蓝黑墨色 + 暗金细节 + 中文书写感正文字体。
- 文章体验: 比列表页更强, 重点在长文阅读、目录导航、引用块、代码块、图表、课件资源。
- UI 密度: 克制但不冷淡, 有足够的章节仪式感。

对 `blog_ponder` 来说, 最值得借的是"文章页阅读皮肤", 不是把整站都改成金色课程站。

---

## 2. 参考站核心设计系统

### 2.1 色彩

从页面 CSS 和计算样式提取出的核心 token:

| 角色 | 颜色 | 用法 |
| --- | --- | --- |
| paper | `#faf8f5` | body 背景, 温暖纸面, 不是纯白 |
| ink | `#1a1a2e` | 主标题 / 主要文字, 深蓝黑 |
| ink-muted | `#4a4a5a` | 导航、目录、辅助文字 |
| gold | `#b8860b` | 品牌标记、H1 下划线、quote 左线、active/focus |
| gold-light | `#d4a853` | hover / logo hover |
| gold-pale | `#f5ead6` | 分割线、quote 背景、inline code 背景 |

设计特征:

- 色彩不多, 但不是黑白灰。暗金色承担"课程品牌感"和"章节重点"。
- `gold` 只在关键结构处出现: logo、H1 下面的短线、quote 左边线、目录 active、资源按钮边框。
- 背景是暖纸色, 让中文长文显得更像讲义, 也让深色代码块有落点。

### 2.2 字体

计算样式显示:

| 用途 | 字体 | 视觉效果 |
| --- | --- | --- |
| 正文 | `LXGW WenKai`, `Noto Serif SC`, `Songti SC`, serif | 中文手写/书卷气, 更温和 |
| 标题 | `Noto Sans SC`, `PingFang SC`, `Microsoft YaHei`, sans-serif | 粗壮、现代、有课程标题感 |
| 代码 / 小标签 | `JetBrains Mono`, `Fira Code`, mono | 技术感和元信息感 |

关键不是"用了某个字体", 而是三层分工清楚:

- 正文很有人味, 行高大。
- 标题非常重, 形成章节锚点。
- 元信息用 mono, 让课程结构变得清晰。

### 2.3 排版比例

实际计算样式:

| 元素 | 桌面样式 |
| --- | --- |
| body | 16px / 24px, warm paper |
| article | `max-width: 768px`, 内容区实际约 720px |
| prose | 18px / 32px |
| H1 | 36px / 45px, weight 900 |
| H2 | 24px / 32px, weight 700, 下边线 |
| H3 | 20px / 28px, weight 700 |
| blockquote | 18px / 32px, pale gold 背景, 4px gold 左线 |
| pre | 深色块, 12px radius, 轻 shadow |

设计结论:

- 正文比 `blog_ponder` 当前更大、更松, 更适合课程/讲义型文章。
- H1 很强, 但不是靠 hero 大图, 是靠字重、短金线、留白。
- H2 下面有细线, 长文扫描时章节边界更明确。

### 2.4 页面结构

桌面端结构:

```text
top header
  logo/title                                 github link

article center column (720px content)
  badge + episode
  H1
  gold short rule
  edit link
  quote intro
  prose sections

right floating/sticky TOC (192px)
```

移动端结构:

```text
top header
sticky "本页目录" bar
article title
prose
```

核心体验:

- 桌面右侧目录一直存在, 不是装饰, 是长文阅读工具。
- 移动端目录变成顶部 sticky bar, 比悬浮圆按钮更"文章内生"。
- 文章开头有明确仪式: 分类 badge、EP 编号、强 H1、金色短线、编辑链接。

### 2.5 组件语言

| 组件 | 风格 |
| --- | --- |
| quote | pale gold 背景 + 4px gold 左线 + 右侧圆角 |
| inline code | pale gold 半透明底, 小圆角 |
| code block | 深蓝黑背景, 12px 圆角, 轻 shadow |
| table | 极简线框, 表头 sans bold, 内容 serif |
| resource links | 小按钮卡片, 仅资源区使用边框和浅色背景 |
| back-to-top | 低调圆形按钮, gold 线框 |

它不是完全无装饰, 而是"装饰有语义": 章节、引用、代码、资源、导航才有视觉待遇。

---

## 3. 和 blog_ponder 当前方向的差异

`blog_ponder` 当前已经很接近 shud.in / Delba / Lee Robinson 的混合方向:

- 全局 token 是冷静的 rurikon 灰蓝: `#fcfcfc / #3b4149 / #697381 / #b3b9c1`。
- 正文字体是 Inter Variable, mono 是 JetBrains Mono。
- H1 已经从大 hero 收到 `26px`, 非文章页很克制。
- 文章页独立 pin 住了 `article-title: 32px / 600`、H2 24px、H3 20px。
- 已有右侧 TOC、移动端 TOC、图片 lightbox、移动表格 card 化。

因此差异不是"有没有高级 UI", 而是:

| 维度 | blog_ponder 当前 | Deep Agents 参考站 |
| --- | --- | --- |
| 背景 | 冷白/冷灰 `#fcfcfc` | 暖纸 `#faf8f5` |
| 字体气质 | Inter, 更国际化/理性 | 中文 serif/wenkai, 更讲义/书写 |
| 文章 H1 | 32px / 600 | 36px / 900 + gold rule |
| 正文 | 15px 基准, 文章较克制 | prose 18px / 32px, 更舒展 |
| 色彩强调 | 几乎无彩色 | 暗金作为结构色 |
| 桌面 TOC | article-reading 默认隐藏, toggle 展开 | 宽屏常驻右侧目录 |
| 移动 TOC | 右下 FAB/popover | 顶部 sticky 目录条 |
| quote | 2px border-left + italic muted | gold 左线 + pale 背景 + not-italic |
| code block | 浅灰背景, 6px radius | 深色块, 12px radius, 更强对比 |

---

## 4. 推荐优化方向

### 4.1 不建议全站切换, 建议做"文章阅读皮肤"

保留当前 shud/rurikon 作为首页、列表页、项目页的主语言。Deep Agents 的暖纸、金色、中文书写感可以只进入文章详情页:

- `body.article-reading` 使用更温暖的 paper 背景。
- `.article-body` 使用更适合中文长文的字体策略。
- 只在 `.article-header`, `.article-body blockquote`, `.article-body code`, `.toc-*` 里引入 article accent。

这样不会破坏 AGENTS.md 中"克制 / 文字优先 / 不在首页加视觉锚点"的约束。

### 4.2 增加文章专用色彩 token

不要把全局 `--accent` 改成金色。建议新增文章作用域 token:

```css
body.article-reading {
  --article-bg: #faf8f5;
  --article-ink: #1a1a2e;
  --article-muted: #4a4a5a;
  --article-accent: #b8860b;
  --article-accent-light: #d4a853;
  --article-accent-pale: #f5ead6;
}
```

落地原则:

- 全局 link 仍走 rurikon。
- 文章页的 quote/code/TOC active 可以用 `--article-accent`。
- 文章页背景可先用 `--article-bg`, 但列表页保持 `--bg`。

### 4.3 中文文章字体分层

当前 Inter 对英文和 UI 很好, 但中文长文的温度不如参考站。可以考虑:

- 标题继续用 sans, 但让中文 fallback 明确到 `Noto Sans SC`。
- 正文只在 `.article-body` 里切到中文 serif 或 wenkai 方向。
- 代码继续 JetBrains Mono。

建议路径:

```css
.article-body {
  font-family:
    "LXGW WenKai",
    "Noto Serif SC",
    "Source Han Serif SC",
    "Songti SC",
    Georgia,
    serif;
  font-size: 17px;
  line-height: 1.9;
}

.article-title,
.article-body h2,
.article-body h3,
.article-body th {
  font-family: var(--font-sans);
}
```

注意: 17px / 1.9 是比 Deep Agents 稍克制的折中。直接上 18px / 2.0 会很有讲义感, 但可能和你现在的个人博客气质冲突。

### 4.4 给文章开头增加"章节仪式感"

参考站文章头部很有记忆点。`blog_ponder` 可以轻量借用:

- 文章标题上方: 小号 mono 标签, 例如 `blog / journey / feed` 或主 tag。
- 日期与阅读时间仍放 meta, 但弱化。
- H1 下方加一条 40-64px 的细 accent rule。
- 不要加 hero 图。

建议样式:

```css
.article-kicker {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--article-muted);
}

.article-header::after {
  content: "";
  display: block;
  width: 48px;
  height: 2px;
  margin-top: var(--space-5);
  background: var(--article-accent);
}
```

### 4.5 强化长文扫描节奏

当前文章 H2/H3 已经有 Lee Robinson 风格, 但参考站更像课程讲义。可局部调整:

- `.article-body h2`: 保持 24px, 增加浅分割线和底部 padding。
- `.article-body h3`: 20px, color 稍 muted, 与 H2 形成层级。
- `blockquote`: 改为不斜体, 使用浅背景 + accent 左线。
- `ul/ol li`: 提高行高和列表间距, marker 用 subtle。

这能让文章从"博客正文"更接近"可学习的技术章节"。

### 4.6 代码块做成明确的技术对象

参考站的深色 code block 很有效, 因为它和暖纸背景形成强对比。建议:

- `pre` 只在文章页改深色, 不动全局 code。
- radius 从 6px 提到 10-12px。
- padding 加大到 `16px 24px`。
- 轻 shadow 可以有, 但不要卡片化正文。

风险:

- 暗色主题下要单独验证, 避免深色 code block 和深色页面混在一起。
- Shiki/KateX 当前可能已有 inline style, 需要用足够窄的选择器覆盖。

### 4.7 桌面 TOC: 宽屏常驻, 中屏再收起

参考站的右侧目录是阅读体验的关键。你现在的 article-reading 会把左右栏默认隐藏, 通过右上 toggle 展开。建议改成:

- >= 1280px: 右侧 TOC 常驻显示。
- 768-1279px: 保持 toggle, 避免挤压正文。
- < 768px: 继续移动 TOC, 但考虑从右下 FAB 改为文章顶部 sticky bar。

这会让长文更像"技术章节", 也比悬浮按钮更稳定。

### 4.8 移动端目录从 FAB 改成 sticky bar

Deep Agents 移动端的顶部 sticky "本页目录"很适合长文章:

- 它和文章流在一起, 不像浮动按钮抢视线。
- 读者知道当前文章有结构。
- 可以显示当前 section, 提升方向感。

适合后续改造 `TableOfContents.astro` 的 mobile variant。

### 4.9 资源区可以学习, 但不要泛化成卡片 UI

参考站底部课件下载 / 相关资源用了按钮卡片, 因为它们是明确资源动作。`blog_ponder` 可以用于:

- 文章末尾"相关资料 / 延伸阅读"。
- 项目文档页里的下载链接。
- FDE journey 的每月练习资源。

不要把普通文章列表、首页模块都卡片化。你的博客当前强项正是文字列表的轻盈感。

---

## 5. 不建议照搬的部分

- 不建议把全站背景都改成 `#faf8f5`: 会冲掉 shud/rurikon 冷静感。
- 不建议把所有链接都改金色: 金色应该是结构色, 不是通用链接色。
- 不建议全局使用 WenKai: 首页、列表页、导航仍适合 Inter / sans。
- 不建议 H1 全站恢复大字号: 只允许文章页或特定长文使用更强标题。
- 不建议加更多卡片、阴影、按钮: 参考站的 card 只出现在资源动作区。
- 不建议复制 logo/金色圆点系统: 这是课程品牌, 不是个人博客身份。

---

## 6. 分阶段落地计划

### Phase 1: 文章阅读皮肤 tokens

文件范围:

- `src/styles/global.css`
- `src/layouts/ArticleLayout.astro`

任务:

- 新增 `body.article-reading` 下的 article token。
- article 页背景改暖纸, 列表页不变。
- quote / inline code / pre / h2 rule 使用 article token。

验收:

- 首页、blog 列表、projects 仍是 rurikon/shud 风格。
- 文章页第一屏有温暖讲义感。
- light / dark 都能阅读。

### Phase 2: 文章字体与正文节奏

文件范围:

- `src/styles/global.css`
- `src/layouts/ArticleLayout.astro`

任务:

- 引入或配置中文 serif/wenkai fallback。
- `.article-body` 调整到 17px / 1.85-1.9。
- 标题保留 sans。

验收:

- 中文长文读起来更柔和。
- 英文、代码、数字不显得松散。
- 移动端不拥挤。

### Phase 3: 目录体验

文件范围:

- `src/components/TableOfContents.astro`
- `src/layouts/ArticleLayout.astro`

任务:

- >=1280px 右侧 TOC 常驻。
- 移动端尝试 sticky top contents bar。
- 当前 section 可在移动 bar 显示。

验收:

- 宽屏文章一眼能看到目录。
- 手机目录不遮挡正文。
- 键盘与屏幕阅读器状态不退化。

### Phase 4: 文章头部仪式感

文件范围:

- `src/layouts/ArticleLayout.astro`
- `src/components/Tag.astro` (如需复用)

任务:

- 增加 kicker: collection / primary tag / date。
- H1 下方加短 accent rule。
- meta 更弱, 不抢标题。

验收:

- 不需要 hero 图也有第一屏记忆点。
- FDE / AI 教育 / hot-info 等不同内容都能适配。

---

## 7. 建议优先级

1. **先做 article-only 色彩与 quote/code**: 视觉收益最大, 风险最小。
2. **再做文章正文字体与行高**: 会明显改变阅读气质, 需要截图审美判断。
3. **再做宽屏 TOC 常驻**: 对长文价值高, 但会碰布局。
4. **最后做移动 sticky 目录**: 交互细节最多, 需要浏览器 QA。

---

## 8. 验收清单

- [ ] `src/` 列表页没有被 gold/warm paper 意外污染。
- [ ] article 页 body 背景从冷白转为暖纸, 但 dark 模式仍可读。
- [ ] H1 下短线只在文章页出现。
- [ ] quote 不是普通左线, 而是 pale bg + accent left border。
- [ ] inline code 与 code block 层级分明。
- [ ] 桌面宽屏 TOC 不挤压正文。
- [ ] 移动端目录不遮挡正文, 且可关闭。
- [ ] `npm run build` 通过。
- [ ] 至少截图验证 390x844 和桌面宽屏的 light/dark 文章页。

---

## 9. 设计结论

如果 `blog_ponder` 想达到类似效果, 不需要推翻现在的 shud-style redesign。更好的路线是:

> 首页/列表页继续做"克制的个人思考索引"; 文章详情页升级成"温暖、可学习、像讲义一样舒服的阅读空间"。

这样 Deep Agents 的优点会变成你博客的文章体验加成, 而不是把个人站变成课程产品站。
# 2026-06-26 implementation note

旧版分析里“只做文章阅读皮肤 / article-only”的落地方向已经作废。本轮采用整站 Warm Technical Journal：首页、列表页、项目页、热点日历、about、文章详情和项目详情共享轻暖纸面、rurikon 冷灰蓝正文、受控 aged-brass 结构强调与统一长文正文策略。

新的整站设计 spec 见 `docs/warm-journal-redesign.md`。下方内容保留为参考站拆解记录，不再作为实施优先级。

---
