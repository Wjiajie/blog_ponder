---
title: "占位文章（草稿）"
description: "占位文件，确保 Astro content collection 在 src/content/blog/ 存在。永远不会被发布。"
pubDate: 0001-01-01
tags: []
draft: true
---

This file exists only to keep the Astro content collection non-empty so
that `getCollection('blog')` resolves to an iterable. It is permanently
marked `draft: true` so `getPublishedPosts()` filters it out, and it
never appears in the list, on the home page, or in the RSS feed.

Safe to keep in git. Remove only if you intend to archive the blog
collection entirely.
