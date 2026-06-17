const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');
const extensions = new Set(['.md', '.mdx']);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    if (entry.isFile() && extensions.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

const errors = [];

for (const file of walk(contentDir)) {
  const source = fs.readFileSync(file, 'utf8');
  const seenImages = new Map();
  const imagePattern = /!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;

  while ((match = imagePattern.exec(source))) {
    const src = match[1];
    if (seenImages.has(src)) {
      errors.push(
        `${path.relative(root, file)}:${lineNumber(source, match.index)} repeats image ${src} first used on line ${seenImages.get(src)}`
      );
    } else {
      seenImages.set(src, lineNumber(source, match.index));
    }
  }
}

if (errors.length) {
  console.error('Content lint failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content lint passed (${walk(contentDir).length} files checked).`);
