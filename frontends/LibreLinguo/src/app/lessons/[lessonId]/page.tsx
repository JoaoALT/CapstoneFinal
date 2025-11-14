import { getLesson, getExercises, getUnit } from '@/lib/api';
import { LessonClient } from '@/components/lessons/LessonClient';
import { unstable_noStore as noStore } from 'next/cache';

interface LessonPageProps {
  params: { lessonId: string };
}

export default async function LessonPage({ params }: LessonPageProps) {
  noStore();
  const lesson = await getLesson(params.lessonId);
  const exercises = await getExercises(params.lessonId);
  
  if (!lesson || !exercises || exercises.length === 0) {
    return <div className="container mx-auto p-8">Lección no encontrada o vacía.</div>;
  }
  
  const unit = await getUnit(lesson.unitId);

  return (
    <LessonClient lesson={lesson} unit={unit} exercises={exercises} />
  );
}
