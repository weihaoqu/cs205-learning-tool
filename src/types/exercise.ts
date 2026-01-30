export type ExerciseType = 'multiple-choice' | 'code-completion' | 'tracing' | 'interactive';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Topic = 'arrays' | 'sorting' | '2d-arrays' | 'complexity' | 'lists' | 'recursion' | 'stack-queue' | 'maps';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: ExerciseType;
  topic: Topic;
  difficulty: Difficulty;
  points: number;
}

export interface MultipleChoiceQuestion extends Exercise {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  codeSnippet?: string;
}

export interface CodeCompletionQuestion extends Exercise {
  type: 'code-completion';
  prompt: string;
  starterCode: string;
  solution: string;
  blanks: {
    id: string;
    placeholder: string;
    answer: string;
    hint?: string;
  }[];
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface TracingQuestion extends Exercise {
  type: 'tracing';
  question: string;
  code: string;
  steps: {
    line: number;
    variables: Record<string, string>;
    output?: string;
  }[];
  finalAnswer: string;
  answerType: 'output' | 'variable-value' | 'array-state';
}

export interface InteractiveQuestion extends Exercise {
  type: 'interactive';
  instruction: string;
  initialArray: number[];
  targetArray: number[];
  allowedOperations: ('swap' | 'insert' | 'delete' | 'move')[];
  maxSteps?: number;
}

export type Question =
  | MultipleChoiceQuestion
  | CodeCompletionQuestion
  | TracingQuestion
  | InteractiveQuestion;

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  questions: Question[];
  passingScore: number; // percentage
  timeLimit?: number; // minutes
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalPoints: number;
  answers: {
    questionId: string;
    isCorrect: boolean;
    userAnswer: string | number | number[];
    timeTaken: number; // seconds
  }[];
  completedAt: Date;
}

export interface ExerciseProgress {
  oduleId: string;
  completedExercises: string[];
  quizResults: QuizResult[];
  lastAccessed: Date;
}
