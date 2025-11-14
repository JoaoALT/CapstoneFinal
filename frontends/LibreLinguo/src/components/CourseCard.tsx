'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Course, Lesson, Unit } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getLessons, getUnits, getUserProgressForCourse } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  userId: string | undefined;
}

export function CourseCard({ course, userId }: CourseCardProps) {
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      setLoading(true);
      try {
        const units = await getUnits(course.id);
        const lessonPromises = units.map(unit => getLessons(unit.id));
        const allLessonsNested = await Promise.all(lessonPromises);
        const allLessons = allLessonsNested.flat();
        const totalLessons = allLessons.length;

        if (!userId) {
          setProgress({ completed: 0, total: totalLessons });
          return;
        }

        const userProgress = await getUserProgressForCourse(userId, course.id);
        const completedLessons = userProgress.filter(p => p.completed).length;

        setProgress({ completed: completedLessons, total: totalLessons });
      } catch (error) {
        console.error("Failed to fetch course progress:", error);
        // If there's an error, at least show total lessons
        const units = await getUnits(course.id);
        const lessonPromises = units.map(unit => getLessons(unit.id));
        const allLessonsNested = await Promise.all(lessonPromises);
        const allLessons = allLessonsNested.flat();
        setProgress({ completed: 0, total: allLessons.length });
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [course.id, userId]);

  const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  const hasStarted = progress.completed > 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="bg-accent/50">
        <CardTitle className="font-headline text-2xl">{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>{progress.completed} / {progress.total} lecciones</span>
            </div>
            <Progress value={progressPercentage} className="mt-2 h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button className="w-full font-bold">
            {hasStarted ? 'Continuar' : 'Comenzar'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
