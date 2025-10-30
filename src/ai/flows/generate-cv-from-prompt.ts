'use server';

/**
 * @fileOverview Generates a CV draft based on a user-provided prompt.
 *
 * - generateCvFromPrompt - A function that generates a CV draft.
 * - GenerateCvFromPromptInput - The input type for the generateCvFromPrompt function.
 * - GenerateCvFromPromptOutput - The return type for the generateCvFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCvFromPromptInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A prompt describing the profession, experience, and desired content of the CV.'
    ),
});
export type GenerateCvFromPromptInput = z.infer<typeof GenerateCvFromPromptInputSchema>;

const GenerateCvFromPromptOutputSchema = z.object({
  cvDraft: z.string().describe('The generated CV draft in text format.'),
});
export type GenerateCvFromPromptOutput = z.infer<typeof GenerateCvFromPromptOutputSchema>;

export async function generateCvFromPrompt(input: GenerateCvFromPromptInput): Promise<GenerateCvFromPromptOutput> {
  return generateCvFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCvFromPromptPrompt',
  input: {schema: GenerateCvFromPromptInputSchema},
  output: {schema: GenerateCvFromPromptOutputSchema},
  prompt: `You are an expert CV writer. Generate a CV draft based on the following prompt:\n\n{{{prompt}}}`,
});

const generateCvFromPromptFlow = ai.defineFlow(
  {
    name: 'generateCvFromPromptFlow',
    inputSchema: GenerateCvFromPromptInputSchema,
    outputSchema: GenerateCvFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
