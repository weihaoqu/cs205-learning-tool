/**
 * Recompute historical quiz scores using the application's own scoring code.
 *
 * WHY: a client-side bug awarded the final question's points twice, so every
 * attempt whose last answer was correct was stored too high. Each attempt
 * retains its full per-question answers, so the true score is recoverable
 * exactly -- this is a correction, not an estimate.
 *
 * SAFE BY DEFAULT: reports only. Pass --apply to write.
 * Emits SQL guarded on the current score, so a row changed since this ran is
 * skipped rather than silently overwritten, and a rollback file that restores
 * the previous values.
 *
 *   node --experimental-strip-types --import ./scripts/register-alias.mjs \
 *     scripts/recompute-quiz-scores.mjs [--apply]
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { writeFileSync, mkdirSync } from 'node:fs';
import { findQuizById } from '@/lib/quizRegistry';
import { scoreQuiz } from '@/lib/quizScoring';

const APPLY = process.argv.includes('--apply');
if (!process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL required');
  process.exit(1);
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const round2 = (n) => Math.round(n * 100) / 100;

try {
  const attempts = await prisma.quizAttempt.findMany({
    select: { id: true, quizId: true, score: true, totalPoints: true, percentage: true, answers: true },
    orderBy: { completedAt: 'asc' },
  });

  const changes = [];
  const unknown = [];
  let unchanged = 0;

  for (const a of attempts) {
    const quiz = findQuizById(a.quizId);
    if (!quiz) { unknown.push(a); continue; }

    const raw = Array.isArray(a.answers) ? a.answers : [];
    const scorable = raw
      .filter((x) => x && typeof x.questionId === 'string')
      .map((x) => ({ questionId: x.questionId, isCorrect: x.isCorrect === true }));

    const { score, totalPoints, percentage } = scoreQuiz(quiz, scorable);
    if (score === a.score && totalPoints === a.totalPoints && Math.abs(percentage - a.percentage) < 1e-9) {
      unchanged++;
      continue;
    }
    changes.push({ ...a, newScore: score, newTotal: totalPoints, newPct: percentage });
  }

  console.log(`\n=== ${attempts.length} attempts examined ===`);
  console.log(`  unchanged:        ${unchanged}`);
  console.log(`  to correct:       ${changes.length}`);
  console.log(`  unknown quiz id:  ${unknown.length}${unknown.length ? ' (left alone: ' + [...new Set(unknown.map(u=>u.quizId))].join(', ') + ')' : ''}`);

  if (changes.length) {
    console.log('\n  quizId                    old            ->  new           delta');
    console.log('  ' + '-'.repeat(68));
    for (const c of changes) {
      const oldS = `${c.score}/${c.totalPoints} (${round2(c.percentage)}%)`;
      const newS = `${c.newScore}/${c.newTotal} (${round2(c.newPct)}%)`;
      const d = round2(c.newPct - c.percentage);
      console.log(`  ${c.quizId.padEnd(24)} ${oldS.padEnd(14)} ->  ${newS.padEnd(14)} ${d > 0 ? '+' : ''}${d}`);
    }
    const oldAvg = attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length;
    const newAvg = (attempts.reduce((s, a) => s + a.percentage, 0)
      + changes.reduce((s, c) => s + (c.newPct - c.percentage), 0)) / attempts.length;
    console.log(`\n  average across all attempts: ${round2(oldAvg)}%  ->  ${round2(newAvg)}%`);
    console.log(`  any remaining over 100%:     ${changes.filter(c => c.newPct > 100).length + attempts.filter(a=>a.percentage>100 && !changes.find(c=>c.id===a.id)).length}`);
  }

  mkdirSync('test-results', { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const rollback = `test-results/quiz-score-rollback-${stamp}.json`;
  writeFileSync(rollback, JSON.stringify(
    changes.map(c => ({ id: c.id, score: c.score, totalPoints: c.totalPoints, percentage: c.percentage })), null, 2));
  console.log(`\n  rollback data written to ${rollback}`);

  // Guarded SQL: each UPDATE only fires if the row still holds the old score.
  const sql = changes.map(c =>
    `UPDATE "QuizAttempt" SET score=${c.newScore}, "totalPoints"=${c.newTotal}, percentage=${c.newPct} ` +
    `WHERE id='${c.id}' AND score=${c.score};`).join('\n');
  const sqlFile = `test-results/quiz-score-fix-${stamp}.sql`;
  writeFileSync(sqlFile, sql + '\n');
  console.log(`  guarded SQL written to   ${sqlFile}`);

  if (!APPLY) {
    console.log('\n  DRY RUN -- nothing written to the database. Re-run with --apply to commit.\n');
  } else {
    let applied = 0, skipped = 0;
    await prisma.$transaction(async (tx) => {
      for (const c of changes) {
        const r = await tx.quizAttempt.updateMany({
          where: { id: c.id, score: c.score },   // guard: row unchanged since we read it
          data: { score: c.newScore, totalPoints: c.newTotal, percentage: c.newPct },
        });
        r.count === 1 ? applied++ : skipped++;
      }
    });
    console.log(`\n  APPLIED: ${applied} corrected, ${skipped} skipped (changed since read)\n`);
  }
  await prisma.$disconnect();
  process.exit(0);
} catch (e) {
  console.error('ERROR:', e.message);
  await prisma.$disconnect();
  process.exit(1);
}
