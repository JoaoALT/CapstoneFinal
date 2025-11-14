import { getCourses } from '@/lib/api';
import type { Course } from '@/lib/types';
import { CourseCard } from '@/components/CourseCard';
import { unstable_noStore as noStore } from 'next/cache';

export default async function CoursesPage() {
  noStore(); // Mark this page as dynamic
  const courses = await getCourses();
  const activeCourses = courses.filter(c => c.isActive);
  
  const userId = undefined; // No user logged in

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Cursos Disponibles</h1>
        <p className="mt-2 text-lg text-muted-foreground">Elige un idioma y comienza tu aventura de aprendizaje.</p>
      </div>
      
      {activeCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map(course => (
            <CourseCard key={course.id} course={course} userId={userId} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
            <h3 className="font-headline text-xl font-semibold">No hay cursos activos</h3>
            <p className="mt-2 text-muted-foreground">Pronto añadiremos nuevo contenido. ¡Vuelve a visitarnos!</p>
        </div>
      )}
    </div>
  );
}
