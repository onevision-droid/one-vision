# 04 — Production Readiness & Implementation Plan (Field Edition)

**Project:** One Vision — Society for Health & Education Manipur  
**Scope:** Systematic 8-phase execution roadmap from audit to deployment verification.  
**Standard:** Nordic Lagom Design Strategy, WCAG 2.2 AA, Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1).

---

## 1. Eight-Phase Implementation Sequence

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Comprehensive Visual & Code Audit                  │
├─────────────────────────────────────────────────────────────┤
│ Phase 2: Design Token & Global Style Foundation             │
├─────────────────────────────────────────────────────────────┤
│ Phase 3: Global Shell, Navigation & Mobile Drawer           │
├─────────────────────────────────────────────────────────────┤
│ Phase 4: Reusable Editorial Primitives & Components         │
├─────────────────────────────────────────────────────────────┤
│ Phase 5: Page-by-Page Editorial Refactor                    │
├─────────────────────────────────────────────────────────────┤
│ Phase 6: Quiet Motion & Interactive Feedback                │
├─────────────────────────────────────────────────────────────┤
│ Phase 7: Performance, Font & Image Pipeline Tuning          │
├─────────────────────────────────────────────────────────────┤
│ Phase 8: Multi-Breakpoint Visual QA & Verification          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Execution Details

### Phase 1 — Audit & Inventory
- Audit all routes: `/`, `/programmes`, `/stories`, `/about`, `/volunteer`, `/get-help`, `/open-ledger`, `/reports`, `/contact`.
- Inventory existing CSS variables, hardcoded colors, and inline styles.
- Map recurring anti-patterns: pure-white glare, card soup, repeated uppercase eyebrows, faint gray text, loud purple action buttons.
- Audit mobile viewports down to 390px to flag desktop compression issues.

### Phase 2 — Token & Style Foundation
- Implement warm mineral color tokens in `app/globals.css`:
  `--ov-bone (#F2EFE7)`, `--ov-paper (#FAF8F2)`, `--ov-oat (#E9E4D9)`, `--ov-stone (#D8D2C8)`, `--ov-ink (#1B1C19)`, `--ov-slate (#55564F)`, `--ov-moss (#586653)`, `--ov-indigo (#5752BC)`, `--ov-indigo-dark (#403B92)`, `--ov-clay (#A65B4F)`.
- Configure fluid typography clamps in `@theme inline`.
- Set standard border radius (`4px` sm, `6px` md, `10px` lg, `9999px` pill).
- Define global focus-visible styling: 2px Quiet Indigo ring with 2px offset.

### Phase 3 — Global Shell & Navigation
- Refactor `components/layout/SiteHeader.tsx`:
  - Dignified left-anchored wordmark: "ONE VISION".
  - Generous desktop navigation spacing with quiet active indicator.
  - Quiet Search trigger.
  - Prominent "Donate" CTA in Quiet Indigo.
- Build accessible `MobileNav` with full-viewport drawer, locked body scroll, and comfortable touch targets (≥48px).
- Refactor `components/layout/Footer.tsx` with clean editorial columns and organization registration details.
- Refactor `components/layout/Shell.tsx` to enforce the 4-level containment hierarchy.

### Phase 4 — Core Editorial Primitives
- **ImpactStrip:** Horizontal, single-row evidence strip replacing dashboard card walls.
- **EditorialIndex:** Featured-first programme list pattern (Item 01 large card; Items 02–05 numbered rows).
- **StoryFeature & StoryList:** Dominant featured visual + secondary story pair + vertical chronological archive list.
- **ImageEssay:** Structured 3-photo documentary essay with captions.
- **Accordion:** Clean Radix-based FAQ disclosure component with accessible ARIA tags.
- **FormControls:** Standardized input, textarea, and select controls on Paper surfaces with crisp labels.

### Phase 5 — Page-by-Page Editorial Refactor
1. **Home (`app/(site)/page.tsx`):**
   - Locked Hero (Preserve full-viewport dimensions and 1:1 image).
   - Compact ImpactStrip (2,500+ families reached, etc.).
   - Five Priorities Editorial Index (1 featured + 4 rows).
   - One Human Story (Asymmetric split).
   - Accountability 3-Link Row (Open Ledger, Governance, Reports).
   - Quiet Close.
2. **Programmes (`app/(site)/programmes/page.tsx`):**
   - Locked Hero ("Five Priorities. One Shared Future.").
   - Quiet segmented text filter (horizontal scroll on mobile).
   - Featured-first programme index.
   - Partner collaboration strip & Quiet Close.
3. **Stories (`app/(site)/stories/page.tsx`):**
   - Locked Hero ("Grassroots Stories.").
   - Dominant Lead Story (7-col image, 5-col narrative).
   - Secondary story pair + vertical chronological list.
4. **About (`app/(site)/about/page.tsx`):**
   - Locked Hero ("Our Foundations.").
   - Origin history & institutional narrative.
   - Documentary Image Essay ("Deeply Rooted in Manipur").
   - Two-column governance architecture (Leadership / Operational Team).
5. **Volunteer (`app/(site)/volunteer/page.tsx`):**
   - Locked Hero ("Local Action.").
   - Why Volunteer narrative + field image.
   - 3 Editorial Commitments (01 Learn, 02 Contribute, 03 Respect).
   - Streamlined, accessible application form.
   - FAQs accordion.
6. **Get Help (`app/(site)/get-help/page.tsx`):**
   - Task-critical usability: Emergency call & email desk anchored prominently at the top.
   - Confidentiality notice.
   - Clear assistance request form.
   - Essential FAQs.

### Phase 6 — Quiet Motion & Interaction
- Implement CSS micro-transitions (160ms–240ms) for buttons, links, and accordion items.
- Implement subtle editorial entry reveals (300ms–450ms) using CSS animations.
- Enforce strict `prefers-reduced-motion` compliance.

### Phase 7 — Performance & Asset Optimization
- Run Next.js image optimization with explicit `sizes` and `priority` on above-the-fold heroes.
- Audit web fonts to ensure `font-display: swap` and zero layout shift.
- Validate bundle size; avoid unnecessary JS animation dependencies.

### Phase 8 — Multi-Breakpoint Visual QA
- Capture and review screenshots across 6 standard viewports:
  - 1440 × 900 (Large Desktop)
  - 1280 × 800 (Standard Desktop)
  - 1024 × 768 (Tablet Landscape)
  - 768 × 1024 (Tablet Portrait)
  - 430 × 932 (Large Mobile)
  - 390 × 844 (Standard Mobile)
- Confirm absence of card soup, white glare, desktop-in-miniature compression, and color discord.

---

## 3. Comprehensive QA Checklist

### Visual & Aesthetic
- [x] No dominant pure-white canvas; warm Stone-50 `#FAFAF9` and Surface `#FFF` provide serene depth.
- [x] Purple is replaced by Primary Indigo (`#4F46E5`) and Primary Hover (`#4338CA`).
- [x] Card soup eliminated: open editorial layout is the default; 12px borders used intentionally.
- [x] Uppercase eyebrows reserved strictly for categories, metadata, and status badges.
- [x] Typography carries narrative weight without relying on heavy boxes.
- [x] Documentary photography acts as a storytelling anchor, not generic decoration.

### Responsive & Mobile
- [x] Mobile navigation expands into a generous, accessible multi-level drill-down overlay with tap targets ≥ 48px.
- [x] No multi-column desktop grids squashed into narrow screens.
- [x] Headings wrap gracefully without clipping or overflow on 390px viewports.
- [x] Forms are comfortably operable with one hand on mobile devices.
- [x] Zero horizontal scrollbars (`overflow-x: hidden`).

### Accessibility (WCAG 2.2 AA)
- [x] Normal text contrast ≥ 4.5:1; large text contrast ≥ 3.0:1.
- [x] Visible keyboard focus indicator (2px Indigo ring).
- [x] Focus is never obscured by sticky headers or overlays.
- [x] Full keyboard operability across all menus, tabs, and accordions.
- [x] Screen-reader friendly semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- [x] Motion reduction respected across all interactions.

### Performance & Core Web Vitals
- [x] Largest Contentful Paint (LCP) ≤ 2.5s.
- [x] Interaction to Next Paint (INP) ≤ 200ms.
- [x] Cumulative Layout Shift (CLS) ≤ 0.1.
- [x] Responsive images properly sized with WebP/AVIF delivery.
