// ============================================================================
// THE EXAMINER — config.js
// Everything tunable lives HERE. No game logic in this file, no data in the
// game file. Safe to edit without knowing how the engine works.
//
// ── HOW THE SCORE WORKS (plain English) ─────────────────────────────────────
// Questions are levelled 0..3 (A2, B1, B2, C1). The ladder starts at B1;
// a correct answer moves it up one level, a wrong answer down one.
// After every answer we log an "effective level":
//     question level + 0.5 if correct, − 0.5 if wrong.
// θ (theta) = the average of all effective levels (question 1 is skipped as a
// warm-up). θ runs from −0.5 (all A2 questions wrong) to 3.5 (all C1 right).
// The BANDS table below turns θ into the CEFR headline + hedged IELTS range.
//
// ── SANITY-CHECK PROCEDURE (build-order step 9 — do before any paid traffic) ─
// Have students with known bands take the scan (Ricky, Kal, Carl, Amy):
//   1. finish a run, open DevTools console, read  __epq.debrief()
//   2. it prints θ, the bucket chosen, and every question+answer
//   3. if a student lands one bucket too high/low, move that bucket's `max`
//      cutoff toward them by 0.1–0.15 and retest. Never edit game code for this.
// ============================================================================

window.EXAMINER_CONFIG = {

  // ── funnel plumbing (⚠️ placeholders — set before soft launch) ────────────
  // Demo-class sign-up form (demo classes July 18 & July 25, 2026).
  // ⚠️ Date-stamped campaign: after July 25 swap this + the CTA copy below
  //    back to the placement-call version kept in COPY.md §4.
  BOOKING_URL : 'https://docs.google.com/forms/d/e/1FAIpQLSdSDk9lwwOCYDU4NgUdnd01-S6rE0hz54sBjS3JR41EWqyk0A/viewform?usp=header',
  LINE_URL    : 'https://line.me/R/ti/p/@grammarmetric',   // ⚠️ replace with the real LINE add-friend link
  LEAD_ENDPOINT : '',                        // ⚠️ paste the Apps Script /exec URL here — full setup steps in apps-script-lead-endpoint.gs. '' = store locally + show LINE fallback
  CONTACT_EMAIL : 'admin@grammarmetric.com',

  // ── ladder tuning ─────────────────────────────────────────────────────────
  START_LEVEL      : 1,     // 0=A2 1=B1 2=B2 3=C1 — where the scan begins
  MIN_QUESTIONS    : 12,    // never stop before this many
  MAX_QUESTIONS    : 16,    // hard cap (council: ~12–18)
  STABLE_WINDOW    : 6,     // stop early after MIN_QUESTIONS if the last N…
  STABLE_SPREAD    : 1,     // …question levels span ≤ this (the walk has settled)
  SKIP_WARMUP      : 1,     // first N answers excluded from θ (nerves/misclicks)
  QUESTION_SECONDS : 25,    // per-question timer; timeout counts as wrong
};

// ── θ → CEFR → Band lookup (ordered; first row with θ ≤ max wins) ───────────
// `band` is ALWAYS a range and is ALWAYS rendered with the vocabulary-only
// label + disclaimer (copy below). Cutoff logic: a player who keeps bouncing
// between two levels averages exactly between them (e.g. solid-B1 bounces
// B1↔B2 → θ≈1.5), so buckets are centred on the half-points.
window.EXAMINER_BANDS = [
  { max: 0.25, key:'PRE_A2', cefr:'Pre-A2', name:'Foundation',
    band:'below 3.5',
    meaning:"You're at the very start — the most common English words are still settling in. That's a starting line, not a verdict.",
    start:"Start with high-frequency everyday words: family, food, places, daily routines. Ten minutes a day with picture-based flashcards beats one long weekly session. In class we'd begin with guided speaking using the 500 most common words." },
  { max: 0.75, key:'A2', cefr:'A2', name:'Elementary',
    band:'3.5 – 4.0',
    meaning:'You handle everyday survival English — routines, family, simple needs — but general topics still push you off balance.',
    start:"Your base is real but narrow. The fastest win is topic vocabulary: pick one everyday theme a week (work, travel, health) and learn its 20 core words in sentences, not lists. A placement call can pin down which themes to hit first." },
  { max: 1.25, key:'A2_PLUS', cefr:'A2+', name:'Approaching B1',
    band:'4.0 – 4.5',
    meaning:"Everyday words are solid and you're starting to catch intermediate ones. The B1 wall is close.",
    start:"You're one push from B1 — the level where English starts feeling usable. Focus on verbs of change and opinion (improve, avoid, encourage, achieve) and read short graded articles daily. Structured practice now converts quickly." },
  { max: 1.75, key:'B1', cefr:'B1', name:'Intermediate',
    band:'4.5 – 5.0',
    meaning:'You cope with familiar topics — work, study, travel — though precise word choice still slips at times.',
    start:"Classic intermediate plateau: you understand more than you can deploy. Break it with collocations — learn which words travel together (heavy workload, meet a deadline) rather than single words. This is exactly what IELTS 5.5+ rewards." },
  { max: 2.25, key:'B1_PLUS', cefr:'B1+', name:'Upper-intermediate reach',
    band:'5.0 – 5.5',
    meaning:"Comfortable mid-level vocabulary, and you're already picking off B2 words. This is where focused study pays fastest.",
    start:"You're in the highest-leverage zone in English learning: every B2 word you add (sufficient, obtain, tendency) is worth real band movement. A levelled academic word programme for 6–8 weeks typically moves learners like you half a band." },
  { max: 2.75, key:'B2', cefr:'B2', name:'Upper-intermediate',
    band:'5.5 – 6.5',
    meaning:'You read and discuss abstract topics — consequences, priorities, trends — with real control. University-gate territory.',
    start:"Your vocabulary already clears many university entry bars. The gap to 6.5–7.0 is precision: nuance pairs (affect/effect, rise/raise), hedging language, and C1 verbs like mitigate and undermine. Targeted, not general, study from here." },
  { max: 3.25, key:'B2_PLUS', cefr:'B2+', name:'Approaching C1',
    band:'6.5 – 7.0',
    meaning:'Strong academic vocabulary; only lower-frequency precision words still get away from you.',
    start:"At your level the bottleneck usually isn't vocabulary breadth — it's retrieval speed and written range. Practice producing (not just recognising) C1 words under time pressure. A diagnostic writing sample would tell us more than any quiz." },
  { max: 99,   key:'C1', cefr:'C1', name:'Advanced',
    band:'7.0+',
    meaning:'You recognise precise, low-frequency vocabulary — mitigate, negligible, scrutiny — the mark of an advanced reader.',
    start:"Vocabulary recognition is no longer your limiter. If you're chasing 7.5+, the marks live in writing task response and speaking fluency — skills a 3-minute scan can't see. A short assessed essay + speaking call would locate you precisely." },
];

// ── fixed result-screen copy (see COPY.md §2) ────────────────────────────────
window.EXAMINER_COPY = {
  bandLabel   : 'Estimated IELTS band (vocabulary only) — confirm with a teacher.',
  disclaimer  : 'This estimate comes from vocabulary alone. A real IELTS band also measures your listening, reading, writing and speaking — so treat this as an honest starting point, not an official result.',
  ctaPrimary  : 'Reserve my free demo class',
  ctaPrimarySub : 'Free demo classes on July 18 & 25 — a real lesson with a real teacher. No obligation.',
  ctaSecondary: 'Get my full breakdown',
  ctaSecondarySub : 'Your accuracy by level, the words that stopped you, and exactly where to start studying — sent free.',
  consentLabel: 'I agree that GrammarMetric may keep the details above and contact me about my result and lessons.',
  consentNote : 'We use your details only to send your breakdown and — if you want one — arrange your demo class. We never sell or share them, and you can ask us to delete them any time: admin@grammarmetric.com.',
  minorNote   : 'Under 18? Please ask a parent or guardian before sending your details.',
};
