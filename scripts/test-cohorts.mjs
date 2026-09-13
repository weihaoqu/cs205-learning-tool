/**
 * Cohort isolation matrix. Compares every cohort-sensitive metric in spec v3
 * against ground truth computed in SQL, per cohort and for `all`.
 *
 * !! THIS SCRIPT WRITES. NOT safe against production. !!
 *   - login updates User.lastLoginAt
 *   - PROBE_REGISTER=1 POSTs /api/auth/register expecting 403; that probe
 *     exists to detect a BROKEN guard, so a broken guard means it creates a row.
 *
 * Oracle design:
 *   - Every response is checked for HTTP status AND for the exact expected key
 *     set, so an empty or truncated response fails instead of passing vacuously.
 *   - Each metric is compared against TWO counterfactuals: what a missing-role
 *     filter would produce, and what a missing-semester filter would produce.
 *     When a counterfactual coincides with the correct value the check is
 *     reported SKIP (vacuous), never PASS.
 *   - Date boundaries and rounding mirror the routes exactly.
 *
 *   DATABASE_URL=... BASE_URL=... TEST_ADMIN_EMAIL=... TEST_ADMIN_PASSWORD=... \
 *   EXPECT_CURRENT_SEMESTER=2026-fall [PROBE_REGISTER=1 ADMIN_EMAILS=...] \
 *   [OUT=test-results/cohorts.txt] node scripts/test-cohorts.mjs
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000/cs205';
const EMAIL = process.env.TEST_ADMIN_EMAIL;
const PASSWORD = process.env.TEST_ADMIN_PASSWORD;
const EXPECT_CURRENT = process.env.EXPECT_CURRENT_SEMESTER; // supplied externally, not read back from the API
const OUT = process.env.OUT || 'test-results/cohorts.txt';
if (!EMAIL || !PASSWORD || !process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD required');
  process.exit(1);
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const lines = [];
let pass = 0, fail = 0, skip = 0;
const out = (s) => { lines.push(s); console.log(s); };
function check(name, ok, detail = '') {
  if (ok === 'skip') { skip++; out(`  SKIP  ${name}  ${detail}`); return; }
  if (ok) { pass++; out(`  PASS  ${name}  ${detail}`); }
  else { fail++; out(`  FAIL  ${name}  ${detail}`); }
}
const n2 = (v) => (v === null || v === undefined ? '0.00' : Number(v).toFixed(2));
const setEq = (a, b) => a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

/**
 * Assert actual === correct, and report SKIP when a counterfactual cannot be
 * distinguished from correct on this data.
 */
function discriminating(name, actual, correct, counterfactuals, fmt = String) {
  const indistinguishable = Object.entries(counterfactuals)
    .filter(([, v]) => fmt(v) === fmt(correct))
    .map(([k]) => k);
  if (indistinguishable.length === Object.keys(counterfactuals).length) {
    return check(name, 'skip', `vacuous: correct == ${indistinguishable.join(' & ')} == ${fmt(correct)}`);
  }
  const cf = Object.entries(counterfactuals).map(([k, v]) => `${k}=${fmt(v)}`).join(' ');
  check(name, fmt(actual) === fmt(correct),
        `got ${fmt(actual)} want ${fmt(correct)} [${cf}]${indistinguishable.length ? ` (indistinct: ${indistinguishable.join(',')})` : ''}`);
}

/** Minimal RFC4180 parser -- names are quoted and may contain commas. */
function parseCsv(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

let cookie = '';
const q = (sql, ...a) => prisma.$queryRawUnsafe(sql, ...a);
async function apiRes(path, sem) {
  return fetch(`${BASE}/api/admin/${path}?semester=${encodeURIComponent(sem)}`, { headers: { cookie } });
}
async function api(path, sem) {
  const r = await apiRes(path, sem);
  if (!r.ok) throw new Error(`${path}?semester=${sem} -> ${r.status}`);
  return r.json();
}

// SQL scopes. correct = role AND semester. Counterfactuals isolate each filter.
const SC = {
  correct:      (c) => (c === 'all' ? `u.role='STUDENT'` : `u.role='STUDENT' AND u.semester=$1`),
  noRole:       (c) => (c === 'all' ? `TRUE` : `u.semester=$1`),
  noSemester:   () => `u.role='STUDENT'`,
};
const A = (c, variant) => (c === 'all' || variant === 'noSemester' ? [] : [c]);
const nextParam = (c, variant) => A(c, variant).length + 1;

try {
  const lr = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!lr.ok) throw new Error(`login -> ${lr.status}`);
  cookie = (lr.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ');
  if ((await lr.json()).user?.role !== 'ADMIN') throw new Error('login is not ADMIN');

  const cohorts = (await q(`SELECT DISTINCT semester s FROM "User" WHERE role='STUDENT' AND semester IS NOT NULL ORDER BY 1`)).map((r) => r.s);
  const views = [...cohorts, 'all'];
  out(`\n=== cohort matrix: ${BASE} ===`);
  out(`cohorts: ${cohorts.join(', ')} (+ all)\n`);

  // ---------- semesters endpoint ----------
  out('--- semesters endpoint ---');
  const semRes = await fetch(`${BASE}/api/admin/semesters`, { headers: { cookie } });
  check('semesters -> 200', semRes.status === 200, `-> ${semRes.status}`);
  const sem = await semRes.json();
  check('lists exactly the cohorts present in SQL, plus current',
        setEq(sem.semesters, [...new Set([...cohorts, sem.current])]),
        `api=${JSON.stringify(sem.semesters)} sql=${JSON.stringify(cohorts)}`);
  if (EXPECT_CURRENT) {
    // Externally supplied -- not read back from the same endpoint.
    check('current == EXPECT_CURRENT_SEMESTER (external)', sem.current === EXPECT_CURRENT,
          `api=${sem.current} expected=${EXPECT_CURRENT}`);
    check('current is listed even if it has no students',
          sem.semesters.includes(EXPECT_CURRENT),
          cohorts.includes(EXPECT_CURRENT) ? '(cohort HAS students -- union not independently proven)' : '(cohort has no students -- union proven)');
  } else {
    check('current semester', 'skip', '(set EXPECT_CURRENT_SEMESTER to verify externally)');
  }
  check('no admin leaked into the selector',
        !sem.semesters.includes('staff') &&
        (await q(`SELECT COUNT(*)::int n FROM "User" WHERE role='ADMIN' AND semester IS NOT NULL`))[0].n === 0);

  for (const c of views) {
    out(`\n--- ${c} ---`);
    for (const p of ['overview', 'modules', 'quizzes', 'activity', 'students']) {
      const r = await apiRes(p, c);
      if (r.status !== 200) check(`${p} -> 200`, false, `-> ${r.status}`);
    }
    const [ov, mods, quizzes, act, studs] = await Promise.all(
      ['overview', 'modules', 'quizzes', 'activity', 'students'].map((p) => api(p, c)));

    const scalar = async (tpl) => {
      const r = {};
      for (const v of ['correct', 'noRole', 'noSemester']) {
        const where = v === 'correct' ? SC.correct(c) : v === 'noRole' ? SC.noRole(c) : SC.noSemester();
        r[v] = (await q(tpl(where, nextParam(c, v)), ...A(c, v)))[0].v;
      }
      return r;
    };

    const st = await scalar((w) => `SELECT COUNT(*)::int v FROM "User" u WHERE ${w}`);
    discriminating('overview.totalStudents', ov.totalStudents, st.correct, { noRole: st.noRole, noSemester: st.noSemester });

    const ac = await scalar((w) => `SELECT COUNT(DISTINCT pv."userId")::int v FROM "PageVisit" pv JOIN "User" u ON u.id=pv."userId" WHERE ${w} AND pv."visitedAt">=now()-interval '7 days'`);
    discriminating('overview.activeStudents', ov.activeStudents, ac.correct, { noRole: ac.noRole, noSemester: ac.noSemester });

    const av = await scalar((w) => `SELECT AVG(qa.percentage) v FROM "QuizAttempt" qa JOIN "User" u ON u.id=qa."userId" WHERE ${w}`);
    discriminating('overview.avgQuizScore (weighted)', ov.avgQuizScore, av.correct, { noRole: av.noRole, noSemester: av.noSemester }, n2);

    const wv = await scalar((w) => `SELECT COUNT(*)::int v FROM "PageVisit" pv JOIN "User" u ON u.id=pv."userId" WHERE ${w} AND pv."visitedAt">=now()-interval '7 days'`);
    discriminating('overview.weekPageViews', ov.weekPageViews, wv.correct, { noRole: wv.noRole, noSemester: wv.noSemester });

    // students -- exact ID set
    const ids = (await q(`SELECT u.id FROM "User" u WHERE ${SC.correct(c)}`, ...A(c, 'correct'))).map((r) => r.id);
    check('students endpoint == exact ID set', setEq(studs.map((s) => s.id), ids), `${studs.length} vs ${ids.length}`);

    // export -- real CSV parse, status checked, exact email set
    const csvRes = await fetch(`${BASE}/api/admin/export?semester=${encodeURIComponent(c)}`, { headers: { cookie } });
    check('export -> 200', csvRes.status === 200, `-> ${csvRes.status}`);
    const rows = parseCsv(await csvRes.text());
    const header = rows[0] ?? [];
    const emailCol = header.indexOf('Email');
    const emails = (await q(`SELECT u.email FROM "User" u WHERE ${SC.correct(c)}`, ...A(c, 'correct'))).map((r) => r.email);
    check('export CSV header has an Email column', emailCol >= 0, `header=${JSON.stringify(header)}`);
    check('export CSV == exact email set (quoted-comma safe)',
          emailCol >= 0 && setEq(rows.slice(1).map((r) => r[emailCol]).filter(Boolean), emails),
          `${rows.length - 1} data rows vs ${emails.length}`);

    // modules -- exact module-ID set, visitedStudents present, 2dp rounding like the route
    const expectedModuleIds = mods.map((m) => m.moduleId);
    check('modules response is non-empty', mods.length > 0, `${mods.length}`);
    let modOk = mods.length > 0, modDetail = '';
    for (const m of mods) {
      if (typeof m.visitedStudents !== 'number') { modOk = false; modDetail = `${m.moduleId}: visitedStudents missing`; break; }
      const v = (await q(`SELECT COUNT(DISTINCT pv."userId")::int v FROM "PageVisit" pv JOIN "User" u ON u.id=pv."userId" WHERE ${SC.correct(c)} AND pv.path LIKE $${nextParam(c, 'correct')}`, ...A(c, 'correct'), `/modules/${m.moduleId}%`))[0].v;
      if (m.visitedStudents !== v) { modOk = false; modDetail = `${m.moduleId}: visitors ${m.visitedStudents} vs ${v}`; break; }
      const expectPct = st.correct > 0 ? Math.round((v / st.correct) * 100 * 100) / 100 : 0;   // route: 2dp
      if (n2(m.percentage) !== n2(expectPct)) { modOk = false; modDetail = `${m.moduleId}: pct ${m.percentage} vs ${expectPct} (denom ${st.correct})`; break; }
    }
    check('modules visitors + 2dp percentage with cohort denominator', modOk, modDetail || `${mods.length} modules`);
    check('modules set is identical across a repeat call',
          setEq((await api('modules', c)).map((m) => m.moduleId), expectedModuleIds));

    // quizzes -- exact quiz-ID set first, then per-quiz stats
    const sqlQuizIds = (await q(`SELECT DISTINCT qa."quizId" id FROM "QuizAttempt" qa JOIN "User" u ON u.id=qa."userId" WHERE ${SC.correct(c)}`, ...A(c, 'correct'))).map((r) => r.id);
    check('quizzes == exact quiz-ID set from SQL', setEq(quizzes.map((x) => x.quizId), sqlQuizIds),
          `api=${quizzes.length} sql=${sqlQuizIds.length}`);
    let qzOk = true, qzDetail = '';
    for (const qz of quizzes) {
      const r = (await q(`SELECT COUNT(*)::int n, AVG(qa.percentage) avg, MIN(qa.percentage) mn, MAX(qa.percentage) mx FROM "QuizAttempt" qa JOIN "User" u ON u.id=qa."userId" WHERE ${SC.correct(c)} AND qa."quizId"=$${nextParam(c, 'correct')}`, ...A(c, 'correct'), qz.quizId))[0];
      const bad =
        qz.attempts !== r.n ? `attempts ${qz.attempts}/${r.n}` :
        n2(qz.avgScore) !== n2(r.avg) ? `avg ${qz.avgScore}/${n2(r.avg)}` :
        n2(qz.minScore) !== n2(r.mn) ? `min ${qz.minScore}/${n2(r.mn)}` :
        n2(qz.maxScore) !== n2(r.mx) ? `max ${qz.maxScore}/${n2(r.mx)}` : null;
      if (bad) { qzOk = false; qzDetail = `${qz.quizId}: ${bad}`; break; }
      const buckets = await q(`SELECT width_bucket(LEAST(qa.percentage,99.999),60,100,4) b, COUNT(*)::int n FROM "QuizAttempt" qa JOIN "User" u ON u.id=qa."userId" WHERE ${SC.correct(c)} AND qa."quizId"=$${nextParam(c, 'correct')} GROUP BY 1`, ...A(c, 'correct'), qz.quizId);
      const expect = [0, 0, 0, 0, 0];
      for (const b of buckets) expect[Math.min(Math.max(b.b, 0), 4)] += b.n;
      if (qz.distribution.length !== 5) { qzOk = false; qzDetail = `${qz.quizId}: ${qz.distribution.length} buckets`; break; }
      if (qz.distribution.map((d) => d.count).join(',') !== expect.join(',')) {
        qzOk = false; qzDetail = `${qz.quizId}: dist ${qz.distribution.map((d) => d.count)} vs ${expect}`; break;
      }
    }
    check('quizzes attempts/avg/min/max/5-bucket distribution', qzOk, qzDetail || `${quizzes.length} quizzes`);

    // activity -- replicate the ROUTE's boundary exactly: local midnight of
    // (today - 30d), and exactly 30 generated dates ending today.
    const since = new Date(); since.setDate(since.getDate() - 30); since.setHours(0, 0, 0, 0);
    const expectedDates = [];
    for (let i = 29; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); expectedDates.push(d.toISOString().split('T')[0]); }
    check('activity returns exactly the route\'s 30 dates, in order',
          act.length === 30 && act.map((r) => r.date).join(',') === expectedDates.join(','),
          `${act.length} rows`);
    const dayRows = await q(`SELECT TO_CHAR(pv."visitedAt",'YYYY-MM-DD') d, COUNT(DISTINCT pv."userId")::int n FROM "PageVisit" pv JOIN "User" u ON u.id=pv."userId" WHERE ${SC.correct(c)} AND pv."visitedAt" >= $${nextParam(c, 'correct')} GROUP BY 1`, ...A(c, 'correct'), since);
    const expectDays = Object.fromEntries(dayRows.map((r) => [r.d, r.n]));
    check('activity per-day counts match SQL for every one of the 30 days',
          act.length === 30 && act.every((r) => (r.count ?? 0) === (expectDays[r.date] ?? 0)),
          `sql days with data: ${dayRows.length}`);
    const actTotals = {};
    for (const v of ['correct', 'noRole', 'noSemester']) {
      const w = v === 'correct' ? SC.correct(c) : v === 'noRole' ? SC.noRole(c) : SC.noSemester();
      const rr = await q(`SELECT TO_CHAR(pv."visitedAt",'YYYY-MM-DD') d, COUNT(DISTINCT pv."userId")::int n FROM "PageVisit" pv JOIN "User" u ON u.id=pv."userId" WHERE ${w} AND pv."visitedAt" >= $${nextParam(c, v)} GROUP BY 1`, ...A(c, v), since);
      actTotals[v] = rr.filter((r) => expectedDates.includes(r.d)).reduce((s, r) => s + r.n, 0);
    }
    discriminating('activity total (raw SQL route) excludes admin + other cohorts',
                   act.reduce((s, r) => s + (r.count ?? 0), 0), actTotals.correct,
                   { noRole: actTotals.noRole, noSemester: actTotals.noSemester });
  }

  out('\n--- all == union of cohorts ---');
  const allIds = (await api('students', 'all')).map((s) => s.id);
  const union = [];
  for (const c of cohorts) union.push(...(await api('students', c)).map((s) => s.id));
  check('all students == union of cohorts (by ID)', setEq(allIds, union), `${allIds.length} vs ${union.length}`);
  check('no duplicate IDs in all', new Set(allIds).size === allIds.length);

  out('\n--- validation & authorization ---');
  for (const bad of ['2026-winter', 'garbage', `'; DROP TABLE "User"; --`]) {
    const r = await apiRes('overview', bad);
    check(`rejects ${JSON.stringify(bad).slice(0, 30)}`, r.status === 400, `-> ${r.status}`);
  }
  check('User table intact', (await q(`SELECT COUNT(*)::int n FROM "User"`))[0].n > 0);
  const adm = (await q(`SELECT id FROM "User" WHERE role='ADMIN' LIMIT 1`))[0];
  const stu = (await q(`SELECT id FROM "User" WHERE role='STUDENT' LIMIT 1`))[0];
  check('admin id NOT addressable as a student',
        (await fetch(`${BASE}/api/admin/students/${adm.id}`, { headers: { cookie } })).status === 404);
  check('student id resolves',
        (await fetch(`${BASE}/api/admin/students/${stu.id}`, { headers: { cookie } })).status === 200);

  if (process.env.PROBE_REGISTER === '1') {
    const reserved = (process.env.ADMIN_EMAILS || '').split(',')[0]?.trim();
    const before = (await q(`SELECT COUNT(*)::int n FROM "User"`))[0].n;
    const r = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'probe', email: reserved, password: 'abcd1234' }),
    });
    const after = (await q(`SELECT COUNT(*)::int n FROM "User"`))[0].n;
    check('reserved address registration -> 403', r.status === 403, `-> ${r.status}`);
    check('probe created no row', before === after, `${before} -> ${after}`);
  } else {
    check('reserved-address registration probe', 'skip', '(set PROBE_REGISTER=1; WRITES on a broken guard)');
  }

  out(`\n${pass} passed, ${fail} failed, ${skip} skipped\n`);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, `${new Date().toISOString()}  ${BASE}\n${lines.join('\n')}\n`);
  console.log(`results written to ${OUT}`);
  await prisma.$disconnect();
  process.exit(fail === 0 ? 0 : 1);
} catch (e) {
  console.error('\nHARNESS ERROR:', e.message);
  await prisma.$disconnect();
  process.exit(2);
}
