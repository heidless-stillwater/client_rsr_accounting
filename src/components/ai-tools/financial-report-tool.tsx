"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateFinancialReport, type FinancialReportInput, type FinancialReportOutput } from '@/ai/flows/financial-report-generation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  financialData: z.string().min(1, "Financial data is required."),
  reportType: z.string().min(1, "Report type is required."),
  additionalInstructions: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function FinancialReportTool() {
  const [result, setResult] = useState<FinancialReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      financialData: "",
      reportType: "",
      additionalInstructions: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const input: FinancialReportInput = data;
      const response = await generateFinancialReport(input);
      setResult(response);
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!result || !result.report) return;
    const blob = new Blob([result.report], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${form.getValues('reportType') || 'Financial_Report'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Report Generation</CardTitle>
        <CardDescription>Provide financial data and instructions to generate a report.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="financialData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Data (e.g., CSV, JSON, or plain text list of transactions)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your financial data here..." {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Income Statement">Income Statement</SelectItem>
                      <SelectItem value="Balance Sheet">Balance Sheet</SelectItem>
                      <SelectItem value="Cash Flow Statement">Cash Flow Statement</SelectItem>
                      <SelectItem value="Sales Report">Sales Report</SelectItem>
                      <SelectItem value="Expense Report">Expense Report</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Instructions (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Focus on Q3 performance, compare year-over-year growth..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Report
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-6 border-t pt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Generated Report:</h3>
            <Button onClick={handleDownload} variant="outline" size="sm">Download Report</Button>
          </div>
          <Textarea value={result.report} readOnly rows={15} className="font-mono text-sm" />
        </CardContent>
      )}
    </Card>
  );
}
