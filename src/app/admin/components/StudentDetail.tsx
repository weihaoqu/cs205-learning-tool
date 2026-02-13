'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const API = '/cs205';

interface StudentDetailData {
  user: { id: string; name: string; email: string; createdAt: string };
  recentVisits: { path: string; duration: number | null; visitedAt: string }[];
  quizAttempts: { quizId: string; score: number; totalPoints: number; percentage: number; completedAt: string }[];
  slideViews: { slideFile: string; viewedAt: string }[];
}

export function StudentDetail({
  studentId,
  onBack,
}: {
  studentId: string;
  onBack: () => void;
}) {
  const [data, setData] = useState<StudentDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/admin/students/${studentId}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) {
    return <p className="text-muted-foreground py-8 text-center">Loading student details...</p>;
  }

  if (!data?.user) {
    return <p className="text-muted-foreground py-8 text-center">Student not found.</p>;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  function formatDuration(seconds: number | null): string {
    if (seconds === null || seconds === undefined) return '-';
    if (seconds < 60) return `${seconds}s`;
    return `${Math.round(seconds / 60)}m`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h2 className="text-xl font-bold">{data.user.name}</h2>
          <p className="text-sm text-muted-foreground">
            {data.user.email} &middot; Registered {formatDate(data.user.createdAt)}
          </p>
        </div>
      </div>

      {/* Quiz Attempts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quiz Attempts ({data.quizAttempts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {data.quizAttempts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quiz attempts yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium">Quiz</th>
                  <th className="text-right py-2 px-2 font-medium">Score</th>
                  <th className="text-right py-2 px-2 font-medium">%</th>
                  <th className="text-right py-2 px-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.quizAttempts.map((q, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-2">{q.quizId}</td>
                    <td className="py-2 px-2 text-right">{q.score}/{q.totalPoints}</td>
                    <td className="py-2 px-2 text-right">{q.percentage.toFixed(1)}%</td>
                    <td className="py-2 px-2 text-right text-muted-foreground">{formatDate(q.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Recent Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Page Visits</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentVisits.length === 0 ? (
            <p className="text-sm text-muted-foreground">No page visits recorded.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium">Page</th>
                  <th className="text-right py-2 px-2 font-medium">Duration</th>
                  <th className="text-right py-2 px-2 font-medium">Visited</th>
                </tr>
              </thead>
              <tbody>
                {data.recentVisits.map((v, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-2 font-mono text-xs">{v.path}</td>
                    <td className="py-2 px-2 text-right">{formatDuration(v.duration)}</td>
                    <td className="py-2 px-2 text-right text-muted-foreground">{formatDate(v.visitedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Slide Views */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Slide Views ({data.slideViews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {data.slideViews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No slides viewed yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.slideViews.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted"
                  title={formatDate(s.viewedAt)}
                >
                  {s.slideFile.replace('.html', '').replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
