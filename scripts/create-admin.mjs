/**
 * The ONLY way an ADMIN account comes into existence. Public registration
 * always creates STUDENT accounts, because a claimed email is never verified.
 *
 * Idempotent: re-running updates the existing account rather than failing.
 * No credential is committed -- all values come from the environment:
 *
 *   SEED_ADMIN_EMAIL=... SEED_ADMIN_NAME=... SEED_ADMIN_PASSWORD=... \
 *     node scripts/create-admin.mjs
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // must match src/lib/auth.ts

const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase().trim();
const name = (process.env.SEED_ADMIN_NAME || '').trim();
const password = process.env.SEED_ADMIN_PASSWORD || '';

if (!email || !name || !password) {
  console.error('FATAL: SEED_ADMIN_EMAIL, SEED_ADMIN_NAME and SEED_ADMIN_PASSWORD are all required');
  process.exit(1);
}
if (password.length < 8) {
  console.error('FATAL: SEED_ADMIN_PASSWORD must be at least 8 characters');
  process.exit(1);
}

const reserved = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);
if (!reserved.includes(email)) {
  console.error(
    `FATAL: ${email} is not in ADMIN_EMAILS. Add it first, or public registration ` +
      `would not refuse that address.`
  );
  process.exit(1);
}

// Prisma 7 requires an explicit driver adapter -- a bare `new PrismaClient()`
// throws. Mirrors src/lib/prisma.ts.
if (!process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL is not set');
  process.exit(1);
}
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
try {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, password: hashed, role: 'ADMIN', semester: null },
    create: { name, email, password: hashed, role: 'ADMIN', semester: null },
    select: { id: true, email: true, role: true, semester: true },
  });
  console.log(`admin ready: ${user.email} role=${user.role} semester=${user.semester ?? 'NULL'}`);
} finally {
  await prisma.$disconnect();
}
