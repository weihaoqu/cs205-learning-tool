import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, verifyPassword, hashPassword } from '@/lib/auth';

const MIN_LENGTH = 8; // matches registration
// bcrypt silently truncates input after 72 BYTES, so two passwords differing
// only past that point are the same credential. Reject rather than mislead.
const MAX_BYTES = 72;

/**
 * Self-service password change for the signed-in user.
 *
 * The current password is required even though the caller already holds a
 * valid session: a stolen or borrowed session must not be enough to seize an
 * account by changing its credentials.
 *
 * KNOWN LIMITATION: sessions are stateless JWTs with a 7-day expiry and there
 * is no server-side session store, so changing a password does NOT invalidate
 * tokens already issued. Revoking those would require either a session table
 * or rotating JWT_SECRET (which signs everyone out).
 */
export async function POST(request: NextRequest) {
  try {
    const me = await getCurrentUser();
    if (!me) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' ||
        !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < MIN_LENGTH) {
      return NextResponse.json(
        { error: `New password must be at least ${MIN_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (Buffer.byteLength(newPassword, 'utf8') > MAX_BYTES) {
      return NextResponse.json(
        { error: `New password must be at most ${MAX_BYTES} bytes` },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'New password must differ from the current one' },
        { status: 400 }
      );
    }

    // getCurrentUser deliberately does not select the hash, so read it here.
    const row = await prisma.user.findUnique({
      where: { id: me.id },
      select: { password: true },
    });
    if (!row) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    const ok = await verifyPassword(currentPassword, row.password);
    if (!ok) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: me.id },
      data: { password: await hashPassword(newPassword) },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Could not change password. Please try again.' },
      { status: 500 }
    );
  }
}
