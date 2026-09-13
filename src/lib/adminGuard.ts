import { NextResponse } from 'next/server';
import { getCurrentUser } from './auth';
import { BadRequestError, selectionFromRequest, type Selection } from './semester';

export type AdminContext =
  | { ok: true; sel: Selection }
  | { ok: false; response: NextResponse };

/**
 * Every admin route entry point: authorize on the persisted DB role, then parse
 * the cohort selection. Invalid client input yields 400, not a generic 500.
 */
export async function requireAdmin(request: Request): Promise<AdminContext> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return { ok: false, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  try {
    return { ok: true, sel: selectionFromRequest(request) };
  } catch (e) {
    if (e instanceof BadRequestError) {
      return { ok: false, response: NextResponse.json({ error: e.message }, { status: 400 }) };
    }
    throw e;
  }
}
