// Render every diagrams/*.svg → diagrams/*.png (2x retina), then copy
// the PNGs into public/diagrams/ so Astro serves them at /diagrams/*.
//
// Run automatically via `predev` / `prebuild` npm hooks, or manually:
//   npm run diagrams
//
// diagrams/*.png and public/diagrams/*.png are both .gitignored — this
// script is the only thing that writes to either folder.
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'diagrams');
const outDir = path.join(root, 'public', 'diagrams');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.svg'));
if (files.length === 0) {
  console.log('No SVGs found in diagrams/ — nothing to do.');
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

let rendered = 0;
let copied = 0;
for (const f of files) {
  const svgPath = path.join(srcDir, f);
  const pngName = f.replace(/\.svg$/, '.png');
  const pngPath = path.join(srcDir, pngName);
  const publicPngPath = path.join(outDir, pngName);

  const svg = fs.readFileSync(svgPath, 'utf8');

  // Use the SVG viewBox so the 2x render keeps the original aspect ratio.
  const m = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const w = m ? parseInt(m[1]) : 1600;
  const h = m ? parseInt(m[2]) : 1100;

  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: w * 2 },
    background: '#FAFAF7',
    font: { loadSystemFonts: true },
  });
  const png = r.render().asPng();
  fs.writeFileSync(pngPath, png);
  rendered++;

  fs.copyFileSync(pngPath, publicPngPath);
  copied++;

  console.log(
    `${f} → diagrams/${pngName}  (${w}x${h} → ${w*2}x${h*2}, ${(png.length/1024).toFixed(1)}KB)`,
  );
}

// Prune stale PNGs in public/diagrams/ that no longer have a source SVG,
// so removing a diagram doesn't leave a zombie file behind.
const publicPngs = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
let pruned = 0;
for (const f of publicPngs) {
  const svgName = f.replace(/\.png$/, '.svg');
  if (!files.includes(svgName)) {
    fs.unlinkSync(path.join(outDir, f));
    pruned++;
  }
}

console.log(
  `\nrendered ${rendered}, copied ${copied} → public/diagrams/, pruned ${pruned} stale.`,
);
