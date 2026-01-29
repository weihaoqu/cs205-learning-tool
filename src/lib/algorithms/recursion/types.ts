// Type definitions for Recursion module

export interface StackFrame {
  id: string;
  functionName: string;
  params: Record<string, number | number[]>;
  localVars: Record<string, number>;
  returnValue?: number;
  status: 'executing' | 'waiting' | 'returning' | 'completed';
  depth: number;
}

export interface ExecutionStep {
  stepNumber: number;
  action: 'call' | 'execute' | 'return';
  functionName: string;
  params: Record<string, number | number[]>;
  returnValue?: number;
  stackDepth: number;
  explanation: string;
  frames: StackFrame[];
}

export interface RecursiveExample {
  id: string;
  name: string;
  description: string;
  code: string;
  baseCase: string;
  recursiveCase: string;
  inputType: 'number' | 'array';
  defaultInput: number | number[];
  maxInput: number;
  complexity: {
    time: string;
    space: string;
  };
}

export interface CallTreeNode {
  id: string;
  functionName: string;
  params: Record<string, number>;
  returnValue?: number;
  children: CallTreeNode[];
  isDuplicate: boolean;
}

export interface ComparisonExample {
  id: string;
  name: string;
  recursiveCode: string;
  iterativeCode: string;
  timeComplexity: {
    recursive: string;
    iterative: string;
  };
  spaceComplexity: {
    recursive: string;
    iterative: string;
  };
  recursiveFunction: (n: number) => number;
  iterativeFunction: (n: number) => number;
}
