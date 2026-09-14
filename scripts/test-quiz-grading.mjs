/**
 * Proves the server's grader agrees with what students were shown.
 *
 * Every historical attempt stores both the raw `userAnswer` and the
 * `isCorrect` the UI displayed at the time. Re-grading each answer server-side
 * must reproduce that flag exactly -- otherwise a student sees "Correct!" and
 * is recorded wrong, which is worse than the bug this replaces.
 *
 *   DATABASE_URL=... node --experimental-strip-types \
 *     --import ./scripts/register-alias.mjs scripts/test-quiz-grading.mjs
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { findQuizById } from '@/lib/quizRegistry';
import { gradeAnswer } from '@/lib/quizGrading';

if (!process.env.DATABASE_URL) { console.error('FATAL: DATABASE_URL required'); process.exit(1); }
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

let agree = 0, disagree = 0, ungradeable = 0;
const mismatches = [];

try {
  const attempts = await prisma.quizAttempt.findMany({ select: { id: true, quizId: true, answers: true } });
  for (const a of attempts) {
    const quiz = findQuizById(a.quizId);
    if (!quiz) { ungradeable++; continue; }
    const byId = new Map(quiz.questions.map((q) => [q.id, q]));
    for (const ans of (Array.isArray(a.answers) ? a.answers : [])) {
      const q = byId.get(ans.questionId);
      if (!q) { ungradeable++; continue; }
      const server = gradeAnswer(q, ans.userAnswer);
      const shown = ans.isCorrect === true;
      if (server === shown) agree++;
      else {
        disagree++;
        if (mismatches.length < 10) {
          mismatches.push(`${a.quizId}/${ans.questionId} type=${q.type} userAnswer=${JSON.stringify(ans.userAnswer)} shown=${shown} server=${server}`);
        }
      }
    }
  }

  console.log(`\n  answers re-graded:        ${agree + disagree}`);
  console.log(`  server agrees with UI:    ${agree}`);
  console.log(`  DISAGREES:                ${disagree}`);
  console.log(`  ungradeable (no question): ${ungradeable}`);
  for (const m of mismatches) console.log(`    ! ${m}`);

  const ok = disagree === 0 && agree > 0;
  console.log(`\n  ${ok ? 'PASS' : 'FAIL'} - server-side grading ${ok ? 'reproduces every displayed result' : 'diverges from what students saw'}\n`);
  await prisma.$disconnect();
  process.exit(ok ? 0 : 1);
} catch (e) {
  console.error('ERROR:', e.message);
  await prisma.$disconnect();
  process.exit(1);
}
