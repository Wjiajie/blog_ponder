import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    test: z.boolean().default(false), // marks placeholder test content
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
    test: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
