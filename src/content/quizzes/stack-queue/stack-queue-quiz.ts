import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const stackQueueQuestions: MultipleChoiceQuestion[] = [
  // Conceptual Questions (5)
  {
    id: 'sq-concept-1',
    type: 'multiple-choice',
    title: 'LIFO Definition',
    description: 'Understanding stack terminology',
    topic: 'stack-queue',
    difficulty: 'beginner',
    points: 10,
    question: 'What does LIFO stand for in the context of stacks?',
    options: [
      'Last-In, First-Out',
      'Last-In, Fast-Out',
      'Linked-In, First-Out',
      'Linear-In, First-Out'
    ],
    correctAnswer: 0,
    explanation: 'LIFO stands for Last-In, First-Out. The most recently added element is the first one to be removed, like a stack of plates.'
  },
  {
    id: 'sq-concept-2',
    type: 'multiple-choice',
    title: 'Queue Operations',
    description: 'Understanding queue terminology',
    topic: 'stack-queue',
    difficulty: 'beginner',
    points: 10,
    question: 'Which operation adds an element to a queue?',
    options: [
      'push()',
      'enqueue()',
      'add()',
      'insert()'
    ],
    correctAnswer: 1,
    explanation: 'In queue terminology, enqueue() adds an element to the rear of the queue. Note: In Java\'s Queue interface, offer() or add() are used.'
  },
  {
    id: 'sq-concept-3',
    type: 'multiple-choice',
    title: 'Undo Feature',
    description: 'Applying data structures to real problems',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which data structure would be BEST for implementing an "Undo" feature in a text editor?',
    options: [
      'Queue',
      'Stack',
      'Priority Queue',
      'Array'
    ],
    correctAnswer: 1,
    explanation: 'A Stack is ideal for undo functionality because you want to undo the most recent action first (LIFO). Each action is pushed onto the stack, and undo pops the most recent action.'
  },
  {
    id: 'sq-concept-4',
    type: 'multiple-choice',
    title: 'Stack Time Complexity',
    description: 'Understanding stack operation efficiency',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is the time complexity of push() and pop() operations in a stack implemented with a linked list?',
    options: [
      'O(n)',
      'O(log n)',
      'O(1)',
      'O(n log n)'
    ],
    correctAnswer: 2,
    explanation: 'Both push() and pop() are O(1) constant time operations in a linked list stack. We always operate at the head of the list, so no traversal is needed.'
  },
  {
    id: 'sq-concept-5',
    type: 'multiple-choice',
    title: 'Priority Queue Behavior',
    description: 'Understanding priority queue ordering',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'In a Priority Queue, what determines which element is removed first?',
    options: [
      'The element that was added first (FIFO)',
      'The element that was added last (LIFO)',
      'The element with the highest/lowest priority value',
      'A random element'
    ],
    correctAnswer: 2,
    explanation: 'A Priority Queue removes elements based on their priority, not their arrival order. In Java\'s PriorityQueue, by default the smallest element (natural ordering) is removed first.'
  },

  // Tracing Questions (4)
  {
    id: 'sq-trace-1',
    type: 'multiple-choice',
    title: 'Stack Tracing',
    description: 'Tracing stack operations',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'Given an empty stack, after performing: push(1), push(2), pop(), push(3), pop(), what element remains?',
    options: [
      '1',
      '2',
      '3',
      'Stack is empty'
    ],
    correctAnswer: 0,
    explanation: 'Trace: push(1)→[1], push(2)→[1,2], pop()→[1] (removed 2), push(3)→[1,3], pop()→[1] (removed 3). Only 1 remains.'
  },
  {
    id: 'sq-trace-2',
    type: 'multiple-choice',
    title: 'Queue Tracing',
    description: 'Tracing queue operations',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'Given an empty queue, after performing: enqueue(A), enqueue(B), dequeue(), enqueue(C), what is at the front?',
    options: [
      'A',
      'B',
      'C',
      'Queue is empty'
    ],
    correctAnswer: 1,
    explanation: 'Trace: enqueue(A)→[A], enqueue(B)→[A,B], dequeue()→[B] (removed A), enqueue(C)→[B,C]. B is at the front.'
  },
  {
    id: 'sq-trace-3',
    type: 'multiple-choice',
    title: 'Balanced Parentheses',
    description: 'Applying stacks to bracket matching',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'Is the expression "{[(])}" balanced?',
    options: [
      'Yes, it is balanced',
      'No, it is not balanced',
      'Cannot be determined',
      'Only partially balanced'
    ],
    correctAnswer: 1,
    explanation: 'No, it is not balanced. When we encounter "]", the top of stack is "(", not "[". The brackets are interleaved incorrectly: { matches }, [ matches ], ( matches ), but they must be properly nested.'
  },
  {
    id: 'sq-trace-4',
    type: 'multiple-choice',
    title: 'Stack vs Queue Removal',
    description: 'Comparing LIFO and FIFO behavior',
    topic: 'stack-queue',
    difficulty: 'beginner',
    points: 10,
    question: 'If you add elements 1, 2, 3 to both a Stack and a Queue, then remove all elements, what is the difference in removal order?',
    options: [
      'Stack: 1,2,3 | Queue: 3,2,1',
      'Stack: 3,2,1 | Queue: 1,2,3',
      'Stack: 1,2,3 | Queue: 1,2,3',
      'Stack: 3,2,1 | Queue: 3,2,1'
    ],
    correctAnswer: 1,
    explanation: 'Stack (LIFO) removes in reverse order: 3,2,1 (last added first). Queue (FIFO) removes in insertion order: 1,2,3 (first added first).'
  },

  // Application Question (1)
  {
    id: 'sq-app-1',
    type: 'multiple-choice',
    title: 'BFS Data Structure',
    description: 'Choosing the right data structure for algorithms',
    topic: 'stack-queue',
    difficulty: 'intermediate',
    points: 10,
    question: 'Which data structure should be used for Breadth-First Search (BFS) traversal of a graph?',
    options: [
      'Stack',
      'Queue',
      'Priority Queue',
      'Hash Map'
    ],
    correctAnswer: 1,
    explanation: 'BFS uses a Queue to explore nodes level by level. Nodes are visited in the order they are discovered (FIFO). DFS, on the other hand, uses a Stack (or recursion).'
  }
];

export const stackQueueFullQuiz: Quiz = {
  id: 'stack-queue-full',
  title: 'Stacks & Queues Complete Quiz',
  description: 'Test your understanding of stack and queue operations, implementations, and applications',
  questions: stackQueueQuestions,
  timeLimit: 15,
  passingScore: 70,
  topic: 'stack-queue'
};

export const stackQueueConceptualQuiz: Quiz = {
  id: 'stack-queue-conceptual',
  title: 'Stacks & Queues Concepts',
  description: 'Focus on understanding LIFO, FIFO, and when to use each data structure',
  questions: stackQueueQuestions.filter(q => q.id.includes('concept')),
  timeLimit: 8,
  passingScore: 70,
  topic: 'stack-queue'
};

export const stackQueueTracingQuiz: Quiz = {
  id: 'stack-queue-tracing',
  title: 'Stacks & Queues Tracing',
  description: 'Practice tracing stack and queue operations step by step',
  questions: stackQueueQuestions.filter(q => q.id.includes('trace') || q.id.includes('app')),
  timeLimit: 10,
  passingScore: 70,
  topic: 'stack-queue'
};

export const allStackQueueQuizzes = [
  stackQueueFullQuiz,
  stackQueueConceptualQuiz,
  stackQueueTracingQuiz
];
