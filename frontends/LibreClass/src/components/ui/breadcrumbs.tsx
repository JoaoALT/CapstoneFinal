import Link from 'next/link';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

type BreadcrumbSegment = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  segments: BreadcrumbSegment[];
  className?: string;
};

export function Breadcrumbs({ segments, className }: BreadcrumbsProps) {
    if (segments.length <= 1) {
        return null;
    }
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      {segments.slice(1).map((segment, index) => {
        const isLast = index === segments.length - 2;
        const previousSegment = segments[index];
        return (
          <Fragment key={segment.href}>
             <span>{previousSegment.label}</span>
             <ChevronRight className="h-4 w-4" />
             <span className={cn(isLast ? 'text-foreground font-medium' : '')}>{segment.label}</span>
          </Fragment>
        );
      })}
    </nav>
  );
}
