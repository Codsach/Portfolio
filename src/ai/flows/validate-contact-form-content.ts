'use server';

/**
 * @fileOverview This file contains a Genkit flow for validating contact form content.
 *
 * The flow uses an LLM to check if the content of a contact form submission is appropriate and safe.
 *
 * @exports {
 *   validateContactFormContent,
 *   ValidateContactFormContentInput,
 *   ValidateContactFormContentOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateContactFormContentInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The message content from the contact form.'),
});

export type ValidateContactFormContentInput = z.infer<
  typeof ValidateContactFormContentInputSchema
>;

const ValidateContactFormContentOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'True if the message content is appropriate and safe, false otherwise.'
    ),
  reason: z
    .string()
    .optional()
    .describe(
      'If the content is not appropriate, provides a reason why it is considered inappropriate.'
    ),
});

export type ValidateContactFormContentOutput = z.infer<
  typeof ValidateContactFormContentOutputSchema
>;

export async function validateContactFormContent(
  input: ValidateContactFormContentInput
): Promise<ValidateContactFormContentOutput> {
  return validateContactFormContentFlow(input);
}

const validateContactFormContentPrompt = ai.definePrompt({
  name: 'validateContactFormContentPrompt',
  input: {schema: ValidateContactFormContentInputSchema},
  output: {schema: ValidateContactFormContentOutputSchema},
  prompt: `You are an AI assistant tasked with validating the content of contact form submissions.

  Determine whether the following contact form submission is appropriate and safe.  Consider aspects like hate speech, harassment, sexually explicit content, dangerous content, and overall appropriateness for a professional website.  The name and email are provided for context, but the primary focus is on the message content.

  Name: {{{name}}}
  Email: {{{email}}}
  Message: {{{message}}}

  Return a JSON object with "isAppropriate" set to true if the content is appropriate, and false otherwise. If isAppropriate is false, provide a brief "reason".  The reason should be no more than 2 sentences.
  `,
});

const validateContactFormContentFlow = ai.defineFlow(
  {
    name: 'validateContactFormContentFlow',
    inputSchema: ValidateContactFormContentInputSchema,
    outputSchema: ValidateContactFormContentOutputSchema,
  },
  async input => {
    const {output} = await validateContactFormContentPrompt(input);
    return output!;
  }
);
