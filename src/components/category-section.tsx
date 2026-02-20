import Link from 'next/link';

import { ToolCard } from '@/components/tool-card';
import type { Category, Tool } from '@/types/catalog';

type CategorySectionProps = {
  category: Category;
  tools: Tool[];
};

export function CategorySection({ category, tools }: CategorySectionProps) {
  return (
    <section id={category.slug} aria-labelledby={`${category.slug}-heading`} className="py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2
          id={`${category.slug}-heading`}
          className="font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl"
        >
          {category.name}
        </h2>

        <Link
          href={`/category/${category.slug}`}
          className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-neutral-700 transition hover:-translate-y-0.5 hover:border-accent-primary hover:bg-[var(--color-accent-primary-a10)] hover:text-neutral-950 hover:shadow-accent-glow"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
