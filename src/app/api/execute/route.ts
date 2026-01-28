import { NextRequest, NextResponse } from 'next/server';
import { judge0Client, formatExecutionResult } from '@/lib/codeExecution/judge0Client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language = 'java', stdin = '' } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Check if Judge0 API key is configured
    const apiKey = process.env.JUDGE0_API_KEY || process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      // Return a simulated response for development
      return NextResponse.json({
        output: simulateJavaExecution(code),
        error: null,
        success: true,
        executionTime: 0.05,
        memoryUsage: 1024,
        simulated: true,
        message: 'Running in simulation mode. Set JUDGE0_API_KEY or RAPIDAPI_KEY for real execution.',
      });
    }

    // Execute code using Judge0
    const result = await judge0Client.submit({
      sourceCode: code,
      language: language as 'java' | 'python' | 'javascript',
      stdin,
      timeLimit: 5,
      memoryLimit: 128000,
    });

    const formatted = formatExecutionResult(result);

    return NextResponse.json({
      output: formatted.output,
      error: formatted.error,
      success: formatted.success,
      executionTime: result.time ? parseFloat(result.time) : null,
      memoryUsage: result.memory,
      simulated: false,
    });
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json(
      {
        output: '',
        error: error instanceof Error ? error.message : 'Execution failed',
        success: false,
      },
      { status: 500 }
    );
  }
}

// Simple simulation for development without API key
function simulateJavaExecution(code: string): string {
  const lines: string[] = [];

  // Look for System.out.println statements
  const printlnMatches = code.matchAll(/System\.out\.println\s*\(\s*(.+?)\s*\)\s*;/g);
  for (const match of printlnMatches) {
    const content = match[1];
    // Simple string literal extraction
    if (content.startsWith('"') && content.endsWith('"')) {
      lines.push(content.slice(1, -1).replace(/\\n/g, '\n'));
    } else {
      lines.push(`[simulated: ${content}]`);
    }
  }

  // Look for System.out.print statements
  const printMatches = code.matchAll(/System\.out\.print\s*\(\s*(.+?)\s*\)\s*;/g);
  for (const match of printMatches) {
    const content = match[1];
    if (content.startsWith('"') && content.endsWith('"')) {
      lines.push(content.slice(1, -1).replace(/\\n/g, '\n'));
    }
  }

  if (lines.length === 0) {
    return '(Simulation mode: No output detected. Set JUDGE0_API_KEY for real execution.)';
  }

  return lines.join('\n') + '\n\n[Simulated output - Set JUDGE0_API_KEY for real Java execution]';
}
