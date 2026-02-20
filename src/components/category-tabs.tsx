import type { Category } from '@/types/catalog';

type CategoryTabsProps = {
  categories: Category[];
};

export function CategoryTabs({ categories }: CategoryTabsProps) {
  return (
    <nav aria-label="Category navigation" className="mt-10">
      <ul className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <li key={category.id}>
            <a
              href={`#${category.slug}`}
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-neutral-700 transition hover:-translate-y-0.5 hover:border-accent-primary hover:bg-[var(--color-accent-primary-a10)] hover:text-neutral-950 focus-visible:outline-none"
            >
              {String(index + 1).padStart(2, '0')} {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
