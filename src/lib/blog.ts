// Helpers for the `blog` content collection.
//
// Centralises the "filter drafts, sort newest-first" pipeline so the
// five consumer files don't each reinvent it. We assume the collection
// always exists — src/content/blog/.placeholder.md keeps it resolvable
// even when the operator has temporarily emptied the live articles.

import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

/**
 * All non-draft blog posts, newest first.
 */
export async function getPublishedPosts(): Promise<BlogEntry[]> {
  const entries = await getCollection('blog');
  return entries
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
