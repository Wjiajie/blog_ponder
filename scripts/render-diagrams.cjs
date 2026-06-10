// Convert all 7 diagrams SVG → PNG (1600x*)
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'diagrams');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

let success = 0;
for (const f of files) {
  const svgPath = path.join(dir, f);
  const pngPath = svgPath.replace(/\.svg$/, '.png');
  const svg = fs.readFileSync(svgPath, 'utf8');

  // Get viewBox height for proper aspect
  const m = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const w = m ? parseInt(m[1]) : 1600;
  const h = m ? parseInt(m[2]) : 1100;

  // Render at 2x for retina-quality (target 1600 wide actual)
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: w * 2 },
    background: '#FAFAF7',
    font: { loadSystemFonts: true },
  });
  const png = r.render().asPng();
  fs.writeFileSync(pngPath, png);
  console.log(`${f} → ${path.basename(pngPath)}  (${w}x${h} → ${w*2}x${h*2}, ${(png.length/1024).toFixed(1)}KB)`);
  success++;
}
console.log(`\n✓ ${success}/${files.length} converted.`);
