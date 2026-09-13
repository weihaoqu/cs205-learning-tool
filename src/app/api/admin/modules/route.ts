import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';
import { studentWhere, studentRelWhere } from '@/lib/semester';

const MODULES = [
  'arrays',
  'sorting',
  'lists',
  'recursion',
  'stack-queue',
  'maps',
  'complexity',
  'searching',
  'trees',
  'heaps',
  'graphs',
  'dynamic-programming',
];

export async function GET(request: Request) {
  try {
    const ctx = await requireAdmin(request);
    if (!ctx.ok) return ctx.response;
    const sel = ctx.sel;

    // Denominator MUST be cohort-scoped too, or percentages mix a scoped
    // numerator with an all-cohort denominator.
    const totalStudents = await prisma.user.count({
      where: studentWhere(sel),
    });

    // For each module, count distinct students who visited a path starting with /modules/{moduleId}
    const modules = await Promise.all(
      MODULES.map(async (moduleId) => {
        const visitors = await prisma.pageVisit.findMany({
          where: {
            path: { startsWith: `/modules/${moduleId}` },
            ...studentRelWhere(sel),
          },
          select: { userId: true },
          distinct: ['userId'],
        });

        const visitedStudents = visitors.length;
        const percentage =
          totalStudents > 0
            ? Math.round((visitedStudents / totalStudents) * 100 * 100) / 100
            : 0;

        return {
          moduleId,
          visitedStudents,
          totalStudents,
          percentage,
        };
      })
    );

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Admin modules error:', error);
    return NextResponse.json({ error: 'Failed to fetch module data' }, { status: 500 });
  }
}
