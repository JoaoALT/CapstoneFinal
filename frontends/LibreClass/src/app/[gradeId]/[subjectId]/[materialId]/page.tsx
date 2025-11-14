import AppLayout from '@/components/layout/AppLayout';
import MaterialViewer from '@/components/materials/material-viewer';
import { getGradeById, getSubjectById, getMaterialById } from '@/lib/data';
import { notFound } from 'next/navigation';

type MaterialViewerPageProps = {
  params: {
    gradeId: string;
    subjectId: string;
    materialId: string;
  };
};

export default async function MaterialViewerPage({ params }: MaterialViewerPageProps) {
  const { gradeId, subjectId, materialId } = params;

  const [grade, subject, material] = await Promise.all([
    getGradeById(gradeId),
    getSubjectById(gradeId, subjectId),
    getMaterialById(gradeId, subjectId, materialId)
  ]);

  if (!grade || !subject || !material) {
    notFound();
  }

  const breadcrumbs = [
    { href: '/', label: 'Grados' },
    { href: `/${gradeId}`, label: grade.name },
    { href: `/${gradeId}/${subjectId}`, label: subject.name },
    { href: `/${gradeId}/${subjectId}/${materialId}`, label: material.title },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <MaterialViewer material={material} />
    </AppLayout>
  );
}
