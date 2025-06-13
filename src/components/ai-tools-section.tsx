"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCategorizationTool } from "./ai-tools/expense-categorization-tool";
import { FinancialReportTool } from "./ai-tools/financial-report-tool";
import { ClientQueryTool } from "./ai-tools/client-query-tool";
import { PlaceholderTool } from "./ai-tools/placeholder-tool";

const aiTools = [
  { id: "expense-categorization", title: "Expense Categorization", component: <ExpenseCategorizationTool /> },
  { id: "financial-report", title: "Financial Reports", component: <FinancialReportTool /> },
  { id: "client-query", title: "Client Q&A", component: <ClientQueryTool /> },
  { id: "tax-compliance", title: "Tax Compliance", component: <PlaceholderTool title="Tax Compliance Assistant" /> },
  { id: "invoice-processing", title: "Invoice Processing", component: <PlaceholderTool title="Invoice Processing Automation" /> },
  { id: "cash-flow", title: "Cash Flow Forecast", component: <PlaceholderTool title="Cash Flow Forecasting" /> },
  { id: "anomaly-detection", title: "Anomaly Detection", component: <PlaceholderTool title="Anomaly Detection in Transactions" /> },
  { id: "predictive-analytics", title: "Predictive Analytics", component: <PlaceholderTool title="Predictive Analytics for Growth" /> },
];

export function AiToolsSection() {
  return (
    <section id="ai-tools" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-headline">
          AI-Powered Accounting Tools
        </h2>
        <Tabs defaultValue={aiTools[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 mb-8 h-auto flex-wrap">
            {aiTools.map(tool => (
              <TabsTrigger key={tool.id} value={tool.id} className="text-sm md:text-base py-2.5">
                {tool.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {aiTools.map(tool => (
            <TabsContent key={tool.id} value={tool.id}>
              {tool.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
