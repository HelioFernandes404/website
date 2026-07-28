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

    // Case study told as Context / Action / Result / Learning. Optional: a
    // project without a written-up story renders as plain markdown instead.
    carl: z
      .object({
        context: z.string(),
        action: z.string(),
        result: z.string(),
        learning: z.string(),
      })
      .optional(),

    // Interactive architecture diagram. Only rendered when present, so no
    // project ever ships an empty or invented diagram.
    architecture: z
      .object({
        title: z.string().default('Arquitetura'),
        hint: z.string().optional(),
        nodes: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            kind: z.enum(['entry', 'service', 'data', 'external']),
            subtitle: z.string().optional(),
            x: z.number(),
            y: z.number(),
            decision: z.string().optional(),
            tradeoff: z.string().optional(),
          }),
        ),
        edges: z.array(
          z.object({
            from: z.string(),
            to: z.string(),
            label: z.string().optional(),
            async: z.boolean().default(false),
          }),
        ),
      })
      .optional(),
  }),
});

export const collections = {
  blog,
  projects,
};
