// Stack & Queue Types

export interface StackItem {
  id: string;
  value: string | number;
  addedAt: number;
}

export interface QueueItem {
  id: string;
  value: string | number;
  priority?: number;
  addedAt: number;
}

export interface StackState {
  items: StackItem[];
  maxSize?: number;
}

export interface QueueState {
  items: QueueItem[];
  maxSize?: number;
}

export interface Operation {
  type: 'push' | 'pop' | 'enqueue' | 'dequeue' | 'peek';
  value?: string | number;
  result?: string | number | null;
  timestamp: number;
  success: boolean;
  error?: string;
}

export interface OperationResult {
  success: boolean;
  value?: string | number | null;
  error?: string;
}

export interface ParenthesesStep {
  index: number;
  char: string;
  action: 'push' | 'pop' | 'match' | 'mismatch' | 'skip';
  stack: string[];
  explanation: string;
  isValid: boolean;
}

export interface ExpressionStep {
  index: number;
  token: string;
  action: 'push' | 'pop' | 'operate';
  stack: number[];
  explanation: string;
  result?: number;
}

export interface CodeExample {
  title: string;
  description: string;
  javaCode: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ImplementationComparison {
  aspect: string;
  arrayBased: string;
  linkedListBased: string;
}
