'use client';

import { useEffect, useState } from 'react';
import { OverviewCards } from './components/OverviewCards';
import { ModuleChart } from './components/ModuleChart';
import { QuizTable } from './components/QuizTable';
import { ActivityTimeline } from './components/ActivityTimeline';
import { StudentTable } from './components/StudentTable';
import { StudentDetail } from './components/StudentDetail';
import { ExportButton } from './components/ExportButton';

const API = '/cs205';

export default function AdminDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/overview`).then((r) => r.json()),
      fetch(`${API}/api/admin/modules`).then((r) => r.json()),
      fetch(`${API}/api/admin/quizzes`).then((r) => r.json()),
      fetch(`${API}/api/admin/activity`).then((r) => r.json()),
      fetch(`${API}/api/admin/students`).then((r) => r.json()),
    ])
      .then(([ov, mod, quiz, act, stu]) => {
        setOverview(ov);
        setModules(mod);
        setQuizzes(quiz);
        setActivity(act);
        setStudents(stu);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (selectedStudent) {
    return (
      <StudentDetail
        studentId={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-muted-foreground">CS205 Data Structures usage analytics</p>
        </div>
        <ExportButton />
      </div>

      {overview && <OverviewCards data={overview} />}

      <div className="grid gap-8 lg:grid-cols-2">
        {modules.length > 0 && <ModuleChart data={modules} />}
        {activity.length > 0 && <ActivityTimeline data={activity} />}
      </div>

      <QuizTable data={quizzes} />

      <StudentTable data={students} onSelectStudent={setSelectedStudent} />
    </div>
  );
}
