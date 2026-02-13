'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizStats {
  quizId: string;
  attempts: number;
  avgScore: number;
  minScore: number;
  maxScore: number;
  distribution: { label: string; count: number }[];
}

export function QuizTable({ data }: { data: QuizStats[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quiz data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Quiz</th>
                <th className="text-right py-3 px-2 font-medium">Attempts</th>
                <th className="text-right py-3 px-2 font-medium">Avg</th>
                <th className="text-right py-3 px-2 font-medium">Min</th>
                <th className="text-right py-3 px-2 font-medium">Max</th>
                <th className="text-right py-3 px-2 font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {data.map((quiz) => (
                <tr key={quiz.quizId} className="border-b last:border-0">
                  <td className="py-3 px-2 font-medium">{quiz.quizId}</td>
                  <td className="py-3 px-2 text-right">{quiz.attempts}</td>
                  <td className="py-3 px-2 text-right">{quiz.avgScore.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-right">{quiz.minScore.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-right">{quiz.maxScore.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex gap-0.5 justify-end items-end h-6">
                      {quiz.distribution.map((bucket) => {
                        const maxCount = Math.max(...quiz.distribution.map((b) => b.count), 1);
                        const height = (bucket.count / maxCount) * 100;
                        return (
                          <div
                            key={bucket.label}
                            className="w-3 bg-blue-500 rounded-t"
                            style={{ height: `${Math.max(height, 4)}%` }}
                            title={`${bucket.label}: ${bucket.count}`}
                          />
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
