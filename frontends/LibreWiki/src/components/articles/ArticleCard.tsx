import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <Badge variant="secondary" className="mb-2">{article.category}</Badge>
            <h3 className="text-xl font-bold font-headline leading-snug">{article.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>
          </div>
          <div className="text-primary font-semibold mt-4 flex items-center transition-transform duration-300 group-hover:translate-x-1">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
