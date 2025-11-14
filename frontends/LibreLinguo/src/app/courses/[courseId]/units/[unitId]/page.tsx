import Link from 'next/link';
import { getUnit, getLessons, getCourse } from '@/lib/api';
import { LessonItem } from '@/components/LessonItem';
import { ChevronLeft } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

interface UnitPageParams {
  params: {
    courseId: string;
    unitId: string;
  };
}

export default async function UnitPage({ params }: UnitPageParams) {
  noStore();
  const { courseId, unitId } = params;
  const course = await getCourse(courseId);
  const unit = await getUnit(unitId);
  const lessons = await getLessons(unitId);
  const userId = undefined;

  if (!unit || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-headline text-3xl font-bold">Unidad no encontrada</h1>
        <Link href={`/courses/${courseId}`}>
          Volver al curso
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href={`/courses/${courseId}`} className="mb-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Volver a {course.name}
        </Link>
        <h1 className="font-headline text-4xl font-bold">{unit.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{unit.description}</p>
      </div>

      <div className="relative space-y-8 before:absolute before:left-8 before:top-8 before:h-full before:-translate-x-1/2 before:border-l-2 before:border-dashed before:content-[''] md:before:left-1/2">
        {lessons.sort((a, b) => a.order - b.order).map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} userId={userId} />
        ))}
      </div>
    </div>
  );
}
