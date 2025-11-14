import Link from 'next/link';
import type { Lesson, Unit } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface LessonHeaderProps {
  lesson: Lesson;
  unit: Unit | undefined;
  totalExercises: number;
  currentIndex: number;
}

export function LessonHeader({ lesson, unit, totalExercises, currentIndex }: LessonHeaderProps) {
  const progressPercentage = totalExercises > 0 ? ((currentIndex + 1) / totalExercises) * 100 : 0;

  return (
    <header className="border-b bg-card p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">{unit?.title || 'Lección'}</div>
          <Link href={`/courses/${lesson.courseId}/units/${lesson.unitId}`} passHref>
            <Button variant="ghost" size="icon">
              <X className="h-6 w-6" />
              <span className="sr-only">Salir de la lección</span>
            </Button>
          </Link>
        </div>
        <h1 className="font-headline text-xl font-bold text-primary">{lesson.title}</h1>
        <Progress value={progressPercentage} className="mt-2 h-3" />
      </div>
    </header>
  );
}
