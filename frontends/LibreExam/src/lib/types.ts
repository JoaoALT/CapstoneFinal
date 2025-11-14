export type Question = {
  id: string;
  text: string;
  type: 'multiple-choice' | 'open-ended';
  options?: string[];
  correctAnswer?: string;
  points: number;
};

export type Exam = {
  id: string;
  title: string;
  questions: Question[];
};
