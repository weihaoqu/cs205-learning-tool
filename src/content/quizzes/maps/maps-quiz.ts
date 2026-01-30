import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const mapsQuizQuestions: MultipleChoiceQuestion[] = [
  // Hash function basics (2)
  {
    id: 'maps-hash-1',
    type: 'multiple-choice',
    title: 'Hash Function Purpose',
    description: 'Understanding hash functions',
    topic: 'maps',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the primary purpose of a hash function in a HashMap?',
    options: [
      'To sort the keys in order',
      'To convert keys into array indices',
      'To encrypt the stored values',
      'To compare two keys for equality'
    ],
    correctAnswer: 1,
    explanation: 'A hash function converts keys into array indices (bucket indices), allowing O(1) average-time access to values by directly computing where they should be stored.'
  },
  {
    id: 'maps-hash-2',
    type: 'multiple-choice',
    title: 'Bucket Index Calculation',
    description: 'Computing bucket indices',
    topic: 'maps',
    difficulty: 'beginner',
    points: 10,
    question: 'If hashCode("key") = 42 and capacity = 10, what is the bucket index?',
    options: [
      '4',
      '2',
      '42',
      '0'
    ],
    correctAnswer: 1,
    explanation: 'Bucket index = hashCode % capacity = 42 % 10 = 2. The modulo operation ensures the index is within [0, capacity-1].'
  },

  // Collision handling (2)
  {
    id: 'maps-collision-1',
    type: 'multiple-choice',
    title: 'Collision Definition',
    description: 'Understanding collisions',
    topic: 'maps',
    difficulty: 'beginner',
    points: 10,
    question: 'What is a collision in a hash table?',
    options: [
      'When two values are the same',
      'When the hash table is full',
      'When two different keys hash to the same bucket index',
      'When a key is not found'
    ],
    correctAnswer: 2,
    explanation: 'A collision occurs when two different keys produce the same bucket index after hashing. This happens because the hash function maps a large key space to a smaller index space.'
  },
  {
    id: 'maps-collision-2',
    type: 'multiple-choice',
    title: 'Chaining',
    description: 'Collision resolution strategy',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'In Java\'s HashMap, how are collisions handled?',
    options: [
      'The new entry overwrites the existing one',
      'The entry is stored in the next empty bucket',
      'Entries are stored in a linked list at the same bucket (chaining)',
      'An exception is thrown'
    ],
    correctAnswer: 2,
    explanation: 'Java\'s HashMap uses chaining - each bucket can hold a linked list of entries. When a collision occurs, the new entry is added to the chain at that bucket.'
  },

  // Time complexity (2)
  {
    id: 'maps-time-1',
    type: 'multiple-choice',
    title: 'HashMap Time Complexity',
    description: 'Operation performance',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is the average time complexity for HashMap.get() operation?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'HashMap.get() has O(1) average time complexity. The hash function computes the bucket index directly, and with a good hash function, each bucket has few entries to search.'
  },
  {
    id: 'maps-time-2',
    type: 'multiple-choice',
    title: 'Worst Case Complexity',
    description: 'Understanding worst case scenarios',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'What is the worst-case time complexity for HashMap operations?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n^2)'
    ],
    correctAnswer: 2,
    explanation: 'Worst case is O(n) when all keys hash to the same bucket, creating one long chain. This happens with a poor hash function or deliberately crafted malicious keys.'
  },

  // Load factor and rehashing (3)
  {
    id: 'maps-load-1',
    type: 'multiple-choice',
    title: 'Load Factor Calculation',
    description: 'Computing load factor',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'If a HashMap has size=6 and capacity=8, what is the load factor?',
    options: [
      '0.75',
      '0.5',
      '1.33',
      '0.67'
    ],
    correctAnswer: 0,
    explanation: 'Load factor = size / capacity = 6 / 8 = 0.75. This means the hash table is 75% full.'
  },
  {
    id: 'maps-load-2',
    type: 'multiple-choice',
    title: 'Rehashing Trigger',
    description: 'When rehashing occurs',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'With capacity=8 and load factor=0.75, after how many insertions will rehashing occur?',
    options: [
      'After 6 insertions',
      'After 7 insertions (when size exceeds 6)',
      'After 8 insertions',
      'After 12 insertions'
    ],
    correctAnswer: 1,
    explanation: 'Threshold = capacity × loadFactor = 8 × 0.75 = 6. Rehashing occurs when size EXCEEDS threshold, so after the 7th insertion (when size becomes 7 > 6).'
  },
  {
    id: 'maps-load-3',
    type: 'multiple-choice',
    title: 'After Rehashing',
    description: 'New capacity after rehashing',
    topic: 'maps',
    difficulty: 'beginner',
    points: 10,
    question: 'If a HashMap with capacity=8 undergoes rehashing, what is the new capacity?',
    options: [
      '9',
      '12',
      '16',
      '64'
    ],
    correctAnswer: 2,
    explanation: 'During rehashing, capacity is doubled. New capacity = 8 × 2 = 16. This reduces the load factor and provides more buckets for entries.'
  },

  // HashMap vs HashSet (1)
  {
    id: 'maps-set-1',
    type: 'multiple-choice',
    title: 'HashSet Implementation',
    description: 'Understanding HashSet',
    topic: 'maps',
    difficulty: 'beginner',
    points: 10,
    question: 'How is HashSet implemented internally in Java?',
    options: [
      'Using an array of booleans',
      'Using a linked list',
      'Using a HashMap (elements as keys, dummy values)',
      'Using a binary search tree'
    ],
    correctAnswer: 2,
    explanation: 'HashSet is backed by a HashMap internally. When you add an element to HashSet, it\'s stored as a key in the HashMap with a constant dummy value.'
  },

  // Tracing (2)
  {
    id: 'maps-trace-1',
    type: 'multiple-choice',
    title: 'Collision Detection',
    description: 'Identifying collisions',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'With capacity=4, which pair of hash codes will cause a collision? (Remember: index = hashCode % 4)',
    options: [
      '5 and 6',
      '7 and 11',
      '8 and 12',
      '3 and 5'
    ],
    correctAnswer: 1,
    explanation: '7 % 4 = 3, and 11 % 4 = 3. Both hash to bucket index 3, causing a collision. The other pairs hash to different indices.'
  },
  {
    id: 'maps-trace-2',
    type: 'multiple-choice',
    title: 'Index After Rehash',
    description: 'Computing new indices',
    topic: 'maps',
    difficulty: 'intermediate',
    points: 10,
    question: 'A key with hashCode=10 is in bucket 2 (capacity=8). After rehashing to capacity=16, which bucket will it be in?',
    options: [
      '2',
      '10',
      '6',
      '4'
    ],
    correctAnswer: 1,
    explanation: 'New index = hashCode % newCapacity = 10 % 16 = 10. The key moves from bucket 2 to bucket 10 because the capacity changed.'
  }
];

export const mapsQuiz: Quiz = {
  id: 'maps-hashtable',
  title: 'Maps & HashTable Quiz',
  description: 'Test your understanding of HashMap, HashSet, hashing, collisions, and rehashing',
  questions: mapsQuizQuestions,
  timeLimit: 15,
  passingScore: 70,
  topic: 'maps'
};

export const allMapsQuizzes = [mapsQuiz];
