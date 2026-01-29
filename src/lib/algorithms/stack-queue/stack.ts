// Stack operations and examples

import type {
  StackItem,
  StackState,
  Operation,
  OperationResult,
  ParenthesesStep,
  ExpressionStep,
  CodeExample,
  ImplementationComparison
} from './types';

// Generate unique ID
let idCounter = 0;
export const generateId = (): string => `item-${++idCounter}`;

// Stack operations
export const createStack = (maxSize?: number): StackState => ({
  items: [],
  maxSize,
});

export const push = (stack: StackState, value: string | number): { stack: StackState; result: OperationResult } => {
  if (stack.maxSize && stack.items.length >= stack.maxSize) {
    return {
      stack,
      result: { success: false, error: 'Stack Overflow: Stack is full' }
    };
  }

  const newItem: StackItem = {
    id: generateId(),
    value,
    addedAt: Date.now(),
  };

  return {
    stack: { ...stack, items: [...stack.items, newItem] },
    result: { success: true, value }
  };
};

export const pop = (stack: StackState): { stack: StackState; result: OperationResult } => {
  if (stack.items.length === 0) {
    return {
      stack,
      result: { success: false, error: 'Stack Underflow: Stack is empty' }
    };
  }

  const poppedItem = stack.items[stack.items.length - 1];
  return {
    stack: { ...stack, items: stack.items.slice(0, -1) },
    result: { success: true, value: poppedItem.value }
  };
};

export const peek = (stack: StackState): OperationResult => {
  if (stack.items.length === 0) {
    return { success: false, error: 'Stack is empty' };
  }
  return { success: true, value: stack.items[stack.items.length - 1].value };
};

export const isEmpty = (stack: StackState): boolean => stack.items.length === 0;

export const size = (stack: StackState): number => stack.items.length;

// Balanced Parentheses Checker
export const checkBalancedParentheses = (expression: string): ParenthesesStep[] => {
  const steps: ParenthesesStep[] = [];
  const stack: string[] = [];
  const matchingPairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  const openBrackets = new Set(['(', '[', '{']);
  const closeBrackets = new Set([')', ']', '}']);

  let isValid = true;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (openBrackets.has(char)) {
      stack.push(char);
      steps.push({
        index: i,
        char,
        action: 'push',
        stack: [...stack],
        explanation: `Push '${char}' onto stack`,
        isValid: true
      });
    } else if (closeBrackets.has(char)) {
      if (stack.length === 0) {
        isValid = false;
        steps.push({
          index: i,
          char,
          action: 'mismatch',
          stack: [...stack],
          explanation: `No matching opening bracket for '${char}' - stack is empty`,
          isValid: false
        });
      } else if (stack[stack.length - 1] === matchingPairs[char]) {
        stack.pop();
        steps.push({
          index: i,
          char,
          action: 'match',
          stack: [...stack],
          explanation: `'${char}' matches '${matchingPairs[char]}' - pop from stack`,
          isValid: true
        });
      } else {
        isValid = false;
        steps.push({
          index: i,
          char,
          action: 'mismatch',
          stack: [...stack],
          explanation: `'${char}' does not match '${stack[stack.length - 1]}' at top of stack`,
          isValid: false
        });
      }
    } else {
      steps.push({
        index: i,
        char,
        action: 'skip',
        stack: [...stack],
        explanation: `Skip non-bracket character '${char}'`,
        isValid: true
      });
    }
  }

  // Final check
  if (stack.length > 0 && isValid) {
    steps.push({
      index: expression.length,
      char: '',
      action: 'mismatch',
      stack: [...stack],
      explanation: `Unmatched opening brackets remain: ${stack.join(', ')}`,
      isValid: false
    });
  }

  return steps;
};

// Postfix Expression Evaluator
export const evaluatePostfix = (expression: string): ExpressionStep[] => {
  const steps: ExpressionStep[] = [];
  const stack: number[] = [];
  const tokens = expression.trim().split(/\s+/);
  const operators = new Set(['+', '-', '*', '/']);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (operators.has(token)) {
      if (stack.length < 2) {
        steps.push({
          index: i,
          token,
          action: 'operate',
          stack: [...stack],
          explanation: `Error: Not enough operands for '${token}'`
        });
        break;
      }

      const b = stack.pop()!;
      const a = stack.pop()!;
      let result: number;

      switch (token) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = Math.floor(a / b); break;
        default: result = 0;
      }

      stack.push(result);
      steps.push({
        index: i,
        token,
        action: 'operate',
        stack: [...stack],
        explanation: `Pop ${a} and ${b}, compute ${a} ${token} ${b} = ${result}, push ${result}`,
        result
      });
    } else {
      const num = parseInt(token, 10);
      if (!isNaN(num)) {
        stack.push(num);
        steps.push({
          index: i,
          token,
          action: 'push',
          stack: [...stack],
          explanation: `Push ${num} onto stack`
        });
      }
    }
  }

  if (stack.length === 1) {
    steps.push({
      index: tokens.length,
      token: 'END',
      action: 'pop',
      stack: [],
      explanation: `Final result: ${stack[0]}`,
      result: stack[0]
    });
  }

  return steps;
};

// Code Examples
export const stackArrayImplementation: CodeExample = {
  title: 'Array-Based Stack',
  description: 'Stack implementation using an array with a top pointer',
  javaCode: `public class ArrayStack<T> {
    private T[] array;
    private int top;
    private int capacity;

    @SuppressWarnings("unchecked")
    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.array = (T[]) new Object[capacity];
        this.top = -1;
    }

    public void push(T item) {
        if (top >= capacity - 1) {
            throw new StackOverflowError("Stack is full");
        }
        array[++top] = item;
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return array[top--];
    }

    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return array[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public int size() {
        return top + 1;
    }
}`,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(n) where n is capacity'
};

export const stackLinkedListImplementation: CodeExample = {
  title: 'LinkedList-Based Stack',
  description: 'Stack implementation using a singly linked list',
  javaCode: `public class LinkedStack<T> {
    private class Node {
        T data;
        Node next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node top;
    private int size;

    public void push(T item) {
        Node newNode = new Node(item);
        newNode.next = top;
        top = newNode;
        size++;
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T item = top.data;
        top = top.next;
        size--;
        return item;
    }

    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public int size() {
        return size;
    }
}`,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(n) where n is number of elements'
};

export const stackImplementationComparison: ImplementationComparison[] = [
  {
    aspect: 'Memory',
    arrayBased: 'Fixed size, may waste space if not full',
    linkedListBased: 'Dynamic, uses only what\'s needed + node overhead'
  },
  {
    aspect: 'Push/Pop',
    arrayBased: 'O(1) - simple index update',
    linkedListBased: 'O(1) - pointer update'
  },
  {
    aspect: 'Overflow',
    arrayBased: 'Can overflow if array is full',
    linkedListBased: 'No overflow (until memory exhausted)'
  },
  {
    aspect: 'Cache',
    arrayBased: 'Better cache locality',
    linkedListBased: 'Poor cache locality'
  },
  {
    aspect: 'Use case',
    arrayBased: 'Known max size, performance critical',
    linkedListBased: 'Unknown size, flexibility needed'
  }
];

// Real-world examples
export const stackRealWorldExamples = [
  {
    title: 'Browser Back Button',
    description: 'Each page you visit is pushed onto a stack. Clicking back pops the current page and shows the previous one.',
    icon: 'ArrowLeft'
  },
  {
    title: 'Undo/Redo',
    description: 'Actions are pushed onto an undo stack. Undo pops an action and pushes it to redo stack.',
    icon: 'Undo'
  },
  {
    title: 'Function Call Stack',
    description: 'When a function is called, its context is pushed. When it returns, it\'s popped.',
    icon: 'Layers'
  },
  {
    title: 'Expression Evaluation',
    description: 'Compilers use stacks to evaluate mathematical expressions and check syntax.',
    icon: 'Calculator'
  }
];

// Common pitfalls
export const stackPitfalls = [
  {
    title: 'Popping from Empty Stack',
    problem: 'Calling pop() without checking if stack is empty',
    example: `Stack<Integer> stack = new Stack<>();
// stack.pop(); // Throws EmptyStackException!

// Correct way:
if (!stack.isEmpty()) {
    int value = stack.pop();
}`,
    prevention: 'Always check isEmpty() before pop() or peek()'
  },
  {
    title: 'Stack Overflow',
    problem: 'Pushing to a full fixed-size stack',
    example: `// With fixed-size array implementation
ArrayStack stack = new ArrayStack(3);
stack.push(1);
stack.push(2);
stack.push(3);
// stack.push(4); // StackOverflowError!`,
    prevention: 'Check size before push, or use dynamic implementation'
  },
  {
    title: 'Using Stack When Queue Needed',
    problem: 'Using LIFO when FIFO is required',
    example: `// Wrong: Using stack for BFS
Stack<Node> stack = new Stack<>(); // LIFO!

// Correct: Use queue for BFS
Queue<Node> queue = new LinkedList<>(); // FIFO`,
    prevention: 'Think about order: reverse order → Stack, arrival order → Queue'
  }
];
