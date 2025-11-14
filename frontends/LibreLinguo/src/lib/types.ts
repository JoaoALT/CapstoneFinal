import type { Timestamp } from "firebase/firestore";

// This file is kept for data structure reference, but UserProfile is no longer used.

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  preferredLanguageLearning: string;
  interfaceLanguage: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

export interface Course {
  id: string;
  name: string;
  languageCode: string;
  baseLanguage: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  order: number;
  description: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  courseId: string;
  title: string;
  order: number;
  targetSkill: string;
  estimatedDurationMinutes: number;
  isActive: boolean;
}

export type ExerciseType = "multiple_choice" | "match_pairs" | "fill_in_blank";

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  prompt: string;
  questionAudioUrl?: string;
  imageUrl?: string;
  order: number;
  points?: number;

  // For multiple_choice
  options?: string[];
  correctOptionIndex?: number;

  // For match_pairs
  pairs?: { left: string; right: string }[];

  // For fill_in_blank
  textWithBlank?: string;
  correctAnswer?: string;
}

export interface LessonAttempt {
  id?: string;
  userId: string;
  courseId: string;
  unitId: string;
  lessonId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: Timestamp;
}

export interface UserProgress {
  id?: string;
  userId: string; // Keep for structure, but will be undefined
  courseId: string;
  unitId: string;
  lessonId: string;
  bestScore: number;
  attemptsCount: number;
  lastAttemptAt: Timestamp;
  completed: boolean;
}
