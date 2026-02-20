import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import type { Category, Tool } from '@/types/catalog';
import { sortByOrder } from '@/lib/slugs';

export const getOrderedCategories = (): Category[] => sortByOrder(categories);

export const getOrderedTools = (): Tool[] => sortByOrder(tools);

export const getToolsByCategory = (categoryId: string): Tool[] =>
  getOrderedTools().filter((tool) => tool.categoryId === categoryId);

export const getCategoryAndTools = (
  categoryId: string,
): {
  category: Category | undefined;
  items: Tool[];
} => ({
  category: categories.find((category) => category.id === categoryId),
  items: getToolsByCategory(categoryId),
});
