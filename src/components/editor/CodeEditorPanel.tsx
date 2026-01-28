'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { javaTemplates, templateInfo, type JavaTemplate } from '@/lib/codeExecution/templates';

interface CodeEditorPanelProps {
  initialTemplate?: JavaTemplate;
  initialCode?: string;
  highlightedLine?: number | null;
  onCodeChange?: (code: string) => void;
  showTemplateSelector?: boolean;
  height?: string | number;
}

interface ExecutionState {
  output: string;
  error: string | null;
  isExecuting: boolean;
  executionTime: number | null;
  memoryUsage: number | null;
}

export function CodeEditorPanel({
  initialTemplate = 'basicArray',
  initialCode,
  highlightedLine = null,
  onCodeChange,
  showTemplateSelector = true,
  height = '350px',
}: CodeEditorPanelProps) {
  const [code, setCode] = useState<string>(initialCode ?? javaTemplates[initialTemplate]);
  const [selectedTemplate, setSelectedTemplate] = useState<JavaTemplate>(initialTemplate);
  const [execution, setExecution] = useState<ExecutionState>({
    output: '',
    error: null,
    isExecuting: false,
    executionTime: null,
    memoryUsage: null,
  });

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  }, [onCodeChange]);

  const handleTemplateChange = useCallback((template: JavaTemplate) => {
    setSelectedTemplate(template);
    const templateCode = javaTemplates[template];
    setCode(templateCode);
    onCodeChange?.(templateCode);
    // Clear output when switching templates
    setExecution({
      output: '',
      error: null,
      isExecuting: false,
      executionTime: null,
      memoryUsage: null,
    });
  }, [onCodeChange]);

  const handleRun = useCallback(async () => {
    setExecution((prev) => ({
      ...prev,
      isExecuting: true,
      error: null,
    }));

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: 'java',
        }),
      });

      const result = await response.json();

      setExecution({
        output: result.output || '',
        error: result.error || null,
        isExecuting: false,
        executionTime: result.executionTime,
        memoryUsage: result.memoryUsage,
      });
    } catch (error) {
      setExecution({
        output: '',
        error: error instanceof Error ? error.message : 'Execution failed',
        isExecuting: false,
        executionTime: null,
        memoryUsage: null,
      });
    }
  }, [code]);

  const handleReset = useCallback(() => {
    const templateCode = javaTemplates[selectedTemplate];
    setCode(templateCode);
    onCodeChange?.(templateCode);
    setExecution({
      output: '',
      error: null,
      isExecuting: false,
      executionTime: null,
      memoryUsage: null,
    });
  }, [selectedTemplate, onCodeChange]);

  const templates = Object.keys(javaTemplates) as JavaTemplate[];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">Java Code Editor</CardTitle>
            <div className="flex items-center gap-2">
              {showTemplateSelector && (
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value as JavaTemplate)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  disabled={execution.isExecuting}
                >
                  {templates.map((template) => (
                    <option key={template} value={template}>
                      {templateInfo[template].name}
                    </option>
                  ))}
                </select>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                disabled={execution.isExecuting}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleRun}
                disabled={execution.isExecuting}
                className="bg-green-600 hover:bg-green-700"
              >
                {execution.isExecuting ? 'Running...' : '▶ Run'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language="java"
            height={height}
            highlightedLine={highlightedLine}
          />
        </CardContent>
      </Card>

      <OutputPanel
        output={execution.output}
        error={execution.error}
        isExecuting={execution.isExecuting}
        executionTime={execution.executionTime}
        memoryUsage={execution.memoryUsage}
      />
    </div>
  );
}
