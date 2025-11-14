'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Exercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MatchPairsExerciseProps {
  exercise: Exercise;
  onCheck: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

type PairItem = { value: string; id: string; column: 'left' | 'right' };
type SelectedPair = { item: PairItem; index: number } | null;

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
return array;
}

export function MatchPairsExercise({ exercise, onCheck, isAnswered }: MatchPairsExerciseProps) {
  const { pairs } = exercise;

  const [leftColumn, rightColumn] = useMemo(() => {
    if (!pairs) return [[], []];
    const left = pairs.map((p, i) => ({ value: p.left, id: `l-${i}`, column: 'left' as const }));
    const right = pairs.map((p, i) => ({ value: p.right, id: `r-${i}`, column: 'right' as const }));
    // In a real app, you might want a more stable shuffle for SSR,
    // but for this client component, Math.random is fine.
    return [shuffle(left), shuffle(right)];
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<SelectedPair>(null);
  const [selectedRight, setSelectedRight] = useState<SelectedPair>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const checkMatch = useCallback((leftItem: PairItem, rightItem: PairItem) => {
    const originalPairIndex = parseInt(leftItem.id.split('-')[1]);
    const originalPair = pairs?.[originalPairIndex];
    
    if (originalPair?.right === rightItem.value) {
      setMatchedPairs(prev => {
        const newMatched = [...prev, leftItem.id, rightItem.id];
        if (pairs && newMatched.length === pairs.length * 2) {
            onCheck(true);
        }
        return newMatched;
      });
    } else {
      // Handle incorrect match feedback (e.g., shake animation) if needed
    }
    
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [pairs, onCheck]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      // Add a small delay to show the second selection
      const timer = setTimeout(() => checkMatch(selectedLeft.item, selectedRight.item), 100);
      return () => clearTimeout(timer);
    }
  }, [selectedLeft, selectedRight, checkMatch]);
  
  const handleSelect = (item: PairItem, index: number) => {
    if (isAnswered) return;

    if (item.column === 'left') {
      setSelectedLeft({ item, index });
    } else {
      setSelectedRight({ item, index });
    }
  };

  if (!pairs) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="font-headline text-2xl md:text-3xl">{exercise.prompt}</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {leftColumn.map((item, index) => {
            const isSelected = selectedLeft?.index === index;
            const isMatched = matchedPairs.includes(item.id);
            return (
              <Button
                key={item.id}
                variant={isMatched ? 'default' : 'outline'}
                size="lg"
                className={cn(
                  "h-auto w-full min-h-14 whitespace-normal py-3 text-base",
                  isSelected && !isMatched && "ring-2 ring-primary",
                  isMatched && "bg-green-500 hover:bg-green-600 cursor-default"
                )}
                onClick={() => !isMatched && handleSelect(item, index)}
                disabled={isAnswered}
              >
                {isMatched && <Check className="mr-2 h-5 w-5" />}
                {item.value}
              </Button>
            );
          })}
        </div>
        {/* Right Column */}
        <div className="space-y-3">
          {rightColumn.map((item, index) => {
            const isSelected = selectedRight?.index === index;
            const isMatched = matchedPairs.includes(item.id);
            return (
              <Button
                key={item.id}
                variant={isMatched ? 'default' : 'outline'}
                size="lg"
                className={cn(
                  "h-auto w-full min-h-14 whitespace-normal py-3 text-base",
                  isSelected && !isMatched && "ring-2 ring-primary",
                  isMatched && "bg-green-500 hover:bg-green-600 cursor-default"
                )}
                onClick={() => !isMatched && handleSelect(item, index)}
                disabled={isAnswered}
              >
                {isMatched && <Check className="mr-2 h-5 w-5" />}
                {item.value}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
