'use server';
/**
 * @fileOverview Optimizes CV content for better readability and ranking in Applicant Tracking Systems (ATS).
 *
 * - optimizeCvForAts - A function that optimizes the CV content using an AI-powered tool.
 * - OptimizeCvForAtsInput - The input type for the optimizeCvForAts function.
 * - OptimizeCvForAtsOutput - The return type for the optimizeCvForAts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCvForAtsInputSchema = z.object({
  cvContent: z
    .string()
    .describe('The content of the CV to be optimized for ATS.'),
  jobDescription: z
    .string()
    .describe('The job description for which the CV is being optimized.'),
});
export type OptimizeCvForAtsInput = z.infer<typeof OptimizeCvForAtsInputSchema>;

const OptimizeCvForAtsOutputSchema = z.object({
  optimizedCvContent: z
    .string()
    .describe('The optimized content of the CV for ATS.'),
});
export type OptimizeCvForAtsOutput = z.infer<typeof OptimizeCvForAtsOutputSchema>;

export async function optimizeCvForAts(input: OptimizeCvForAtsInput): Promise<OptimizeCvForAtsOutput> {
  return optimizeCvForAtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCvForAtsPrompt',
  input: {schema: OptimizeCvForAtsInputSchema},
  output: {schema: OptimizeCvForAtsOutputSchema},
  prompt: `You are an AI-powered tool that optimizes CV content for Applicant Tracking Systems (ATS).

  Your goal is to improve the CV's readability and ranking in ATS systems, increasing the chances of the candidate getting noticed by recruiters.

  Optimize the CV content based on the provided job description.

  CV Content: {{{cvContent}}}

  Job Description: {{{jobDescription}}}

  Provide the optimized CV content that is ATS-friendly.
  `,
});

const optimizeCvForAtsFlow = ai.defineFlow(
  {
    name: 'optimizeCvForAtsFlow',
    inputSchema: OptimizeCvForAtsInputSchema,
    outputSchema: OptimizeCvForAtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
