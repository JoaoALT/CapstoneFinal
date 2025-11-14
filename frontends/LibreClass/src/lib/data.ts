import seedData from './seed-data.json';
import type { Grade, Subject, Material, UserMaterialStatus } from './types';
import { db } from './firebase'; 
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// In a real app, you might remove the mocking logic once Firestore is populated.
const USE_MOCK_DATA = true;

// --- Mock Data Access ---
const getMockGrades = (): Grade[] => seedData.grades.sort((a, b) => a.displayOrder - b.displayOrder);
const getMockGradeById = (id: string): Grade | undefined => seedData.grades.find(g => g.id === id);
const getMockSubjectsByGradeId = (gradeId: string): Subject[] => (seedData.subjects[gradeId as keyof typeof seedData.subjects] || []).sort((a, b) => a.displayOrder - b.displayOrder);
const getMockSubjectById = (gradeId: string, subjectId: string): Subject | undefined => (seedData.subjects[gradeId as keyof typeof seedData.subjects] || []).find(s => s.id === subjectId);
const getMockMaterials = (gradeId: string, subjectId: string): Material[] => {
  const key = `${gradeId}_${subjectId}`;
  return (seedData.materials[key as keyof typeof seedData.materials] || []).sort((a, b) => a.displayOrder - b.displayOrder);
};
const getMockMaterialById = (gradeId: string, subjectId: string, materialId: string): Material | undefined => {
    const key = `${gradeId}_${subjectId}`;
    const materials = seedData.materials[key as keyof typeof seedData.materials] || [];
    return materials.find(m => m.id === materialId);
}

// --- Firestore Data Access ---
const getFirestoreGrades = async (): Promise<Grade[]> => {
    const gradesCol = collection(db, 'grades');
    const snapshot = await getDocs(gradesCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Grade)).sort((a, b) => a.displayOrder - b.displayOrder);
};

// ... Implement other Firestore fetch functions as needed for a real app

// --- Exported Functions ---

export async function getGrades(): Promise<Grade[]> {
  if (USE_MOCK_DATA) return getMockGrades();
  return getFirestoreGrades();
}

export async function getGradeById(id: string): Promise<Grade | undefined> {
  if (USE_MOCK_DATA) return getMockGradeById(id);
  const docRef = doc(db, 'grades', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Grade : undefined;
}

export async function getSubjectsByGradeId(gradeId: string): Promise<Subject[]> {
  if (USE_MOCK_DATA) return getMockSubjectsByGradeId(gradeId);
  const subjectsCol = collection(db, `grades/${gradeId}/subjects`);
  const snapshot = await getDocs(subjectsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject)).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getSubjectById(gradeId: string, subjectId: string): Promise<Subject | undefined> {
    if (USE_MOCK_DATA) return getMockSubjectById(gradeId, subjectId);
    const docRef = doc(db, `grades/${gradeId}/subjects`, subjectId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Subject : undefined;
}

export async function getMaterials(gradeId: string, subjectId: string): Promise<Material[]> {
  if (USE_MOCK_DATA) return getMockMaterials(gradeId, subjectId);
  const materialsCol = collection(db, `grades/${gradeId}/subjects/${subjectId}/materials`);
  const snapshot = await getDocs(materialsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Material)).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getMaterialById(gradeId: string, subjectId: string, materialId: string): Promise<Material | undefined> {
    if (USE_MOCK_DATA) return getMockMaterialById(gradeId, subjectId, materialId);
    const docRef = doc(db, `grades/${gradeId}/subjects/${subjectId}/materials`, materialId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Material : undefined;
}


export async function getMaterialsWithStatus(userId: string, gradeId: string, subjectId: string): Promise<(Material & { status?: UserMaterialStatus })[]> {
  // Always return materials without status in local mode
  const materials = await getMaterials(gradeId, subjectId);
  return materials;
}

export async function getMaterialStatus(userId: string, materialId: string): Promise<UserMaterialStatus | undefined> {
    // No status in local mode
    return undefined;
}
