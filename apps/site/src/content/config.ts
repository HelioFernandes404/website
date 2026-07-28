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

    // Display metadata. Lived in a hardcoded array in index.astro until the
    // OpenFlashcards rename forced the same edit in two places.
    order: z.number(),
    category: z.string(),
    metricLabel: z.string(),
    metricValue: z.string(),
    metricCaption: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    comingSoon: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  projects,
};
