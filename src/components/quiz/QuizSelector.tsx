'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Quiz, Topic } from '@/types/exercise';

interface QuizSelectorProps {
  quizzes: Quiz[];
}

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-red-500',
};

const topicLabels: Record<string, string> = {
  arrays: 'Arrays',
  sorting: 'Sorting',
  '2d-arrays': '2D Arrays',
  complexity: 'Algorithm Complexity',
  lists: 'Lists',
  recursion: 'Recursion',
  'stack-queue': 'Stacks & Queues',
};

const topicColors: Record<string, string> = {
  arrays: 'bg-blue-500',
  sorting: 'bg-blue-400',
  '2d-arrays': 'bg-blue-300',
  lists: 'bg-green-500',
  recursion: 'bg-orange-500',
  'stack-queue': 'bg-cyan-500',
  complexity: 'bg-purple-500',
};

// Define the order topics should appear
const topicOrder: string[] = [
  'arrays',
  'sorting',
  '2d-arrays',
  'lists',
  'recursion',
  'stack-queue',
  'complexity',
];

export function QuizSelector({ quizzes }: QuizSelectorProps) {
  // Group quizzes by topic
  const quizzesByTopic = quizzes.reduce((acc, quiz) => {
    const topic = quiz.topic;
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(quiz);
    return acc;
  }, {} as Record<string, Quiz[]>);

  // Sort topics according to topicOrder
  const sortedTopics = Object.keys(quizzesByTopic).sort((a, b) => {
    const indexA = topicOrder.indexOf(a);
    const indexB = topicOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="space-y-8">
      {sortedTopics.map((topic) => (
        <div key={topic}>
          {/* Topic Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-3 h-3 rounded-full ${topicColors[topic] || 'bg-gray-500'}`} />
            <h2 className="text-xl font-bold">{topicLabels[topic] || topic}</h2>
            <span className="text-sm text-muted-foreground">
              ({quizzesByTopic[topic].length} {quizzesByTopic[topic].length === 1 ? 'quiz' : 'quizzes'})
            </span>
          </div>

          {/* Quizzes Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizzesByTopic[topic].map((quiz) => {
              const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
              const difficulties = [...new Set(quiz.questions.map((q) => q.difficulty))];

              return (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription className="text-sm">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{quiz.questions.length} questions</span>
                      <span>{totalPoints} pts</span>
                      {quiz.timeLimit && <span>{quiz.timeLimit} min</span>}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-muted-foreground">Difficulty:</span>
                      {difficulties.map((d) => (
                        <span
                          key={d}
                          className={`w-2 h-2 rounded-full ${difficultyColors[d]}`}
                          title={d}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Pass: {quiz.passingScore}%
                      </span>
                      <Button asChild size="sm">
                        <Link href={`/quiz/${quiz.id}`}>Start Quiz</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
