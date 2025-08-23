'use server';

/**
 * @fileOverview Suggests related topics and keywords based on the note's content.
 *
 * - suggestRelatedTopics - A function that handles the suggestion of related topics.
 * - SuggestRelatedTopicsInput - The input type for the suggestRelatedTopics function.
 * - SuggestRelatedTopicsOutput - The return type for the suggestRelatedTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedTopicsInputSchema = z.object({
  noteContent: z.string().describe('The content of the note.'),
});
export type SuggestRelatedTopicsInput = z.infer<typeof SuggestRelatedTopicsInputSchema>;

const SuggestRelatedTopicsOutputSchema = z.object({
  relatedTopics: z.array(z.string()).describe('An array of related topics.'),
  keywords: z.array(z.string()).describe('An array of keywords.'),
});
export type SuggestRelatedTopicsOutput = z.infer<typeof SuggestRelatedTopicsOutputSchema>;

export async function suggestRelatedTopics(input: SuggestRelatedTopicsInput): Promise<SuggestRelatedTopicsOutput> {
  return suggestRelatedTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedTopicsPrompt',
  input: {schema: SuggestRelatedTopicsInputSchema},
  output: {schema: SuggestRelatedTopicsOutputSchema},
  prompt: `You are an AI assistant that suggests related topics and keywords based on the content of a note.

  Note Content: {{{noteContent}}}

  Please provide a list of related topics and keywords that would be helpful to the user.
  Format the output as a JSON object with "relatedTopics" and "keywords" fields.`, 
});

const suggestRelatedTopicsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedTopicsFlow',
    inputSchema: SuggestRelatedTopicsInputSchema,
    outputSchema: SuggestRelatedTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
