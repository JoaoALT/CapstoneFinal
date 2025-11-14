'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { calculateScore } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { PartyPopper, Repeat } from 'lucide-react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  
  const correct = parseInt(searchParams.get('correct') || '0', 10);
  const total = parseInt(searchParams.get('total') || '0', 10);
  const lessonId = params.lessonId as string;
  
  const score = calculateScore(correct, total);

  const getResultMessage = () => {
    if (score === 5) return "¡Perfecto! ¡Dominas esta lección!";
    if (score >= 3) return "¡Muy bien! Sigue así.";
    return "¡Buen intento! No te rindas y vuelve a intentarlo.";
  };
  
  const unitId = lessonId.split('-').slice(0, 3).join('-');
  const courseId = lessonId.split('-').slice(0, 2).join('-');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg text-center shadow-2xl animate-bounce-in">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
            <PartyPopper size={40} />
          </div>
          <CardTitle className="font-headline mt-4 text-3xl">¡Lección completada!</CardTitle>
          <CardDescription className="text-lg">{getResultMessage()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl">Tu nota es:</p>
          <ScoreDisplay score={score} className="mx-auto justify-center" />
          <p className="text-muted-foreground">{correct} de {total} respuestas correctas</p>
        </CardContent>
        <CardFooter className="flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="w-full" onClick={() => router.push(`/lessons/${lessonId}`)}>
            <Repeat className="mr-2 h-4 w-4" />
            Repetir lección
          </Button>
          <Link href={`/courses/${courseId}/units/${unitId}`} className="w-full">
            <Button className="w-full font-bold">Volver a lecciones</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LessonResultsPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando resultados...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
