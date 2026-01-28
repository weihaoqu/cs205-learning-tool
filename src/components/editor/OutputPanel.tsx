'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OutputPanelProps {
  output: string;
  error: string | null;
  isExecuting: boolean;
  executionTime?: number | null;
  memoryUsage?: number | null;
}

export function OutputPanel({
  output,
  error,
  isExecuting,
  executionTime,
  memoryUsage,
}: OutputPanelProps) {
  return (
    <Card>
      <CardHeader className="py-2 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Output</CardTitle>
          {isExecuting && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              Running...
            </div>
          )}
          {!isExecuting && executionTime !== null && executionTime !== undefined && (
            <div className="text-xs text-muted-foreground">
              Time: {executionTime}s
              {memoryUsage && ` | Memory: ${(memoryUsage / 1024).toFixed(1)}KB`}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-zinc-900 text-zinc-100 font-mono text-sm p-4 min-h-[120px] max-h-[300px] overflow-auto">
          {isExecuting ? (
            <div className="text-zinc-400">Executing code...</div>
          ) : error ? (
            <div className="text-red-400 whitespace-pre-wrap">{error}</div>
          ) : output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-zinc-500">
              Click &quot;Run&quot; to execute the code
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
