import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const sortingDeepQuestions: MultipleChoiceQuestion[] = [
  // Heap Sort Questions (3)
  {
    id: 'sort-heap-1',
    type: 'multiple-choice',
    title: 'Heap Sort Time Complexity',
    description: 'Understanding Heap Sort performance',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is the time complexity of Heap Sort in the worst case?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n^2)',
      'O(log n)'
    ],
    correctAnswer: 1,
    explanation: 'Heap Sort has O(n log n) time complexity in all cases (best, average, worst). Building the heap takes O(n), and extracting n elements each with O(log n) heapify gives O(n log n) total.'
  },
  {
    id: 'sort-heap-2',
    type: 'multiple-choice',
    title: 'Heap Sort Space',
    description: 'Understanding Heap Sort memory usage',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is the space complexity of Heap Sort?',
    options: [
      'O(n)',
      'O(log n)',
      'O(1)',
      'O(n log n)'
    ],
    correctAnswer: 2,
    explanation: 'Heap Sort is an in-place sorting algorithm that requires only O(1) extra space. The heap is built within the original array, and only a few variables are needed for swapping.'
  },
  {
    id: 'sort-heap-3',
    type: 'multiple-choice',
    title: 'Heap Property',
    description: 'Understanding max-heap property',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question: 'In a max-heap used for Heap Sort, what is true about the root element?',
    options: [
      'It is the smallest element',
      'It is the largest element',
      'It is the median element',
      'It is always the first inserted element'
    ],
    correctAnswer: 1,
    explanation: 'In a max-heap, the root element is always the largest element in the heap. This property allows Heap Sort to repeatedly extract the maximum and place it at the end of the sorted portion.'
  },

  // Algorithm Comparison Questions (3)
  {
    id: 'sort-compare-1',
    type: 'multiple-choice',
    title: 'Best Algorithm Choice',
    description: 'Choosing the right algorithm',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which sorting algorithm would you choose for sorting a very large file that cannot fit in memory?',
    options: [
      'Quick Sort',
      'Heap Sort',
      'Merge Sort',
      'Insertion Sort'
    ],
    correctAnswer: 2,
    explanation: 'Merge Sort is ideal for external sorting (large files) because it accesses data sequentially and can efficiently merge sorted chunks from disk. It minimizes random access patterns that are slow for external storage.'
  },
  {
    id: 'sort-compare-2',
    type: 'multiple-choice',
    title: 'Stable Sorting Algorithms',
    description: 'Identifying stable sorts',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question: 'Which of the following is a stable sorting algorithm?',
    options: [
      'Quick Sort',
      'Heap Sort',
      'Selection Sort',
      'Merge Sort'
    ],
    correctAnswer: 3,
    explanation: 'Merge Sort is stable - it preserves the relative order of equal elements. Quick Sort, Heap Sort, and Selection Sort are not stable because they can swap equal elements past each other.'
  },
  {
    id: 'sort-compare-3',
    type: 'multiple-choice',
    title: 'In-Place Sorting',
    description: 'Understanding space requirements',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which of these O(n log n) algorithms is NOT in-place?',
    options: [
      'Quick Sort',
      'Heap Sort',
      'Merge Sort',
      'Both Quick Sort and Heap Sort'
    ],
    correctAnswer: 2,
    explanation: 'Merge Sort requires O(n) auxiliary space for merging, making it not in-place. Quick Sort uses O(log n) stack space for recursion, and Heap Sort uses O(1) space - both are considered in-place.'
  },

  // Complexity and Tracing (4)
  {
    id: 'sort-trace-2',
    type: 'multiple-choice',
    title: 'Quick Sort Partition',
    description: 'Understanding partitioning',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'After partitioning [7, 2, 1, 6, 8, 5, 3, 4] with pivot 4 (last element), what element is at index 3?',
    options: [
      '4',
      '6',
      '3',
      '2'
    ],
    correctAnswer: 0,
    explanation: 'After partitioning with pivot 4: elements less than 4 (2,1,3) go left, elements greater (7,6,8,5) go right. Result: [2,1,3,4,8,5,7,6]. The pivot 4 ends up at index 3, its final sorted position.'
  },
  {
    id: 'sort-trace-3',
    type: 'multiple-choice',
    title: 'Selection Sort Pass',
    description: 'Tracing Selection Sort',
    topic: 'sorting',
    difficulty: 'beginner',
    points: 10,
    question: 'After TWO passes of Selection Sort on [64, 25, 12, 22, 11], what are the first two elements?',
    options: [
      '[11, 12]',
      '[11, 22]',
      '[12, 11]',
      '[25, 12]'
    ],
    correctAnswer: 0,
    explanation: 'Selection Sort: Pass 1 finds min (11), swaps with index 0: [11, 25, 12, 22, 64]. Pass 2 finds min in remaining (12), swaps with index 1: [11, 12, 25, 22, 64]. First two elements are [11, 12].'
  },
  {
    id: 'sort-complex-1',
    type: 'multiple-choice',
    title: 'Merge Sort Levels',
    description: 'Understanding recursion depth',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'For an array of 16 elements, how many levels of recursion does Merge Sort have?',
    options: [
      '2',
      '4',
      '8',
      '16'
    ],
    correctAnswer: 1,
    explanation: 'Merge Sort divides the array in half at each level. For 16 elements: 16 -> 8 -> 4 -> 2 -> 1. That is log2(16) = 4 levels of recursion. Each level processes all n elements, giving O(n log n) total.'
  },
  {
    id: 'sort-complex-2',
    type: 'multiple-choice',
    title: 'Swap Count',
    description: 'Counting swaps',
    topic: 'sorting',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which algorithm makes the minimum number of swaps to sort an array?',
    options: [
      'Bubble Sort',
      'Selection Sort',
      'Insertion Sort',
      'Quick Sort'
    ],
    correctAnswer: 1,
    explanation: 'Selection Sort makes at most n-1 swaps (one per pass, placing the minimum in position). Other algorithms may make more swaps: Bubble Sort can make O(n^2) swaps, and Quick/Insertion vary based on data.'
  }
];

export const sortingDeepQuiz: Quiz = {
  id: 'sorting-deep',
  title: 'Deep Sorting Algorithms',
  description: 'Advanced quiz covering all sorting algorithms including Heap Sort, algorithm selection, and complexity analysis',
  questions: sortingDeepQuestions,
  timeLimit: 15,
  passingScore: 70,
  topic: 'sorting'
};

export const allSortingQuizzes = [sortingDeepQuiz];
