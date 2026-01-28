import type { MultipleChoiceQuestion, TracingQuestion, Quiz } from '@/types/exercise';

export const sortingQuizQuestions: (MultipleChoiceQuestion | TracingQuestion)[] = [
  {
    id: 'sort-mc-1',
    title: 'Bubble Sort Complexity',
    description: 'Understanding time complexity of Bubble Sort',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the average time complexity of Bubble Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    explanation:
      'Bubble Sort has O(n²) average time complexity because it uses two nested loops. The outer loop runs n times, and the inner loop runs up to n times for each iteration of the outer loop.',
  },
  {
    id: 'sort-mc-2',
    title: 'Stable Sorting',
    description: 'Understanding stable vs unstable sorting',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question:
      'Which of the following sorting algorithms is NOT stable?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
    correctAnswer: 3,
    explanation:
      'Quick Sort is not stable because equal elements may be rearranged during the partitioning process. Bubble Sort, Insertion Sort, and Merge Sort all maintain the relative order of equal elements.',
  },
  {
    id: 'sort-mc-3',
    title: 'Best Case Complexity',
    description: 'Understanding best case scenarios',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question:
      'Which sorting algorithm has O(n) best-case time complexity when the array is already sorted?',
    options: ['Selection Sort', 'Bubble Sort', 'Merge Sort', 'Quick Sort'],
    correctAnswer: 1,
    explanation:
      'Bubble Sort can achieve O(n) time complexity when the array is already sorted, if implemented with an optimization that stops when no swaps occur in a pass. Selection Sort always runs O(n²) regardless of input.',
  },
  {
    id: 'sort-mc-4',
    title: 'Space Complexity',
    description: 'Understanding space requirements',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which sorting algorithm requires O(n) extra space?',
    options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'],
    correctAnswer: 2,
    explanation:
      'Merge Sort requires O(n) extra space to store the temporary arrays during the merge process. Bubble Sort, Quick Sort (in-place), and Insertion Sort only need O(1) extra space.',
  },
  {
    id: 'sort-mc-5',
    title: 'Quick Sort Pivot',
    description: 'Understanding Quick Sort partitioning',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question:
      'In Quick Sort, what happens to the pivot element after partitioning?',
    options: [
      'It moves to the beginning of the array',
      'It stays in its original position',
      'It is placed in its final sorted position',
      'It moves to the end of the array',
    ],
    correctAnswer: 2,
    explanation:
      'After partitioning in Quick Sort, the pivot element is placed in its final sorted position. All elements smaller than the pivot are to its left, and all elements greater are to its right.',
  },
  {
    id: 'sort-trace-1',
    title: 'Bubble Sort Trace',
    description: 'Trace through Bubble Sort execution',
    type: 'tracing',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 15,
    question:
      'After the FIRST complete pass of Bubble Sort on array [5, 3, 8, 4, 2], what is the resulting array?',
    code: `int[] arr = {5, 3, 8, 4, 2};
// First pass of Bubble Sort
for (int j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
    }
}`,
    steps: [
      { line: 3, variables: { j: '0', 'arr[0]': '5', 'arr[1]': '3' }, output: 'Compare 5 > 3? Yes, swap' },
      { line: 3, variables: { j: '1', 'arr[1]': '5', 'arr[2]': '8' }, output: 'Compare 5 > 8? No' },
      { line: 3, variables: { j: '2', 'arr[2]': '8', 'arr[3]': '4' }, output: 'Compare 8 > 4? Yes, swap' },
      { line: 3, variables: { j: '3', 'arr[3]': '8', 'arr[4]': '2' }, output: 'Compare 8 > 2? Yes, swap' },
    ],
    finalAnswer: '[3, 5, 4, 2, 8]',
    answerType: 'array-state',
  },
  {
    id: 'sort-mc-6',
    title: 'Merge Sort Division',
    description: 'Understanding divide and conquer',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question:
      'How many times will an array of 8 elements be divided in half during Merge Sort before reaching single elements?',
    options: ['2 times', '3 times', '4 times', '8 times'],
    correctAnswer: 1,
    explanation:
      'An array of 8 elements is divided: 8→4→2→1. That\'s 3 levels of division (log₂8 = 3). Each division splits the array in half until we reach single elements.',
  },
  {
    id: 'sort-mc-7',
    title: 'Selection Sort Behavior',
    description: 'Understanding Selection Sort',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question:
      'In Selection Sort, after the first pass through an array, which element is guaranteed to be in its correct position?',
    options: [
      'The largest element',
      'The smallest element',
      'The middle element',
      'No element is guaranteed to be correct',
    ],
    correctAnswer: 1,
    explanation:
      'Selection Sort finds the minimum element in the unsorted portion and places it at the beginning. After the first pass, the smallest element is in its correct position (index 0).',
  },
  {
    id: 'sort-mc-8',
    title: 'Insertion Sort Use Case',
    description: 'When to use Insertion Sort',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question:
      'For which scenario is Insertion Sort likely to perform best?',
    options: [
      'Sorting a large array of random numbers',
      'Sorting a nearly sorted array',
      'Sorting an array in reverse order',
      'Sorting an array with many duplicate values',
    ],
    correctAnswer: 1,
    explanation:
      'Insertion Sort performs best on nearly sorted arrays because each element only needs to move a small distance. It achieves O(n) time when the array is almost sorted, compared to O(n²) for random or reverse-sorted arrays.',
  },
  {
    id: 'sort-mc-9',
    title: 'Quick Sort Worst Case',
    description: 'Understanding Quick Sort performance',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'advanced',
    points: 15,
    question:
      'When does Quick Sort exhibit its worst-case O(n²) time complexity?',
    options: [
      'When all elements are equal',
      'When the pivot is always the median',
      'When the array is already sorted (with first/last element as pivot)',
      'When the array has an odd number of elements',
    ],
    correctAnswer: 2,
    explanation:
      'Quick Sort has O(n²) worst case when the pivot selection consistently results in highly unbalanced partitions. This happens with already sorted arrays when using the first or last element as pivot, creating partitions of size 0 and n-1.',
  },
  {
    id: 'sort-mc-10',
    title: 'Comparison Count',
    description: 'Counting comparisons in sorting',
    type: 'multiple-choice',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question:
      'How many comparisons does Bubble Sort make in the FIRST pass through an array of n elements?',
    options: ['n', 'n - 1', 'n²', 'n / 2'],
    correctAnswer: 1,
    explanation:
      'In the first pass, Bubble Sort compares adjacent elements: (0,1), (1,2), (2,3), ... up to (n-2, n-1). This is exactly n-1 comparisons.',
  },
];

export const sortingQuiz: Quiz = {
  id: 'sorting-fundamentals',
  title: 'Sorting Algorithms Fundamentals',
  description:
    'Test your understanding of sorting algorithms including Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.',
  topic: 'sorting',
  questions: sortingQuizQuestions,
  passingScore: 70,
  timeLimit: 15,
};
