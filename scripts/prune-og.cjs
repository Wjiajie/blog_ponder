#!/usr/bin/env node
// scripts/prune-og.cjs
//
// Cleanup script: remove OG PNGs in dist/og/blog/ that no longer
// correspond to a published blog post. Run after `npm run build` when
// you've renamed or deleted a post, so a stale image doesn't get
// served by the CDN.
//
// Why a separate script:
//   - Astro's build pipeline only writes /og/blog/<slug>.png; it never
//     deletes a PNG that's no longer referenced. A renamed post leaves
//     the old image in dist/ forever, and the old URL keeps serving it.
//   - This script computes the live slug set from the content collection
//     and removes anything in dist/og/blog/ that isn't in it.
//
// Usage:
//   npm run build
//   node scripts/prune-og.cjs
//
// Safe to run when dist/ doesn't exist (no-op). Safe to re-run.

const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const ogDir = path.join(root, 'dist', 'og', 'blog');

if (!fs.existsSync(ogDir)) {
  console.log('dist/og/blog/ does not exist — nothing to prune.');
  process.exit(0);
}

// Pull the live slug list from astro:content via a tiny tsx helper.
// We don't want to depend on a TS toolchain in this script, so instead
// we shell out to `node` with the published-slug regex matched against
// the markdown filenames in src/content/blog — that's the source of
// truth Astro uses.
const blogDir = path.join(root, 'src', 'content', 'blog');
const liveSlugs = new Set(
  fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    // Drop the placeholder file that exists to keep the collection non-empty.
    .filter((f) => f !== '0000-placeholder.md')
    .map((f) => f.replace(/\.md$/, '')),
);

const onDisk = fs
  .readdirSync(ogDir)
  .filter((f) => f.endsWith('.png'))
  .map((f) => f.replace(/\.png$/, ''));

let pruned = 0;
for (const slug of onDisk) {
  if (!liveSlugs.has(slug)) {
    fs.unlinkSync(path.join(ogDir, slug + '.png'));
    console.log(`pruned dist/og/blog/${slug}.png`);
    pruned++;
  }
}

console.log(
  `\n${onDisk.length - pruned} kept, ${pruned} pruned (of ${liveSlugs.size} live posts).`,
);
