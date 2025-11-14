import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

interface LessonControlsProps {
  isAnswered: boolean;
  isCorrect: boolean | null | undefined;
  onContinue: () => void;
  showFeedback: boolean;
}

export function LessonControls({ isAnswered, isCorrect, onContinue, showFeedback }: LessonControlsProps) {
  
  const feedbackClasses = cn(
    "flex items-center gap-4 p-6 font-bold text-lg",
    isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  );

  return (
    <footer className="border-t">
      {showFeedback && isAnswered ? (
        <div className={feedbackClasses}>
          <div className="flex-shrink-0">
            {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
          </div>
          <div className="flex-grow">
            <p>{isCorrect ? '¡Buen trabajo!' : 'Respuesta incorrecta'}</p>
          </div>
          <Button onClick={onContinue} className="font-bold">
            Continuar
          </Button>
        </div>
      ) : (
        <div className="container mx-auto flex h-24 items-center justify-end p-4">
          <Button onClick={onContinue} disabled={!isAnswered} className="font-bold">
            Continuar
          </Button>
        </div>
      )}
    </footer>
  );
}
