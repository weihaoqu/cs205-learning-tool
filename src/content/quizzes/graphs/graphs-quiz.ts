import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const graphsQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'graphs-1', type: 'multiple-choice', title: 'BFS Data Structure', description: 'BFS implementation', topic: 'graphs', difficulty: 'beginner', points: 10,
    question: 'What data structure does BFS use?',
    options: ['Stack', 'Queue', 'Heap', 'Array'],
    correctAnswer: 1,
    explanation: 'BFS uses a queue (FIFO) to ensure vertices are processed in the order they were discovered, enabling level-by-level exploration.',
  },
  {
    id: 'graphs-2', type: 'multiple-choice', title: 'DFS Data Structure', description: 'DFS implementation', topic: 'graphs', difficulty: 'beginner', points: 10,
    question: 'What data structure does DFS use?',
    options: ['Queue', 'Stack / Recursion', 'Priority Queue', 'Linked List'],
    correctAnswer: 1,
    explanation: 'DFS uses a stack (LIFO) or the call stack via recursion to go as deep as possible before backtracking.',
  },
  {
    id: 'graphs-3', type: 'multiple-choice', title: 'BFS Time Complexity', description: 'BFS complexity', topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: 'What is the time complexity of BFS on a graph with V vertices and E edges?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
    correctAnswer: 2,
    explanation: 'BFS visits every vertex once O(V) and examines every edge once O(E), giving O(V + E) total.',
  },
  {
    id: 'graphs-4', type: 'multiple-choice', title: 'Shortest Path Unweighted', description: 'Algorithm selection', topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: 'Which algorithm finds the shortest path in an unweighted graph?',
    options: ['DFS', 'BFS', "Dijkstra's", 'Binary Search'],
    correctAnswer: 1,
    explanation: 'BFS naturally finds shortest paths in unweighted graphs because it explores vertices level by level — the first time it reaches a vertex is via the shortest path.',
  },
  {
    id: 'graphs-5', type: 'multiple-choice', title: 'Adjacency Matrix Space', description: 'Space complexity', topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: 'What is the space complexity of an adjacency matrix?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V²)'],
    correctAnswer: 3,
    explanation: 'An adjacency matrix is a V×V 2D array, requiring O(V²) space regardless of the number of edges.',
  },
  {
    id: 'graphs-6', type: 'multiple-choice', title: 'Dijkstra Negative Weights', description: "Dijkstra's limitations", topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: "Can Dijkstra's algorithm handle negative edge weights?",
    options: ['Yes', 'No', 'Only with modification', 'Only for directed graphs'],
    correctAnswer: 1,
    explanation: "Dijkstra's cannot handle negative weights because it greedily finalizes distances. A negative edge could make a previously finalized distance incorrect. Use Bellman-Ford for negative weights.",
  },
  {
    id: 'graphs-7', type: 'multiple-choice', title: 'Dijkstra Efficiency', description: "Dijkstra's implementation", topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: "What data structure makes Dijkstra's algorithm efficient?",
    options: ['Queue', 'Stack', 'Priority Queue / Min-Heap', 'Hash Map'],
    correctAnswer: 2,
    explanation: 'A min-heap priority queue allows efficient extraction of the vertex with minimum distance in O(log V), making the algorithm O((V + E) log V).',
  },
  {
    id: 'graphs-8', type: 'multiple-choice', title: 'Undirected Adjacency', description: 'Graph properties', topic: 'graphs', difficulty: 'beginner', points: 10,
    question: 'In an undirected graph, if vertex A is adjacent to B, is B adjacent to A?',
    options: ['Yes', 'No', 'Only if weighted', 'Depends on the graph'],
    correctAnswer: 0,
    explanation: 'In an undirected graph, edges go both ways. If A is connected to B, then B is also connected to A. This is the defining property of undirected graphs.',
  },
  {
    id: 'graphs-9', type: 'multiple-choice', title: 'Vertex Degree', description: 'Graph terminology', topic: 'graphs', difficulty: 'beginner', points: 10,
    question: 'What is the degree of a vertex connected to 4 edges?',
    options: ['2', '4', '8', '1'],
    correctAnswer: 1,
    explanation: 'The degree of a vertex is the number of edges connected to it. A vertex with 4 edges has degree 4.',
  },
  {
    id: 'graphs-10', type: 'multiple-choice', title: 'DFS Cycle Detection', description: 'DFS applications', topic: 'graphs', difficulty: 'intermediate', points: 10,
    question: 'DFS can be used to detect ___?',
    options: ['Shortest paths', 'Minimum spanning trees', 'Cycles', 'Disconnected components only'],
    correctAnswer: 2,
    explanation: 'DFS can detect cycles by checking if we encounter a vertex that is already in the current recursion/stack path (a back edge). This is one of the primary applications of DFS.',
  },
];

export const graphsQuiz: Quiz = {
  id: 'graphs',
  title: 'Graphs',
  description: "Test your understanding of graph data structures, BFS, DFS, and Dijkstra's algorithm",
  questions: graphsQuestions,
  timeLimit: 12,
  passingScore: 70,
  topic: 'graphs',
};

export const allGraphsQuizzes = [graphsQuiz];
