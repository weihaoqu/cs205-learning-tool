import type { MultipleChoiceQuestion, TracingQuestion, Quiz } from '@/types/exercise';

// Conceptual Questions
export const recursionConceptualQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'recursion-concept-1',
    type: 'multiple-choice',
    title: 'Base Case Purpose',
    description: 'Understanding why base cases are necessary',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'Why is a base case necessary in a recursive function?',
    options: [
      'To make the code run faster',
      'To stop the recursion and prevent infinite calls',
      'To use less memory',
      'To make the code easier to read'
    ],
    correctAnswer: 1,
    explanation: 'The base case provides a stopping condition. Without it, the function would call itself forever, eventually causing a StackOverflowError.'
  },
  {
    id: 'recursion-concept-2',
    type: 'multiple-choice',
    title: 'Recursive Case Requirement',
    description: 'Understanding the recursive case',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'What must the recursive case do to eventually reach the base case?',
    options: [
      'Call a different function',
      'Use a loop instead',
      'Make progress toward the base case (e.g., reduce the problem size)',
      'Increase the input value'
    ],
    correctAnswer: 2,
    explanation: 'The recursive case must make the problem smaller or simpler with each call. For example, factorial(n) calls factorial(n-1), moving closer to the base case of n=1.'
  },
  {
    id: 'recursion-concept-3',
    type: 'multiple-choice',
    title: 'Stack Overflow Cause',
    description: 'Understanding stack overflow in recursion',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'What causes a StackOverflowError in recursion?',
    options: [
      'Using too much memory for variables',
      'Too many recursive calls filling up the call stack',
      'Dividing by zero',
      'Using the wrong data type'
    ],
    correctAnswer: 1,
    explanation: 'Each recursive call adds a frame to the call stack. If there are too many calls (no base case, or very deep recursion), the stack runs out of space and throws StackOverflowError.'
  },
  {
    id: 'recursion-concept-4',
    type: 'multiple-choice',
    title: 'Recursion Space Complexity',
    description: 'Understanding memory usage in recursion',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'Why does recursion typically use more memory than iteration?',
    options: [
      'Recursive code has more lines',
      'Each recursive call creates a new stack frame storing parameters and return address',
      'Recursive functions run slower',
      'Recursion requires larger data types'
    ],
    correctAnswer: 1,
    explanation: 'Each recursive call creates a stack frame that stores the function\'s parameters, local variables, and return address. With n calls, that\'s O(n) space on the stack.'
  },
  {
    id: 'recursion-concept-5',
    type: 'multiple-choice',
    title: 'Best Use for Recursion',
    description: 'Knowing when to use recursion',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'Which scenario is best suited for recursion?',
    options: [
      'Iterating through a simple array',
      'Counting from 1 to n',
      'Traversing a tree structure',
      'Reading a file line by line'
    ],
    correctAnswer: 2,
    explanation: 'Tree structures have natural recursive properties - each node can be processed the same way, then we recurse on children. Recursion elegantly handles the branching structure.'
  },
  {
    id: 'recursion-concept-6',
    type: 'multiple-choice',
    title: 'Return Order',
    description: 'Understanding how recursive calls return',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'In what order do recursive calls return their values?',
    options: [
      'First call returns first (FIFO)',
      'Last call returns first (LIFO)',
      'Random order',
      'All at the same time'
    ],
    correctAnswer: 1,
    explanation: 'The call stack is Last-In-First-Out (LIFO). The deepest call (last one made) hits the base case and returns first. Values then bubble up through the chain of waiting calls.'
  }
];

// Tracing Questions
export const recursionTracingQuestions: TracingQuestion[] = [
  {
    id: 'recursion-trace-1',
    type: 'tracing',
    title: 'Factorial Result',
    description: 'Trace factorial calculation',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 15,
    question: 'What does factorial(5) return?',
    code: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// factorial(5) = 5 * factorial(4)
//              = 5 * 4 * factorial(3)
//              = 5 * 4 * 3 * factorial(2)
//              = 5 * 4 * 3 * 2 * factorial(1)
//              = 5 * 4 * 3 * 2 * 1`,
    steps: [
      { line: 3, variables: { n: '5' }, output: 'calls factorial(4)' },
      { line: 3, variables: { n: '4' }, output: 'calls factorial(3)' },
      { line: 3, variables: { n: '3' }, output: 'calls factorial(2)' },
      { line: 3, variables: { n: '2' }, output: 'calls factorial(1)' },
      { line: 2, variables: { n: '1' }, output: 'returns 1' },
    ],
    finalAnswer: '120',
    answerType: 'output',
  },
  {
    id: 'recursion-trace-2',
    type: 'tracing',
    title: 'Factorial Call Count',
    description: 'Count recursive calls',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 15,
    question: 'How many times is the factorial function called for factorial(4)?',
    code: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Count the calls:
// factorial(4) - call 1
// factorial(3) - call 2
// factorial(2) - call 3
// factorial(1) - call 4`,
    steps: [
      { line: 1, variables: { call: '1', n: '4' } },
      { line: 1, variables: { call: '2', n: '3' } },
      { line: 1, variables: { call: '3', n: '2' } },
      { line: 1, variables: { call: '4', n: '1' } },
    ],
    finalAnswer: '4',
    answerType: 'output',
  },
  {
    id: 'recursion-trace-3',
    type: 'tracing',
    title: 'Fibonacci Stack Depth',
    description: 'Determine maximum stack depth',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 20,
    question: 'What is the maximum stack depth (number of frames at once) for fibonacci(4)?',
    code: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// The deepest path goes:
// fib(4) -> fib(3) -> fib(2) -> fib(1)
// That's 4 frames deep`,
    steps: [
      { line: 1, variables: { depth: '1', n: '4' } },
      { line: 1, variables: { depth: '2', n: '3' } },
      { line: 1, variables: { depth: '3', n: '2' } },
      { line: 1, variables: { depth: '4', n: '1' } },
    ],
    finalAnswer: '4',
    answerType: 'output',
  },
  {
    id: 'recursion-trace-4',
    type: 'tracing',
    title: 'Array Sum Result',
    description: 'Trace recursive array sum',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 20,
    question: 'What does sum([2, 4, 6], 0) return?',
    code: `int sum(int[] arr, int index) {
    if (index >= arr.length) return 0;
    return arr[index] + sum(arr, index + 1);
}

// sum([2,4,6], 0) = 2 + sum([2,4,6], 1)
//                 = 2 + 4 + sum([2,4,6], 2)
//                 = 2 + 4 + 6 + sum([2,4,6], 3)
//                 = 2 + 4 + 6 + 0
//                 = 12`,
    steps: [
      { line: 3, variables: { index: '0' }, output: '2 + sum(arr, 1)' },
      { line: 3, variables: { index: '1' }, output: '4 + sum(arr, 2)' },
      { line: 3, variables: { index: '2' }, output: '6 + sum(arr, 3)' },
      { line: 2, variables: { index: '3' }, output: 'base case: 0' },
    ],
    finalAnswer: '12',
    answerType: 'output',
  }
];

// Full combined quiz
export const recursionFullQuiz: Quiz = {
  id: 'recursion-quiz',
  title: 'Recursion Quiz',
  description: 'Test your understanding of recursion concepts and trace through recursive calls.',
  topic: 'complexity',
  questions: [...recursionConceptualQuestions, ...recursionTracingQuestions],
  passingScore: 70,
};

// Conceptual-only quiz
export const recursionConceptualQuiz: Quiz = {
  id: 'recursion-conceptual',
  title: 'Recursion Concepts',
  description: 'Multiple choice questions about recursion fundamentals.',
  topic: 'complexity',
  questions: recursionConceptualQuestions,
  passingScore: 70,
};

// Tracing-only quiz
export const recursionTracingQuiz: Quiz = {
  id: 'recursion-tracing',
  title: 'Recursion Tracing',
  description: 'Trace through recursive function calls to find the answer.',
  topic: 'complexity',
  questions: recursionTracingQuestions,
  passingScore: 70,
};

// Export all quizzes
export const recursionQuizzes = [recursionFullQuiz, recursionConceptualQuiz, recursionTracingQuiz];

export default recursionFullQuiz;
