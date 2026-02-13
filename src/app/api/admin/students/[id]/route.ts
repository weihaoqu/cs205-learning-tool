import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    const student = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Last 50 page visits, most recent first
    const recentVisits = await prisma.pageVisit.findMany({
      where: { userId: id },
      select: {
        path: true,
        duration: true,
        visitedAt: true,
      },
      orderBy: { visitedAt: 'desc' },
      take: 50,
    });

    // All quiz attempts for this user
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId: id },
      select: {
        quizId: true,
        score: true,
        totalPoints: true,
        percentage: true,
        completedAt: true,
      },
      orderBy: { completedAt: 'desc' },
    });

    // All slide views for this user
    const slideViews = await prisma.slideView.findMany({
      where: { userId: id },
      select: {
        slideFile: true,
        viewedAt: true,
      },
      orderBy: { viewedAt: 'desc' },
    });

    return NextResponse.json({
      user: student,
      recentVisits,
      quizAttempts,
      slideViews,
    });
  } catch (error) {
    console.error('Admin student detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch student details' }, { status: 500 });
  }
}
