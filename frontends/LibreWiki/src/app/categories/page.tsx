import { getCategories } from '@/lib/data';
import { CategoryCard } from '@/components/categories/CategoryCard';

export const metadata = {
  title: 'All Categories | LibreWiki',
  description: 'Browse all available categories on LibreWiki.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">All Categories</h1>
        <p className="mt-3 text-lg text-muted-foreground">Select a category to start exploring articles.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
