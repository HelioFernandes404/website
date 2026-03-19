import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    lead: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    url: z.string().url().optional(),
    urlLabel: z.string().optional(),
    secondaryUrl: z.string().url().optional(),
    secondaryUrlLabel: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  blog,
  projects,
  'case-studies': caseStudies,
};
