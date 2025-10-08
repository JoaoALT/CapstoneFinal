
export enum LessonStatus {
  Completed = 'COMPLETED',
  Current = 'CURRENT',
  Locked = 'LOCKED',
}

export interface Lesson {
  id: number;
  title: string;
  status: LessonStatus;
}
