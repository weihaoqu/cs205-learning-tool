import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  hashPassword,
  signToken,
  setSessionCookie,
  isMonmouthEmail,
  isReservedAdminEmail,
} from '@/lib/auth';
import { getCurrentSemester } from '@/lib/semester';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (!isMonmouthEmail(email)) {
      return NextResponse.json(
        { error: 'Only @monmouth.edu email addresses are allowed' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Reserved admin addresses are refused outright. This MUST precede the
    // existing-email lookup below: once the teacher is seeded, that lookup
    // would return 409 and this 403 would never be reached.
    if (isReservedAdminEmail(email)) {
      return NextResponse.json(
        { error: 'This address is reserved. Contact your instructor.' },
        { status: 403 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    // Public registration creates STUDENT accounts only. The email is merely
    // claimed and never verified, so it must not confer privilege.
    // Admins are provisioned solely by scripts/create-admin.ts.
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: 'STUDENT',
        semester: getCurrentSemester(),
      },
    });

    const token = await signToken({ userId: user.id, role: user.role });
    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
