import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 1;
  const percentage = (correctCount / totalQuestions) * 100;
  if (percentage < 40) return 1;
  if (percentage < 60) return 2;
  if (percentage < 75) return 3;
  if (percentage < 90) return 4;
  return 5;
}
