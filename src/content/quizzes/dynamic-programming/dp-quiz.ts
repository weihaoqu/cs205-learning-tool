import type { Quiz, MultipleChoiceQuestion } from '@/types/exercise';

const dpQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'dp-1', type: 'multiple-choice', title: 'DP Properties', description: 'DP prerequisites', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'What two properties must a problem have for DP to apply?',
    options: ['Greedy choice + sorted input', 'Overlapping subproblems + optimal substructure', 'Divide and conquer + recursion', 'Sorted input + binary property'],
    correctAnswer: 1,
    explanation: 'DP requires (1) overlapping subproblems — the same subproblems are solved multiple times, and (2) optimal substructure — the optimal solution is built from optimal sub-solutions.',
  },
  {
    id: 'dp-2', type: 'multiple-choice', title: 'Memo vs Tab', description: 'Comparing approaches', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'What is the difference between memoization and tabulation?',
    options: ['They are the same thing', 'Memoization is top-down recursive, tabulation is bottom-up iterative', 'Memoization is faster', 'Tabulation uses recursion'],
    correctAnswer: 1,
    explanation: 'Memoization is top-down: start from the original problem, recurse, and cache results. Tabulation is bottom-up: fill a table starting from the smallest subproblems iteratively.',
  },
  {
    id: 'dp-3', type: 'multiple-choice', title: 'Naive Fibonacci', description: 'Complexity analysis', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'What is the time complexity of naive recursive Fibonacci?',
    options: ['O(n)', 'O(n²)', 'O(2^n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Naive recursive Fibonacci has O(2^n) time complexity because each call branches into two subcalls, creating an exponential call tree with massive redundant computation.',
  },
  {
    id: 'dp-4', type: 'multiple-choice', title: 'Memoized Fibonacci', description: 'Optimized complexity', topic: 'dynamic-programming', difficulty: 'beginner', points: 10,
    question: 'What is the time complexity of memoized Fibonacci?',
    options: ['O(2^n)', 'O(n²)', 'O(n)', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'With memoization, each value fib(0) through fib(n) is computed exactly once and cached. Subsequent lookups are O(1), giving O(n) total time.',
  },
  {
    id: 'dp-5', type: 'multiple-choice', title: 'Coin Change DP', description: 'Understanding DP tables', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'In the coin change problem, what does dp[i] represent?',
    options: ['The number of coins of denomination i', 'The minimum number of coins to make amount i', 'The total value using i coins', 'Whether amount i is achievable'],
    correctAnswer: 1,
    explanation: 'dp[i] represents the minimum number of coins needed to make amount i. The recurrence is dp[i] = min(dp[i], dp[i - coin] + 1) for each coin denomination.',
  },
  {
    id: 'dp-6', type: 'multiple-choice', title: 'Knapsack Complexity', description: '0/1 Knapsack time', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'What is the time complexity of the 0/1 knapsack algorithm?',
    options: ['O(n)', 'O(n × W)', 'O(2^n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'The 0/1 knapsack fills a 2D table of size n × W (items × capacity), giving O(n × W) time. This is "pseudo-polynomial" because W is a value, not an input size.',
  },
  {
    id: 'dp-7', type: 'multiple-choice', title: 'LCS Match', description: 'LCS table fill', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'In the LCS table, what happens when characters match?',
    options: ['Take max of top and left', 'Take diagonal value + 1', 'Reset to 0', 'Take min of top and left'],
    correctAnswer: 1,
    explanation: 'When s1[i] == s2[j], we take the diagonal value dp[i-1][j-1] + 1, because this character extends the LCS found so far by one.',
  },
  {
    id: 'dp-8', type: 'multiple-choice', title: 'Solution Recovery', description: 'Traceback', topic: 'dynamic-programming', difficulty: 'intermediate', points: 10,
    question: 'How do you recover the actual solution from a DP table?',
    options: ['Read the first row', 'Traceback from the final cell', 'The solution is always in dp[0]', 'It cannot be recovered'],
    correctAnswer: 1,
    explanation: 'To recover the actual solution (not just the optimal value), you trace back through the DP table from dp[n][m], following the choices that led to each cell\'s value.',
  },
  {
    id: 'dp-9', type: 'multiple-choice', title: 'Stack Safety', description: 'Avoiding overflow', topic: 'dynamic-programming', difficulty: 'beginner', points: 10,
    question: 'Which DP approach avoids stack overflow risk?',
    options: ['Memoization', 'Tabulation (bottom-up)', 'Both equally safe', 'Neither'],
    correctAnswer: 1,
    explanation: 'Tabulation is iterative and does not use the call stack, so it avoids stack overflow. Memoization is recursive and can cause stack overflow for very deep recursion.',
  },
  {
    id: 'dp-10', type: 'multiple-choice', title: 'Climbing Stairs', description: 'Pattern recognition', topic: 'dynamic-programming', difficulty: 'beginner', points: 10,
    question: 'The climbing stairs problem is structurally identical to which classic problem?',
    options: ['Binary search', 'Fibonacci', 'Knapsack', 'Merge sort'],
    correctAnswer: 1,
    explanation: 'Climbing stairs with 1 or 2 steps gives dp[i] = dp[i-1] + dp[i-2], which is exactly the Fibonacci recurrence. The number of ways to climb n stairs is fib(n+1).',
  },
];

export const dpQuiz: Quiz = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  description: 'Test your understanding of DP concepts, memoization, tabulation, and classic problems',
  questions: dpQuestions,
  timeLimit: 15,
  passingScore: 70,
  topic: 'dynamic-programming',
};

export const allDPQuizzes = [dpQuiz];
