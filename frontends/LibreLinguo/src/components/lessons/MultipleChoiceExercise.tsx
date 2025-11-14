import Image from 'next/image';
import type { Exercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onCheck: (isCorrect: boolean) => void;
  isAnswered: boolean;
  isCorrect: boolean | null | undefined;
  showFeedback: boolean;
}

export function MultipleChoiceExercise({ exercise, onCheck, isAnswered, isCorrect, showFeedback }: MultipleChoiceExerciseProps) {
  if (!exercise.options || exercise.correctOptionIndex === undefined) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="font-headline text-2xl md:text-3xl">{exercise.prompt}</h2>
      
      {exercise.imageUrl && (
        <div className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-lg shadow-md">
          <Image src={exercise.imageUrl} alt={exercise.prompt} layout="fill" objectFit="cover" data-ai-hint="lesson exercise"/>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {exercise.options.map((option, index) => {
          const isCorrectAnswer = index === exercise.correctOptionIndex;
          const isSelected = isAnswered && showFeedback;

          return (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={cn(
                "h-auto min-h-16 whitespace-normal py-4 text-base",
                isSelected && isCorrectAnswer && "border-green-500 bg-green-100 text-green-800 hover:bg-green-200 border-2",
                isSelected && !isCorrectAnswer && "border-red-500 bg-red-100 text-red-800 hover:bg-red-200 border-2",
              )}
              onClick={() => onCheck(isCorrectAnswer)}
              disabled={isAnswered}
            >
              {option}
            </Button>
          )
        })}
      </div>
    </div>
  );
}
