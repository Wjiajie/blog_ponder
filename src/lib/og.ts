/**
 * Open Graph image renderer.
 *
 * 1200×630 PNG. Generated server-side. Uses satori (vnode → SVG) + resvg
 * (SVG → PNG). Inter for body, JetBrains Mono for the meta line.
 *
 * Why this file: a single renderer keeps the home / post / page templates
 * in lockstep — change the chrome here and every card updates with it.
 */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { html as satoriHtml } from "satori-html";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --- font loaders (cached at module scope) ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR_INTER = path.resolve(
  __dirname,
  "../../node_modules/@fontsource/inter/files",
);
const FONT_DIR_JBM = path.resolve(
  __dirname,
  "../../node_modules/@fontsource/jetbrains-mono/files",
);
const FONT_DIR_NSC = path.resolve(
  __dirname,
  "../../node_modules/@fontsource/noto-sans-sc/files",
);

let _fonts: Awaited<ReturnType<typeof loadFonts>> | null = null;
async function loadFonts() {
  // satori is font-greedy: it walks the fonts[] in order, and for each
  // glyph picks the first entry whose cmap covers that code point. So
  // we put the CJK font FIRST for "Inter" so CJK characters fall through
  // to it, and we keep "JetBrains Mono" registered separately for the
  // monospace meta line (digits, dots, slashes).
  //
  // Trade-off: ASCII glyphs in the body (mostly absent on this blog)
  // will render in Noto Sans SC instead of Inter. That's an acceptable
  // hit for a Chinese-first site, and avoids font-merging tooling.
  const [nsc400, nsc500, nsc700, jbm400, jbm500] = await Promise.all([
    readFile(
      path.join(FONT_DIR_NSC, "noto-sans-sc-chinese-simplified-400-normal.woff"),
    ),
    readFile(
      path.join(FONT_DIR_NSC, "noto-sans-sc-chinese-simplified-500-normal.woff"),
    ),
    readFile(
      path.join(FONT_DIR_NSC, "noto-sans-sc-chinese-simplified-700-normal.woff"),
    ),
    readFile(path.join(FONT_DIR_JBM, "jetbrains-mono-latin-400-normal.woff")),
    readFile(path.join(FONT_DIR_JBM, "jetbrains-mono-latin-500-normal.woff")),
  ]);
  return [
    { name: "Inter", data: nsc400, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: nsc500, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: nsc700, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: jbm400, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: jbm500, weight: 500 as const, style: "normal" as const },
  ];
}
async function fonts() {
  if (!_fonts) _fonts = await loadFonts();
  return _fonts;
}

// --- palette (the brand's only 3 values + the 2 accents) ---
const INK = "#22303B";
const PAPER = "#F5F1EA";
const ASH = "#6B6B6B";
const ORANGE = "#E08A35";
const TEAL = "#5FA7A2";

// --- the favicon mark, as inline SVG so it lives wherever we put it ---
const MARK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512" style="display:block">
  <circle cx="256" cy="256" r="156" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 147 338 Q 200 285 256 316 Q 312 285 365 338" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="256" y1="174" x2="256" y2="314" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
  <circle cx="122" cy="252" r="42" fill="${ORANGE}"/>
  <rect x="345" y="210" width="86" height="86" rx="22" fill="${TEAL}"/>
</svg>`;

// --- the full 1200x630 layout, returned as satori vnode ---
function buildHtml(p: OgPayload): string {
  // Title size auto-shrinks with length so long titles still fit cleanly.
  const titleSize = p.title.length > 40 ? 64 : 76;
  // Description is auto-truncated to 160 chars to keep the card balanced.
  const desc = (p.description ?? "").slice(0, 160);
  return `
<div style="display:flex;flex-direction:column;justify-content:space-between;width:1200px;height:630px;background:${PAPER};padding:72px 80px;font-family:Inter;color:${INK}">
  <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <div style="display:flex;align-items:center;gap:24px">
      ${MARK_SVG}
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:26px;font-weight:500;letter-spacing:-0.01em;color:${INK}">jiajie个人博客</div>
        <div style="display:flex;align-items:center;gap:12px;font-family:JetBrains Mono;font-size:22px;color:${ASH};letter-spacing:0.04em;text-transform:uppercase">${escapeHtml(p.meta)}</div>
      </div>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:24px;max-width:100%;flex-shrink:1">
    <div style="font-size:${titleSize}px;font-weight:700;line-height:1.1;letter-spacing:-0.025em;color:${INK};display:flex">${escapeHtml(p.title)}</div>
    ${desc ? `<div style="font-size:28px;font-weight:400;line-height:1.45;color:${ASH};display:flex;max-width:1040px">${escapeHtml(desc)}</div>` : ""}
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;width:100%;border-top:1px solid ${ASH};padding-top:28px">
    <div style="display:flex;align-items:center;gap:14px;font-family:JetBrains Mono;font-size:22px;color:${INK}">
      <span style="font-weight:500">jiajie</span>
      <span style="color:${ASH}">·</span>
      <span style="color:${ASH}">${escapeHtml(p.kind)}</span>
    </div>
    <div style="font-family:JetBrains Mono;font-size:22px;color:${ASH}">${escapeHtml(p.url)}</div>
  </div>
</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- public API ---
export type OgPayload = {
  title: string;
  description?: string;
  meta: string; // a single uppercase mono string, e.g. "2026-06-06 · FDE · AI"
  url: string; // full URL shown in the footer
  kind: "essays" | "log" | "field notes" | "thoughts";
};

export async function renderOgPng(p: OgPayload): Promise<Uint8Array> {
  const svg = await satori(satoriHtml(buildHtml(p)), {
    width: 1200,
    height: 630,
    fonts: await fonts(),
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}
