'use server';

/**
 * @fileOverview Automatically translates text to Spanish using Genkit.
 *
 * - translateToSpanish - A function that translates the input text to Spanish.
 * - TranslateToSpanishInput - The input type for the translateToSpanish function, a string.
 * - TranslateToSpanishOutput - The return type for the translateToSpanish function, a string.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateToSpanishInputSchema = z
  .string()
  .describe('The text to translate to Spanish.');
export type TranslateToSpanishInput = z.infer<
  typeof TranslateToSpanishInputSchema
>;

const TranslateToSpanishOutputSchema = z
  .string()
  .describe('The translated text in Spanish.');
export type TranslateToSpanishOutput = z.infer<
  typeof TranslateToSpanishOutputSchema
>;

export async function translateToSpanish(
  input: TranslateToSpanishInput
): Promise<TranslateToSpanishOutput> {
  return translateToSpanishFlow(input);
}

const translateToSpanishPrompt = ai.definePrompt({
  name: 'translateToSpanishPrompt',
  input: {schema: TranslateToSpanishInputSchema},
  output: {schema: TranslateToSpanishOutputSchema},
  prompt: `Translate the following text to Spanish: {{{text}}}`,
});

const translateToSpanishFlow = ai.defineFlow(
  {
    name: 'translateToSpanishFlow',
    inputSchema: TranslateToSpanishInputSchema,
    outputSchema: TranslateToSpanishOutputSchema,
  },
  async input => {
    const {output} = await translateToSpanishPrompt({text: input});
    return output!;
  }
);
