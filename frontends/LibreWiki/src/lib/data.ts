import type { Article, Category } from '@/lib/types';
import { Pi, Landmark, Atom, BookOpen, Globe, Palette } from 'lucide-react';
import database from './database.json';

const MOCK_CATEGORIES: Category[] = [
  { id: '1', slug: 'matematicas', name: 'Matemáticas', description: 'Explore el mundo de los números, las estructuras y el espacio.', icon: Pi },
  { id: '2', slug: 'historia', name: 'Historia', description: 'Viaje a través de los acontecimientos del pasado.', icon: Landmark },
  { id: '3', slug: 'ciencia', name: 'Ciencia', description: 'Comprenda el mundo natural y social a través de la observación.', icon: Atom },
  { id: '4', slug: 'literatura', name: 'Literatura', description: 'Descubra obras escritas de arte e imaginación.', icon: BookOpen },
  { id: '5', slug: 'geografia', name: 'Geografía', description: 'Aprenda sobre las tierras, los rasgos y los habitantes de la Tierra.', icon: Globe },
  { id: '6', slug: 'arte', name: 'Arte', description: 'Aprecie la diversa gama de habilidades creativas humanas.', icon: Palette },
];

const MOCK_ARTICLES: Article[] = database.articles;

export const getArticles = async (): Promise<Article[]> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_ARTICLES;
}

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_ARTICLES.find(a => a.slug === slug);
}

export const getCategories = async (): Promise<Category[]> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_CATEGORIES;
}

export const getCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_CATEGORIES.find(c => c.slug === slug);
}

export const getFeaturedCategories = async (limit: number): Promise<Category[]> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_CATEGORIES.slice(0, limit);
}

export const getArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
    await new Promise(res => setTimeout(res, 50));
    return MOCK_ARTICLES.filter(a => a.categorySlug === categorySlug);
}

export const searchArticles = async (query: string, category?: string): Promise<Article[]> => {
  await new Promise(res => setTimeout(res, 100));
  const lowercasedQuery = query.toLowerCase();
  
  return MOCK_ARTICLES.filter(article => {
    const inCategory = category ? article.categorySlug === category : true;
    const inTitle = article.title.toLowerCase().includes(lowercasedQuery);
    const inContent = article.excerpt.toLowerCase().includes(lowercasedQuery) || article.content.toLowerCase().includes(lowercasedQuery);
    return inCategory && (inTitle || inContent);
  });
};
