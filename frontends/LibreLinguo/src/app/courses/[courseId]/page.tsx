import Link from 'next/link';
import { getCourse, getUnits } from '@/lib/api';
import { UnitCard } from '@/components/UnitCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

interface CoursePageParams {
  params: {
    courseId: string;
  };
}

export default async function CoursePage({ params }: CoursePageParams) {
  noStore();
  const courseId = params.courseId;
  const course = await getCourse(courseId);
  const units = await getUnits(courseId);
  const userId = undefined;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <h1 className="font-headline text-3xl font-bold">Curso no encontrado</h1>
        <Link href="/courses">
          <Button variant="link">Volver a los cursos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/courses" className="mb-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Todos los cursos
        </Link>
        <h1 className="font-headline text-4xl font-bold">{course.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{course.description}</p>
      </div>

      <div className="space-y-6">
        {units.sort((a, b) => a.order - b.order).map((unit, index) => (
          <UnitCard key={unit.id} unit={unit} index={index} userId={userId} />
        ))}
      </div>
    </div>
  );
}
