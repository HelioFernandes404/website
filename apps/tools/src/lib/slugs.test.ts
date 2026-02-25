import { describe, expect, it } from 'vitest';

import { getCategoryBySlug, slugify, sortByOrder } from '@/lib/slugs';

describe('slugs', () => {
  it('slugifies names consistently', () => {
    expect(slugify('AI Tools')).toBe('ai-tools');
    expect(slugify('  Vibe   Coding  ')).toBe('vibe-coding');
  });

  it('sorts by order ascending', () => {
    expect(sortByOrder([{ order: 2 }, { order: 1 }])).toEqual([{ order: 1 }, { order: 2 }]);
  });

  it('finds category by slug', () => {
    const category = getCategoryBySlug(
      [
        { id: 'a', name: 'A', slug: 'a', order: 1 },
        { id: 'b', name: 'B', slug: 'b', order: 2 },
      ],
      'b',
    );

    expect(category?.id).toBe('b');
  });
});
