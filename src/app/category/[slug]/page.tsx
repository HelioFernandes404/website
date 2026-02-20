import type { Metadata } from 'next';

import { categories } from '@/data/categories';
import { getCategoryBySlug } from '@/lib/slugs';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(categories, slug);

  return {
    title: `${category?.name ?? 'Category'} | Dev Toolbox`,
    description: 'Category page placeholder (coming soon).',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(categories, slug);

  return (
    <div className="mx-auto flex w-full max-w-3xl px-6 py-24">
      <section className="terminal-panel w-full p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Category</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-950">
          {category?.name ?? slug}
        </h1>
        <p className="mt-6 text-base text-neutral-600">Coming Soon.</p>
      </section>
    </div>
  );
}
