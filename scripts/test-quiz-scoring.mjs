/**
 * Regression tests for quiz scoring.
 *
 * THE BUG (fixed): QuizContainer summed `answers` -- which already contained
 * the final answer -- and then added the current question's points again. A
 * perfect run scored totalPoints + lastQuestionPoints. In production this put
 * 25 of 63 recorded attempts above 100%, e.g. 285/260 and 60/50.
 *
 * The fixtures below use the REAL point values from the affected quizzes, and
 * the assertions name the exact wrong numbers that were stored, so a
 * reintroduction of the bug fails loudly rather than drifting.
 *
 *   node --experimental-strip-types scripts/test-quiz-scoring.mjs
 */
import { scoreQuiz } from '../src/lib/quizScoring.ts';

let pass = 0, fail = 0;
const check = (n, ok, d = '') => { if (ok) pass++; else fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${n}  ${d}`); };

const mkQuiz = (id, pts) => ({
  id, title: id, description: '', topic: 't', passingScore: 70,
  questions: pts.map((p, i) => ({ id: `${id}-q${i}`, points: p })),
});
const allCorrect = (q) => q.questions.map((x) => ({ questionId: x.id, isCorrect: true }));

// Real shapes from src/content/quizzes (verified against the production data).
const conceptual = mkQuiz('complexity-conceptual', [10,10,15,15,15,15,15,10,10,20]); // sum 135, last 20
const tracing    = mkQuiz('complexity-tracing',    [20,20,20,20,20,25]);             // sum 125, last 25
const full       = mkQuiz('complexity-quiz',       [...conceptual.questions.map(q=>q.points),
                                                    ...tracing.questions.map(q=>q.points)]); // 260, last 25

console.log('\n--- a perfect score must equal totalPoints, never exceed it ---');
for (const [q, total, buggy] of [[conceptual,135,155],[tracing,125,150],[full,260,285]]) {
  const r = scoreQuiz(q, allCorrect(q));
  check(`${q.id}: perfect score == ${total}`, r.score === total, `got ${r.score}`);
  check(`${q.id}: not the old buggy ${buggy}`, r.score !== buggy, `got ${r.score}`);
  check(`${q.id}: percentage == 100`, Math.abs(r.percentage - 100) < 1e-9, `got ${r.percentage}`);
}

console.log('\n--- no attempt can ever exceed 100% ---');
const cases = [
  ['all correct',        allCorrect(full)],
  ['last question only', [{ questionId: full.questions.at(-1).id, isCorrect: true }]],
  ['first question only',[{ questionId: full.questions[0].id, isCorrect: true }]],
  ['none correct',       full.questions.map((q) => ({ questionId: q.id, isCorrect: false }))],
];
for (const [name, ans] of cases) {
  const r = scoreQuiz(full, ans);
  check(`${name}: score <= totalPoints`, r.score <= r.totalPoints, `${r.score}/${r.totalPoints}`);
  check(`${name}: 0 <= pct <= 100`, r.percentage >= 0 && r.percentage <= 100, `${r.percentage.toFixed(1)}%`);
}

console.log('\n--- partial credit is exact ---');
const partial = scoreQuiz(conceptual, [
  { questionId: 'complexity-conceptual-q0', isCorrect: true },   // 10
  { questionId: 'complexity-conceptual-q2', isCorrect: true },   // 15
  { questionId: 'complexity-conceptual-q9', isCorrect: true },   // 20 (the last one)
  { questionId: 'complexity-conceptual-q1', isCorrect: false },
]);
check('10 + 15 + 20 == 45', partial.score === 45, `got ${partial.score}`);
check('45/135 == 33.33%', Math.abs(partial.percentage - 100 * 45 / 135) < 1e-9, `got ${partial.percentage}`);

console.log('\n--- answers are matched by ID, not array position ---');
const shuffled = scoreQuiz(conceptual, [
  { questionId: 'complexity-conceptual-q9', isCorrect: true },   // 20
  { questionId: 'complexity-conceptual-q0', isCorrect: true },   // 10
]);
check('order does not change the score', shuffled.score === 30, `got ${shuffled.score}`);
const dup = scoreQuiz(conceptual, [
  { questionId: 'complexity-conceptual-q9', isCorrect: true },
  { questionId: 'complexity-conceptual-q9', isCorrect: true },
]);
check('a duplicated answer scores once', dup.score === 20, `got ${dup.score}`);
const corrected = scoreQuiz(conceptual, [
  { questionId: 'complexity-conceptual-q9', isCorrect: true },
  { questionId: 'complexity-conceptual-q9', isCorrect: false },
]);
check('a later wrong answer supersedes an earlier right one', corrected.score === 0, `got ${corrected.score}`);
const unknown = scoreQuiz(conceptual, [{ questionId: 'not-in-this-quiz', isCorrect: true }]);
check('an answer for an unknown question scores nothing', unknown.score === 0, `got ${unknown.score}`);

console.log('\n--- degenerate input ---');
const empty = scoreQuiz(mkQuiz('empty', []), []);
check('zero-question quiz does not divide by zero', empty.percentage === 0 && empty.totalPoints === 0,
      `${empty.score}/${empty.totalPoints} = ${empty.percentage}`);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
