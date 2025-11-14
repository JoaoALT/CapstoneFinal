'use server';

import { courses, units, lessons, exercises, userProgress } from './data';
import type { Course, Unit, Lesson, Exercise, UserProgress, LessonAttempt } from './types';
import { Timestamp } from 'firebase/firestore';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getCourses(): Promise<Course[]> {
  await delay(100);
  return courses;
}

export async function getCourse(id: string): Promise<Course | undefined> {
  await delay(100);
  return courses.find(c => c.id === id);
}

export async function getUnits(courseId: string): Promise<Unit[]> {
  await delay(100);
  return units.filter(u => u.courseId === courseId);
}

export async function getUnit(id: string): Promise<Unit | undefined> {
  await delay(100);
  return units.find(u => u.id === id);
}

export async function getLessons(unitId: string): Promise<Lesson[]> {
  await delay(100);
  return lessons.filter(l => l.unitId === unitId);
}

export async function getLesson(id: string): Promise<Lesson | undefined> {
  await delay(100);
  return lessons.find(l => l.id === id);
}

export async function getExercises(lessonId: string): Promise<Exercise[]> {
  await delay(100);
  return exercises.filter(e => e.lessonId === lessonId).sort((a, b) => a.order - b.order);
}

export async function getUserProgressForCourse(userId: string | undefined, courseId: string): Promise<UserProgress[]> {
  await delay(100);
  if (!userId) return [];
  return userProgress.filter(p => p.courseId === courseId);
}

export async function getUserProgressForLesson(userId: string | undefined, lessonId: string): Promise<UserProgress | undefined> {
    await delay(100);
    if (!userId) return undefined;
    return userProgress.find(p => p.lessonId === lessonId);
}

export async function saveLessonAttempt(attempt: Omit<LessonAttempt, 'id' | 'completedAt'>): Promise<void> {
    console.log('Saving lesson attempt:', attempt);
    // Since we removed login, we'll just log this.
    // In a real app with users, you'd save this to a database.
    await delay(500);
    return;
}
