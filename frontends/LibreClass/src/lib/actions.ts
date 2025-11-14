"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { generateMaterialContent } from '@/ai/flows/generate-material-content';
import { z } from 'zod';

const favoriteSchema = z.object({
  materialId: z.string(),
  gradeId: z.string(),
  subjectId: z.string(),
  isFavorited: z.boolean(),
});

export async function toggleFavorite(values: z.infer<typeof favoriteSchema>) {
  console.log("toggleFavorite called, but it's disabled in local mode.", values);
  return { success: false, error: 'Función no disponible en modo local.' };
}

const generateSchema = z.object({
  topic: z.string(),
  fileType: z.string(),
});

export async function generateMaterialDetails(values: z.infer<typeof generateSchema>) {
    const { topic, fileType } = generateSchema.parse(values);
    try {
        const result = await generateMaterialContent({ topic, fileType });
        return { success: true, data: result };
    } catch (error) {
        console.error('Error generating material content:', error);
        return { success: false, error: 'Failed to generate content.' };
    }
}
