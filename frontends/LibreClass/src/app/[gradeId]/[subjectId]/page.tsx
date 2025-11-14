import AppLayout from '@/components/layout/AppLayout';
import { getGradeById, getSubjectById, getMaterialsWithStatus } from '@/lib/data';
import { notFound } from 'next/navigation';
import MaterialListItem from '@/components/materials/material-list-item';

type MaterialsPageProps = {
  params: {
    gradeId: string;
    subjectId: string;
  };
};

export default async function MaterialsPage({ params }: MaterialsPageProps) {
  const { gradeId, subjectId } = params;

  const [grade, subject, materials] = await Promise.all([
    getGradeById(gradeId),
    getSubjectById(gradeId, subjectId),
    getMaterialsWithStatus('', gradeId, subjectId)
  ]);

  if (!grade || !subject) {
    notFound();
  }

  const breadcrumbs = [
    { href: '/', label: 'Grados' },
    { href: `/${gradeId}`, label: grade.name },
    { href: `/${gradeId}/${subjectId}`, label: subject.name },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
       <div className="flex flex-col items-start gap-4 mb-4">
        <h1 className="text-xl font-bold text-foreground">Materiales</h1>
      </div>
      <div className="flex flex-col gap-2">
        {materials.map((material) => (
          <MaterialListItem
            key={material.id}
            gradeId={gradeId}
            subjectId={subjectId}
            material={material}
          />
        ))}
         {materials.length === 0 && (
            <p>No hay materiales disponibles para esta materia.</p>
        )}
      </div>
    </AppLayout>
  );
}
