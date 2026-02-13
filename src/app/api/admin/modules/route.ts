import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

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

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' },
    });

    // For each module, count distinct students who visited a path starting with /modules/{moduleId}
    const modules = await Promise.all(
      MODULES.map(async (moduleId) => {
        const visitors = await prisma.pageVisit.findMany({
          where: {
            path: { startsWith: `/modules/${moduleId}` },
            user: { role: 'STUDENT' },
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
