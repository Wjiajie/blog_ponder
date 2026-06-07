import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['planning', 'in-progress', 'shipped', 'archived']).default('planning'),
    category: z.string().default('Side'),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        demo: z.string().url().optional(),
        repo: z.string().url().optional(),
        post: z.string().optional(),
      })
      .default({}),
    order: z.number().default(99),
  }),
});

const journey = defineCollection({
  type: 'content',
  schema: z.object({
    month: z.string(), // e.g. "M1", "M2", ... — also the slug key
    title: z.string(),
    status: z.enum(['done', 'in-progress', 'upcoming']).default('upcoming'),
    description: z.string(),
    outputs: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    order: z.number().default(99), // ascending; lets you reorder without renumbering
  }),
});

// Top-level content pages (about, journey header, etc.). Authored as MDX
// so they can interpolate site identity and social links from consts.ts.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, projects, journey, pages };
