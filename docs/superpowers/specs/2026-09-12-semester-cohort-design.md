# Semester Cohort Separation + Multi-Admin — Design v3

Date: 2026-09-12
Status: v3, revised after two Codex rounds (v1 REVISE, v2 REVISE). Prior versions at `*.v1.md`, `*.v2.md`.
Author: Claude, with Q

## Changes from v1

v1 contained a load-bearing false claim: *"every admin query already filters
`role: 'STUDENT'`"*. Verified false against disk — **five** queries have no role filter at all. Corrections in v2:

| v1 | v2 |
|---|---|
| `semester` NOT NULL, admins = `'staff'` | `semester` **nullable**, admins **NULL**, CHECK invariant |
| 7 routes listed | **12 queries** enumerated by file:line |
| Registration promotes to ADMIN via allowlist | Registration creates **STUDENT only**; seed script is sole admin path |
| `ALTER ... DEFAULT '2026-spring'` retained | Nullable add → backfill → CHECK → index, **no retained default** |
| "admin queries already role-filter" | **False.** Role filter must be *added* to **5** queries (7-11) |
| Secrets unexamined | Secret handling specified and rotation folded into rollout |

## Changes in v3 (after second Codex round)

| v2 defect | v3 fix |
|---|---|
| "four queries lack a role filter" | **five** (7-11) |
| Transaction left as an open question | **Settled**: Prisma 7.4 does *not* wrap migrations; explicit `BEGIN`/`COMMIT` added, plus `migrate resolve --rolled-back` recovery |
| Start-time validation was prose only | Real `scripts/validate-env.mjs` wired into the Dockerfile `CMD` |
| One parser rejected the `all` sentinel it required | Split `parseCurrentSemester` / `parseSemesterSelection`; invalid input -> **400** |
| `all == Spring + Fall` for every metric | **Metric-aware oracle** - averages recomputed weighted, percentages recomputed, sets unioned |
| Semester-endpoint test ran after a Fall student existed | Reordered to run **before** any Fall registration |
| Reserved-address guard placed after the email lookup | Moved **before** `register/route.ts:36`, else 409 preempts the 403 |
| Live credentials pasted into a git-bound doc | **Redacted**; confirmed never committed |
| `openssl rand` applied to emails and semester | Only the two secrets are random; DB password is **hex** (base64 `/`,`+` corrupt the URL) |
| Dump taken before the writer stopped | **Quiesce first, then dump** |
| Rebuild during downtime | **Prebuild before** stopping the app |
| Rollback "restore into the volume" | Executable drop/create + `psql` restore; roles not in `pg_dump`; **rotated creds retained** |
| JWT risk stated as password-free admin | Corrected: also requires a valid admin UUID |

## Context

https://monmouthcsse.com/cs205. Production: 10 STUDENT accounts from Spring 2026
(created 2026-02-15..2026-04-01, last activity 2026-05-30) + 1 ADMIN
(wqu@monmouth.edu). Activity rows, ground truth from the 2026-09-12 verified
dump: PageVisit 1159, SlideView 79, QuizAttempt 63.

## Goals

1. Distinguish Fall 2026 students from Spring 2026 students.
2. Dashboard defaults to current semester; prior semesters viewable.
3. Second instructor (rkamp@monmouth.edu) gets full admin access.
4. Close the two admin-escalation paths found during review.

## Non-goals

Multiple sections per semester; student re-enrollment across semesters;
changes to learning modules.

## Data model

```prisma
model User {
  // ... existing fields unchanged
  semester String?
  @@index([semester])
}
```

**Nullable, admins NULL.** Rejecting v1's `'staff'` sentinel: a sentinel does
not fail visibly. It appears in `SELECT DISTINCT semester`, enters the `all`
view, and contributes admin activity to aggregates — precisely because the
"queries already role-filter" premise was false.

Database invariant, enforced not assumed:

```sql
ALTER TABLE "User" ADD CONSTRAINT "user_semester_role_ck" CHECK (
  (role = 'STUDENT' AND semester IS NOT NULL) OR
  (role = 'ADMIN'   AND semester IS NULL)
);
```

Role filtering stays mandatory in every query regardless. The constraint models
the fact that staff are not enrolled; it is not a substitute for the filter.

### Migration

Generated with `prisma migrate dev --create-only`, hand-edited, committed,
applied by `migrate deploy`. `migrate deploy` only applies committed
migrations — it generates nothing.

```sql
ALTER TABLE "User" ADD COLUMN "semester" TEXT;                    -- nullable, no default
UPDATE "User" SET "semester" = '2026-spring' WHERE role = 'STUDENT';
ALTER TABLE "User" ADD CONSTRAINT "user_semester_role_ck" CHECK (...);
CREATE INDEX "User_semester_idx" ON "User"("semester");
```

No retained column DEFAULT — v1's default was exactly the silent-mislabel trap
the design claimed to avoid. Application code always sets semester explicitly.

**Settled (v3):** Prisma 7.4 Migrate does **not** implicitly wrap PostgreSQL
migration SQL in a transaction, and Prisma documents adding your own. v2's
premise was wrong. The migration is therefore wrapped explicitly:

```sql
BEGIN;
  ALTER TABLE "User" ADD COLUMN "semester" TEXT;
  UPDATE "User" SET "semester" = '2026-spring' WHERE role = 'STUDENT';
  ALTER TABLE "User" ADD CONSTRAINT "user_semester_role_ck" CHECK (...);
  CREATE INDEX "User_semester_idx" ON "User"("semester");
COMMIT;
```

If `migrate deploy` fails, the SQL rolls back but Prisma may retain a failed
`_prisma_migrations` row. Recovery includes
`npx prisma migrate resolve --rolled-back <migration_name>` before retrying.
Testing confirms this settled decision; it does not decide it.

**Cutover requires quiescing registration** — old application code omitting
`semester` would violate the CHECK constraint. Sequence in Rollout.

### Current semester

`CURRENT_SEMESTER` env var. **Two parsers, not one** — v2 used a single regex
that rejects the `all` sentinel the APIs require:

```ts
const SEMESTER_RE = /^\d{4}-(spring|fall|summer)$/;

// Concrete cohort only. Used for CURRENT_SEMESTER and for writes.
export function parseCurrentSemester(v: unknown): string {
  if (typeof v !== 'string' || !SEMESTER_RE.test(v))
    throw new Error(`Invalid semester: ${String(v)}`);
  return v;
}

// Read-side selection: a concrete cohort OR the 'all' sentinel.
export type Selection = { kind: 'all' } | { kind: 'one'; semester: string };
export function parseSemesterSelection(v: unknown): Selection {
  if (v === undefined || v === null) return { kind: 'one', semester: getCurrentSemester() };
  if (v === 'all') return { kind: 'all' };
  if (typeof v === 'string' && SEMESTER_RE.test(v)) return { kind: 'one', semester: v };
  throw new BadRequest(`Invalid semester: ${String(v)}`);   // -> HTTP 400, not 500
}
```

Invalid client input returns **400**, never a generic 500.

**Deliberate, documented behaviour:** an *empty* `?semester=` is treated as
absent and resolves to the current semester, rather than 400. This follows the
usual web convention for an empty query value and cannot mislabel a cohort --
it resolves to an explicit concrete semester. Only a non-empty value that is
neither `all` nor `SEMESTER_RE` is a 400.

### Container-start validation (was prose in v2)

v2 claimed start-time validation but defined none; `Dockerfile:40` runs only
`migrate deploy && node server.js`. v3 adds a real prestart validator:

```js
// scripts/validate-env.mjs — exits non-zero on any failure
// checks: DATABASE_URL present; JWT_SECRET length >= 32;
//         CURRENT_SEMESTER matches SEMESTER_RE; ADMIN_EMAILS parses to >=1 address
```

```dockerfile
CMD ["sh", "-c", "node scripts/validate-env.mjs && npx prisma migrate deploy && node server.js"]
```

Tradeoff, accepted: misconfiguration now crashloops the container (compose
`restart: unless-stopped`) instead of serving mislabeled data. A visibly down
site is preferable to a silently wrong cohort.

## Cohort-sensitive queries — complete enumeration

Every row must be scoped. A missed row silently averages two cohorts.
`role = 'STUDENT'` is retained in **all** views, including `all`, because
admins generate tracking data too.

| # | File:line | Query | Change |
|---|---|---|---|
| 1 | `admin/students/route.ts:12` | `user.findMany` | add `semester` |
| 2 | `admin/export/route.ts:19` | `user.findMany` | add `semester` |
| 3 | `admin/modules/route.ts:27` | `user.count` **(denominator)** | add `semester` |
| 4 | `admin/modules/route.ts:34` | `pageVisit.findMany` | add `user.semester` |
| 5 | `admin/overview/route.ts:16` | `user.count` | add `semester` |
| 6 | `admin/overview/route.ts:21` | `pageVisit.findMany` | add `user.semester` |
| 7 | `admin/overview/route.ts:32` | `quizAttempt.aggregate` | **no `where` at all today** — add role + semester |
| 8 | `admin/overview/route.ts:40` | `pageVisit.count` | **no role filter today** — add role + semester |
| 9 | `admin/quizzes/route.ts:23` | `quizAttempt.groupBy` | **unfiltered today** — add role + semester |
| 10 | `admin/quizzes/route.ts:32` | `quizAttempt.findMany` | **unfiltered today** — add identical filter |
| 11 | `admin/activity/route.ts:25` | `$queryRaw` | **add User join + role predicate + bound semester** |
| 12 | `admin/students/[id]/route.ts:17` | `findUnique` | **exempt**: cross-cohort detail lookup by id. Switch to `findFirst` with `role:'STUDENT'` so admins are not addressable as students; semester deliberately not scoped. |

Queries 7-11 are pre-existing production bugs: today's dashboard averages
include the instructor's own activity.

### New: `GET /api/admin/semesters`

```ts
const rows = await prisma.user.findMany({
  where: { role: 'STUDENT', semester: { not: null } },
  distinct: ['semester'], select: { semester: true },
});
const set = new Set(rows.map(r => r.semester!));
set.add(getCurrentSemester());     // else current is absent until first registration
```

Students only, and unions `CURRENT_SEMESTER` so `2026-fall` exists in the
selector before the first Fall student registers. Sorted by explicit
season-rank, since `YYYY-season` does not sort chronologically as a string.

### Raw SQL — `admin/activity`

```ts
const results = await prisma.$queryRaw<{ day: string; count: bigint }[]>`
  SELECT TO_CHAR(pv."visitedAt", 'YYYY-MM-DD') AS day,
         COUNT(DISTINCT pv."userId") AS count
  FROM "PageVisit" pv
  JOIN "User" u ON u."id" = pv."userId"
  WHERE pv."visitedAt" >= ${thirtyDaysAgo}
    AND u."role" = 'STUDENT'
    AND (${semester}::text = 'all' OR u."semester" = ${semester})
  GROUP BY day ORDER BY day
`;
```

Tagged-template binding provides the injection defence; `parseSemester`
additionally rejects meaningless values. Never `Prisma.raw(semester)` or
`$queryRawUnsafe`.

## Authentication

### Registration never grants admin

`register/route.ts:48` currently assigns ADMIN from a claimed email string with
no mailbox verification — anyone could register `rkamp@monmouth.edu` and
receive an admin session. Replaced:

```ts
// MUST sit BEFORE the existing-email lookup at register/route.ts:36.
// Placed after it, a seeded teacher's address returns 409 (already exists)
// and the intended 403 is never reached.
if (isReservedAdminEmail(email))
  return NextResponse.json({ error: 'Contact your instructor' }, { status: 403 });

// ... existing-email lookup (:36) ...

const role = 'STUDENT';                    // always
const semester = getCurrentSemester();
```

`ADMIN_EMAILS` is now a **reserved-address list** — addresses public
registration must refuse and that only the seed may provision. Parser handles
empty/whitespace correctly (v1's `??` chain did not fall back on `""`):

```ts
function adminEmails(): string[] {
  const raw = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '').trim();
  return raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
}
```

Note for accuracy: this is **registration-time privilege assignment, not
authorization**. Login reads the persisted DB role into the JWT
(`login/route.ts:16-45`). Removing an address from the list does not revoke an
existing admin, and a seeded admin logs in without being listed.

### Teacher provisioning

`scripts/create-admin.ts`, idempotent, the sole admin path:
reads `SEED_ADMIN_EMAIL` / `SEED_ADMIN_NAME` / `SEED_ADMIN_PASSWORD` from env,
hashes with the same `bcryptjs` at `SALT_ROUNDS = 10`, upserts on email with
`role: 'ADMIN'`, `semester: null`. **No credential committed.**

**Scope change (2026-09-13, at Q's request):** a self-service change-password
route IS now part of this release -- `POST /api/auth/change-password` plus an
`/account` page, current password required. Without it a seeded password is
permanent until someone edits Postgres directly.

It does NOT revoke existing sessions: tokens are stateless 7-day JWTs
(`src/lib/auth.ts`) with no server-side store, so only rotating `JWT_SECRET`
signs anyone out. New passwords are capped at 72 bytes because bcrypt truncates
past that boundary. Admin-initiated reset for a locked-out student remains out
of scope.

## Security — secret management

Secrets are supplied to the gateway from `/opt/apps/gateway/.env` (mode 600,
gitignored, never committed). Compose must reference them with `:?required` so
a missing or empty value stops the stack rather than silently falling back.

Generating them — only the two secrets are random; admin emails and the
semester are literal configuration:

```
CS205_JWT_SECRET=$(openssl rand -base64 48)      # base64 fine here
CS205_DB_PASSWORD=$(openssl rand -hex 32)        # HEX, not base64
CS205_ADMIN_EMAILS=wqu@monmouth.edu,rkamp@monmouth.edu
CS205_CURRENT_SEMESTER=2026-fall
```

Hex for the database password because base64 can emit `/` and `+`, which
corrupt a `postgresql://user:pass@host/db` URL unless percent-encoded.

**`POSTGRES_PASSWORD` in compose only applies at initdb.** On an existing
volume it is inert, so rotating the database credential requires an explicit
`ALTER USER cs205user WITH PASSWORD '<new>';` *before* recreating the app, or
the app cannot connect.

Rotating `JWT_SECRET` invalidates every existing session, since tokens are
stateless 7-day JWTs with no server-side store. Note that a forged token alone
is not sufficient for admin API access: `getCurrentUser` (`src/lib/auth.ts`)
re-reads the user from the database and authorizes on the persisted role, so a
valid admin UUID is also required.

### Gateway compose changes

It currently hardcodes `ADMIN_EMAIL: wqu@monmouth.edu` and passes no
`CURRENT_SEMESTER`. Add:

```yaml
  ADMIN_EMAILS:     ${CS205_ADMIN_EMAILS:?required}
  CURRENT_SEMESTER: ${CS205_CURRENT_SEMESTER:?required}
  JWT_SECRET:       ${CS205_JWT_SECRET:?required}
```

`:?required` makes Compose fail loudly on a missing or empty value rather than
passing a blank string through to runtime. The existing `:-` fallbacks that
supplied fallbacks are removed.

`/opt/apps/gateway/` is unversioned and exists only on the server. Commit it to
a repo as part of this change; losing it loses routing for all four apps.

## UI

`admin/page.tsx` holds semester state, options from `/api/admin/semesters`,
threaded to every admin fetch as a query param. `ExportButton.tsx:14` owns its
own `fetch` and must receive the selected semester explicitly. `StudentDetail`
types/UI updated to display `semester`.

## Testing

Fixture: the verified 2026-09-12 dump restored into a local Postgres.

**Ordering matters.** v2 asserted "current semester appears before any Fall
student exists" *after* a step that registered a Fall student. Corrected order:

1. Restore dump; run the exact committed migration via `migrate deploy`.
   Verify: 10 STUDENT rows = `2026-spring`, 1 ADMIN row = NULL, CHECK holds,
   index exists, 1301 activity rows intact with FKs.
2. Verify the migration is wrapped in `BEGIN`/`COMMIT` and that an induced
   failure leaves no partial state; exercise `migrate resolve --rolled-back`.
3. **Before any Fall registration:** assert `/api/admin/semesters` already
   lists `2026-fall` (unioned from `CURRENT_SEMESTER`).
4. Assert the prestart validator rejects: missing `JWT_SECRET`, short
   `JWT_SECRET`, malformed `CURRENT_SEMESTER`, empty `ADMIN_EMAILS`.
5. Seed teacher; assert login works and `/admin` reachable.
6. Attempt to register a reserved admin address → **403**, and confirm it is
   403 rather than 409 *after* the teacher is seeded (guard precedes lookup).
7. Register a throwaway student → lands in `2026-fall`.
8. Assert `parseSemesterSelection` rejects garbage with **400**, accepts `all`.
9. `GET /api/admin/students/<admin-uuid>` → **404** (admins not addressable
   as students).

### Metric-aware oracle

v2's blanket `all == Spring + Fall` is mathematically wrong for averages and
percentages. Expectations are per-metric, over a three-way fixture (Spring
student, Fall student, **admin activity**):

| Metric kind | Queries | Expectation for `all` |
|---|---|---|
| Counts | 3, 5, 8 | `all = spring + fall` |
| Record sets / CSV | 1, 2, 4, 6, 10 | `all = union(spring, fall)`, no duplicates |
| Averages | 7, 9 (`_avg`) | **recompute weighted** from combined attempts; NOT `avg(s)+avg(f)`, NOT their mean |
| Min / max | 9 (`_min`,`_max`) | `min(all)=min(min_s,min_f)`; `max` likewise |
| Module percentage | 3+4 | recompute numerator/denominator over the combined set; percentages do not add |
| Day buckets | 11 | per-day counts add; distinct-user counts do **not** add if a user appears in both (cannot here, but assert distinctness) |

For **every** metric, in **all three** views (Spring, Fall, `all`), assert
admin-generated activity is excluded. That is the regression guard for the five
pre-existing unfiltered queries.

10. **Stale-response race** (`scripts/race-test-browser.js`, run in a browser):
    delay cohort A's responses, select A then B. Asserts all five A requests
    were issued AND aborted, zero settled, five B requests issued, and that B's
    measured value is shown both immediately and after A's delay elapses.
    Expected values are measured from the running app, never hard-coded. A
    negative control fails the run if the two cohorts render the same number.
11. **Dashboard state machine** (browser): a cohort whose requests 500 must
    show an error, not hang; returning to a previously-failed cohort must
    recover; and returning to a previously-loaded cohort after a *different*
    cohort failed must not display an empty "ready" dashboard. All three were
    real defects in the first implementation.

No production write until all pass.

### Test artifacts

| Suite | Result | Writes? |
|---|---|---|
| `npm run test:cohorts` | **60 pass / 0 fail / 3 skip** | **YES** - login updates `lastLoginAt`; `PROBE_REGISTER=1` POSTs register. Clone only. |
| `npm run test:password` | **15 pass / 0 fail** | **YES** - requires `ALLOW_DESTRUCTIVE=1`; restores the original hash by direct DB write in `finally`, then verifies. |
| `scripts/race-test-browser.js` | **9 pass** | No |
| `scripts/state-machine-test-browser.js` | **6 pass** | No |

Raw output: `test-results/cohorts.txt`, `test-results/browser.txt` (gitignored).

Oracle properties:
- Every response is checked for HTTP status AND exact expected key set (module
  IDs, quiz IDs, the route's exact 30 activity dates, student/email ID sets), so
  an empty or truncated response fails rather than passing vacuously.
- Each metric is compared against **two** counterfactuals -- missing-role and
  missing-semester -- so the two filters are proven independently. Where a
  counterfactual coincides with the correct value on the current data the check
  reports SKIP, never PASS. The 3 skips are exactly that case.
- Rounding (2dp) and the activity window (local midnight of today-30d, exactly
  30 generated dates) mirror the routes rather than approximating them.
- Export is parsed with a real RFC4180 parser and exercised by a fixture student
  whose name contains a comma.

**Corrections to earlier claims in this spec:** `test:cohorts` was once described
as read-only and production-safe -- false, login writes `lastLoginAt`. The
modules oracle once rounded to 1dp while the route rounds to 2dp, and the
activity oracle used a rolling interval while the route anchors to local
midnight. All three are fixed.

### Known, accepted behaviour

- `loading` is false while a *previously loaded* cohort is being refreshed
  (stale-while-revalidate). Data on screen is always correctly labelled; the
  flag simply does not mean "no request in flight".
- No request timeout: a hung request leaves the page loading. Pre-existing.
- The activity route buckets by the database session timezone (`TO_CHAR`) while
  generating its 30 date labels in UTC. Pre-existing; affects only which day a
  near-midnight visit is attributed to.

## Rollout

Reordered per review: **prebuild before downtime, quiesce before the final
dump, validate config before rotating the role password.**

| # | Step | Downtime | Reversible |
|---|---|---|---|
| 1 | ✅ `pg_dump` prod → local, verified | no | yes |
| 2 | ✅ `docker system prune -a` (8.78GB freed, 88%→47%) | no | yes |
| 3 | Local dev + full test matrix against restored dump | no | yes |
| 4 | Codex review of the implementation diff | no | — |
| 5 | Commit gateway dir to a repo (`.env` gitignored) | no | yes |
| 6 | **Prebuild and tag** the new image on the server | no | yes |
| 7 | Write `.env` (chmod 600) + updated compose; `docker compose config -q` to validate **without printing secrets** | no | yes |
| 8 | Stop `cs205-app`; **verify** no other writer (no replicas, one-off containers, cron, or manual psql sessions) | **begins** | yes |
| 9 | **Final `pg_dump` now** — after writes are confirmed stopped, so the rollback snapshot is lossless | yes | yes |
| 10 | `ALTER USER cs205user WITH PASSWORD '<new>';` then verify a fresh connection with the new credential | yes | yes |
| 11 | Start app → `validate-env` → `migrate deploy` → `node server.js` | **ends** | **no** |
| 12 | Seed teacher account (idempotent) | no | yes |
| 13 | Verify: 4 routes 200, both admins log in, cohort invariants, CHECK holds | no | — |

Why 9 follows 8: v2 dumped *before* stopping the writer, so any registration or
tracking event in between would be missing from the rollback snapshot.

Why 10 follows 7: validating config first means a bad `.env` is caught while the
old credential still works, avoiding a recovery gap.

### Rollback — executable, not a sketch

`pg_dump` produces a **logical** dump. It is not "restored into a volume," and
it does **not** carry roles or passwords. Procedure:

```bash
# 1. stop the app so nothing writes during recovery
docker stop cs205-app

# 2. recreate the database from the step-9 logical dump
docker exec cs205-db psql -U postgres -c 'DROP DATABASE cs205;'
docker exec cs205-db psql -U postgres -c 'CREATE DATABASE cs205 OWNER cs205user;'
gzcat cs205-<ts>.sql.gz | docker exec -i cs205-db psql -U cs205user -d cs205 -v ON_ERROR_STOP=1

# 3. roles/passwords are NOT in that dump — keep the ROTATED credential.
#    Do not restore the old compromised password. If role state is needed:
#    pg_dumpall --globals-only is the source, taken separately.

# 4. redeploy the previous application image
cd /opt/apps/cs205-learning-tool && git checkout 52a9bd6
cd /opt/apps/gateway && docker compose up -d --build cs205
```

Note step 3: rollback intentionally **retains the rotated secrets**. Rolling
back the application must not roll back to a known-compromised credential.

If `migrate deploy` failed at step 11, also run
`npx prisma migrate resolve --rolled-back <name>` before any retry, or Prisma
will refuse to reapply.

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| A missed cohort query mixes semesters | High | 12 queries enumerated; test 6 asserts all three views |
| SQL injection via semester param | High | Tagged-template binding + `parseSemester` |
| Public registration grants admin | High | Registration creates STUDENT only; reserved addresses 403 |
| Weak or shared signing secret | High | Rotate `JWT_SECRET`; require it via `:?required` |
| App can't connect after password rotation | Med | `ALTER USER` before recreate; step 7 ordered |
| Old code inserts NULL semester → CHECK violation | Med | Quiesce registration, step 6 |
| Returning student can't re-enroll (`email @unique`) | Med | Accepted; manual rename |
| Teacher password guessable + unrotatable | Med | Flagged; no change-password route exists |
| Gateway config unversioned | Med | Commit to repo in this change |
| Still zero automated backups | High | Follow-up: cron'd `pg_dump` |
