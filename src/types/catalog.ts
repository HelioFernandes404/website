export type Category = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  categoryId: string;
  order: number;
};
