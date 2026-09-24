# 04 — Production Readiness Plan — One Vision

Objective: take One Vision from scaffold to launch-ready, meeting AGENTS.md §15 definition of done. Five workstreams; each item has a measurable exit criterion.

---

## WS-1 — Engineering foundation (Weeks 1–2)

| # | Task | Exit criterion |
|---|---|---|
| 1.1 | Repo hygiene: move docs to `docs/`, create missing `docs/ACCESSIBILITY.md` (outline: targets, testing protocol, statement page copy) | `docs/` matches AGENTS.md §5 |
| 1.2 | Fix `cn` utility: `clsx` + `tailwind-merge` in `lib/utils.ts` | shadcn registry add works |
| 1.3 | Install shadcn primitives via registry: button, dialog, sheet, accordion, tabs, select, input, textarea, label, checkbox, radio-group, badge, separator, skeleton, toast | `components/ui/` present, tree-shaken |
| 1.4 | Token implementation: doc 02 §10 into `app/globals.css` + `lib/tokens.ts` type export | No hex outside tokens (stylelint rule) |
| 1.5 | Fonts: self-hosted Fraunces + Inter via `next/font`, CSS vars `--font-fraunces`/`--font-inter`, `display: swap` | No layout shift on font load; subsetted |
| 1.6 | Root layout: `<html lang="en">`, landmarks (header/nav/main/footer), skip-link, metadata base, viewport theme-colour | axe-core zero violations on empty page |
| 1.7 | Env scaffolding: `.env.example`, zod-validated env in `lib/env.ts` | Build fails loudly on missing env |
| 1.8 | Dependency manifest (below) installed | `pnpm build` green |

**Dependencies to add:** `@supabase/ssr` + `@supabase/supabase-js`, `zod`, `react-hook-form`, `@hookform/resolvers`, `server-only`, `@axe-core/react` (dev), `vitest` + `@testing-library/react` + `@testing-library/user-event` (dev), `playwright` + `@playwright/test` (dev), `sharp` (prod image ops).

**Dependencies to remove/evaluate:** `framer-motion` → replace with CSS transitions + IntersectionObserver utility `useInView` (bundle audit: framer-motion ≈ 45kb gz); `cn` package (see 1.2).

---

## WS-2 — Supabase & data layer (Weeks 2–4)

| # | Task | Exit criterion |
|---|---|---|
| 2.1 | Migrations for all 16 tables (ARCHITECTURE.md §Data model) with UUID PKs, timestamps, slugs | Migration CI check green |
| 2.2 | RLS on every sensitive table: public read for published content only; service-role never in browser | Policy tests pass (pgTAP or supabase test helpers) |
| 2.3 | Typed data-access layer: `lib/data/{programmes,campaigns,stories,events,reports}.ts`, server-only, zod-parsed at boundary | Invalid row shape throws typed error, logged |
| 2.4 | Media pipeline: Supabase Storage buckets (public-images, private-docs), image transformation via CDN, upload validation (type/size), malware-scan hook point | Uploads >5MB rejected; non-image rejected |
| 2.5 | Rate limiting + spam: Upstash/edge rate limit on all public forms, honeypot field, optional Turnstile | 429 after threshold; honeypot catches bots in test |
| 2.6 | Audit logs for admin mutations (who/when/what) | Every admin write produces audit row |
| 2.7 | Seed content: 3 programmes, 2 campaigns, 4 stories, 2 events, 2 reports with real-reviewed placeholder copy | Homepage renders without mocks |

---

## WS-3 — Public site build (Weeks 3–7)

Build order follows user value, not page list:
1. `/` homepage (all 9 sections of doc 03)
2. `/get-help` + Support Finder + Help Request Form (differentiator)
3. `/volunteer` + VolunteerForm
4. `/about`, `/programmes` + detail, `/stories` + article template
5. `/campaigns`, `/donate` (feature-flagged until legal clearance), `/reports`, `/contact`, `/events`, `/search`

Each page ships with: SEO metadata + OG image, structured data (NGO/Article/Event schema), empty/loading/error states, analytics events (AGENTS.md §13), keyboard pass.

**Analytics (privacy-first):** Plausible or Vercel Analytics with custom events `donate_start/complete, volunteer_start/complete, help_request_start/complete, campaign_action, report_download, story_open, search, contact_submit`. No PII in events. Cookie-banner-free stack preferred.

---

## WS-4 — Admin (editorial) interface (Weeks 6–8)

- Auth via Supabase Auth, roles: editor / admin / super_admin (ARCHITECTURE.md §Roles).
- Content CRUD for programmes, campaigns, stories, events, reports with the doc-03 content grammar as form structure; autosave drafts; publish/unpublish with preview.
- Submissions inbox: help_requests, volunteer_submissions, contact_submissions — status workflow (new → in-review → resolved), never delete, export CSV.
- Media library with alt-text required field (blocks publish without it).
- Audit log viewer (super_admin).
- All admin routes under `app/admin/`, server-side authorization checks on every action, no client-side role gating alone.

---

## WS-5 — Hardening & launch gate (Weeks 8–9)

| Check | Target | Tool |
|---|---|---|
| Lighthouse mobile (homepage, get-help, story) | Perf ≥90, A11y ≥95, SEO 100 | CI Lighthouse |
| axe-core automated | 0 critical/serious | Playwright + axe |
| Keyboard pass all pages | full operation, visible focus | Manual checklist (doc: ACCESSIBILITY.md) |
| Reduced motion | instant final states | Emulation test |
| Screen-reader spot check | NVDA + VoiceOver on 3 key flows | Manual |
| CLS / LCP | CLS <0.1; LCP <2.5s on Moto G-class throttling | Lighthouse |
| Responsive matrix | 320/375/768/1024/1440 + large | Playwright screenshots, visual diff |
| Security headers | CSP, HSTS, X-Frame-Options, Referrer-Policy | `next.config` + scanner |
| Form abuse | rate-limit, honeypot, zod server validation | Pen-test script |
| Backups | Supabase PITR + nightly storage export | Restore drill documented |
| Rollback | Vercel instant rollback + migration reversibility | Runbook page in docs |
| Policies live | privacy, terms, accessibility statement, safeguarding | Published routes |
| Monitoring | error tracking (Sentry), uptime, form-failure alerts | Dashboard live |

**Launch gate:** ARCHITECTURE.md §Definition of launch readiness — all items verified and signed off.

---

## Phase 2 backlog (post-launch, prioritised)
1. i18n: next-intl or equivalent, string externalisation sweep, locale-aware dates/numbers, Meitei Mayek font/line-height audit.
2. `/resources` + `/community-directory` (doc 03 cross-page additions).
3. Semantic search only if resource library >200 docs (per ARCHITECTURE.md §Search).
4. Donation completion (post legal/80G/FCRA confirmation) with compliant Indian provider (Razorpay/Cashfree class) — never store card data.
5. Newsletter integration (double opt-in, no forced opt-ins — AGENTS.md §2.9).

---

## Risk register

| Risk | Mitigation |
|---|---|
| Framer-motion bloat on low-end devices | WS-1.8 removal; CSS-only motion |
| Fake urgency in campaigns erodes trust | Copy review gate; no countdown timers |
| Get Help creates expectation of emergency response | Emergency banner separation (doc 03); response-time SLA stated honestly |
| Donation legal status unresolved at launch | Feature-flag donate route; WS-5 gate blocks activation |
| CMS scope creep | Custom lightweight admin only (ARCHITECTURE.md §Editorial); headless CMS only on demonstrated need |
| Token drift after launch | Stylelint blocks raw hex; PR template requires design-token reference |
