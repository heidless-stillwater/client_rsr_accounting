// This is an auto-generated file from Firebase Studio.

'use server';

/**
 * @fileOverview Financial report generation flow using Genkit.
 *
 * - generateFinancialReport - A function that handles the financial report generation process.
 * - FinancialReportInput - The input type for the generateFinancialReport function.
 * - FinancialReportOutput - The return type for the generateFinancialReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialReportInputSchema = z.object({
  financialData: z
    .string()
    .describe('The financial data to generate the report from.'),
  reportType: z
    .string()
    .describe('The type of financial report to generate (e.g., Income Statement, Balance Sheet).'),
  additionalInstructions: z
    .string()
    .optional()
    .describe('Any additional instructions for generating the report.'),
});
export type FinancialReportInput = z.infer<typeof FinancialReportInputSchema>;

const FinancialReportOutputSchema = z.object({
  report: z.string().describe('The generated financial report.'),
});
export type FinancialReportOutput = z.infer<typeof FinancialReportOutputSchema>;

export async function generateFinancialReport(input: FinancialReportInput): Promise<FinancialReportOutput> {
  return financialReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialReportPrompt',
  input: {schema: FinancialReportInputSchema},
  output: {schema: FinancialReportOutputSchema},
  prompt: `You are an expert accountant specializing in generating financial reports.

  You will use the provided financial data to generate a {{reportType}}.
  Follow any additional instructions provided.

  Financial Data: {{{financialData}}}
  Additional Instructions: {{{additionalInstructions}}}

  Please generate the financial report in a clear and concise manner.
  `,
});

const financialReportFlow = ai.defineFlow(
  {
    name: 'financialReportFlow',
    inputSchema: FinancialReportInputSchema,
    outputSchema: FinancialReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
