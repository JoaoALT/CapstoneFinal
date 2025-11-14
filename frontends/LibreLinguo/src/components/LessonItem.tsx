'use client';

import Link from 'next/link';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Circle, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserProgressForLesson } from '@/lib/api';
import { ScoreDisplay } from './ScoreDisplay';

interface LessonItemProps {
  lesson: Lesson;
  userId: string | undefined;
}

export function LessonItem({ lesson, userId }: LessonItemProps) {
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const progress = await getUserProgressForLesson(userId, lesson.id);
        if (progress) {
          setBestScore(progress.bestScore);
        }
      } catch (error) {
        console.error("Failed to fetch lesson progress:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, [lesson.id, userId]);

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:gap-8">
      <div className="absolute left-8 top-1/2 h-1 w-full -translate-x-full border-t-2 border-dashed md:hidden"></div>
      <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow-lg">
        <Circle className="h-6 w-6" />
      </div>
      <div className="flex flex-grow items-center justify-between rounded-lg border bg-card p-4 shadow-sm md:w-1/2 md:flex-grow-0">
        <div className="flex-1">
          <h3 className="font-headline text-lg font-bold">{lesson.title}</h3>
          <div className="mt-1 text-sm text-muted-foreground">
            {loading ? (
              <div className="h-5 w-24 animate-pulse rounded-md bg-muted"></div>
            ) : bestScore !== null ? (
              <div className="flex items-center gap-2">
                <span>Mejor nota:</span>
                <ScoreDisplay score={bestScore} />
              </div>
            ) : (
              <span>Sin intentar</span>
            )}
          </div>
        </div>
        <Link href={`/lessons/${lesson.id}`} passHref>
          <Button size="icon">
            <Play className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="hidden w-1/2 md:block"></div>
    </div>
  );
}
