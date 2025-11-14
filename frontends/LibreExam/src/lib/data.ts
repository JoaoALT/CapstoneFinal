import type { Exam } from './types';

export const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'Álgebra Básica',
    questions: [
      { id: 'q1', text: '¿Cuánto es 2 + 2?', type: 'multiple-choice', options: ['3', '4', '5', '6'], correctAnswer: '4', points: 10 },
      { id: 'q2', text: 'Resuelve para x: x - 5 = 10', type: 'open-ended', correctAnswer: '15', points: 20 },
    ],
  },
  {
    id: '2',
    title: 'Historia Universal',
    questions: [
      { id: 'q1', text: '¿En qué año comenzó la Segunda Guerra Mundial?', type: 'multiple-choice', options: ['1936', '1939', '1941', '1945'], correctAnswer: '1939', points: 10 },
      { id: 'q2', text: '¿Quién fue el primer presidente de los Estados Unidos?', type: 'open-ended', correctAnswer: 'George Washington', points: 10 },
    ],
  },
    {
    id: '3',
    title: 'Biología Celular',
    questions: [],
  }
];


export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  correctAnswers: number;
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Ana', score: 30, correctAnswers: 2 },
  { rank: 2, name: 'Carlos', score: 20, correctAnswers: 1 },
  { rank: 3, name: 'Sofía', score: 10, correctAnswers: 1 },
  { rank: 4, name: 'Luis', score: 0, correctAnswers: 0 },
  { rank: 5, name: 'Mariana', score: 0, correctAnswers: 0 },
];

if (typeof window !== 'undefined' && !localStorage.getItem('exams')) {
  localStorage.setItem('exams', JSON.stringify(MOCK_EXAMS));
}
