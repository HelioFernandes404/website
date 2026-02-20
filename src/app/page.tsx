import { CategorySection } from '@/components/category-section';
import { CategoryTabs } from '@/components/category-tabs';
import { Hero } from '@/components/hero';
import { getOrderedCategories, getToolsByCategory } from '@/lib/catalog';

export default function HomePage() {
  const categories = getOrderedCategories();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24">
      <Hero />
      <CategoryTabs categories={categories} />

      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          tools={getToolsByCategory(category.id)}
        />
      ))}
    </div>
  );
}
