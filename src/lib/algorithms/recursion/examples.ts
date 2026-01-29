// Recursive examples and trace generators

import { ExecutionStep, StackFrame, RecursiveExample, CallTreeNode, ComparisonExample } from './types';

// ============ Recursive Examples ============

export const factorialExample: RecursiveExample = {
  id: 'factorial',
  name: 'Factorial',
  description: 'Calculate n! = n × (n-1) × (n-2) × ... × 1',
  code: `int factorial(int n) {
    // Base case: factorial of 0 or 1 is 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}`,
  baseCase: 'n <= 1 → return 1',
  recursiveCase: 'n * factorial(n - 1)',
  inputType: 'number',
  defaultInput: 5,
  maxInput: 12,
  complexity: {
    time: 'O(n)',
    space: 'O(n) - call stack',
  },
};

export const sumExample: RecursiveExample = {
  id: 'sum',
  name: 'Array Sum',
  description: 'Calculate the sum of all elements in an array',
  code: `int sum(int[] arr, int index) {
    // Base case: reached end of array
    if (index >= arr.length) {
        return 0;
    }
    // Recursive case: current + sum of rest
    return arr[index] + sum(arr, index + 1);
}`,
  baseCase: 'index >= arr.length → return 0',
  recursiveCase: 'arr[index] + sum(arr, index + 1)',
  inputType: 'array',
  defaultInput: [1, 2, 3, 4, 5],
  maxInput: 10,
  complexity: {
    time: 'O(n)',
    space: 'O(n) - call stack',
  },
};

export const fibonacciExample: RecursiveExample = {
  id: 'fibonacci',
  name: 'Fibonacci',
  description: 'Calculate the nth Fibonacci number',
  code: `int fibonacci(int n) {
    // Base cases
    if (n <= 0) return 0;
    if (n == 1) return 1;
    // Recursive case: fib(n) = fib(n-1) + fib(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  baseCase: 'n <= 0 → return 0, n == 1 → return 1',
  recursiveCase: 'fibonacci(n-1) + fibonacci(n-2)',
  inputType: 'number',
  defaultInput: 5,
  maxInput: 10,
  complexity: {
    time: 'O(2^n)',
    space: 'O(n) - call stack depth',
  },
};

export const recursiveExamples: RecursiveExample[] = [
  factorialExample,
  sumExample,
  fibonacciExample,
];

// ============ Trace Generators ============

let stepCounter = 0;
let frameIdCounter = 0;

function resetCounters() {
  stepCounter = 0;
  frameIdCounter = 0;
}

function createFrame(
  functionName: string,
  params: Record<string, number | number[]>,
  depth: number,
  status: StackFrame['status'] = 'executing'
): StackFrame {
  return {
    id: `frame-${frameIdCounter++}`,
    functionName,
    params,
    localVars: {},
    status,
    depth,
  };
}

export function generateFactorialTrace(n: number): ExecutionStep[] {
  resetCounters();
  const steps: ExecutionStep[] = [];
  const frameStack: StackFrame[] = [];

  function traceFactorial(num: number, depth: number): number {
    // Create new frame
    const frame = createFrame('factorial', { n: num }, depth);
    frameStack.push(frame);

    // Step: call
    steps.push({
      stepNumber: ++stepCounter,
      action: 'call',
      functionName: 'factorial',
      params: { n: num },
      stackDepth: depth,
      explanation: `Call factorial(${num})`,
      frames: frameStack.map(f => ({ ...f })),
    });

    let result: number;
    if (num <= 1) {
      result = 1;
      frame.returnValue = result;
      frame.status = 'returning';

      steps.push({
        stepNumber: ++stepCounter,
        action: 'return',
        functionName: 'factorial',
        params: { n: num },
        returnValue: result,
        stackDepth: depth,
        explanation: `Base case: factorial(${num}) returns ${result}`,
        frames: frameStack.map(f => ({ ...f })),
      });
    } else {
      frame.status = 'waiting';
      steps.push({
        stepNumber: ++stepCounter,
        action: 'execute',
        functionName: 'factorial',
        params: { n: num },
        stackDepth: depth,
        explanation: `Need to calculate ${num} × factorial(${num - 1})`,
        frames: frameStack.map(f => ({ ...f })),
      });

      const subResult = traceFactorial(num - 1, depth + 1);
      result = num * subResult;
      frame.returnValue = result;
      frame.status = 'returning';

      steps.push({
        stepNumber: ++stepCounter,
        action: 'return',
        functionName: 'factorial',
        params: { n: num },
        returnValue: result,
        stackDepth: depth,
        explanation: `factorial(${num}) = ${num} × ${subResult} = ${result}`,
        frames: frameStack.map(f => ({ ...f })),
      });
    }

    frameStack.pop();
    return result;
  }

  traceFactorial(n, 0);
  return steps;
}

export function generateSumTrace(arr: number[]): ExecutionStep[] {
  resetCounters();
  const steps: ExecutionStep[] = [];
  const frameStack: StackFrame[] = [];

  function traceSum(index: number, depth: number): number {
    const frame = createFrame('sum', { arr, index }, depth);
    frameStack.push(frame);

    steps.push({
      stepNumber: ++stepCounter,
      action: 'call',
      functionName: 'sum',
      params: { arr, index },
      stackDepth: depth,
      explanation: `Call sum(arr, ${index})${index < arr.length ? ` - arr[${index}] = ${arr[index]}` : ''}`,
      frames: frameStack.map(f => ({ ...f })),
    });

    let result: number;
    if (index >= arr.length) {
      result = 0;
      frame.returnValue = result;
      frame.status = 'returning';

      steps.push({
        stepNumber: ++stepCounter,
        action: 'return',
        functionName: 'sum',
        params: { arr, index },
        returnValue: result,
        stackDepth: depth,
        explanation: `Base case: index ${index} >= length ${arr.length}, return 0`,
        frames: frameStack.map(f => ({ ...f })),
      });
    } else {
      frame.status = 'waiting';
      const subResult = traceSum(index + 1, depth + 1);
      result = arr[index] + subResult;
      frame.returnValue = result;
      frame.status = 'returning';

      steps.push({
        stepNumber: ++stepCounter,
        action: 'return',
        functionName: 'sum',
        params: { arr, index },
        returnValue: result,
        stackDepth: depth,
        explanation: `sum(arr, ${index}) = ${arr[index]} + ${subResult} = ${result}`,
        frames: frameStack.map(f => ({ ...f })),
      });
    }

    frameStack.pop();
    return result;
  }

  traceSum(0, 0);
  return steps;
}

// ============ Fibonacci Call Tree Generator ============

export function generateFibonacciTree(n: number): { tree: CallTreeNode; totalCalls: number; duplicates: Map<number, number> } {
  const duplicates = new Map<number, number>();
  let totalCalls = 0;

  function countCalls(num: number) {
    duplicates.set(num, (duplicates.get(num) || 0) + 1);
  }

  function buildTree(num: number): CallTreeNode {
    totalCalls++;
    countCalls(num);

    const node: CallTreeNode = {
      id: `fib-${totalCalls}`,
      functionName: 'fib',
      params: { n: num },
      children: [],
      isDuplicate: (duplicates.get(num) || 0) > 1,
    };

    if (num <= 0) {
      node.returnValue = 0;
    } else if (num === 1) {
      node.returnValue = 1;
    } else {
      const left = buildTree(num - 1);
      const right = buildTree(num - 2);
      node.children = [left, right];
      node.returnValue = (left.returnValue || 0) + (right.returnValue || 0);
    }

    // Update duplicate status after all calls are made
    node.isDuplicate = (duplicates.get(num) || 0) > 1;

    return node;
  }

  const tree = buildTree(n);

  // Second pass to mark all duplicates
  function markDuplicates(node: CallTreeNode) {
    node.isDuplicate = (duplicates.get(node.params.n) || 0) > 1;
    node.children.forEach(markDuplicates);
  }
  markDuplicates(tree);

  return { tree, totalCalls, duplicates };
}

export function countFibonacciCalls(n: number): number {
  if (n <= 1) return 1;
  return 1 + countFibonacciCalls(n - 1) + countFibonacciCalls(n - 2);
}

// ============ Comparison Examples ============

export const factorialComparison: ComparisonExample = {
  id: 'factorial-comparison',
  name: 'Factorial',
  recursiveCode: `int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}`,
  iterativeCode: `int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
  timeComplexity: {
    recursive: 'O(n)',
    iterative: 'O(n)',
  },
  spaceComplexity: {
    recursive: 'O(n) - call stack',
    iterative: 'O(1)',
  },
  recursiveFunction: (n: number): number => {
    if (n <= 1) return 1;
    return n * factorialComparison.recursiveFunction(n - 1);
  },
  iterativeFunction: (n: number): number => {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },
};

export const fibonacciComparison: ComparisonExample = {
  id: 'fibonacci-comparison',
  name: 'Fibonacci',
  recursiveCode: `int fibRec(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibRec(n-1) + fibRec(n-2);
}`,
  iterativeCode: `int fibIter(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    int prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}`,
  timeComplexity: {
    recursive: 'O(2^n)',
    iterative: 'O(n)',
  },
  spaceComplexity: {
    recursive: 'O(n) - call stack',
    iterative: 'O(1)',
  },
  recursiveFunction: (n: number): number => {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacciComparison.recursiveFunction(n - 1) + fibonacciComparison.recursiveFunction(n - 2);
  },
  iterativeFunction: (n: number): number => {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
      const next = prev + curr;
      prev = curr;
      curr = next;
    }
    return curr;
  },
};

export const comparisonExamples: ComparisonExample[] = [
  factorialComparison,
  fibonacciComparison,
];
