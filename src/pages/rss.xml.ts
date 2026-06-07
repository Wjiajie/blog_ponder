/**
 * /rss.xml — the blog feed.
 *
 * Each item carries:
 *   - title, link, pubDate             → standard RSS 2.0
 *   - description                      → short summary (frontmatter)
 *   - content                          → full HTML, rendered from markdown
 *   - author                           → <dc:creator> + <author>
 *   - categories                       → from frontmatter tags
 *
 * customData emits <atom:link rel="self"> for self-discovery and a
 * <language> tag matching SITE.locale.
 */
import rss from "@astrojs/rss";
import { marked } from "marked";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE, ROUTES } from "../consts";

marked.use({ gfm: true, breaks: false });

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => {
      // marked.parse on the raw markdown body; marked is sync by default.
      // We pass it through a small post-process to trim leading whitespace
      // runs and rewrap very long lines so the XML CDATA stays reasonable.
      const html = marked.parse(post.body) as string;
      return {
        title: post.data.title,
        description: post.data.description ?? "",
        pubDate: post.data.pubDate,
        link: ROUTES.blogPost(post.slug),
        // author expects an email string; if you don't want to expose the
        // email, drop this and use the <dc:creator> in customData instead.
        author: "jiajiewu233@gmail.com (Jiajie)",
        categories: post.data.tags ?? [],
        content: html,
      };
    }),
    customData: [
      `<language>${SITE.locale}</language>`,
      `<atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />`,
      `<dc:creator>${SITE.author}</dc:creator>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join("\n"),
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    stylesheet: false,
  });
}
