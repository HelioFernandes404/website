import type { Category } from '@/types/catalog';

export const categories: Category[] = [
  { id: 'ai-assistants', name: 'AI Assistants', slug: 'ai-assistants', order: 1 },
  { id: 'editors-workspace', name: 'Editors & Workspace', slug: 'editors-workspace', order: 2 },
  { id: 'terminal-shell', name: 'Terminal & Shell', slug: 'terminal-shell', order: 3 },
  { id: 'gitops-delivery', name: 'GitOps & Delivery', slug: 'gitops-delivery', order: 4 },
  { id: 'astral-python', name: 'Astral Python Stack', slug: 'astral-python', order: 5 },
  { id: 'platform-cloud', name: 'Platform & Cloud', slug: 'platform-cloud', order: 6 },
  { id: 'ops-observability', name: 'Ops & Observability', slug: 'ops-observability', order: 7 },
  { id: 'python-notebooks', name: 'Python & Notebooks', slug: 'python-notebooks', order: 8 },
];
