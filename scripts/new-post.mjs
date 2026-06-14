#!/usr/bin/env node
// scripts/new-post.mjs
//
// One-shot scaffold for a new blog post.
//
// Usage:
//   node scripts/new-post.mjs "文章标题"
//   node scripts/new-post.mjs "文章标题" --tags FDE,LLM --draft
//
// What it does:
//   1. Slugifies the title (ASCII + Chinese; maps common CJK punctuation).
//   2. Generates `src/content/blog/<date>-<slug>.md` with a complete
//      frontmatter block (title, description, pubDate=today, tags, draft).
//   3. Refuses to clobber an existing file — exits non-zero so CI can catch
//      accidental re-runs.
//   4. Prints the absolute path + a "first things to do" reminder so the
//      author doesn't have to remember the schema from src/content/config.ts.
//
// This is a deliberate "no magic" script: it does not touch git, does not
// open an editor, does not run npm scripts. The author stays in charge of
// the actual writing.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const BLOG_DIR = join(REPO_ROOT, 'src', 'content', 'blog');

// --- arg parsing --------------------------------------------------------

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('-')) {
  console.error(
    [
      '用法: node scripts/new-post.mjs "标题" [--tags t1,t2,...] [--draft]',
      '',
      '示例:',
      '  node scripts/new-post.mjs "6 个月 FDE 转型:第 3 月复盘"',
      '  node scripts/new-post.mjs "Harness 选型笔记" --tags FDE,LLM --draft',
    ].join('\n'),
  );
  process.exit(2);
}

const title = args[0];
let tags = [];
let draft = false;
for (let i = 1; i < args.length; i++) {
  const a = args[i];
  if (a === '--tags') tags = (args[++i] ?? '').split(',').map((t) => t.trim()).filter(Boolean);
  else if (a === '--draft') draft = true;
  else {
    console.error(`未知参数: ${a}`);
    process.exit(2);
  }
}

// --- helpers ------------------------------------------------------------

/**
 * Slug for filename + URL. Rules:
 *   - If the title has any ASCII letters/digits, keep those (lowercased),
 *     collapse non-alphanumerics to `-`, cap at 80 chars. CJK characters
 *     are dropped from the slug so URLs stay readable and the OG image
 *     file name stays ASCII (satori's renderer is happier that way).
 *   - If the title is pure CJK with no ASCII, fall back to
 *     `post-<n>` where n is the count of existing `post-*.md` files + 1.
 *     Authors with Chinese-only titles should be encouraged to add an
 *     English subtitle — the script prints a hint when this happens.
 */
function slugify(input) {
  const ascii = input
    .normalize('NFKC')
    // strip CJK characters and CJK punctuation
    .replace(/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return ascii.slice(0, 80);
}

async function asciiFallbackSlug() {
  // Count existing post-*.md files in the blog dir; new slug = post-<n+1>.
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(BLOG_DIR).catch(() => []);
  const n = entries.filter((f) => /^post-\d+\.md$/.test(f)).length;
  return `post-${n + 1}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function yamlEscape(s) {
  // Wrap in double quotes; escape backslashes and inner double quotes.
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function buildFrontmatter({ title, pubDate, tags, draft }) {
  const lines = [
    '---',
    `title: ${yamlEscape(title)}`,
    // description is intentionally left empty as a TODO for the author —
    // it's optional in the schema but feeds og:description and the RSS
    // summary, so a missing one hurts shareability.
    'description: ""',
    `pubDate: ${pubDate}`,
    `tags: [${tags.map(yamlEscape).join(', ')}]`,
    `draft: ${draft}`,
    '---',
    '',
  ];
  return lines.join('\n');
}

function buildScaffoldBody({ title }) {
  return [
    `# ${title}`,
    '',
    '> 起笔提示:',
    '> - 删掉这段,直接写正文。',
    '> - 第一段给搜索引擎 / RSS 订阅者 — 他们看不到后面的目录。',
    '> - 如果是长文(> 1500 字),加一个 `## 大纲` 区,读者可以跳读。',
    '> - 用 `## 二级标题` 和 `### 三级标题`,TableOfContents 自动收 h2/h3。',
    '',
  ].join('\n');
}

// --- main ---------------------------------------------------------------

let slug = slugify(title);
let usedFallback = false;
if (!slug) {
  slug = await asciiFallbackSlug();
  usedFallback = true;
}
const date = todayISO();
const filename = `${date}-${slug}.md`;
const fullPath = join(BLOG_DIR, filename);

await mkdir(BLOG_DIR, { recursive: true });

let exists = false;
try {
  await access(fullPath);
  exists = true;
} catch {
  /* ENOENT — good, we can write */
}
if (exists) {
  console.error(`✗ 目标已存在: ${fullPath}`);
  console.error('  不会覆盖。请改名或先删掉旧文件。');
  process.exit(1);
}

const fileContent =
  buildFrontmatter({ title, pubDate: date, tags, draft }) +
  buildScaffoldBody({ title });

await writeFile(fullPath, fileContent, 'utf8');

console.log(`✓ 已创建: ${fullPath}`);
console.log('');
if (usedFallback) {
  console.log('⚠ 标题是纯中文,slug 用了 post-N 兜底。');
  console.log('  建议在 frontmatter 的 title 后面加一行 `subtitle:` 或在正文加英文小标题,');
  console.log('  后续想改 URL slug 时手动重命名文件即可(build 会跟着重定向)。');
  console.log('');
}
console.log('接下来:');
console.log('  1. 编辑 frontmatter 的 description(影响 OG 图 + RSS 摘要)');
console.log('  2. 写正文 — 删掉起笔提示');
console.log('  3. npm run dev  预览');
if (draft) {
  console.log('  4. 完稿后把 draft 改 false,build 才会收录到 /blog/');
}
