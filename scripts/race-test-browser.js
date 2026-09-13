/*
 * Regression test for the stale-cohort-response race.
 *
 * THE BUG (fixed in src/app/admin/page.tsx): Promise.all keeps the five panels
 * of ONE batch consistent, but does not stop a superseded batch from landing
 * last. Select a slow cohort, then a fast one, and the slow batch overwrites
 * every panel while the selector still names the other cohort -- one cohort's
 * numbers under another cohort's label.
 *
 * THE FIX: the data effect aborts its in-flight batch on cleanup and refuses to
 * commit any result whose effect was already torn down. State is committed as
 * one value tagged with its cohort, so status and data cannot disagree.
 *
 * HOW TO RUN: needs a real browser; Playwright is deliberately not a dependency
 * here. Sign in as an admin, open /cs205/admin, paste this file into the
 * devtools console, read the VERDICT.
 *
 * Expected values are measured from the running app, never hard-coded, and
 * every structural counter is asserted -- so the test cannot pass because no
 * request was issued or because a batch was still pending.
 */
window.runRaceTest = async () => {
  const SLOW = '2026-spring';
  const FAST = '2026-fall';
  const PANELS = 5;               // overview, modules, quizzes, activity, students
  const DELAY = 3000;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const sel = document.querySelector('#semester');
  if (!sel) { console.error('no #semester -- open /cs205/admin as an admin'); return { VERDICT: 'FAIL - no selector' }; }

  const nativeSet = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
  const pick = (v) => { nativeSet.call(sel, v); sel.dispatchEvent(new Event('change', { bubbles: true })); };
  const shown = () =>
    (document.body.innerText.replace(/\s+/g, ' ').match(/Total Students (\d+)/) || [])[1] ?? null;

  const have = [...sel.options].map((o) => o.value);
  for (const c of [SLOW, FAST]) {
    if (!have.includes(c)) { console.error(`cohort ${c} missing: ${have}`); return { VERDICT: `FAIL - cohort ${c} missing` }; }
  }

  const results = [];
  const assert = (name, cond, detail = '') => { results.push({ name, ok: !!cond, detail }); };

  // ---- measure each cohort's real value (no hard-coded expectations) ----
  pick(SLOW); await sleep(2000); const slowValue = shown();
  pick(FAST); await sleep(2000); const fastValue = shown();

  // NEGATIVE CONTROL: if both cohorts render the same number, the race
  // assertion below cannot distinguish pass from fail. Say so loudly.
  assert('negative control: cohorts render DISTINCT values',
         slowValue !== null && fastValue !== null && slowValue !== fastValue,
         `${SLOW}=${slowValue} ${FAST}=${fastValue}`);

  // ---- the race ----
  const log = { slowIssued: 0, slowSettled: 0, slowAborted: 0, fastIssued: 0 };
  const orig = window.fetch;
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    if (url.includes(`semester=${SLOW}`)) {
      log.slowIssued++;
      await sleep(DELAY);
      try { const r = await orig(input, init); log.slowSettled++; return r; }
      catch (e) { if (e?.name === 'AbortError') log.slowAborted++; throw e; }
    }
    if (url.includes(`semester=${FAST}`)) log.fastIssued++;
    return orig(input, init);
  };

  pick(SLOW);
  await sleep(150);
  pick(FAST);

  await sleep(1500);
  const afterFast = shown();
  await sleep(DELAY + 1500);        // well past when the slow batch would land
  const afterSlowWindow = shown();
  window.fetch = orig;

  // ---- assert the structure, not just the outcome ----
  assert(`slow cohort issued ${PANELS} requests`, log.slowIssued === PANELS, `got ${log.slowIssued}`);
  assert(`fast cohort issued ${PANELS} requests`, log.fastIssued === PANELS, `got ${log.fastIssued}`);
  assert('every slow request was ABORTED', log.slowAborted === PANELS, `got ${log.slowAborted}`);
  assert('no slow request SETTLED', log.slowSettled === 0, `got ${log.slowSettled}`);
  assert('selector still names the fast cohort', sel.value === FAST, `got ${sel.value}`);
  assert('fast value shown once fast batch landed', afterFast === fastValue, `${afterFast} vs ${fastValue}`);
  assert('fast value STILL shown after the slow window',
         afterSlowWindow === fastValue, `${afterSlowWindow} vs ${fastValue}`);
  assert('slow value never appeared', afterSlowWindow !== slowValue,
         `slow=${slowValue} shown=${afterSlowWindow}`);

  const failed = results.filter((r) => !r.ok);
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.detail}`);
  const summary = {
    assertions: results,
    counters: log,
    measured: { [SLOW]: slowValue, [FAST]: fastValue },
    observed: { afterFast, afterSlowWindow },
    VERDICT: failed.length === 0
      ? `PASS - ${results.length}/${results.length} assertions`
      : `FAIL - ${failed.length} of ${results.length}: ${failed.map((f) => f.name).join('; ')}`,
  };
  console.log(summary);
  return summary;
};

// Auto-run when pasted into a console.
window.runRaceTest();
