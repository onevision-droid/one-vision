# 01 — UI/UX Audit — One Vision

**Scope:** repository blueprint (docs + config), not rendered code — `app/`, `components/`, `lib/` do not yet exist. Audit verdicts therefore apply to the *design intent* (DESIGN.md, AGENTS.md, CONTENT.md) and the *technical scaffold* (package.json, components.json, configs).

---

## Verdict summary

| Area | Score | Status |
|---|---|---|
| Brand strategy & voice | A− | Strong, distinctive, well-guarded against NGO clichés |
| Design tokens (colour/type/space) | B | Palette is right, but tokens are *prose tables*, not code |
| Information architecture | A− | Complete route map, sensible prioritisation |
| Component system | C+ | Named but unspecified — no props, states, or variants defined |
| Interaction & motion spec | B− | Good constraints; no tokenised durations/easings yet |
| Accessibility | B (intent) / F (implementation) | WCAG 2.2 AA declared; zero mechanism in repo (no ACCESSIBILITY.md despite AGENTS.md referencing it) |
| Production readiness | D | No source code, no tests, no CI, no forms/validation libs, no backend deps |
| Content model | A− | Excellent editorial grammar; not yet encoded as schemas/types |

---

## Critical findings (fix before any UI work)

### F1 — The codebase is a scaffold, not an app
Only config files exist. Every "audit the pages" request is premature until `app/(site)/` skeleton is generated. **Action:** treat all page work as greenfield, governed by docs 03/05.

### F2 — Missing docs referenced by AGENTS.md
`docs/ACCESSIBILITY.md` is mandated but absent; `docs/` directory itself is absent (all docs sit at repo root). **Action:** create `docs/` and add ACCESSIBILITY.md (doc 04 provides outline).

### F3 — Design tokens exist only as markdown tables
DESIGN.md defines hex values, spacing (4px base), type sizes, grid — none of it is encoded. With Tailwind v4, the correct vehicle is CSS-first `@theme` in `app/globals.css`. Until tokens are code, every component will drift. **Action:** implement doc 02 §Token implementation verbatim.

### F4 — Component library discipline risk
components.json declares shadcn (`style: base-lyra`, `iconLibrary: lucide`) + `@base-ui/react` is installed. Two primitive sources = inconsistent behaviour. **Rule (binding):** shadcn/ui components are the only source of interactive primitives (Dialog, Tabs, Accordion, Select, Sheet). Do NOT hand-roll these. Framer-motion is permitted for scroll-triggered reveals only; all standard hover/focus transitions are CSS.

### F5 — Dependency gaps for declared features
No Supabase client, no form library, no validation (zod), no MDX/long-form content tooling, no test runner (Playwright/Vitest), no axe accessibility testing. **Action:** doc 04 dependency manifest.

### F6 — `cn` package anomaly
`"cn": "^0.3.2"` is not the conventional `clsx` + `tailwind-merge` pairing shadcn expects. `lib/utils.ts` must export `cn()` via clsx + tailwind-merge or shadcn registry installs will misbehave.

### F7 — Typography not loaded
Fraunces + Inter are specified but no `next/font` setup exists. Display font must be self-hosted via `next/font/local` or `next/font/google` with `display: swap` and subsetting for low-bandwidth targets.

---

## UX findings (design-intent level)

### U1 — Single-action clarity is good; action hierarchy is under-specified
CONTENT.md says "one primary action per section" but no visual grammar exists for primary vs. secondary vs. tertiary buttons on dark vs. light fields. Doc 02 §Button matrix closes this.

### U2 — Get Help is the differentiator but has the least design detail
DESIGN.md §15 describes a 5-step flow with no UI pattern attached (wizard? filterable directory? decision tree?). Doc 03 specifies the **Support Finder** pattern (progressive disclosure, no dead ends, emergency banner always visible).

### U3 — Image composition rules exist but no aspect-ratio/lazy-loading contract
"Full-bleed story / mosaic / split / evidence strip" need enforced ratios (e.g., 4:5, 3:2, 16:9, 1:1) and `next/image` sizes per breakpoint, else layout shift and CLS regressions. Specified in doc 02 §Media contract.

### U4 — Empty/error/loading states are policy, not design
AGENTS.md requires them per feature; no component specs exist. Doc 03 adds an EmptyState/ErrorState system; doc 05 defines acceptance criteria.

### U5 — Localisation is anticipated but no i18n strategy
English + local languages are planned; strings are not yet externalised and no locale-aware date/number handling exists. Phase-2 concern; flagged now so components never hard-code copy.

### U6 — Trust signals are described but not componentised
Trust Panel (§21) should be a single reusable component injected contextually (donate sidebar, footer, get-help confirmation), not re-implemented per page. Specified in doc 03.

---

## Accessibility gaps (against WCAG 2.2 AA intent)

1. No skip-link, landmark, or focus-visible implementation yet — must be in root layout from day one.
2. No reduced-motion implementation — framer-motion usage must be gated behind `useReducedMotion` and CSS `@media (prefers-reduced-motion)`.
3. Touch targets: declare ≥44×44px minimum as a token, enforce on nav and cards.
4. Contrast: Terracotta `#C85B3F` on Paper `#F7F3EA` = ~4.6:1 (passes AA for large text only at 18pt+); body-sized terracotta text fails. Marigold `#D7A43A` on Paper = ~2.2:1 — **never** for text, icons only on dark fields. Encoded as usage rules in doc 02.
5. Form error pattern (aria-describedby, role="alert", focus-to-error) required in all form specs.

---

## Priority matrix

| Priority | Item | Owner doc |
|---|---|---|
| P0 | Token implementation in `globals.css` (@theme, Tailwind v4) | 02 |
| P0 | Root layout: fonts, skip-link, landmarks, header/footer shells | 05 task L-01 |
| P0 | Fix `cn` utility + shadcn primitive registry | 05 task L-02 |
| P1 | Support Finder (Get Help) UX build | 03 §Get Help, 05 task P-07 |
| P1 | EmptyState/ErrorState components | 05 task P-09 |
| P1 | Button/link hierarchy + focus ring tokens | 02 §Interactive |
| P2 | Trust Panel component | 05 task P-08 |
| P2 | Motion tokens + reduced-motion gates | 02 §Motion |
| P2 | Test/CI/a11y harness | 04 |
| P3 | i18n string externalisation | 04 (phase 2) |
