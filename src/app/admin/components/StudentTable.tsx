'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  lastActive: string | null;
  totalTime: number;
  quizAvg: number;
  quizCount: number;
}

type SortKey = 'name' | 'lastActive' | 'totalTime' | 'quizAvg' | 'quizCount';

export function StudentTable({
  data,
  onSelectStudent,
}: {
  data: Student[];
  onSelectStudent: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'lastActive':
          cmp = (a.lastActive ?? '').localeCompare(b.lastActive ?? '');
          break;
        case 'totalTime':
          cmp = a.totalTime - b.totalTime;
          break;
        case 'quizAvg':
          cmp = a.quizAvg - b.quizAvg;
          break;
        case 'quizCount':
          cmp = a.quizCount - b.quizCount;
          break;
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortAsc ? (
      <ChevronUp className="h-3 w-3 inline ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 inline ml-1" />
    );
  }

  function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  function formatDate(iso: string | null): string {
    if (!iso) return 'Never';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Students</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">
                  <button onClick={() => toggleSort('name')} className="font-medium hover:text-foreground">
                    Name<SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left py-3 px-2 hidden md:table-cell">Email</th>
                <th className="text-right py-3 px-2">
                  <button onClick={() => toggleSort('lastActive')} className="font-medium hover:text-foreground">
                    Last Active<SortIcon col="lastActive" />
                  </button>
                </th>
                <th className="text-right py-3 px-2">
                  <button onClick={() => toggleSort('totalTime')} className="font-medium hover:text-foreground">
                    Time<SortIcon col="totalTime" />
                  </button>
                </th>
                <th className="text-right py-3 px-2">
                  <button onClick={() => toggleSort('quizAvg')} className="font-medium hover:text-foreground">
                    Quiz Avg<SortIcon col="quizAvg" />
                  </button>
                </th>
                <th className="text-right py-3 px-2">
                  <button onClick={() => toggleSort('quizCount')} className="font-medium hover:text-foreground">
                    Quizzes<SortIcon col="quizCount" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => (
                <tr
                  key={s.id}
                  className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onSelectStudent(s.id)}
                >
                  <td className="py-3 px-2 font-medium">{s.name}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{s.email}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground">{formatDate(s.lastActive)}</td>
                  <td className="py-3 px-2 text-right">{formatTime(s.totalTime)}</td>
                  <td className="py-3 px-2 text-right">{s.quizAvg.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-right">{s.quizCount}</td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    {search ? 'No students match your search.' : 'No students registered yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
