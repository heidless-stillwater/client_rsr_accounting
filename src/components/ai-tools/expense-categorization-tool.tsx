"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { categorizeExpense, type CategorizeExpenseInput, type CategorizeExpenseOutput } from '@/ai/flows/expense-categorization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  transactionDescription: z.string().min(1, "Transaction description is required."),
  transactionAmount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  previousCategories: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function ExpenseCategorizationTool() {
  const [result, setResult] = useState<CategorizeExpenseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transactionDescription: "",
      transactionAmount: undefined,
      previousCategories: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const input: CategorizeExpenseInput = {
        transactionDescription: data.transactionDescription,
        transactionAmount: data.transactionAmount,
        previousCategories: data.previousCategories?.split(',').map(c => c.trim()).filter(c => c) || [],
      };
      const response = await categorizeExpense(input);
      setResult(response);
    } catch (error) {
      console.error("Error categorizing expense:", error);
      toast({
        title: "Error",
        description: "Failed to categorize expense. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Automated Expense Categorization</CardTitle>
        <CardDescription>Enter transaction details to automatically categorize expenses.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="transactionDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Office Supplies Purchase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 49.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Categories (comma-separated, optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Office Supplies, Software, Travel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Categorize Expense
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Categorization Result:</h3>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          <p><strong>Reason:</strong> {result.reason}</p>
        </CardContent>
      )}
    </Card>
  );
}
