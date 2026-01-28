import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizResult } from '@/types/exercise';

interface ProgressState {
  // Quiz results
  quizResults: Record<string, QuizResult[]>;

  // Module progress
  completedTopics: string[];

  // Actions
  addQuizResult: (result: QuizResult) => void;
  getQuizResults: (quizId: string) => QuizResult[];
  getBestScore: (quizId: string) => number | null;
  markTopicComplete: (topicId: string) => void;
  isTopicComplete: (topicId: string) => boolean;
  resetProgress: () => void;

  // Stats
  getTotalQuizzesTaken: () => number;
  getAverageScore: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      quizResults: {},
      completedTopics: [],

      addQuizResult: (result: QuizResult) => {
        set((state) => {
          const existing = state.quizResults[result.quizId] || [];
          return {
            quizResults: {
              ...state.quizResults,
              [result.quizId]: [...existing, result],
            },
          };
        });
      },

      getQuizResults: (quizId: string) => {
        return get().quizResults[quizId] || [];
      },

      getBestScore: (quizId: string) => {
        const results = get().quizResults[quizId];
        if (!results || results.length === 0) return null;

        return Math.max(
          ...results.map((r) =>
            r.totalPoints > 0 ? (r.score / r.totalPoints) * 100 : 0
          )
        );
      },

      markTopicComplete: (topicId: string) => {
        set((state) => {
          if (state.completedTopics.includes(topicId)) {
            return state;
          }
          return {
            completedTopics: [...state.completedTopics, topicId],
          };
        });
      },

      isTopicComplete: (topicId: string) => {
        return get().completedTopics.includes(topicId);
      },

      resetProgress: () => {
        set({
          quizResults: {},
          completedTopics: [],
        });
      },

      getTotalQuizzesTaken: () => {
        const results = get().quizResults;
        return Object.values(results).reduce(
          (total, quizResults) => total + quizResults.length,
          0
        );
      },

      getAverageScore: () => {
        const results = get().quizResults;
        const allResults = Object.values(results).flat();

        if (allResults.length === 0) return 0;

        const totalPercentage = allResults.reduce((sum, r) => {
          return sum + (r.totalPoints > 0 ? (r.score / r.totalPoints) * 100 : 0);
        }, 0);

        return totalPercentage / allResults.length;
      },
    }),
    {
      name: 'cs205-progress',
    }
  )
);
