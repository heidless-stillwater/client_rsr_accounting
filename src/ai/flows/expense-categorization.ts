// Expense categorization flow using Genkit.

'use server';

/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 * - CategorizeExpenseInput - The input type for the categorizeExpense function.
 * - CategorizeExpenseOutput - The return type for the categorizeExpense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeExpenseInputSchema = z.object({
  transactionDescription: z
    .string()
    .describe('The description of the transaction from the bank statement.'),
  transactionAmount: z.number().describe('The amount of the transaction.'),
  previousCategories: z
    .array(z.string())
    .optional()
    .describe('A list of expense categories previously used by the user.'),
});
export type CategorizeExpenseInput = z.infer<typeof CategorizeExpenseInputSchema>;

const CategorizeExpenseOutputSchema = z.object({
  category: z.string().describe('The predicted category for the expense.'),
  confidence: z
    .number()
    .describe('The confidence level (0-1) for the predicted category.'),
  reason: z.string().describe('The reasoning behind the category assignment.'),
});
export type CategorizeExpenseOutput = z.infer<typeof CategorizeExpenseOutputSchema>;

export async function categorizeExpense(input: CategorizeExpenseInput): Promise<CategorizeExpenseOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {schema: CategorizeExpenseInputSchema},
  output: {schema: CategorizeExpenseOutputSchema},
  prompt: `You are an expert accountant specializing in categorizing expenses.

  Given the following transaction description and amount, determine the most appropriate expense category.

  Transaction Description: {{{transactionDescription}}}
  Transaction Amount: {{{transactionAmount}}}

  Here are some previously used categories: {{#each previousCategories}}{{{this}}}, {{/each}}

  Consider common accounting categories such as:
  *   Rent or Mortgage Payments
  *   Utilities (Electricity, Water, Gas)
  *   Office Supplies
  *   Software Subscriptions
  *   Travel Expenses
  *   Meals and Entertainment
  *   Advertising and Marketing
  *   Salaries and Wages
  *   Insurance
  *   Taxes
  *   Bank Fees
  *   Professional Development

  Return the category, your confidence (0-1) in the accuracy of the category, and a brief explanation of why you chose that category.
  Ensure the output is valid JSON in the correct schema.
  `,
});

const categorizeExpenseFlow = ai.defineFlow(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: CategorizeExpenseInputSchema,
    outputSchema: CategorizeExpenseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
