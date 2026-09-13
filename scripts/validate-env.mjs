/**
 * Prestart configuration validator. Runs before `prisma migrate deploy` and
 * before the server starts. Exits non-zero on any failure so the container
 * crashloops visibly rather than serving mislabeled data.
 */
const SEMESTER_RE = /^\d{4}-(spring|fall|summer)$/;
const errors = [];

const { DATABASE_URL, JWT_SECRET, CURRENT_SEMESTER, ADMIN_EMAILS, ADMIN_EMAIL } = process.env;

if (!DATABASE_URL) errors.push('DATABASE_URL is not set');

if (!JWT_SECRET) {
  errors.push('JWT_SECRET is not set');
} else if (JWT_SECRET.length < 32) {
  errors.push(`JWT_SECRET is too short (${JWT_SECRET.length} chars, need >= 32)`);
} else if (/changeme/i.test(JWT_SECRET)) {
  errors.push('JWT_SECRET still contains a placeholder value');
}

if (!CURRENT_SEMESTER) {
  errors.push('CURRENT_SEMESTER is not set');
} else if (!SEMESTER_RE.test(CURRENT_SEMESTER)) {
  errors.push(`CURRENT_SEMESTER "${CURRENT_SEMESTER}" must match YYYY-(spring|fall|summer)`);
}

const admins = (ADMIN_EMAILS || ADMIN_EMAIL || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);
if (admins.length === 0) errors.push('ADMIN_EMAILS is empty (no reserved admin addresses)');

if (errors.length) {
  console.error('FATAL: environment validation failed');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(
  `env ok: semester=${CURRENT_SEMESTER} reserved_admins=${admins.length} jwt_len=${JWT_SECRET.length}`
);
