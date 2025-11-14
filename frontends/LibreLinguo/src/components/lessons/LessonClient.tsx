'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Lesson, Unit, Exercise } from '@/lib/types';
import { LessonHeader } from './LessonHeader';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { MatchPairsExercise } from './MatchPairsExercise';
import { FillBlankExercise } from './FillBlankExercise';
import { LessonControls } from './LessonControls';

interface LessonClientProps {
  lesson: Lesson;
  unit: Unit | undefined;
  exercises: Exercise[];
}

export function LessonClient({ lesson, unit, exercises }: LessonClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  
  const currentExercise = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;
  const isAnswered = answers[currentExercise.id] !== undefined && answers[currentExercise.id] !== null;

  const handleCheck = (isCorrect: boolean) => {
    setAnswers(prev => ({ ...prev, [currentExercise.id]: isCorrect }));
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    if (isLastExercise) {
      const correctCount = Object.values(answers).filter(a => a === true).length;
      router.push(`/lessons/${lesson.id}/results?correct=${correctCount}&total=${exercises.length}`);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceExercise
            exercise={currentExercise}
            onCheck={handleCheck}
            isAnswered={isAnswered}
            isCorrect={answers[currentExercise.id]}
            showFeedback={showFeedback}
          />
        );
      case 'match_pairs':
        return (
          <MatchPairsExercise
            exercise={currentExercise}
            onCheck={handleCheck}
            isAnswered={isAnswered}
          />
        );
      case 'fill_in_blank':
        return (
          <FillBlankExercise
            exercise={currentExercise}
            onCheck={handleCheck}
            isAnswered={isAnswered}
            isCorrect={answers[currentExercise.id]}
            showFeedback={showFeedback}
          />
        );
      default:
        return <div>Tipo de ejercicio no soportado.</div>;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <LessonHeader lesson={lesson} unit={unit} totalExercises={exercises.length} currentIndex={currentIndex} />
      <div className="flex flex-grow items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl">
          {renderExercise()}
        </div>
      </div>
      <LessonControls
        isAnswered={isAnswered}
        isCorrect={answers[currentExercise.id]}
        onContinue={handleContinue}
        showFeedback={showFeedback}
      />
    </div>
  );
}
