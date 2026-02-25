import type { Category } from '@/types/catalog';

export const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const sortByOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order);

export const getCategoryBySlug = (categories: Category[], slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);
