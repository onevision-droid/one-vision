<!-- DEPRECATED: This document references the prior design era (Nordic Lagom / Fraunces serif). The canonical design system is now /DESIGN.md (Frontline Humanitarian mandate). -->

# One Vision — Comprehensive Design Enhancement Plan
**Companion docs:** `OV_01_UI_UX_AUDIT.md` (findings) · `OV_02_DESIGN_REGISTRY.md` (source of truth) · `OV_04_AI_CODING_AGENT_INSTRUCTIONS.md` (execution prompt)
**North star:** consistency score 2.5 → **≥ 4.2/5**, zero Critical issues, one visual voice.

---

## North-Star KPIs
| KPI | Now | Target |
|---|---|---|
| Consistency score (audit rubric) | 2.5/5 | ≥ 4.2/5 |
| Hardcoded colors outside tokens | many | 0 (CI-enforced) |
| Button variants in use | 7 | 4 |
| Pill styles | 5 | 1 component / 2 tones |
| Footer nav parity across pages | fails | 100% |
| Typefaces per page (sans + serif roles) | chaotic | exactly 2, fixed roles |
| Lighthouse Accessibility | unverified | ≥ 95 all pages |
| Lighthouse Performance | unverified | ≥ 90 |
| WCAG | unverified | 2.2 AA |

---

## Phase 0 — Foundations (do first; everything depends on it)
**Goal:** C1, C5, L1 — kill the root cause.
1. **Create the registry:** implement `design-tokens.json` (delivered with this plan) as the single source; mirror it into `tailwind.config` (colors, spacing, radii, fonts, shadows, transitions). Commit both together.
2. **Typeface roles:** self-host Inter + Fraunces; assign per the Typography table. Global CSS sets `body` = Inter; `.font-display` = Fraunces. Audit every heading and re-classify — serif only for `display-*` roles.
3. **Section primitive:** build `<Section tone="page|alt|inverted" spacing="default">` enforcing 96/64 padding + container width. Migrate every page section to it. This single primitive fixes H8 and M2.
4. **Footer/header as data-driven components:** footer nav rendered from `content/org.json → footerNav` (fixes C4 permanently); header stays as-is (already consistent).
5. **Dev hygiene:** `next.config` → disable dev indicator for staging/prod screenshots; document in README.
6. **Kill pure black:** replace all `#000`-family darks with `ink-900`.

**Acceptance:** `grep -rE "#[0-9a-fA-F]{3,8}" components/` returns only tokens file; every page renders inside `<Section>`; footer links identical on all 11 routes.

## Phase 1 — Global shell & layout discipline
**Goal:** C4 (residual), H6, H8.
1. **Orphan-grid sweep (highest-visibility fix):**
   - What We Do: 4 programmes → 4-col grid at xl (2×2 at md) **or** featured-first card spanning 2 cols. No stragglers.
   - Get Help: 5 options → 5-col at lg, 2-col + 3-col intentional rows at md; equal heights.
   - Volunteer checkboxes: single vertical stack (cleanest, Lagom) — or a completed 3-col grid.
2. **Background rules:** pages alternate `page` → `alt` → `page` by section index; dark (`inverted`) sections: max 1 per page, full-bleed, only for hero (Stories) or commitment bands (Volunteer). Remove the Home CTA grid texture (L5).
3. **Stat unification:** replace hero stats and Transparent Outcomes with `stat-inline`; delete the giant programme stat boxes → `stat-card` (see Phase 3).
4. **Stat labels:** hero stat labels bump to `label` token (12px, readable, tracked) with 1px divider separators and shared baseline.

**Acceptance:** no grid with a stranded item at any breakpoint (check 1440/1024/768/375); every page's dark sections ≤ 1.

## Phase 2 — Component library (the "four decisions" phase)
**Goal:** H1, H5, H7, M10, L6.
1. **Buttons → 4 tokens** (`primary/secondary/ghost/link`, sizes sm/md/lg). Migration map:
   - SUPPORT, VOLUNTEER FOR THIS, Partner with us, Proceed to Payment, Submit Request, Submit Application → `primary`
   - WHAT WE DO ↗, Read Full Proposal (PDF), helpline phone → `secondary`
   - Read our manifesto, Explore our programmes, See full directory, View financial audits, View full governance details → `ghost` or `link` (in-text = `link`)
   - **"Read full story" black pill → `primary`** (delete the black pill entirely)
2. **Pills → one component**, 2 tones; migrate all 5 styles (Active Initiatives, Assistance Portal, Project Proposal/Seeking Funding, Our People, Make a Contribution). Eyebrow `label` token replaces "SAFETY FIRST" (in navy/ink, never blue).
3. **Cards → 3 tokens** (`default/flat/inverted`). Governance cards & Team cards converge on `default` with the same padding; **delete mock-UI screenshot cards on Home** — replace with three quiet `default` cards using the real icon + one-line copy (keeps the message, kills the noise).
4. **Icons:** swap all blue/light-blue icons and tinted circles to Lucide, `ink-900`/`navy-600`, optional neutral circle. Ban colored icon fills in lint.
5. **Link style:** tokenize `link` (navy, underline, hover ink) — apply to manifesto/board/audits links.

**Acceptance:** component Storybook/`components/ui` shows exactly: Button (4×3), Pill (2), Card (3), Input, Stat (2), Eyebrow, Section; zero other button/pill/card implementations exist (grep).

## Phase 3 — Page-level remediation
Per page, in priority order:

1. **Programme details ×4 (biggest win per effort):**
   - Replace giant stat box with `stat-card` row (2 max, e.g., "4,500+ patients treated" + "12 camps supported") at content width.
   - Add footer cross-links ("Other programmes" 3-card row) + Donate `ghost` CTA → pages stop being dead ends (M7).
   - Move "Current Status: Active" into the eyebrow line as a `pill` with clay dot.
2. **Home:**
   - Hero: headline uses `display-lg` (sans, per registry — Home is a utility page) or adopt serif deliberately site-wide for H1; buttons → `primary` + `secondary` pair; stat row → `stat-inline`.
   - "Community support, organized." cards → `card-media` 4:3 top, same dialect as Explore Our Work (one card language on the page).
   - Replace "In Action" mock-UI cards with icon cards (see Phase 2.3).
   - "Our Mission": keep centered (it earns it) but use `Section tone="alt"` + `ghost` button; caption style tokenized or removed (L4).
   - "Transparent Outcomes" → `stat-inline`, consistent with hero.
3. **What We Do:** complete the grid (Phase 1); card media 4:3; add `secondary` "View all programmes" if featured-first layout chosen.
4. **Stories:** hero keeps dark (allowed 1/page); featured image → `story-media` 16:9 `r-md`; bylines unified to caption token ("By T. Singh · 12 October 2024" — en-GB date); "Read full story" → `primary`.
5. **Get Help:** option buttons equal-height completed grid; RESET → `link` style; inputs → shared input spec (white, bordered).
6. **Volunteer:** "SAFETY FIRST" → eyebrow token in `paper` on dark; checkbox stack; Submit → full-width `primary` (form rule); testimonial card → `default` card (keep avatar initials).
7. **About:** fix reg number from `content/org.json` (C2); icon circles neutral.
8. **Donate:** prefilled PII → placeholders (H4); breadcrumbs: adopt on all pages with depth ≥ 2 (Home > X) — consistent rule (M1).
9. **Team:** cards → `default`; enforce strict 2-col grid; "Board of Directors" → `link`.
10. **Governance:** converge lead cards to `default` card; policy text → `text-body` (check contrast).
11. **School Aushadhi Lab (most work):**
    - Blue icons → navy Lucide (H5 kill).
    - Italic serif zone titles → `heading-lg` sans; zone table → tokenized table (1px `line` rows, 16px row padding, `label` column heads).
    - Pills → registry pill; buttons → `primary`/`secondary`.
    - Roadmap → official `Timeline` component (filled dot = completed year, hollow = upcoming; `label` year, `heading-md` phase title, body-sm description); reuse for any future roadmap.
    - Section rhythm: break dense text blocks with `Section tone="alt"` every other block; pull "The Lagom Framework" quote into a `display-md` serif pull quote.
    - Footer parity fix.

**Acceptance:** per-page screenshot diff reviewed against registry; each page passes the PR checklist.

## Phase 4 — Imagery pipeline
1. Re-export all masters: WebP `@2x`, hero ≥1600px, cards ≥1200px, quality ≥ 80 — eliminate dithering artifacts (L3).
2. Assign every image to a ratio slot (`hero-media 3:2`, `card-media 4:3`, `story-media 16:9`, `avatar 1:1`); fix CSS so nothing squishes (Home hero).
3. Radii: all media `r-none` or slot-defined (`story-media r-md`) — kill 16/24px improvisations.
4. Alt text pass (descriptive, dignified, no "sad child" tropes — per the site's own ethos).
5. Optional: formalize the illustration palette (ochre/sage/clay/ink) as an asset-level guideline so future commissions match.

## Phase 5 — Content integrity
1. `content/org.json` becomes the only place org facts exist; replace literals on About/Donate/Footer (fixes C2).
2. Stats dictionary: define each metric once with source; pages import by id (fixes C3 — decide: is 4,500 "people reached" or "patients treated"? One meaning, one number).
3. Locale pass → en-GB everywhere (`programmes`, `organised`, `Donate` stays; date format `12 October 2024`) (M4).
4. Copyright year auto from build date.

## Phase 6 — Accessibility & QA gates
1. Contrast: verify `text-muted`/`text-caption` combos; bump anything < 4.5:1 (H9).
2. Focus rings: 2px `focus-ring` on all interactive elements; keyboard-nav the wizard.
3. Hit areas ≥ 44px (footer links get padding; icon rows become real links).
4. `prefers-reduced-motion` honored; no layout shift from images (set aspect boxes).
5. Lighthouse CI: a11y ≥ 95, perf ≥ 90 on all 11 routes; axe scan zero serious/critical.
6. Responsive QA at 1440/1024/768/375 for every page — orphan grids re-checked.

## Phase 7 — Motion & performance polish
1. Standardize transitions to token durations; page-level fade optional; illustration hover = 4px lift-free scale (1.01) or none (Lagom: prefer none).
2. Font subsetting + `font-display: swap`; preload hero images; lazy-load below-fold media.
3. Final design review against the Lagom scorecard in the audit — target all ✓.

---

## Sequencing & effort
| Phase | Effort | Depends on |
|---|---|---|
| 0 Foundations | M | — |
| 1 Shell & grids | S–M | 0 |
| 2 Components | M–L | 0 |
| 3 Pages | L | 1, 2 |
| 4 Imagery | M | 3 |
| 5 Content | S | 0 (parallel) |
| 6 A11y/QA | M | 3 |
| 7 Polish | S | 6 |

**Definition of Done (whole project):** all 6 Critical issues closed · consistency re-audit ≥ 4.2 · zero hardcoded values · CI gates green · every page passes the PR checklist in `OV_04`.

## Risks
- **Scope creep on School Aushadhi** — timebox to the 7 tasks above; resist redesigning content.
- **Token bypass during page fixes** — CI grep + PR checklist are the enforcement; do not rely on discipline.
- **Illustration re-exports** — needs source files; if unavailable, prioritize the 6 most-visible images first.
