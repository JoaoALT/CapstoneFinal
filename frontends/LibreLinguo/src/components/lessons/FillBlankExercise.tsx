'use client';

import { useState } from 'react';
import type { Exercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FillBlankExerciseProps {
  exercise: Exercise;
  onCheck: (isCorrect: boolean) => void;
  isAnswered: boolean;
  isCorrect: boolean | null | undefined;
  showFeedback: boolean;
}

export function FillBlankExercise({ exercise, onCheck, isAnswered, isCorrect, showFeedback }: FillBlankExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  
  if (!exercise.textWithBlank || !exercise.correctAnswer) return null;

  const parts = exercise.textWithBlank.split('___');

  const handleLocalCheck = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer?.toLowerCase();
    onCheck(isCorrect);
  };

  return (
    <div className="space-y-8 text-center">
      <h2 className="font-headline text-2xl md:text-3xl">{exercise.prompt}</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg border bg-card p-6 text-xl md:text-2xl">
        <span>{parts[0]}</span>
        <Input
          type="text"
          className={cn(
            "h-12 w-32 flex-shrink-0 text-center text-xl font-bold md:w-48 md:text-2xl",
            showFeedback && isCorrect && "border-green-500 ring-green-500",
            showFeedback && !isCorrect && "border-red-500 ring-red-500",
          )}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isAnswered}
          onKeyDown={(e) => e.key === 'Enter' && !isAnswered && handleLocalCheck()}
        />
        <span>{parts[1]}</span>
      </div>
      {!isAnswered && (
        <Button onClick={handleLocalCheck}>Comprobar</Button>
      )}
    </div>
  );
}
