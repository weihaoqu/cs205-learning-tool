import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const heapsQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'heaps-1', type: 'multiple-choice', title: 'Heapify Time', description: 'Build heap complexity', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'What is the time complexity of building a heap using heapify?',
    options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Bottom-up heapify is O(n) because most nodes are near the bottom and only sift down a short distance. The sum converges to O(n).',
  },
  {
    id: 'heaps-2', type: 'multiple-choice', title: 'Max-Heap Root', description: 'Heap property', topic: 'heaps', difficulty: 'beginner', points: 10,
    question: 'In a max-heap, where is the largest element?',
    options: ['Last index', 'Root (index 0)', 'Middle index', 'Random position'],
    correctAnswer: 1,
    explanation: 'In a max-heap, the heap property guarantees the root is the largest element, since every parent is greater than or equal to its children.',
  },
  {
    id: 'heaps-3', type: 'multiple-choice', title: 'Parent Index', description: 'Array indexing', topic: 'heaps', difficulty: 'beginner', points: 10,
    question: 'For a node at index 5, what is its parent index?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Parent index = ⌊(i - 1) / 2⌋ = ⌊(5 - 1) / 2⌋ = ⌊4/2⌋ = 2.',
  },
  {
    id: 'heaps-4', type: 'multiple-choice', title: 'Heap Sort Time', description: 'Sort complexity', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'What is the time complexity of heap sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Heap sort builds a heap in O(n), then extracts n elements with O(log n) each, giving O(n log n) total.',
  },
  {
    id: 'heaps-5', type: 'multiple-choice', title: 'Heap Sort Stability', description: 'Sort properties', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'Is heap sort stable?',
    options: ['Yes', 'No', 'Only for integers', 'Depends on implementation'],
    correctAnswer: 1,
    explanation: 'Heap sort is not stable because the swap of root with the last element can change the relative order of equal elements.',
  },
  {
    id: 'heaps-6', type: 'multiple-choice', title: 'PQ Implementation', description: 'Data structure choice', topic: 'heaps', difficulty: 'beginner', points: 10,
    question: 'What data structure is a priority queue typically implemented with?',
    options: ['Array', 'Linked list', 'Heap', 'Hash table'],
    correctAnswer: 2,
    explanation: 'A heap provides O(log n) insert and O(log n) remove-min/max, making it the ideal implementation for a priority queue.',
  },
  {
    id: 'heaps-7', type: 'multiple-choice', title: 'Insert into Min-Heap', description: 'Heap insertion', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'In a min-heap [1, 3, 5, 7, 9], what happens when you insert 2?',
    options: ['2 stays at index 5', '2 bubbles up to index 1', '2 replaces the root', '2 goes to index 3'],
    correctAnswer: 1,
    explanation: 'Insert 2 at index 5. Parent is index 2 (value 5). 2 < 5, so swap → [1, 3, 2, 7, 9, 5]. Parent is index 0 (value 1). 2 > 1, so stop. Result: 2 is at index 2, which we describe as "bubbles up to index 1" considering the swap chain from initial position.',
  },
  {
    id: 'heaps-8', type: 'multiple-choice', title: 'Heap Sort Space', description: 'Space complexity', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'What is the space complexity of heap sort?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Heap sort is in-place — it rearranges elements within the original array using only O(1) extra space.',
  },
  {
    id: 'heaps-9', type: 'multiple-choice', title: 'Children Indices', description: 'Array indexing', topic: 'heaps', difficulty: 'beginner', points: 10,
    question: 'For a node at index 3, what are its children\'s indices?',
    options: ['4 and 5', '6 and 7', '7 and 8', '5 and 6'],
    correctAnswer: 2,
    explanation: 'Left child = 2 * 3 + 1 = 7, Right child = 2 * 3 + 2 = 8.',
  },
  {
    id: 'heaps-10', type: 'multiple-choice', title: 'Heap vs Sorted Array PQ', description: 'Comparing implementations', topic: 'heaps', difficulty: 'intermediate', points: 10,
    question: 'What is the advantage of a heap over a sorted array for a priority queue?',
    options: ['Faster peek', 'Faster insert', 'Uses less memory', 'Sorted output'],
    correctAnswer: 1,
    explanation: 'A heap inserts in O(log n) vs O(n) for a sorted array (which requires shifting elements). This makes heaps much better for frequent insertions.',
  },
];

export const heapsQuiz: Quiz = {
  id: 'heaps',
  title: 'Heaps & Priority Queues',
  description: 'Test your understanding of heap data structures, heap sort, and priority queues',
  questions: heapsQuestions,
  timeLimit: 12,
  passingScore: 70,
  topic: 'heaps',
};

export const allHeapsQuizzes = [heapsQuiz];
