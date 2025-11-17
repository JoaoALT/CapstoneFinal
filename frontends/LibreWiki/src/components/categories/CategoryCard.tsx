import Link from 'next/link';
import type { Category } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 border-primary/20 hover:border-primary/50">
        <CardHeader className="flex-row items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-xl font-headline">{category.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{category.description}</p>
          <div className="text-primary font-semibold mt-4 flex items-center transition-transform duration-300 group-hover:translate-x-1">
            Explore
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
