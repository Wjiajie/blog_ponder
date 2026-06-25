---
title: "FDE-Journey · 转型博客与源码"
summary: "你现在正在浏览的这个网站。它本身是 FDE 准备过程中的一部分——用 Astro + MDX 搭建的极简博客，内容包括随想、项目集合与个人介绍。"
status: "shipped"
category: "Meta"
stack: ["Astro 5", "Tailwind CSS", "MDX", "Shiki", "Vercel"]
links:
  demo: "https://www.jiajiewu.top"
  repo: "https://github.com/wjiajie/blog_ponder"
order: 3
---

这个博客本身就是我「FDE 准备」项目集的一部分。**它不只是记录转型过程的容器——它同时也是我交付能力的一次公开展示**。

## 这个网站在做什么

- **随想**：FDE 准备过程中读到的、想到的、写下来的长文笔记
- **项目集合**：把转型过程中产出的项目集中展示（你现在正在看的页面）
- **关于**：自我介绍 + 联系方式

## 设计与工程选择

- **Astro 5 + MDX**——内容驱动，发布一篇随想只需要写一个 .mdx 文件
- **Tailwind + CSS 变量**——3 色 + 5 灰阶的克制配色，0 个 emoji / 0 张图 / 0 个装饰
- **Shiki**——代码高亮与正文排版融为一体
- **Vercel**——push 即部署，preview link 方便分享
- **内容集合（content collections）**——随想、项目与页面内容都跑在类型化 schema 上

## 为什么它对 FDE 准备有意义

FDE 面试问的不是「你用过什么技术栈」，而是「你能不能交付一个能跑的东西」。这个网站回答的是后者——从需求、到设计、到内容、到部署、到域名，**端到端 owner**。它也是我后续每个项目 README 的「视觉规范」——所有项目都长这样，没有例外。
