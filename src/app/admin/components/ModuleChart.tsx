'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleData {
  moduleId: string;
  moduleName: string;
  visitedStudents: number;
  totalStudents: number;
  percentage: number;
}

export function ModuleChart({ data }: { data: ModuleData[] }) {
  const chartData = data.map((m) => ({
    name: m.moduleName,
    completion: Math.round(m.percentage),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Completion Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 11 }}
                interval={0}
                height={80}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Completion']}
                contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
              />
              <Bar dataKey="completion" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
