import type { LucideIcon } from 'lucide-react';

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};
