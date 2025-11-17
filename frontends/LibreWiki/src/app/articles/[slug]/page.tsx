import { getArticleBySlug, getArticlesByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Article Not Found | LibreWiki',
    };
  }
  return {
    title: `${article.title} | LibreWiki`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getArticlesByCategory(article.categorySlug))
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article>
        <header className="mb-8">
          <Link href={`/categories/${article.categorySlug}`} className="text-primary font-semibold hover:underline flex items-center mb-4">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to {article.category}
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">{article.title}</h1>
              <div className="mt-4">
                <Link href={`/categories/${article.categorySlug}`}>
                  <Badge variant="default">{article.category}</Badge>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 shadow-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={article.imageHint}
          />
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <>
          <Separator className="my-12" />
          <section className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
