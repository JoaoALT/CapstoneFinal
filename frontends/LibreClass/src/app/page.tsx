import AppLayout from '@/components/layout/AppLayout';
import { getGrades } from '@/lib/data';
import GradeCard from '@/components/grades/grade-card';
import { notFound } from 'next/navigation';

export default async function GradesPage() {
  const grades = await getGrades();

  if (!grades) {
    notFound();
  }

  const breadcrumbs = [{ href: '/', label: 'Grados' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <h1 className="text-xl font-bold mb-4">Grados</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {grades.map((grade) => (
          <GradeCard key={grade.id} grade={grade} />
        ))}
      </div>
    </AppLayout>
  );
}
