/*
 * Dashboard state-machine regression test.
 *
 * Covers three defects that were REAL in the first implementation, when
 * loading/failed were tracked as independent flags:
 *   1. an init response that is a non-2xx carrying JSON left the page
 *      "Loading..." forever (r.ok was never checked);
 *   2. a cohort that errored stayed "failed" even after a later success,
 *      because the error flag was never cleared;
 *   3. after cohort A failed, returning to previously-loaded cohort B showed a
 *      "ready" dashboard with empty panels, because loadedFor was never reset.
 *
 * Fixed by committing ONE cohort-tagged value, so status and data cannot
 * disagree. Run: sign in as an admin, open /cs205/admin, paste into devtools.
 */
window.runStateMachineTest = async (SLOW = '2026-spring', FAST = '2026-fall',
                                    SLOW_N = '10', FAST_N = '1') => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const sel = document.querySelector('#semester');
  if (!sel) { console.error('no #semester -- open /cs205/admin as an admin'); return { VERDICT: 'FAIL - no selector' }; }
  const nativeSet = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
  const pick = (v) => { nativeSet.call(sel, v); sel.dispatchEvent(new Event('change', { bubbles: true })); };
  const state = () => {
    const t = document.body.innerText.replace(/\s+/g, ' ');
    return {
      students: (t.match(/Total Students (\d+)/) || [])[1] ?? null,
      loading: /Loading dashboard/.test(t),
      error: /Could not load/.test(t),
    };
  };
  const orig = window.fetch;
  const failFor = (needle) => {
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (url.includes(needle)) {
        return new Response('{"error":"boom"}', { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
      return orig(input, init);
    };
  };
  const results = [];
  const A = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

  try {
    // (2) cohort errors -> user leaves -> returns: must RECOVER
    failFor(`semester=${SLOW}`);
    pick(SLOW); await sleep(1800);
    let s = state();
    A('errored cohort shows an error, not a hang', s.error && !s.loading, JSON.stringify(s));

    window.fetch = orig;
    pick(FAST); await sleep(1800);
    pick(SLOW); await sleep(2200);
    s = state();
    A('returning to a previously-FAILED cohort recovers', !s.error && s.students === SLOW_N, JSON.stringify(s));

    // (3) B loaded -> A errors -> back to B: must not show empty-but-ready
    pick(FAST); await sleep(1800);
    s = state();
    A('fast cohort loaded', s.students === FAST_N, JSON.stringify(s));

    failFor(`semester=${SLOW}`);
    pick(SLOW); await sleep(1800);
    s = state();
    A('other cohort errors', s.error, JSON.stringify(s));

    window.fetch = orig;
    pick(FAST); await sleep(120);
    s = state();
    A('returning to loaded cohort never shows empty-but-ready',
      s.loading || s.students === FAST_N, JSON.stringify(s));
    await sleep(2000);
    s = state();
    A('and settles on the correct value', s.students === FAST_N && !s.error, JSON.stringify(s));
  } finally {
    window.fetch = orig;
  }

  const failed = results.filter((r) => !r.ok);
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.detail}`);
  const summary = {
    assertions: results,
    VERDICT: failed.length === 0
      ? `PASS - ${results.length}/${results.length} assertions`
      : `FAIL - ${failed.map((f) => f.name).join('; ')}`,
  };
  console.log(summary);
  return summary;
};

window.runStateMachineTest();
