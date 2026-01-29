import type { MultipleChoiceQuestion, TracingQuestion, Quiz } from '@/types/exercise';

// Conceptual Questions
export const complexityConceptualQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'complexity-concept-1',
    type: 'multiple-choice',
    title: 'What Big O Measures',
    description: 'Understanding the purpose of Big O notation',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'What does Big O notation primarily measure?',
    options: [
      'The exact number of seconds an algorithm takes',
      'How the number of operations grows as input size increases',
      'The amount of memory used by an algorithm',
      'The number of lines of code in an algorithm'
    ],
    correctAnswer: 1,
    explanation: 'Big O describes the growth rate of operations as input size n increases. It doesn\'t measure actual time (which varies by hardware) but rather how the work scales.'
  },
  {
    id: 'complexity-concept-2',
    type: 'multiple-choice',
    title: 'Why Drop Constants',
    description: 'Understanding why we simplify Big O expressions',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'Why do we say O(2n) = O(n)?',
    options: [
      'Because 2n rounds down to n',
      'Because constants become insignificant for large n',
      'Because we can\'t count constants',
      'Because 2 is a prime number'
    ],
    correctAnswer: 1,
    explanation: 'As n grows very large, the constant 2 becomes insignificant compared to n itself. We care about growth rate, not exact counts, so we drop constants.'
  },
  {
    id: 'complexity-concept-3',
    type: 'multiple-choice',
    title: 'Efficiency Comparison',
    description: 'Comparing algorithm efficiencies',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'Which algorithm is more efficient for large inputs?',
    options: [
      'O(n²)',
      'O(n log n)',
      'O(2^n)',
      'They are all the same'
    ],
    correctAnswer: 1,
    explanation: 'For large n: O(n log n) < O(n²) < O(2^n). Linearithmic O(n log n) grows much slower than quadratic O(n²), which is far better than exponential O(2^n).'
  },
  {
    id: 'complexity-concept-4',
    type: 'multiple-choice',
    title: 'Array Access Complexity',
    description: 'Understanding constant time operations',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the time complexity of accessing arr[5] in an array of 1 million elements?',
    options: [
      'O(n) because we might need to search',
      'O(1) because we can calculate the address directly',
      'O(log n) because it\'s like binary search',
      'O(5) because we\'re accessing index 5'
    ],
    correctAnswer: 1,
    explanation: 'Array access by index is O(1). The memory address is calculated as: base_address + (index × element_size). This is a direct calculation, not a search.'
  },
  {
    id: 'complexity-concept-5',
    type: 'multiple-choice',
    title: 'Sequential vs Nested',
    description: 'Understanding loop combinations',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'What is the difference between sequential loops and nested loops in terms of Big O?',
    options: [
      'Sequential adds (O(n) + O(n) = O(n)), nested multiplies (O(n) × O(n) = O(n²))',
      'Both are O(n²)',
      'Sequential multiplies, nested adds',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: 'Sequential (one after another) operations ADD: O(n) + O(n) = O(2n) = O(n). Nested (one inside another) operations MULTIPLY: O(n) × O(n) = O(n²).'
  },
  {
    id: 'complexity-concept-6',
    type: 'multiple-choice',
    title: 'Best vs Worst Case',
    description: 'Understanding case analysis',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'For linear search, what are the best and worst case complexities?',
    options: [
      'Best: O(1), Worst: O(1)',
      'Best: O(n), Worst: O(n)',
      'Best: O(1), Worst: O(n)',
      'Best: O(log n), Worst: O(n)'
    ],
    correctAnswer: 2,
    explanation: 'Best case O(1): target is the first element. Worst case O(n): target is last or not present, requiring a check of all n elements.'
  },
  {
    id: 'complexity-concept-7',
    type: 'multiple-choice',
    title: 'Binary Search Power',
    description: 'Understanding logarithmic efficiency',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'Approximately how many comparisons does binary search need for 1 billion elements?',
    options: [
      '1 billion',
      '1 million',
      'About 30',
      'About 1000'
    ],
    correctAnswer: 2,
    explanation: 'Binary search is O(log n). log₂(1,000,000,000) ≈ 30. Each comparison halves the search space, so we only need about 30 steps to search a billion items!'
  },
  {
    id: 'complexity-concept-8',
    type: 'multiple-choice',
    title: 'Space Complexity',
    description: 'Understanding memory usage',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'What is the space complexity of creating a 2D array of size n × n?',
    options: [
      'O(1)',
      'O(n)',
      'O(2n)',
      'O(n²)'
    ],
    correctAnswer: 3,
    explanation: 'A 2D array of n × n stores n² elements, so it uses O(n²) space. This is important to consider when working with large matrices.'
  },
  {
    id: 'complexity-concept-9',
    type: 'multiple-choice',
    title: 'Dominant Term',
    description: 'Simplifying complex expressions',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 15,
    question: 'What does O(n² + n log n + n) simplify to?',
    options: [
      'O(n² + n log n + n)',
      'O(n²)',
      'O(n log n)',
      'O(n)'
    ],
    correctAnswer: 1,
    explanation: 'We keep only the dominant (fastest-growing) term. n² grows faster than n log n, which grows faster than n. So O(n² + n log n + n) = O(n²).'
  },
  {
    id: 'complexity-concept-10',
    type: 'multiple-choice',
    title: 'Exponential Warning',
    description: 'Understanding exponential limitations',
    topic: 'complexity',
    difficulty: 'advanced',
    points: 20,
    question: 'Why is O(2^n) considered impractical for large inputs?',
    options: [
      'It uses too much memory',
      'The operations double with each additional input, growing explosively',
      'It\'s hard to code',
      'It only works on even numbers'
    ],
    correctAnswer: 1,
    explanation: 'O(2^n) means operations double for each +1 to n. At n=30, that\'s about 1 billion operations. At n=40, it\'s about 1 trillion. The growth is explosive and becomes impractical very quickly.'
  }
];

// Tracing Questions
export const complexityTracingQuestions: TracingQuestion[] = [
  {
    id: 'complexity-trace-1',
    type: 'tracing',
    title: 'Count Loop Iterations',
    description: 'Trace through a simple loop',
    topic: 'complexity',
    difficulty: 'beginner',
    points: 15,
    question: 'How many times does the print statement execute when n = 5?',
    code: `void count(int n) {  // n = 5
    for (int i = 0; i < n; i++) {
        System.out.println(i);
    }
}`,
    steps: [
      { line: 2, variables: { i: '0', n: '5' } },
      { line: 2, variables: { i: '1', n: '5' } },
      { line: 2, variables: { i: '2', n: '5' } },
      { line: 2, variables: { i: '3', n: '5' } },
      { line: 2, variables: { i: '4', n: '5' } },
    ],
    finalAnswer: '5',
    answerType: 'output',
  },
  {
    id: 'complexity-trace-2',
    type: 'tracing',
    title: 'Nested Loop Count',
    description: 'Count operations in nested loops',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 20,
    question: 'How many times does the print statement execute when n = 4?',
    code: `void nested(int n) {  // n = 4
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            System.out.println(i + ", " + j);
        }
    }
}`,
    steps: [
      { line: 2, variables: { i: '0' }, output: 'Inner runs 4 times' },
      { line: 2, variables: { i: '1' }, output: 'Inner runs 4 times' },
      { line: 2, variables: { i: '2' }, output: 'Inner runs 4 times' },
      { line: 2, variables: { i: '3' }, output: 'Inner runs 4 times' },
    ],
    finalAnswer: '16',
    answerType: 'output',
  },
  {
    id: 'complexity-trace-3',
    type: 'tracing',
    title: 'Halving Loop Count',
    description: 'Count iterations in a halving loop',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 20,
    question: 'How many times does the print statement execute when n = 16?',
    code: `void halving(int n) {  // n = 16
    while (n > 0) {
        System.out.println(n);
        n = n / 2;
    }
}`,
    steps: [
      { line: 3, variables: { n: '16' } },
      { line: 3, variables: { n: '8' } },
      { line: 3, variables: { n: '4' } },
      { line: 3, variables: { n: '2' } },
      { line: 3, variables: { n: '1' } },
    ],
    finalAnswer: '5',
    answerType: 'output',
  },
  {
    id: 'complexity-trace-4',
    type: 'tracing',
    title: 'Binary Search Steps',
    description: 'Count comparisons in binary search',
    topic: 'complexity',
    difficulty: 'intermediate',
    points: 20,
    question: 'How many comparisons to find target=7 in arr = [1, 3, 5, 7, 9, 11, 13, 15]?',
    code: `// arr = [1, 3, 5, 7, 9, 11, 13, 15]
// target = 7
int binarySearch(int[] arr, int target) {
    int left = 0, right = 7;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
}`,
    steps: [
      { line: 6, variables: { left: '0', right: '7', mid: '3' }, output: 'arr[3]=7=target' },
    ],
    finalAnswer: '1',
    answerType: 'output',
  },
  {
    id: 'complexity-trace-5',
    type: 'tracing',
    title: 'Triangular Loop',
    description: 'Count operations in triangular pattern',
    topic: 'complexity',
    difficulty: 'advanced',
    points: 25,
    question: 'How many times does the print statement execute when n = 5?',
    code: `void triangle(int n) {  // n = 5
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            System.out.println(i + ", " + j);
        }
    }
}`,
    steps: [
      { line: 2, variables: { i: '0' }, output: 'j runs 5 times (0 to 4)' },
      { line: 2, variables: { i: '1' }, output: 'j runs 4 times (1 to 4)' },
      { line: 2, variables: { i: '2' }, output: 'j runs 3 times (2 to 4)' },
      { line: 2, variables: { i: '3' }, output: 'j runs 2 times (3 to 4)' },
      { line: 2, variables: { i: '4' }, output: 'j runs 1 time (4)' },
    ],
    finalAnswer: '15',
    answerType: 'output',
  },
  {
    id: 'complexity-trace-6',
    type: 'tracing',
    title: 'Fibonacci Calls',
    description: 'Count recursive calls',
    topic: 'complexity',
    difficulty: 'advanced',
    points: 25,
    question: 'How many times is the fibonacci function called for fibonacci(5)?',
    code: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Call tree for fibonacci(5):
// fib(5) -> fib(4) + fib(3)
//   fib(4) -> fib(3) + fib(2)
//     fib(3) -> fib(2) + fib(1)
//       fib(2) -> fib(1) + fib(0)`,
    steps: [
      { line: 3, variables: { n: '5' }, output: 'calls fib(4) and fib(3)' },
      { line: 3, variables: { n: '4' }, output: 'calls fib(3) and fib(2)' },
      { line: 3, variables: { n: '3' }, output: 'calls fib(2) and fib(1)' },
    ],
    finalAnswer: '15',
    answerType: 'output',
  }
];

// Full combined quiz
export const complexityFullQuiz: Quiz = {
  id: 'complexity-quiz',
  title: 'Algorithm Complexity Quiz',
  description: 'Test your understanding of Big O notation and complexity analysis.',
  topic: 'complexity',
  questions: [...complexityConceptualQuestions, ...complexityTracingQuestions],
  passingScore: 70,
};

// Conceptual-only quiz
export const complexityConceptualQuiz: Quiz = {
  id: 'complexity-conceptual',
  title: 'Big O Concepts',
  description: 'Multiple choice questions about Big O notation fundamentals.',
  topic: 'complexity',
  questions: complexityConceptualQuestions,
  passingScore: 70,
};

// Tracing-only quiz
export const complexityTracingQuiz: Quiz = {
  id: 'complexity-tracing',
  title: 'Complexity Code Tracing',
  description: 'Count operations and trace through code to understand complexity.',
  topic: 'complexity',
  questions: complexityTracingQuestions,
  passingScore: 70,
};

// Export for backward compatibility
export const complexityQuizzes = [complexityFullQuiz, complexityConceptualQuiz, complexityTracingQuiz];

export default complexityFullQuiz;
