'use server';

/**
 * @fileOverview Generates content for learning materials using AI.
 *
 * - generateMaterialContent - A function that generates titles, descriptions, and tags for learning materials.
 * - GenerateMaterialContentInput - The input type for the generateMaterialContent function.
 * - GenerateMaterialContentOutput - The return type for the generateMaterialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMaterialContentInputSchema = z.object({
  topic: z.string().describe('The topic of the learning material.'),
  fileType: z.string().describe('The type of the file (e.g., pdf, pptx, video).'),
});
export type GenerateMaterialContentInput = z.infer<typeof GenerateMaterialContentInputSchema>;

const GenerateMaterialContentOutputSchema = z.object({
  title: z.string().describe('The generated title for the learning material.'),
  description: z.string().describe('The generated description for the learning material.'),
  tags: z.array(z.string()).describe('The generated tags for the learning material.'),
});
export type GenerateMaterialContentOutput = z.infer<typeof GenerateMaterialContentOutputSchema>;

export async function generateMaterialContent(
  input: GenerateMaterialContentInput
): Promise<GenerateMaterialContentOutput> {
  return generateMaterialContentFlow(input);
}

const generateMaterialContentPrompt = ai.definePrompt({
  name: 'generateMaterialContentPrompt',
  input: {schema: GenerateMaterialContentInputSchema},
  output: {schema: GenerateMaterialContentOutputSchema},
  prompt: `You are an expert in generating educational content metadata.

  Based on the topic and file type provided, generate a suitable title, a short description, and a list of relevant tags for the learning material.

  Topic: {{{topic}}}
  File Type: {{{fileType}}}

  Ensure the title is engaging and accurately reflects the content.
  The description should be concise and informative.
  The tags should be relevant and helpful for content discovery.

  Return the output in the JSON format specified by the output schema.
  `,
});

const generateMaterialContentFlow = ai.defineFlow(
  {
    name: 'generateMaterialContentFlow',
    inputSchema: GenerateMaterialContentInputSchema,
    outputSchema: GenerateMaterialContentOutputSchema,
  },
  async input => {
    const {output} = await generateMaterialContentPrompt(input);
    return output!;
  }
);
