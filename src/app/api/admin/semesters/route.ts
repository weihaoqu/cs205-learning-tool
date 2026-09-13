import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { getCurrentSemester, compareSemesters } from '@/lib/semester';

/**
 * Cohort labels for the dashboard selector. Students only (admins have NULL),
 * unioned with CURRENT_SEMESTER so the current cohort is selectable *before*
 * its first student registers.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const rows = await prisma.user.findMany({
      where: { role: 'STUDENT', semester: { not: null } },
      distinct: ['semester'],
      select: { semester: true },
    });

    const set = new Set(rows.map((r) => r.semester as string));
    const current = getCurrentSemester();
    set.add(current);

    const semesters = [...set].sort(compareSemesters).reverse();
    return NextResponse.json({ semesters, current });
  } catch (error) {
    console.error('Admin semesters error:', error);
    return NextResponse.json({ error: 'Failed to fetch semesters' }, { status: 500 });
  }
}
