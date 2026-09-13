import type { Prisma } from '@prisma/client';

/** Concrete cohort labels only: 2026-spring, 2026-fall, 2026-summer. */
export const SEMESTER_RE = /^\d{4}-(spring|fall|summer)$/;

/** Thrown for invalid client input; routes map this to HTTP 400, never 500. */
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

/**
 * Parse a concrete semester. Used for CURRENT_SEMESTER and for every write.
 * Deliberately rejects the 'all' sentinel -- writes must name a real cohort.
 */
export function parseCurrentSemester(v: unknown): string {
  if (typeof v !== 'string' || !SEMESTER_RE.test(v)) {
    throw new Error(`Invalid semester: ${String(v)}`);
  }
  return v;
}

/** The cohort new registrations join. Fail-fast: a wrong default mislabels a whole cohort. */
export function getCurrentSemester(): string {
  return parseCurrentSemester(process.env.CURRENT_SEMESTER);
}

/** Read-side scope: one concrete cohort, or every cohort. */
export type Selection = { kind: 'all' } | { kind: 'one'; semester: string };

/**
 * Parse a ?semester= query param. Absent -> current semester. 'all' -> every
 * cohort. Anything else must match SEMESTER_RE or it is a 400.
 */
export function parseSemesterSelection(v: unknown): Selection {
  if (v === undefined || v === null || v === '') {
    return { kind: 'one', semester: getCurrentSemester() };
  }
  if (v === 'all') return { kind: 'all' };
  if (typeof v === 'string' && SEMESTER_RE.test(v)) {
    return { kind: 'one', semester: v };
  }
  throw new BadRequestError(`Invalid semester: ${String(v)}`);
}

/**
 * Canonical User filter. role:'STUDENT' is retained even for 'all' -- admins
 * generate tracking data too, and must never enter student aggregates.
 */
export function studentWhere(sel: Selection): Prisma.UserWhereInput {
  return sel.kind === 'all'
    ? { role: 'STUDENT' }
    : { role: 'STUDENT', semester: sel.semester };
}

/** Same filter, applied through a `user` relation (PageVisit/QuizAttempt/SlideView). */
export function studentRelWhere(sel: Selection): { user: Prisma.UserWhereInput } {
  return { user: studentWhere(sel) };
}

/** Read the selection off a request, for use in route handlers. */
export function selectionFromRequest(request: Request): Selection {
  const raw = new URL(request.url).searchParams.get('semester');
  return parseSemesterSelection(raw);
}

/** Sort labels chronologically; 'fall' < 'spring' lexically, which is wrong. */
const SEASON_RANK: Record<string, number> = { spring: 0, summer: 1, fall: 2 };
export function compareSemesters(a: string, b: string): number {
  const [ay, as] = a.split('-');
  const [by, bs] = b.split('-');
  if (ay !== by) return Number(ay) - Number(by);
  return (SEASON_RANK[as] ?? 0) - (SEASON_RANK[bs] ?? 0);
}
