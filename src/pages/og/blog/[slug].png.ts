/**
 * /og/blog/<slug>.png — per-post OG image, generated at build time.
 *
 * `getStaticPaths` enumerates every published post at build, so the
 * output is a flat set of pre-rendered PNGs. Unknown slugs simply don't
 * get a route; that's the right behaviour for a public site.
 *
 * Draft handling: by default we skip drafts so a half-written post
 * can't be shared with a misleading OG card. Flip `INCLUDE_DRAFTS` to
 * true during local dev if you want to preview the card before
 * unflagging the draft.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderOgPng } from "../../../lib/og";
import { SITE, ROUTES } from "../../../consts";

const INCLUDE_DRAFTS = false;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection("blog"))
    .filter((p) => INCLUDE_DRAFTS || !p.data.draft)
    .map((p) => ({ params: { slug: p.slug } }));
  return posts;
};

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  const posts = await getCollection("blog");
  const post = posts.find((p) => p.slug === slug);
  if (!post) return new Response("not found", { status: 404 });

  const pubDate = post.data.pubDate.toISOString().slice(0, 10);
  const tags = (post.data.tags ?? []).slice(0, 3).join(" · ");
  const meta = [pubDate, tags].filter(Boolean).join(" · ");

  const png = await renderOgPng({
    title: post.data.title,
    description: post.data.description,
    meta: meta.toUpperCase(),
    url: new URL(ROUTES.blogPost(post.slug), SITE.url)
      .toString()
      .replace(/^https?:\/\//, ""),
    kind: "essays",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
};
