import { Suspense } from 'react';
import { searchArticles } from '@/lib/data';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { SearchBar } from '@/components/common/SearchBar';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Search Results | LibreWiki',
};

type SearchPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

async function SearchResults({ query, category }: { query: string, category?: string }) {
  const articles = await searchArticles(query, category);

  return (
    <>
      <div className="mb-8">
        {articles.length > 0 ? (
          <p className="text-lg text-muted-foreground">
            Found {articles.length} result{articles.length !== 1 ? 's' : ''} for <span className="font-semibold text-foreground">"{query}"</span>.
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            No results found for <span className="font-semibold text-foreground">"{query}"</span>.
          </p>
        )}
      </div>

      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, category } = searchParams;

  if (!query) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Search Results</h1>
      <div className="mb-12">
        <SearchBar placeholder="Search again..." contextCategory={category} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} category={category} />
      </Suspense>
    </div>
  );
}
