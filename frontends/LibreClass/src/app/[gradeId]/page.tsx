import AppLayout from '@/components/layout/AppLayout';
import SubjectCard from '@/components/subjects/subject-card';
import { getGradeById, getSubjectsByGradeId } from '@/lib/data';
import { notFound } from 'next/navigation';

type SubjectPageProps = {
  params: {
    gradeId: string;
  };
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { gradeId } = params;
  const [grade, subjects] = await Promise.all([
    getGradeById(gradeId),
    getSubjectsByGradeId(gradeId)
  ]);

  if (!grade) {
    notFound();
  }

  const breadcrumbs = [
    { href: '/', label: 'Grados' },
    { href: `/${gradeId}`, label: grade.name },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <h2 className="text-xl font-bold mb-4">Materias</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} gradeId={gradeId} subject={subject} />
        ))}
        {subjects.length === 0 && (
            <p>No hay materias disponibles para este grado.</p>
        )}
      </div>
    </AppLayout>
  );
}
