'use client';

import { useEffect, useState } from 'react';
import { OverviewCards, type OverviewData } from './components/OverviewCards';
import { ModuleChart, type ModuleData } from './components/ModuleChart';
import { QuizTable, type QuizStats } from './components/QuizTable';
import { ActivityTimeline, type ActivityData } from './components/ActivityTimeline';
import { StudentTable, type Student } from './components/StudentTable';
import { StudentDetail } from './components/StudentDetail';
import { ExportButton } from './components/ExportButton';

const API = '/cs205';
const ALL = 'all';

interface CohortData {
  overview: OverviewData | null;
  modules: ModuleData[];
  quizzes: QuizStats[];
  activity: ActivityData[];
  students: Student[];
}

/*
 * ONE value describes what is currently on screen: which cohort it belongs to,
 * whether it loaded, and the data itself -- committed in a single setState.
 *
 * An earlier version tracked loadedFor / errorFor / initError as three separate
 * flags. They could disagree: a cohort could read "loaded" while its panels had
 * been cleared by a different cohort's failure, an error could outlive a
 * successful retry, and an init failure that returned a JSON body could leave
 * the page loading forever. Those states are unrepresentable here -- status and
 * data travel together, tagged with the cohort they describe.
 */
type Committed =
  | { kind: 'none' }
  | { kind: 'ok'; semester: string; data: CohortData }
  | { kind: 'err'; semester: string | null };

function labelFor(s: string) {
  if (s === ALL) return 'All semesters';
  const [year, season] = s.split('-');
  return `${season.charAt(0).toUpperCase()}${season.slice(1)} ${year}`;
}

async function getJson(path: string, signal: AbortSignal) {
  const r = await fetch(`${API}${path}`, { signal });
  // Without this, an error response carrying a JSON body resolves happily and
  // the caller treats garbage as data.
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r.json();
}

export default function AdminDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [semester, setSemester] = useState<string | null>(null);
  const [committed, setCommitted] = useState<Committed>({ kind: 'none' });

  // Cohort list loads first; `current` decides the default view.
  useEffect(() => {
    const ctrl = new AbortController();
    let cancelled = false;
    getJson('/api/admin/semesters', ctrl.signal)
      .then((d) => {
        if (cancelled) return;
        const list: string[] = Array.isArray(d?.semesters) ? d.semesters : [];
        const current: unknown = d?.current;
        if (typeof current !== 'string' || !current) {
          throw new Error('semesters response has no current semester');
        }
        setSemesters(list);
        setSemester(current);
      })
      .catch((e) => {
        if (cancelled || e?.name === 'AbortError') return;
        console.error(e);
        // semester is still null, and this error is tagged null, so the two
        // match and the page renders an error rather than loading forever.
        setCommitted({ kind: 'err', semester: null });
      });
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  /*
   * Cohort data. Promise.all keeps the five panels of ONE batch consistent; the
   * abort + cancelled guard keeps a superseded batch from committing at all.
   */
  useEffect(() => {
    if (!semester) return;
    const ctrl = new AbortController();
    let cancelled = false;
    const q = `?semester=${encodeURIComponent(semester)}`;

    Promise.all([
      getJson(`/api/admin/overview${q}`, ctrl.signal),
      getJson(`/api/admin/modules${q}`, ctrl.signal),
      getJson(`/api/admin/quizzes${q}`, ctrl.signal),
      getJson(`/api/admin/activity${q}`, ctrl.signal),
      getJson(`/api/admin/students${q}`, ctrl.signal),
    ])
      .then(([ov, mod, quiz, act, stu]) => {
        if (cancelled) return;
        setCommitted({
          kind: 'ok',
          semester,
          data: {
            overview: ov ?? null,
            modules: Array.isArray(mod) ? mod : [],
            quizzes: Array.isArray(quiz) ? quiz : [],
            activity: Array.isArray(act) ? act : [],
            students: Array.isArray(stu) ? stu : [],
          },
        });
      })
      .catch((e) => {
        if (cancelled || e?.name === 'AbortError') return;
        console.error(e);
        setCommitted({ kind: 'err', semester });
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [semester]);

  // Derived, and only ever from the committed value's own cohort tag.
  const data =
    committed.kind === 'ok' && committed.semester === semester ? committed.data : null;
  const failed = committed.kind === 'err' && committed.semester === semester;
  const loading = !data && !failed;

  if (selectedStudent) {
    return (
      <StudentDetail
        studentId={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  const options = [...semesters, ALL];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-muted-foreground">CS205 Data Structures usage analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="semester" className="text-sm text-muted-foreground">
            Semester
          </label>
          <select
            id="semester"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={semester ?? ''}
            onChange={(e) => setSemester(e.target.value)}
            disabled={!semester}
          >
            {options.map((s) => (
              <option key={s} value={s}>
                {labelFor(s)}
              </option>
            ))}
          </select>
          {semester && <ExportButton semester={semester} />}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      ) : failed ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            Could not load analytics{semester ? ` for ${labelFor(semester)}` : ''}. Try again.
          </p>
        </div>
      ) : (
        data && (
          <>
            {data.overview && <OverviewCards data={data.overview} />}

            <div className="grid gap-8 lg:grid-cols-2">
              {data.modules.length > 0 && <ModuleChart data={data.modules} />}
              {data.activity.length > 0 && <ActivityTimeline data={data.activity} />}
            </div>

            <QuizTable data={data.quizzes} />

            <StudentTable data={data.students} onSelectStudent={setSelectedStudent} />
          </>
        )
      )}
    </div>
  );
}
