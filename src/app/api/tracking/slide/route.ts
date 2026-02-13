import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slideFile } = await request.json();
    if (!slideFile) {
      return NextResponse.json({ error: 'slideFile is required' }, { status: 400 });
    }

    const view = await prisma.slideView.create({
      data: {
        userId: user.id,
        slideFile,
      },
    });

    return NextResponse.json({ viewId: view.id });
  } catch (error) {
    console.error('Slide tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
