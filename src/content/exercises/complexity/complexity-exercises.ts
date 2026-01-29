import { MultipleChoiceQuestion } from '@/types/exercise';

// Map complexity exercises to the quiz format since they're multiple-choice
// These will appear in the Quiz section rather than the Guided Exercises section
export const complexityExercises: MultipleChoiceQuestion[] = [
  // O(1) Exercises
  {
    id: 'complexity-o1-1',
    title: 'Array Access',
    topic: 'complexity',
    difficulty: 'beginner',
    description: 'What is the time complexity of this code?',
    type: 'multiple-choice',
    points: 1,
    question: `\`\`\`java
int getElement(int[] arr, int index) {
    return arr[index];
}
\`\`\`

What is the time complexity?`,
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Array access by index is O(1) because we can calculate the memory address directly using the index. It takes the same time regardless of array size.',
  },
  {
    id: 'complexity-o1-2',
    title: 'Swap Elements',
    topic: 'complexity',
    difficulty: 'beginner',
    description: 'What is the time complexity of swapping two elements?',
    type: 'multiple-choice',
    points: 1,
    question: `\`\`\`java
void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Swapping uses exactly 3 operations regardless of array size. This is constant time O(1).',
  },
  {
    id: 'complexity-o1-3',
    title: 'Arithmetic Operations',
    topic: 'complexity',
    difficulty: 'beginner',
    description: 'What is the time complexity of these calculations?',
    type: 'multiple-choice',
    points: 1,
    question: `\`\`\`java
int calculate(int a, int b, int c) {
    int sum = a + b + c;
    int product = a * b * c;
    int result = sum + product;
    return result;
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(3)', 'O(1)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'A fixed number of arithmetic operations is O(1). The number of operations doesn\'t depend on any input size.',
  },

  // O(n) Exercises
  {
    id: 'complexity-on-1',
    title: 'Sum Array',
    topic: 'complexity',
    difficulty: 'beginner',
    description: 'What is the time complexity of summing an array?',
    type: 'multiple-choice',
    points: 1,
    question: `\`\`\`java
int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}
\`\`\`

What is the time complexity?`,
    options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'The loop runs n times (once for each element). Each iteration does O(1) work. Total: O(n).',
  },
  {
    id: 'complexity-on-2',
    title: 'Sequential Loops',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What is the time complexity of two sequential loops?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void process(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i]);
    }
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i] * 2);
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n²)', 'O(2n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Sequential loops ADD, not multiply. O(n) + O(n) = O(2n) = O(n). We drop constants!',
  },
  {
    id: 'complexity-on-3',
    title: 'Constant Inner Loop',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'Tricky: What is the time complexity when the inner loop is constant?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void printFive(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < 5; j++) {
            System.out.println(arr[i] + j);
        }
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n²)', 'O(5n)', 'O(n)', 'O(n + 5)'],
    correctAnswer: 2,
    explanation: 'The inner loop runs exactly 5 times (constant), not n times. Total: 5n = O(n). Nested loops are O(n²) only when BOTH depend on n.',
  },

  // O(n²) Exercises
  {
    id: 'complexity-on2-1',
    title: 'Nested Loops',
    topic: 'complexity',
    difficulty: 'beginner',
    description: 'What is the time complexity of nested loops?',
    type: 'multiple-choice',
    points: 1,
    question: `\`\`\`java
void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(2n)', 'O(n²)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Both loops run n times. The inner loop runs n times for EACH of the n outer iterations: n × n = O(n²).',
  },
  {
    id: 'complexity-on2-2',
    title: 'Triangular Loop',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What about when the inner loop starts at i?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void upperTriangle(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i; j < arr.length; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n/2)', 'O(n²)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Inner loop runs n, then n-1, then n-2... times. Sum = n(n+1)/2 ≈ n²/2 = O(n²). Half of n² is still O(n²)!',
  },
  {
    id: 'complexity-on2-3',
    title: 'Bubble Sort',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What is the time complexity of Bubble Sort?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
    correctAnswer: 2,
    explanation: 'The inner loop runs (n-1) + (n-2) + ... + 1 times. This sum equals n(n-1)/2 = O(n²).',
  },

  // O(log n) Exercises
  {
    id: 'complexity-ologn-1',
    title: 'Binary Search',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What is the time complexity of binary search?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n/2)', 'O(log n)', 'O(1)'],
    correctAnswer: 2,
    explanation: 'Each iteration cuts the search space in half. To search n elements: n → n/2 → n/4 → ... → 1. This takes log₂(n) iterations.',
  },
  {
    id: 'complexity-ologn-2',
    title: 'Halving Loop',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What is the complexity of a loop that halves?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void halvingLoop(int n) {
    while (n > 0) {
        System.out.println(n);
        n = n / 2;
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n/2)', 'O(log n)', 'O(1)'],
    correctAnswer: 2,
    explanation: 'n halves each iteration: n → n/2 → n/4 → ... → 1. This takes log₂(n) iterations. Dividing by any constant gives O(log n).',
  },
  {
    id: 'complexity-ologn-3',
    title: 'Doubling Loop',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What about a loop that doubles?',
    type: 'multiple-choice',
    points: 2,
    question: `\`\`\`java
void doublingLoop(int n) {
    int i = 1;
    while (i < n) {
        System.out.println(i);
        i = i * 2;
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(2^n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'i doubles each time: 1 → 2 → 4 → 8 → 16... reaches n in log₂(n) steps. Multiplying by any constant gives O(log n).',
  },

  // O(n log n) Exercises
  {
    id: 'complexity-onlogn-1',
    title: 'N Log N Pattern',
    topic: 'complexity',
    difficulty: 'advanced',
    description: 'Identify the O(n log n) pattern',
    type: 'multiple-choice',
    points: 3,
    question: `\`\`\`java
void process(int[] arr) {
    for (int size = 1; size < arr.length; size *= 2) {
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'Outer loop doubles (log n iterations). Inner loop runs n times for each outer iteration. Total: n × log(n) = O(n log n).',
  },
  {
    id: 'complexity-onlogn-2',
    title: 'Merge Sort Complexity',
    topic: 'complexity',
    difficulty: 'intermediate',
    description: 'What is Merge Sort\'s time complexity?',
    type: 'multiple-choice',
    points: 2,
    question: `Merge Sort divides the array in half repeatedly (log n levels), and at each level, it processes all n elements to merge them back together.

What is the time complexity of Merge Sort?`,
    options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'Merge Sort has log(n) levels of recursion. Each level does O(n) work to merge. Total: O(n log n). This is optimal for comparison-based sorting.',
  },

  // O(2^n) Exercises
  {
    id: 'complexity-o2n-1',
    title: 'Naive Fibonacci',
    topic: 'complexity',
    difficulty: 'advanced',
    description: 'What is the complexity of naive recursive Fibonacci?',
    type: 'multiple-choice',
    points: 3,
    question: `\`\`\`java
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

What is the time complexity?`,
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(2^n)'],
    correctAnswer: 3,
    explanation: 'Each call spawns 2 more calls. The call tree doubles at each level: 1 → 2 → 4 → 8... This gives O(2^n) total calls.',
  },
  {
    id: 'complexity-o2n-2',
    title: 'Subset Generation',
    topic: 'complexity',
    difficulty: 'advanced',
    description: 'What is the complexity of generating all subsets?',
    type: 'multiple-choice',
    points: 3,
    question: `For a set with n elements, how many subsets exist? (Each element can be either included or excluded)

What is the time complexity to generate all subsets?`,
    options: ['O(n)', 'O(n²)', 'O(n!)', 'O(2^n)'],
    correctAnswer: 3,
    explanation: 'Each element has 2 choices (in or out). For n elements: 2 × 2 × ... × 2 = 2^n subsets. Generating them all is O(2^n).',
  },
];

export default complexityExercises;
