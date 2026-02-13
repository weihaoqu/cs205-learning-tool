import { QuizSelector } from '@/components/quiz';
import { allQuizzes } from '@/content/quizzes/arrays';
import { listQuizzes } from '@/content/quizzes/lists';
import { recursionQuizzes } from '@/content/quizzes/recursion';
import { stackQueueQuizzes } from '@/content/quizzes/stack-queue';
import { complexityQuizzes } from '@/content/quizzes/complexity';
import { sortingQuizzes } from '@/content/quizzes/sorting';
import { mapsQuizzes } from '@/content/quizzes/maps';
import { searchingQuizzes } from '@/content/quizzes/searching';
import { treesQuizzes } from '@/content/quizzes/trees';
import { heapsQuizzes } from '@/content/quizzes/heaps';
import { graphsQuizzes } from '@/content/quizzes/graphs';
import { dpQuizzes } from '@/content/quizzes/dynamic-programming';

const combinedQuizzes = [...allQuizzes, ...listQuizzes, ...recursionQuizzes, ...stackQueueQuizzes, ...complexityQuizzes, ...sortingQuizzes, ...mapsQuizzes, ...searchingQuizzes, ...treesQuizzes, ...heapsQuizzes, ...graphsQuizzes, ...dpQuizzes];

export default function QuizPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Quizzes</h1>
        <p className="text-muted-foreground">
          Test your understanding with interactive quizzes. Get immediate feedback
          and explanations for each question.
        </p>
      </div>

      <QuizSelector quizzes={combinedQuizzes} />

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h2 className="text-xl font-semibold mb-4">Quiz Tips</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li>• Read each question carefully before answering</li>
            <li>• For tracing questions, work through the code step by step</li>
            <li>• You&apos;ll see explanations after each answer</li>
          </ul>
          <ul className="space-y-2">
            <li>• No time pressure - take your time to understand</li>
            <li>• Review incorrect answers to learn from mistakes</li>
            <li>• Retake quizzes as many times as you want</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
