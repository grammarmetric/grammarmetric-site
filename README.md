# GrammarMetric — marketing website

A single-file, no-build marketing site for GrammarMetric (IELTS/English classes,
Santisuk English School, Bangkapi, Bangkok). One `index.html` holds all HTML, CSS
and JS. Deploy it on any static host; it's also iframe-safe for Google Sites.

## Files

| File | What it is |
|---|---|
| `index.html` | The entire site — hero, why-us, class pathway, results, embedded quiz, games showcase, demo-class form, about/contact. All config is in the `CONFIG` block near the bottom `<script>`. |
| `apps-script-grammarmetric-endpoint.gs` | Google Apps Script that receives demo-class bookings into a Google Sheet you own. Setup steps are in the file header. |
| `server.ps1` | Local static server (port 8799) for previewing. Not needed in production. |
| `README.md` | This file. |

## Sections (single-page scroll)

`#top` hero → `#why` → `#classes` (the pathway) → `#results` (social proof) →
`#quiz` (embedded EXAMINER) → `#games` (products + custom-build pitch) →
`#signup` (demo booking form) → `#about` (bio + contact).

## Tech decisions (as confirmed)

- **Single-file HTML/CSS/JS, no build pipeline.** Matches your workflow; edit and
  ship the one file.
- **Standalone deployment** is primary (real SEO meta tags, JSON-LD, OG card),
  but the page is written to also survive being embedded in a Google Sites iframe
  (localStorage access is wrapped so it can't throw in a sandboxed frame).
- **Form handling: Apps Script → Google Sheet** — the same pipeline THE EXAMINER
  uses, so all your leads can land in one place. If the endpoint is unset or
  unreachable, the form saves the request in the visitor's browser and offers a
  one-tap LINE / email fallback so no lead is lost.
- **Placement quiz: THE EXAMINER, embedded.** The site iframes the existing,
  already-verified quiz rather than rebuilding it.

## Design

GrammarMetric house style: Lexend, light mode, frosted white panels, pill buttons,
the five-color palette used as accents only (navy `#00060e`, olive `#9a9f17`,
yellow `#fee801`, sky `#54c1e6`, teal `#39c4b6`). Yellow is never used as body
text on white — darkened accent shades (`--yellow-d` etc.) are used for text.
Mobile-first, fully responsive, reveal-on-scroll (respects
`prefers-reduced-motion`).

## Wiring the quiz (THE EXAMINER)

The quiz section shows a "START THE SCAN" cover; clicking it injects an iframe.
`CONFIG.QUIZ_URL` controls where it points:

- **Local dev:** leave `QUIZ_URL:''`. On `localhost` the iframe auto-targets
  `http://localhost:8798/` — so run THE EXAMINER's server (`preview_start
  "ielts-placement"`) alongside this site's server.
- **Production:** leave `QUIZ_URL:''` and **deploy THE EXAMINER into a `quiz/`
  subfolder** of this site (so `https://yourdomain/quiz/` serves it). The iframe
  auto-targets `quiz/`. Or set `QUIZ_URL` to any absolute URL where the quiz lives.

> The quiz's own booking CTA still points at `BOOKING_URL` in the quiz's
> `config.js`. When you launch this site, decide whether the quiz should send
> people to its Google Form or deep-link to this site's `#signup` — keep them
> consistent.

## ⚠️ Before launch — replace every placeholder

Search `index.html` for `⚠️` and `[` / `Placeholder`. Checklist:

**Wiring**
- [ ] `CONFIG.LEAD_ENDPOINT` — deploy `apps-script-grammarmetric-endpoint.gs`,
      paste the `/exec` URL. Until then, bookings only save to the visitor's
      browser + show the LINE/email fallback.
- [ ] `CONFIG.LINE_URL` — real LINE add-friend link (appears in the form fallback
      and About section).
- [ ] `CONFIG.QUIZ_URL` / deploy the quiz to `quiz/` (see above).

**Content**
- [ ] **Who-it's-for section (`#approach`)** — this is real content now (the two
      student types + the Cambridge materials: Mindset, Cambridge Vocabulary,
      Common Mistakes). No placeholder to replace. Only edit if the materials or
      framing change. If you ever collect **real, permissioned** student quotes,
      add them as their own section — never invent testimonials.
- [ ] **About (`#about`)** — real name, teaching credentials/experience, and a
      photo (swap the `👋` avatar placeholder).
- [ ] **Contact** — full school address / Google Maps link and phone number.
- [ ] Game screenshots — the four game tiles use gradient placeholders labelled
      "Screenshot coming soon". Drop in real screenshots/GIFs when ready.

**SEO / meta**
- [ ] `canonical`, `og:url` — set to the real domain.
- [ ] `og:image` — create a 1200×630 share card and host it; update the URL.

**Date-stamped campaign copy (expires after July 25, 2026)**
- [ ] `#signup` sub-line and any "July 18 & 25" mentions — after the demo dates
      pass, swap to the evergreen line noted in the HTML comment above that copy.

## Preview locally

```
preview_start "grammarmetric-site"      # this site on :8799
preview_start "ielts-placement"         # the quiz on :8798 (for the embed)
```
Then open `http://localhost:8799/`.

## Deploy (GitHub Pages + grammarmetric.com)

This folder is deploy-ready. The embedded quiz runtime is already copied into
`quiz/` (`index.html`, `config.js`, `bank.js`), `CNAME` holds the custom domain,
and `.nojekyll` disables Jekyll processing.

**Upload:** create a public repo (e.g. `grammarmetric-site`), then Add file →
Upload files and drag the **contents** of this folder (not the folder itself) so
`index.html` and `CNAME` sit at the repo root and `quiz/` stays a subfolder.

**Enable:** Settings → Pages → Deploy from a branch → `main` / `/ (root)`. The
`CNAME` file auto-populates the custom domain as `grammarmetric.com`.

**DNS (at the registrar):** four A records on `@` →
`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; plus a CNAME `www` →
`YOUR-USERNAME.github.io`. After it verifies, tick **Enforce HTTPS**.

The quiz embed uses the relative path `quiz/`, which Pages serves as a directory
index automatically — no absolute paths, so it also works under a project subpath
or a different host. To host elsewhere (Netlify/Cloudflare drop), just upload the
same folder; delete `CNAME` if not using the custom domain.

> Reminder: leads still only save to the visitor's browser until you deploy
> `apps-script-grammarmetric-endpoint.gs` and paste its `/exec` URL into
> `CONFIG.LEAD_ENDPOINT`. See the wiring checklist above.
