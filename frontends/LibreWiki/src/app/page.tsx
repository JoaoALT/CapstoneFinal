import Link from 'next/link';
import { getFeaturedCategories } from '@/lib/data';
import { SearchBar } from '@/components/common/SearchBar';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const featuredCategories = await getFeaturedCategories(6);

  return (
    <>
      <section className="text-center pt-16 pb-20 md:pt-24 md:pb-28 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            Welcome to LibreWiki
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your offline gateway to knowledge. Explore articles, browse categories, and learn something new today.
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-headline">
              Browse by Category
            </h2>
            <Button asChild variant="ghost">
              <Link href="/categories">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
