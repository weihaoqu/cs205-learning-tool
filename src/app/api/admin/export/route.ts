import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';
import { studentWhere } from '@/lib/semester';

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  try {
    const ctx = await requireAdmin(request);
    if (!ctx.ok) return ctx.response;
    const sel = ctx.sel;

    const students = await prisma.user.findMany({
      where: studentWhere(sel),
      select: {
        name: true,
        email: true,
        createdAt: true,
        pageVisits: {
          select: {
            visitedAt: true,
            duration: true,
          },
        },
        quizAttempts: {
          select: {
            percentage: true,
          },
        },
      },
    });

    const headers = [
      'Name',
      'Email',
      'Registered',
      'Last Active',
      'Total Time (min)',
      'Quiz Average (%)',
      'Quizzes Taken',
    ];

    const rows = students.map((student) => {
      const lastActive =
        student.pageVisits.length > 0
          ? student.pageVisits
              .reduce((latest, pv) =>
                pv.visitedAt > latest ? pv.visitedAt : latest,
                student.pageVisits[0].visitedAt
              )
              .toISOString()
              .split('T')[0]
          : '';

      // Total time in seconds, convert to minutes
      const totalSeconds = student.pageVisits.reduce(
        (sum, pv) => sum + (pv.duration ?? 0),
        0
      );
      const totalMinutes = Math.round((totalSeconds / 60) * 100) / 100;

      const quizCount = student.quizAttempts.length;
      const quizAvg =
        quizCount > 0
          ? Math.round(
              (student.quizAttempts.reduce((sum, qa) => sum + qa.percentage, 0) /
                quizCount) *
                100
            ) / 100
          : 0;

      return [
        escapeCsvField(student.name),
        escapeCsvField(student.email),
        student.createdAt.toISOString().split('T')[0],
        lastActive,
        totalMinutes.toString(),
        quizAvg.toString(),
        quizCount.toString(),
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="cs205-analytics-${sel.kind === 'all' ? 'all' : sel.semester}.csv"`,
      },
    });
  } catch (error) {
    console.error('Admin export error:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
