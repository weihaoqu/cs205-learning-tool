export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseTopic = 'arrays' | 'sorting' | '2d-arrays';

export interface ExerciseStep {
  id: string;
  title: string;
  instruction: string;
  hint?: string;
  codeTemplate: string;
  solution: string;
  validation: {
    type: 'exact' | 'contains' | 'regex' | 'output';
    value: string;
  };
  explanation: string;
}

export interface GuidedExercise {
  id: string;
  title: string;
  description: string;
  topic: ExerciseTopic;
  difficulty: ExerciseDifficulty;
  estimatedTime: number; // minutes
  objectives: string[];
  prerequisites?: string[];
  steps: ExerciseStep[];
  starterCode: string;
  finalSolution: string;
}

export interface ExerciseAttempt {
  moduleId: string;
  exerciseId: string;
  completedSteps: string[];
  currentStep: number;
  code: string;
  startedAt: Date;
  completedAt?: Date;
}
