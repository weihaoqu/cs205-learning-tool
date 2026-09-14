import type { Quiz } from '@/types/exercise';

export interface ScorableAnswer {
  questionId: string;
  isCorrect: boolean;
}

export interface QuizScore {
  score: number;
  totalPoints: number;
  percentage: number;
}

/**
 * Score a quiz attempt.
 *
 * Pure and exported so it can be tested without rendering the quiz UI.
 * It previously lived inline in QuizContainer, where a bug awarded the final
 * question's points twice: the running total already included the last answer,
 * and then the current question's points were added again. That produced
 * scores above totalPoints (285/260, 60/50) and inflated every quiz average.
 *
 * Answers are matched to questions BY ID, not by array position, so a skipped,
 * reordered, or duplicated answer cannot silently score the wrong question.
 */
export function scoreQuiz(quiz: Quiz, answers: ScorableAnswer[]): QuizScore {
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  // One answer per question; a later answer for the same question replaces the
  // earlier one rather than scoring twice.
  const correctIds = new Set<string>();
  for (const a of answers) {
    if (a.isCorrect) correctIds.add(a.questionId);
    else correctIds.delete(a.questionId);
  }

  const score = quiz.questions.reduce(
    (sum, q) => sum + (correctIds.has(q.id) ? q.points : 0),
    0
  );

  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
  return { score, totalPoints, percentage };
}
