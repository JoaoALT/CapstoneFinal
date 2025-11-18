import { getCategoryBySlug, getArticlesByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { SearchBar } from '@/components/common/SearchBar';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: 'Category Not Found | LibreWiki',
    };
  }
  return {
    title: `${category.name} | LibreWiki`,
    description: `Browse articles in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(params.slug);
  const Icon = category.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="bg-primary/10 text-primary p-4 rounded-lg">
          <Icon className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{category.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{category.description}</p>
        </div>
      </div>
      
      <div className="mb-12">
        <SearchBar 
          placeholder={`Search within ${category.name}...`} 
          contextCategory={category.slug}
        />
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold">No Articles Found</h2>
          <p className="mt-2 text-muted-foreground">There are no articles in the {category.name} category yet.</p>
        </div>
      )}
    </div>
  );
}
