import type { MultipleChoiceQuestion, TracingQuestion, Quiz } from '@/types/exercise';

const conceptualQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'list-concept-1',
    title: 'ArrayList Get',
    description: 'Time complexity of ArrayList access',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the time complexity of get(index) in an ArrayList?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation:
      'ArrayList provides O(1) random access because it uses a backing array. The element at any index can be accessed directly using data[index].',
  },
  {
    id: 'list-concept-2',
    title: 'LinkedList addFirst',
    description: 'Time complexity of LinkedList addFirst',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the time complexity of addFirst() in a Singly LinkedList?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation:
      'addFirst() is O(1) for LinkedList because we only need to create a new node and update the head pointer. No traversal is required.',
  },
  {
    id: 'list-concept-3',
    title: 'Singly vs Doubly removeLast',
    description: 'Understanding removeLast complexity',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 10,
    question:
      'Why is removeLast() O(n) for Singly LinkedList but O(1) for Doubly LinkedList?',
    options: [
      'Singly LinkedList must traverse to find the second-to-last node',
      'Doubly LinkedList has a larger capacity',
      'Singly LinkedList needs to resize',
      'Doubly LinkedList uses arrays internally',
    ],
    correctAnswer: 0,
    explanation:
      'In Singly LinkedList, we can only traverse forward. To remove the last node, we must find the second-to-last node to update its next pointer to null. Doubly LinkedList can use tail.prev directly.',
  },
  {
    id: 'list-concept-4',
    title: 'ArrayList Resizing',
    description: 'Understanding dynamic array growth',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'beginner',
    points: 10,
    question:
      'What happens when you add an element to an ArrayList that has reached its capacity?',
    options: [
      'The array doubles in size and elements are copied',
      'An exception is thrown',
      'The oldest element is removed',
      'Nothing - the add fails silently',
    ],
    correctAnswer: 0,
    explanation:
      'ArrayList automatically resizes by creating a new array (typically double the capacity) and copying all existing elements. This is why addLast is O(1) amortized.',
  },
  {
    id: 'list-concept-5',
    title: 'Doubly LinkedList Node',
    description: 'Node structure in doubly linked list',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'beginner',
    points: 10,
    question: 'What references are stored in a Node of a Doubly LinkedList?',
    options: [
      'data, next, and prev',
      'data and next only',
      'data, next, and index',
      'data, parent, and child',
    ],
    correctAnswer: 0,
    explanation:
      'A doubly-linked node stores the data value, a reference to the next node, and a reference to the previous node. This allows traversal in both directions.',
  },
  {
    id: 'list-concept-6',
    title: 'ArrayList vs LinkedList',
    description: 'Comparing list implementations',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 10,
    question:
      'Which operation is more efficient in ArrayList compared to LinkedList?',
    options: [
      'Accessing elements by index',
      'Inserting at the beginning',
      'Removing from the beginning',
      'Inserting in the middle when position is known',
    ],
    correctAnswer: 0,
    explanation:
      'ArrayList excels at random access (get/set by index) with O(1) time, while LinkedList requires O(n) traversal. LinkedList is better for insertions/deletions at the ends.',
  },
  {
    id: 'list-concept-7',
    title: 'Size vs Capacity',
    description: 'Understanding ArrayList internals',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 10,
    question:
      'In ArrayList, what is the purpose of maintaining both "size" and "capacity"?',
    options: [
      'Size tracks actual elements; capacity is the backing array length',
      'Size is maximum allowed; capacity is current count',
      'They are the same thing with different names',
      'Size is for integers; capacity is for objects',
    ],
    correctAnswer: 0,
    explanation:
      'Size is the number of elements actually stored (0 to size-1 are valid indices). Capacity is the length of the backing array. Capacity >= Size always.',
  },
  {
    id: 'list-concept-8',
    title: 'LinkedList Memory',
    description: 'Memory usage comparison',
    type: 'multiple-choice',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is a key disadvantage of LinkedList compared to ArrayList?',
    options: [
      'Higher memory usage due to storing pointers in each node',
      'Cannot store different data types',
      'Maximum size is limited',
      'Elements cannot be null',
    ],
    correctAnswer: 0,
    explanation:
      'Each LinkedList node stores data plus pointer(s), using significantly more memory than ArrayList. For integers, a doubly-linked list uses about 10x more memory.',
  },
];

const tracingQuestions: TracingQuestion[] = [
  {
    id: 'list-trace-1',
    title: 'ArrayList Operations',
    description: 'Trace ArrayList add operations',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'beginner',
    points: 15,
    question: `What does the ArrayList contain after these operations?

ArrayList<Integer> list = new ArrayList<>();
list.add(0, 10);
list.add(1, 20);
list.add(0, 5);
list.add(2, 15);`,
    code: `ArrayList<Integer> list = new ArrayList<>();
list.add(0, 10);  // [10]
list.add(1, 20);  // [10, 20]
list.add(0, 5);   // [5, 10, 20]
list.add(2, 15);  // [5, 10, 15, 20]`,
    steps: [
      { line: 2, variables: { list: '[10]' } },
      { line: 3, variables: { list: '[10, 20]' } },
      { line: 4, variables: { list: '[5, 10, 20]' }, output: 'Shifted 10,20 right' },
      { line: 5, variables: { list: '[5, 10, 15, 20]' }, output: 'Shifted 20 right' },
    ],
    finalAnswer: '[5, 10, 15, 20]',
    answerType: 'array-state',
  },
  {
    id: 'list-trace-2',
    title: 'ArrayList Remove',
    description: 'Trace ArrayList remove operation',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 15,
    question: `What is returned by the final get() call?

ArrayList<Integer> list = new ArrayList<>();
list.add(0, 100);
list.add(0, 200);
list.add(0, 300);
list.remove(1);
int result = list.get(1);`,
    code: `list.add(0, 100);  // [100]
list.add(0, 200);  // [200, 100]
list.add(0, 300);  // [300, 200, 100]
list.remove(1);    // [300, 100]
list.get(1);       // returns 100`,
    steps: [
      { line: 1, variables: { list: '[100]' } },
      { line: 2, variables: { list: '[200, 100]' } },
      { line: 3, variables: { list: '[300, 200, 100]' } },
      { line: 4, variables: { list: '[300, 100]' }, output: 'Removed 200' },
      { line: 5, variables: { result: '100' } },
    ],
    finalAnswer: '100',
    answerType: 'variable-value',
  },
  {
    id: 'list-trace-3',
    title: 'LinkedList addFirst',
    description: 'Trace LinkedList pointer changes',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'beginner',
    points: 15,
    question: `For a LinkedList: head -> [A] -> [B] -> [C] -> null
After calling addFirst("X"), what does head.next.data contain?`,
    code: `// Before: head -> [A] -> [B] -> [C] -> null
addFirst("X");
// After: head -> [X] -> [A] -> [B] -> [C] -> null
// head.next is node [A]`,
    steps: [
      { line: 1, variables: { 'head.data': 'A', 'head.next.data': 'B' } },
      { line: 2, variables: { 'head.data': 'X', 'head.next.data': 'A' } },
    ],
    finalAnswer: 'A',
    answerType: 'variable-value',
  },
  {
    id: 'list-trace-4',
    title: 'ArrayList Shifting',
    description: 'Count element shifts',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 15,
    question: `How many element shifts occur when calling add(2, value) on an ArrayList with elements [10, 20, 30, 40, 50]?`,
    code: `// [10, 20, 30, 40, 50]
// add(2, value)
// 50 moves: index 4 -> 5
// 40 moves: index 3 -> 4
// 30 moves: index 2 -> 3
// Insert at index 2`,
    steps: [
      { line: 3, variables: { shifted: '1', element: '50' } },
      { line: 4, variables: { shifted: '2', element: '40' } },
      { line: 5, variables: { shifted: '3', element: '30' } },
    ],
    finalAnswer: '3',
    answerType: 'variable-value',
  },
  {
    id: 'list-trace-5',
    title: 'Doubly LinkedList Operations',
    description: 'Trace doubly linked list pointers',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'intermediate',
    points: 15,
    question: `What is the value of tail.prev.data after these operations on a Doubly LinkedList?

DoublyLinkedList<Integer> list = new DoublyLinkedList<>();
list.addLast(10);
list.addLast(20);
list.addLast(30);
list.removeLast();`,
    code: `addLast(10);   // [10]
addLast(20);   // [10] <-> [20]
addLast(30);   // [10] <-> [20] <-> [30]
removeLast();  // [10] <-> [20]
// tail is [20], tail.prev is [10]`,
    steps: [
      { line: 1, variables: { 'tail.data': '10' } },
      { line: 2, variables: { 'tail.data': '20', 'tail.prev.data': '10' } },
      { line: 3, variables: { 'tail.data': '30', 'tail.prev.data': '20' } },
      { line: 4, variables: { 'tail.data': '20', 'tail.prev.data': '10' } },
    ],
    finalAnswer: '10',
    answerType: 'variable-value',
  },
  {
    id: 'list-trace-6',
    title: 'ArrayList Capacity',
    description: 'Understanding size and capacity',
    type: 'tracing',
    topic: 'lists',
    difficulty: 'beginner',
    points: 15,
    question: `An ArrayList has size=5 and capacity=8. After calling add(5, value), what are the new size and capacity?`,
    code: `// size=5, capacity=8
// add(5, value) - adding at the end
// size becomes 6
// capacity stays 8 (no resize needed)`,
    steps: [
      { line: 1, variables: { size: '5', capacity: '8' } },
      { line: 3, variables: { size: '6', capacity: '8' } },
    ],
    finalAnswer: 'size=6, capacity=8',
    answerType: 'variable-value',
  },
];

export const listsQuiz: Quiz = {
  id: 'lists-quiz',
  title: 'Lists Concepts Quiz',
  description:
    'Test your understanding of ArrayList and LinkedList implementations.',
  topic: 'lists',
  questions: [...conceptualQuestions, ...tracingQuestions],
  passingScore: 70,
};

export const listsConceptualQuiz: Quiz = {
  id: 'lists-conceptual',
  title: 'Lists Conceptual Questions',
  description: 'Multiple choice questions about ArrayList and LinkedList concepts.',
  topic: 'lists',
  questions: conceptualQuestions,
  passingScore: 70,
};

export const listsTracingQuiz: Quiz = {
  id: 'lists-tracing',
  title: 'Lists Code Tracing',
  description: 'Trace through List operations to predict the outcome.',
  topic: 'lists',
  questions: tracingQuestions,
  passingScore: 70,
};
