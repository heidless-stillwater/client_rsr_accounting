"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clientQueryAutomation, type ClientQueryAutomationInput, type ClientQueryAutomationOutput } from '@/ai/flows/client-query-automation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  clientQuery: z.string().min(1, "Client query is required."),
});

type FormValues = z.infer<typeof FormSchema>;

export function ClientQueryTool() {
  const [result, setResult] = useState<ClientQueryAutomationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientQuery: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const input: ClientQueryAutomationInput = data;
      const response = await clientQueryAutomation(input);
      setResult(response);
    } catch (error) {
      console.error("Error processing query:", error);
      toast({
        title: "Error",
        description: "Failed to process query. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Client Query Automation</CardTitle>
        <CardDescription>Get AI-powered answers to common accounting questions.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="clientQuery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Query</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., What are the deadlines for VAT returns?" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Answer
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <p className="whitespace-pre-wrap">{result.response}</p>
        </CardContent>
      )}
    </Card>
  );
}
