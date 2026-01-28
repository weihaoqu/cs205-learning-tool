import type { MultipleChoiceQuestion, TracingQuestion, Quiz } from '@/types/exercise';

export const arraysQuizQuestions: (MultipleChoiceQuestion | TracingQuestion)[] = [
  {
    id: 'arr-mc-1',
    title: 'Array Index',
    description: 'Understanding array indexing',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 10,
    question: 'In Java, what is the index of the first element in an array?',
    options: ['0', '1', '-1', 'It depends on the array size'],
    correctAnswer: 0,
    explanation:
      'In Java (and most programming languages), arrays are zero-indexed. The first element is at index 0, the second at index 1, and so on.',
  },
  {
    id: 'arr-mc-2',
    title: 'Array Length',
    description: 'Accessing array length',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 10,
    question: 'Given `int[] arr = {1, 2, 3, 4, 5};`, what does `arr.length` return?',
    options: ['4', '5', '6', '0'],
    correctAnswer: 1,
    explanation:
      'The length property returns the number of elements in the array. This array has 5 elements, so arr.length returns 5.',
  },
  {
    id: 'arr-mc-3',
    title: 'Array Access Time',
    description: 'Understanding array access complexity',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the time complexity of accessing an element by index in an array?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation:
      'Array access by index is O(1) constant time because arrays store elements in contiguous memory locations. The memory address can be calculated directly: base_address + (index * element_size).',
  },
  {
    id: 'arr-mc-4',
    title: 'Array Insertion',
    description: 'Understanding insertion complexity',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'intermediate',
    points: 10,
    question:
      'What is the worst-case time complexity of inserting an element at the beginning of an array of size n?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation:
      'Inserting at the beginning requires shifting all n existing elements one position to the right to make room for the new element, resulting in O(n) time complexity.',
  },
  {
    id: 'arr-mc-5',
    title: 'Array Declaration',
    description: 'Java array syntax',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 10,
    question: 'Which is the correct way to declare an array of 10 integers in Java?',
    options: [
      'int arr[10];',
      'int[] arr = new int[10];',
      'array<int> arr = new array(10);',
      'int arr = new int[10];',
    ],
    correctAnswer: 1,
    explanation:
      'In Java, arrays are declared with the type followed by [], and instantiated using "new type[size]". The correct syntax is: int[] arr = new int[10];',
  },
  {
    id: 'arr-trace-1',
    title: 'Array Sum Trace',
    description: 'Trace through array sum calculation',
    type: 'tracing',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 15,
    question: 'What is the final value of sum after this code executes?',
    code: `int[] arr = {3, 7, 2, 5};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum += arr[i];
}`,
    steps: [
      { line: 3, variables: { i: '0', sum: '0', 'arr[i]': '3' } },
      { line: 3, variables: { i: '1', sum: '3', 'arr[i]': '7' } },
      { line: 3, variables: { i: '2', sum: '10', 'arr[i]': '2' } },
      { line: 3, variables: { i: '3', sum: '12', 'arr[i]': '5' } },
    ],
    finalAnswer: '17',
    answerType: 'variable-value',
  },
  {
    id: 'arr-mc-6',
    title: 'Last Element Access',
    description: 'Accessing the last element',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'beginner',
    points: 10,
    question:
      'Given an array `arr` of length n, how do you access the last element?',
    options: ['arr[n]', 'arr[n-1]', 'arr[-1]', 'arr.last()'],
    correctAnswer: 1,
    explanation:
      'Since arrays are zero-indexed, the last element is at index n-1 where n is the length. arr[n] would cause an ArrayIndexOutOfBoundsException.',
  },
  {
    id: 'arr-mc-7',
    title: '2D Array Access',
    description: 'Understanding 2D array indexing',
    type: 'multiple-choice',
    topic: '2d-arrays',
    difficulty: 'beginner',
    points: 10,
    question:
      'In a 2D array `int[][] matrix`, what does `matrix[2][3]` represent?',
    options: [
      'Row 2, Column 3 (0-indexed)',
      'Row 3, Column 2 (0-indexed)',
      '2 rows and 3 columns',
      'The 23rd element',
    ],
    correctAnswer: 0,
    explanation:
      'In 2D arrays, the first index represents the row and the second represents the column. matrix[2][3] accesses the element at row 2, column 3 (both zero-indexed).',
  },
  {
    id: 'arr-mc-8',
    title: '2D Array Rows',
    description: 'Getting dimensions of 2D array',
    type: 'multiple-choice',
    topic: '2d-arrays',
    difficulty: 'intermediate',
    points: 10,
    question:
      'Given `int[][] matrix = new int[4][5];`, how do you get the number of rows?',
    options: ['matrix.length', 'matrix[0].length', 'matrix.rows', 'matrix.size()'],
    correctAnswer: 0,
    explanation:
      'matrix.length gives the number of rows (4 in this case). matrix[0].length gives the number of columns in the first row (5 in this case).',
  },
  {
    id: 'arr-mc-9',
    title: 'Array vs ArrayList',
    description: 'Comparing arrays and ArrayLists',
    type: 'multiple-choice',
    topic: 'arrays',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is a key difference between arrays and ArrayList in Java?',
    options: [
      'Arrays can only store integers',
      'ArrayList has a fixed size while arrays are dynamic',
      'Arrays have a fixed size while ArrayList can grow dynamically',
      'ArrayList is faster for accessing elements',
    ],
    correctAnswer: 2,
    explanation:
      'Arrays have a fixed size determined at creation, while ArrayList can grow and shrink dynamically as elements are added or removed.',
  },
  {
    id: 'arr-trace-2',
    title: 'Find Maximum Trace',
    description: 'Trace through finding maximum element',
    type: 'tracing',
    topic: 'arrays',
    difficulty: 'intermediate',
    points: 15,
    question: 'What is the final value of max after this code executes?',
    code: `int[] arr = {4, 9, 2, 7, 5};
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}`,
    steps: [
      { line: 3, variables: { i: '1', max: '4', 'arr[i]': '9' }, output: '9 > 4? Yes' },
      { line: 3, variables: { i: '2', max: '9', 'arr[i]': '2' }, output: '2 > 9? No' },
      { line: 3, variables: { i: '3', max: '9', 'arr[i]': '7' }, output: '7 > 9? No' },
      { line: 3, variables: { i: '4', max: '9', 'arr[i]': '5' }, output: '5 > 9? No' },
    ],
    finalAnswer: '9',
    answerType: 'variable-value',
  },
];

export const arraysQuiz: Quiz = {
  id: 'arrays-fundamentals',
  title: 'Arrays Fundamentals',
  description:
    'Test your understanding of 1D and 2D arrays including indexing, operations, and time complexity.',
  topic: 'arrays',
  questions: arraysQuizQuestions,
  passingScore: 70,
  timeLimit: 12,
};
