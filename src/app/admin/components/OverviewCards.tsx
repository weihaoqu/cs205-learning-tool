'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, GraduationCap, Eye } from 'lucide-react';

interface OverviewData {
  totalStudents: number;
  activeStudents: number;
  avgQuizScore: number;
  weekPageViews: number;
}

const cards = [
  {
    key: 'totalStudents' as const,
    title: 'Total Students',
    icon: Users,
    color: 'text-blue-500',
    format: (v: number) => v.toString(),
  },
  {
    key: 'activeStudents' as const,
    title: 'Active (7d)',
    icon: UserCheck,
    color: 'text-green-500',
    format: (v: number) => v.toString(),
  },
  {
    key: 'avgQuizScore' as const,
    title: 'Avg Quiz Score',
    icon: GraduationCap,
    color: 'text-purple-500',
    format: (v: number) => `${v.toFixed(1)}%`,
  },
  {
    key: 'weekPageViews' as const,
    title: 'Page Views (7d)',
    icon: Eye,
    color: 'text-orange-500',
    format: (v: number) => v.toLocaleString(),
  },
];

export function OverviewCards({ data }: { data: OverviewData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, title, icon: Icon, color, format }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <Icon className={`h-5 w-5 ${color}`} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{format(data[key])}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
