"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface PlaceholderToolProps {
  title: string;
  description?: string;
}

export function PlaceholderTool({ title, description = "This tool is currently under development and will be available soon." }: PlaceholderToolProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <Zap className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">Coming Soon!</p>
        <p className="text-muted-foreground">We're working hard to bring you this feature.</p>
      </CardContent>
    </Card>
  );
}
