import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function ScoreDisplay({ score, maxScore = 5, className }: ScoreDisplayProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxScore }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-5 w-5",
            index < score ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'
          )}
        />
      ))}
    </div>
  );
}
