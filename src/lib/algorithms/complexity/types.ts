// Type definitions for Algorithm Complexity module

export type ComplexityType = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2^n)';

export interface ComplexityInfo {
  notation: ComplexityType;
  name: string;
  description: string;
  color: string;
  examples: string[];
  growthDescription: string;
}

export interface ComplexityExample {
  id: string;
  complexity: ComplexityType;
  title: string;
  description: string;
  javaCode: string;
  explanation: string;
  stepCount: (n: number) => number;
}

export interface CodePattern {
  id: string;
  title: string;
  complexity: ComplexityType;
  code: string;
  explanation: string;
  lineByLineExplanation?: string[];
  commonMistake?: string;
}

export interface StepCounterState {
  currentLine: number;
  operationCount: number;
  variables: Record<string, number | string>;
  isRunning: boolean;
  isComplete: boolean;
  speed: 'slow' | 'medium' | 'fast';
}

export interface ComplexityComparison {
  n: number;
  values: Record<ComplexityType, number>;
}

// Growth rate calculation functions
export const complexityFunctions: Record<ComplexityType, (n: number) => number> = {
  'O(1)': () => 1,
  'O(log n)': (n) => Math.max(1, Math.log2(n)),
  'O(n)': (n) => n,
  'O(n log n)': (n) => n * Math.max(1, Math.log2(n)),
  'O(n²)': (n) => n * n,
  'O(2^n)': (n) => Math.pow(2, Math.min(n, 30)), // Cap at 2^30 to avoid overflow
};

// Complexity metadata
export const complexityInfo: Record<ComplexityType, ComplexityInfo> = {
  'O(1)': {
    notation: 'O(1)',
    name: 'Constant',
    description: 'Operations take the same time regardless of input size',
    color: '#22c55e', // green
    examples: ['Array access by index', 'Arithmetic operations', 'Variable assignment'],
    growthDescription: 'Flat line - no growth',
  },
  'O(log n)': {
    notation: 'O(log n)',
    name: 'Logarithmic',
    description: 'Operations grow slowly as input doubles',
    color: '#3b82f6', // blue
    examples: ['Binary search', 'Balanced tree operations', 'Loops that halve input'],
    growthDescription: 'Slow curve - grows very slowly',
  },
  'O(n)': {
    notation: 'O(n)',
    name: 'Linear',
    description: 'Operations grow proportionally with input size',
    color: '#eab308', // yellow
    examples: ['Single loop through array', 'Linear search', 'Finding max/min'],
    growthDescription: 'Straight line - proportional growth',
  },
  'O(n log n)': {
    notation: 'O(n log n)',
    name: 'Linearithmic',
    description: 'Slightly worse than linear, common in efficient sorting',
    color: '#f97316', // orange
    examples: ['Merge Sort', 'Quick Sort (average)', 'Heap Sort'],
    growthDescription: 'Gentle curve - manageable growth',
  },
  'O(n²)': {
    notation: 'O(n²)',
    name: 'Quadratic',
    description: 'Operations grow with the square of input size',
    color: '#ef4444', // red
    examples: ['Nested loops', 'Bubble Sort', 'Comparing all pairs'],
    growthDescription: 'Steep curve - grows quickly',
  },
  'O(2^n)': {
    notation: 'O(2^n)',
    name: 'Exponential',
    description: 'Operations double with each additional input',
    color: '#a855f7', // purple
    examples: ['Naive Fibonacci', 'Subset generation', 'Brute force combinations'],
    growthDescription: 'Explosive - impractical for large inputs',
  },
};

// Helper to format large numbers
export function formatNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toFixed(num < 10 ? 1 : 0);
}
