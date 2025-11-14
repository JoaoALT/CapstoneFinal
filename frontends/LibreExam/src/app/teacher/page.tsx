"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileText, Clock, Edit, Play } from 'lucide-react';
import type { Exam } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const storedExams = localStorage.getItem('exams');
    if (storedExams) {
      setExams(JSON.parse(storedExams));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">Mis Exámenes</h2>
          <p className="text-muted-foreground">Administra, edita y hospeda tus exámenes desde aquí.</p>
        </div>
        <Button asChild>
          <Link href="/teacher/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nuevo Examen
          </Link>
        </Button>
      </div>

      {exams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline">{exam.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> {exam.questions.length} preguntas
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {exam.questions.length * 2} min (aprox.)
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {exam.questions.length > 0 ? `Comienza con: "${exam.questions[0].text}"` : "Este examen aún no tiene preguntas."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" disabled>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button asChild>
                    <Link href={`/teacher/exam/${exam.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Hospedar
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No has creado ningún examen</h3>
          <p className="text-muted-foreground mt-2 mb-4">¡Comienza por crear tu primer examen para tus estudiantes!</p>
          <Button asChild>
            <Link href="/teacher/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear Examen
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
