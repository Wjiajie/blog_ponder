/**
 * /og-default.png — the canonical OG image for the blog root.
 *
 * Renders a single home-page card that any other page can fall back to.
 * The static endpoint means there's exactly one PNG in the build and no
 * per-request work — sub-50ms on a cold start.
 */
import type { APIRoute } from "astro";
import { renderOgPng } from "../lib/og";
import { SITE } from "../consts";

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    title: SITE.title,
    description: SITE.description,
    meta: "field notes · AI · FDE",
    url: SITE.url.replace(/^https?:\/\//, ""),
    kind: "field notes",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
};
