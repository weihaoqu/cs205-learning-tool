import type { Question, Quiz } from '@/types/exercise';

/**
 * Decide whether a submitted answer is correct, from the question definition.
 *
 * This deliberately MIRRORS the client components exactly:
 *   - MultipleChoice.tsx: selectedOption === question.correctAnswer
 *   - TracingQuestion.tsx: userAnswer.trim().toLowerCase()
 *                          === question.finalAnswer.trim().toLowerCase()
 *
 * They must agree, or a student sees "Correct!" and is recorded wrong. The
 * equivalence is asserted against every stored historical attempt in
 * scripts/test-quiz-grading.mjs.
 */
export function gradeAnswer(question: Question, userAnswer: unknown): boolean {
  switch (question.type) {
    case 'multiple-choice': {
      if (typeof userAnswer !== 'number' && typeof userAnswer !== 'string') return false;
      const chosen = Number(userAnswer);
      return Number.isInteger(chosen) && chosen === question.correctAnswer;
    }
    case 'tracing': {
      if (typeof userAnswer !== 'string') return false;
      return userAnswer.trim().toLowerCase() === question.finalAnswer.trim().toLowerCase();
    }
    case 'code-completion':
    case 'interactive': {
      // Not used by any quiz in src/content/quizzes. If one is ever added, the
      // exhaustiveness check below stops compiling until grading is written,
      // rather than letting the client decide its own score.
      return false;
    }
    default: {
      const exhaustive: never = question;
      void exhaustive;
      return false;
    }
  }
}

export interface RawAnswer {
  questionId: string;
  userAnswer: unknown;
}

/**
 * Grade a whole attempt from raw answers. The client's own `isCorrect` flag is
 * ignored: it is not evidence, it is a claim.
 */
export function gradeAttempt(quiz: Quiz, answers: RawAnswer[]) {
  const byId = new Map(quiz.questions.map((q) => [q.id, q]));
  const graded: { questionId: string; isCorrect: boolean }[] = [];

  for (const a of answers) {
    const q = byId.get(a.questionId);
    if (!q) continue; // an answer for a question this quiz does not contain
    graded.push({ questionId: a.questionId, isCorrect: gradeAnswer(q, a.userAnswer) });
  }
  return graded;
}
