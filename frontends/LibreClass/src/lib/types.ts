import type { Timestamp } from "firebase/firestore";

export interface Grade {
  id: string;
  name: string;
  code: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Subject {
  id:string;
  name: string;
  code: string;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'pptx' | 'video' | 'other';
  filePath: string;
  fileSize?: number;
  estimatedDurationMinutes?: number;
  tags?: string[];
  displayOrder: number;
  isActive: boolean;
  gradeId?: string; // May not exist on old mock data
  subjectId?: string; // May not exist on old mock data
}

export interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

export interface UserMaterialStatus {
  id: string;
  gradeId: string;
  subjectId: string;
  lastOpenedAt?: Timestamp;
  completed?: boolean;
  favorite?: boolean;
}
