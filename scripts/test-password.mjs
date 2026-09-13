/**
 * Change-password route tests. DESTRUCTIVE.
 *
 * !! Mutates the test account's password hash. Requires ALLOW_DESTRUCTIVE=1.
 *    Point it ONLY at a restored clone, and prefer a disposable account -- no
 *    cleanup design survives SIGKILL.
 *
 * Recovery: the original hash is captured BEFORE any mutation and restored in
 * `finally` by writing the database directly, never through the endpoint under
 * test, then verified. A failed restore is reported as a FAILURE, not a warning.
 *
 *   ALLOW_DESTRUCTIVE=1 DATABASE_URL=... BASE_URL=... \
 *   TEST_ADMIN_EMAIL=... TEST_ADMIN_PASSWORD=... node scripts/test-password.mjs
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { randomBytes } from 'node:crypto';

const BASE = process.env.BASE_URL || 'http://localhost:3000/cs205';
const EMAIL = process.env.TEST_ADMIN_EMAIL;
const ORIG = process.env.TEST_ADMIN_PASSWORD;
// Random, so a crashed run never leaves the account on a password in the repo.
const NEXT = `tmp-${randomBytes(12).toString('hex')}`;

if (process.env.ALLOW_DESTRUCTIVE !== '1') {
  console.error('FATAL: this test mutates a password. Set ALLOW_DESTRUCTIVE=1 and point it at a clone.');
  process.exit(1);
}
if (!EMAIL || !ORIG || !process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD required');
  process.exit(1);
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

let pass = 0, fail = 0;
const check = (n, ok, d = '') => { if (ok) pass++; else fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${n}  ${d}`); };

const login = async (password) => {
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password }),
  });
  return { status: r.status, cookie: (r.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ') };
};
const change = (cookie, currentPassword, newPassword) =>
  fetch(`${BASE}/api/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { cookie } : {}) },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
const hashOf = async () =>
  (await prisma.user.findUnique({ where: { email: EMAIL }, select: { password: true } }))?.password ?? null;

// Captured before ANY mutation, outside the try, so recovery never depends on
// how far the test got.
const originalHash = await hashOf();
if (!originalHash) {
  console.error(`FATAL: no user ${EMAIL} in this database`);
  await prisma.$disconnect();
  process.exit(1);
}

let exitCode = 0;
try {
  // Prove BASE_URL and DATABASE_URL are the same environment before mutating.
  const first = await login(ORIG);
  if (first.status !== 200) throw new Error(`login with TEST_ADMIN_PASSWORD -> ${first.status}`);
  const me = await (await fetch(`${BASE}/api/auth/me`, { headers: { cookie: first.cookie } })).json();
  const dbId = (await prisma.user.findUnique({ where: { email: EMAIL }, select: { id: true } })).id;
  check('BASE_URL and DATABASE_URL are the same environment', me?.user?.id === dbId, `api=${me?.user?.id} db=${dbId}`);
  if (me?.user?.id !== dbId) throw new Error('environment mismatch -- refusing to mutate');

  check('unauthenticated -> 401', (await change('', ORIG, NEXT)).status === 401);
  check('wrong current password -> 400', (await change(first.cookie, 'definitely-wrong', NEXT)).status === 400);
  check('new password under 8 chars -> 400', (await change(first.cookie, ORIG, 'short')).status === 400);
  check('new same as current -> 400', (await change(first.cookie, ORIG, ORIG)).status === 400);
  check('missing fields -> 400', (await change(first.cookie, '', NEXT)).status === 400);
  check('over 72 bytes -> 400 (bcrypt truncation boundary)',
        (await change(first.cookie, ORIG, 'x'.repeat(73))).status === 400);
  check('no mutation from any rejected request', (await hashOf()) === originalHash);

  check('valid change -> 200', (await change(first.cookie, ORIG, NEXT)).status === 200);
  const after = await hashOf();
  check('stored hash changed', after !== originalHash);
  check('stored hash is still bcrypt', /^\$2[aby]\$/.test(after ?? ''), `len=${after?.length}`);
  check('OLD password no longer logs in', (await login(ORIG)).status === 401);
  check('NEW password logs in', (await login(NEXT)).status === 200);
} catch (e) {
  console.error('HARNESS ERROR:', e.message);
  exitCode = 2;
} finally {
  // Unconditional DB-level restore -- never via the endpoint under test.
  try {
    await prisma.user.update({ where: { email: EMAIL }, data: { password: originalHash } });
    const restored = (await hashOf()) === originalHash;
    check('original hash restored (direct DB write)', restored);
    const back = await login(ORIG);
    check('original password logs in again', back.status === 200, `-> ${back.status}`);
  } catch (e) {
    fail++;
    console.error(`  FAIL  RESTORE FAILED: ${e.message}`);
    console.error(`  !! ${EMAIL} may be left on a random temporary password. Restore the hash manually.`);
  }
  console.log(`\n${pass} passed, ${fail} failed\n`);
  await prisma.$disconnect();
  process.exit(exitCode !== 0 ? exitCode : fail === 0 ? 0 : 1);
}
