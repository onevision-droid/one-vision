# 05 — AI Agent Task Specification — One Vision

How an AI coding agent must execute on this project. Read `AGENTS.md` first, then docs 01–04. This document defines binding rules and task specs with acceptance criteria.

---

## A. Binding rules (never violate)

1. **Primitives first.** Interactive components (dialog, sheet, tabs, accordion, select, form controls, toast) come from shadcn/ui registry built on the installed primitives. Custom code wraps/styles them — never reimplements.
2. **Server components by default.** Client components only for: interactivity, forms, animations, observers. Mark with `'use client'` only when required; keep client boundaries leaf-level.
3. **Tokens only.** No raw hex, px font-sizes, or ad-hoc spacing outside doc 02 tokens. Use semantic utilities: `bg-surface`, `text-secondary`, `text-eyebrow`, `radius-md`, etc.
4. **Composition vocabulary only.** Pages are built from the seven patterns in doc 02 §9. Propose a new pattern only with justification in the PR description.
5. **Accessibility is acceptance criteria, not a follow-up.** Every task below includes its a11y exit checks; a PR failing them is incomplete.
6. **Honest content.** Never invent statistics, quotes, testimonials, or legal claims. Placeholder copy is clearly marked `TODO(content)`.
7. **Performance budget.** Any page adding >170kb gz JS or LCP image >250kb must justify in PR or optimise.
8. **Reduced motion.** All animation respects `prefers-reduced-motion`; final state renders immediately when reduced.
9. **Follow `nextjs-agent-rules` in AGENTS.md.** Read `node_modules/next/dist/docs/` before using any Next.js API; this project runs Next 16 — training-data conventions may be stale.
10. **Definition of done = AGENTS.md §15.** Content/empty states, responsive behaviour, a11y tested, loading/error states, SEO, analytics events, security review, no console errors, visual regression, docs updated.

---

## B. Task specs

### L-01 — Root layout shell
**Scope:** `app/layout.tsx`, `components/layout/{SiteHeader,MobileNavigation,Footer,SkipLink}.tsx`.
**Requirements:**
- Fonts via `next/font/local` → CSS vars `--font-fraunces`, `--font-inter` (map in `globals.css` `@theme inline`).
- Landmarks: `<header><nav>`, `<main id="main">`, `<footer>`; skip-link as first focusable element, visible on focus, href `#main`.
- Header: wordmark left; nav **What We Do · Stories · Get Help · Get Involved · About**; single primary button **Support** → `/donate`; transparent-over-hero → `surface-raised` with `shadow-raised` on scroll (passive listener); optional language slot (render-disabled).
- MobileNavigation: shadcn Sheet; focus trapped while open, ESC closes, focus returns to trigger; nav links ≥44px targets; body scroll locked.
- Footer per doc 03 footer spec.
**Acceptance:** axe zero violations; full keyboard operation; 320px no horizontal scroll; header ≤64px tall; no JS required for footer/nav anchor links (SSR).

### L-02 — Design-token & utility foundation
**Scope:** `app/globals.css` (doc 02 §10 verbatim), `lib/utils.ts` (`cn` = clsx + tailwind-merge), `lib/tokens.ts` (typed token export for TS reference), stylelint rule banning raw hex outside `globals.css`.
**Acceptance:** `pnpm build` green; importing a raw hex in a component fails lint.

### L-03 — Composition pattern components
**Scope:** `components/composition/{Shoreline,DepthBand,Mosaic,SplitNarrative,EvidenceShoreline,Ledger,QuietClose}.tsx`.
**Contract:** each accepts `surface?: 'paper'|'mist'|'sand'|'forest'|'ink'` and `reversed?: boolean`; renders semantic `<section>` with `aria-labelledby` when a heading exists; consistent vertical rhythm tokens (py-24 lg:py-32); asymmetric grids only on lg+.
**Acceptance:** Storybook-style preview route `/design/patterns` rendering all seven on all surfaces; zero a11y violations; patterns compose without spacing collisions (adjacent same-surface sections auto-merge via `data-surface` logic or explicit prop).

### P-01 — Homepage
**Scope:** `app/(site)/page.tsx` implementing doc 03 `/` sections 1–9 with seed data from `lib/data`.
**Acceptance:** one primary CTA per viewport; ImpactMetric count-up gated by reduced-motion; Lighthouse ≥90 mobile; all nine sections present and data-driven (no hard-coded copy beyond hero statement).

### P-02 — Programme index + detail
**Scope:** `app/(site)/programmes/page.tsx`, `app/(site)/programmes/[slug]/page.tsx`, `components/content/ProgrammeCard`→ **use Ledger rows** (`components/composition/Ledger`), `components/content/ImpactMetric`.
**Acceptance:** filter via URL search params (`?status=&area=`), SSR; detail page contains all 9 sections of doc 03; `generateMetadata` per slug; structured data `NGO`/`GovernmentService` where fitting; empty state when filter yields nothing.

### P-03 — Stories index + article
**Scope:** stories routes + `components/content/StoryCard` (Ledger variant) + article prose styles (`@layer components .prose-editorial`: 68ch measure, link-article style, pull-quote, figure captions).
**Acceptance:** article grammar per CONTENT.md (7 points visible); consent note rendered from CMS metadata; reading time estimate; related-reading Ledger.

### P-04 — Campaigns index + detail
**Scope:** campaigns routes; status chips (Active/Closed — no fake urgency); update log as Ledger with `<time datetime>`; FAQ via shadcn Accordion (keyboard: arrows move between headers per APG).
**Acceptance:** closed campaigns show outcome one-liner; FAQ answers distinguish One Vision vs external provision.

### P-05 — Donate (feature-flagged)
**Scope:** `app/(site)/donate/page.tsx`, `components/forms/DonationSelector`, `components/content/DonationTrustPanel`.
**Rules:** route renders only when `DONATE_ENABLED=true` (env via `lib/env.ts`); monthly toggle present but disabled with "coming soon" note unless `DONATE_RECURRING_ENABLED=true`; fee transparency line; no "₹X saves a child" claims without sourced metric.
**Acceptance:** flag off → 404; Trust Panel prominent; `donate_start` analytics event on amount selection.

### P-06 — Events + Reports
**Scope:** events index/detail, reports index; Event schema JSON-LD; report PDF cards show file size + type icon; `report_download` event.
**Acceptance:** past events show outcome; registration CTA links externally or to contact route until registration system lands.

### P-07 — Support Finder + Get Help  **[highest priority after L-tasks]**
**Scope:** `app/(site)/get-help/page.tsx`, `components/finder/SupportFinder.tsx` (client), `components/forms/HelpRequestForm.tsx`, `components/content/EmergencyBanner.tsx`.
**Behaviour:**
- EmergencyBanner first in DOM; content: emergency numbers vs external orgs vs One Vision scope; `role="region" aria-label="Emergency information"`; dismissible per session (not per page view).
- SupportFinder: 3-step chip-based flow (need → area → result); state in URL params; every result state actionable — zero dead ends; results from `lib/data/resources` (typed, zod); keyboard: chips are radiogroup semantics; step transitions move focus to result heading (`tabIndex={-1}`).
- HelpRequestForm: react-hook-form + zod; fields per doc 03; server action with rate limit + honeypot; error summary with `role="alert"` + focus management to first error; success state with reference ID + expected response time + privacy note.
**Acceptance:** complete flow operable by keyboard alone; axe clean; submission stored via server action with RLS-protected insert; analytics `help_request_start/complete`; honest copy reviewed (no emergency-response promises).

### P-08 — Trust Panel (shared)
**Scope:** `components/content/TrustPanel.tsx` variants `compact | full`.
**Acceptance:** renders registration identity line, governance link, latest annual report link, safeguarding link; props-driven from `site_settings`; appears on donate (full), get-help confirmation + footer contexts (compact).

### P-09 — EmptyState / ErrorState system
**Scope:** `components/ui-state/{EmptyState,ErrorState,LoadingSkeleton}.tsx` using shadcn Skeleton.
**Rules:** every listing route implements all three; EmptyState offers next action (browse all / clear filters); ErrorState offers retry; copy honest, never blame user.
**Acceptance:** visual regression screenshots at 375/1024 for all states on `/programmes` and `/stories`.

### P-10 — Search
**Scope:** `app/(site)/search/page.tsx`; server-side Postgres `ilike` across title/summary/body excerpt; grouped results with counts; empty state; `search` analytics event with query (no user identity).
**Acceptance:** results ≤300ms p95 on seed data; no client-side-only rendering of results.

### A-01 — Admin foundation (Phase 4)
**Scope:** `app/admin/` route group, Supabase Auth login, role-based access (editor/admin/super_admin), layout with sidebar; RLS policies per ARCHITECTURE.md; submissions inbox with status workflow.
**Acceptance:** unauthenticated → redirect; editor cannot reach settings; every mutation writes audit_log; all admin actions server-authorized.

---

## C. Definition of done (per PR)
- [ ] Tokens only; primitives from registry
- [ ] Keyboard pass + axe clean + reduced-motion verified
- [ ] Empty/loading/error states
- [ ] SEO metadata + structured data where applicable
- [ ] Analytics events wired
- [ ] 320px–1440px screenshots attached
- [ ] No console errors; `pnpm build && pnpm lint` green
- [ ] Docs updated (this file or docs 02–04) if behaviour changed

## D. Suggested prompt skeleton for the coding agent
> You are working on One Vision (docs: AGENTS.md, docs/01–05). Task: <ID from §B>. Build using shadcn primitives, Tailwind v4 tokens in app/globals.css, server components by default. Follow the acceptance criteria in docs/05 §<ID>. Do not invent content, statistics, or legal claims. Verify with `pnpm build` before finishing.
