'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Unit } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getLessons, getUserProgressForCourse } from '@/lib/api';
import { BookCheck, Lock } from 'lucide-react';

interface UnitCardProps {
  unit: Unit;
  index: number;
  userId: string | undefined;
}

export function UnitCard({ unit, index, userId }: UnitCardProps) {
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  // For demo, let's unlock all units
  const isLocked = false; 

  useEffect(() => {
    async function fetchProgress() {
      if (isLocked) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const lessons = await getLessons(unit.id);
        const totalLessons = lessons.length;
        
        if (!userId) {
          setProgress({ completed: 0, total: totalLessons });
          return;
        }
        
        const userProgress = await getUserProgressForCourse(userId, unit.courseId);
        const completedLessonsInUnit = lessons.filter(lesson => 
          userProgress.some(p => p.lessonId === lesson.id && p.completed)
        ).length;

        setProgress({ completed: completedLessonsInUnit, total: totalLessons });
      } catch (error) {
        console.error("Failed to fetch unit progress:", error);
         const lessons = await getLessons(unit.id);
        setProgress({ completed: 0, total: lessons.length });
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [unit.id, unit.courseId, userId, isLocked]);

  const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isLocked ? 'bg-muted/50' : 'hover:shadow-lg'}`}>
      <div className="flex flex-col items-center gap-4 p-6 sm:flex-row">
        <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ${isLocked ? 'bg-gray-300' : 'bg-primary/20 text-primary'}`}>
          {isLocked ? (
            <Lock className="h-8 w-8 text-gray-500" />
          ) : (
            <span className="font-headline text-3xl font-bold">{index + 1}</span>
          )}
        </div>
        <div className="flex-grow text-center sm:text-left">
          <CardTitle className="font-headline text-2xl">{unit.title}</CardTitle>
          <CardDescription className="mt-1">{unit.description}</CardDescription>
          {!isLocked && (
            <div className="mt-4">
              {loading ? (
                <div className="h-2 w-full animate-pulse rounded-md bg-muted" />
              ) : (
                <>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {progress.completed} de {progress.total} lecciones completadas
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="w-full sm:w-auto">
          <Link href={`/courses/${unit.courseId}/units/${unit.id}`} passHref>
            <Button className="w-full font-bold sm:w-auto" disabled={isLocked}>
              <BookCheck className="mr-2 h-4 w-4" />
              Ver lecciones
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
