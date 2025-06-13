// This is an auto-generated file from Firebase Studio.

'use server';

/**
 * @fileOverview An AI agent to automate responses to client queries about accounting.
 *
 * - clientQueryAutomation - A function that handles client queries and provides automated responses.
 * - ClientQueryAutomationInput - The input type for the clientQueryAutomation function.
 * - ClientQueryAutomationOutput - The return type for the clientQueryAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClientQueryAutomationInputSchema = z.object({
  clientQuery: z.string().describe('The client query related to accounting.'),
});
export type ClientQueryAutomationInput = z.infer<typeof ClientQueryAutomationInputSchema>;

const ClientQueryAutomationOutputSchema = z.object({
  response: z.string().describe('The automated response to the client query.'),
});
export type ClientQueryAutomationOutput = z.infer<typeof ClientQueryAutomationOutputSchema>;

export async function clientQueryAutomation(input: ClientQueryAutomationInput): Promise<ClientQueryAutomationOutput> {
  return clientQueryAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clientQueryAutomationPrompt',
  input: {schema: ClientQueryAutomationInputSchema},
  output: {schema: ClientQueryAutomationOutputSchema},
  prompt: `You are an expert accounting assistant. A client has the following question: {{{clientQuery}}}. Provide a concise and helpful answer.`,
});

const clientQueryAutomationFlow = ai.defineFlow(
  {
    name: 'clientQueryAutomationFlow',
    inputSchema: ClientQueryAutomationInputSchema,
    outputSchema: ClientQueryAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
