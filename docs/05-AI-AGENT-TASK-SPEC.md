# 05: AI Agent Task Specification (Field Edition)

**Project:** One Vision: Society for Health & Education Manipur  
**Role:** Senior Frontend Architect, Design Systems Engineer & Accessibility Specialist  
**Directives:** Adhere strictly to `DESIGN.md`, `AGENTS.md`, and the September 2026 Nordic Lagom brief.

---

## 1. Non-Negotiable Binding Rules

1. **Adherence to DESIGN.md:** All refactoring must strictly implement the warm mineral palette, editorial serif/sans typography, and 4-tier containment hierarchy specified in `DESIGN.md`.
2. **Hero Section Layout Lock (Immutable Contract):**
   - Hero components (`components/content/Hero.tsx` and `components/composition/PageHero.tsx`) are permanently locked as Full-Viewport Heroes:
     `min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`
   - Hero container heights: `lg:h-95 xl:h-100`
   - Image aspect ratio: 1:1 square (`aspect-square`) with dynamic full-viewport centering.
   - *Strict Rule:* Never alter the structural layout classes, container heights, or 1:1 image aspect ratio. Only modify text copy, badges, button links/labels, and image source paths within this established frame.
3. **Preserve Facts & Copy:** Do not rewrite or hallucinate organizational facts, registration IDs, partner details, phone numbers, or statistics.
4. **Package Manager Mandate:** Use `pnpm` exclusively. Never execute `npm` or `yarn`.
5. **Mobile-First CSS:** Author styles mobile-first. Use `md:` and `lg:` prefixes for viewport enhancements. Never allow horizontal scroll (`overflow-x-hidden`).
6. **No Ad-Hoc Styling:** All colors, spacing, and font sizes must resolve to design tokens. No magic hex values outside `globals.css`.

---

## 2. Master Task Catalog

### Task T-01: Design Token & Global Style Foundation
- **Target File:** `app/globals.css`
- **Actions:**
  - Define warm mineral palette: `--ov-bone`, `--ov-paper`, `--ov-oat`, `--ov-stone`, `--ov-ink`, `--ov-slate`, `--ov-moss`, `--ov-indigo`, `--ov-indigo-dark`, `--ov-clay`, `--ov-white`.
  - Wire variables into Tailwind CSS v4 `@theme inline`.
  - Set global background to `--ov-bone` and text to `--ov-ink`.
  - Establish fluid typography utilities using CSS `clamp()`.
  - Configure default focus ring: `2px solid var(--ov-indigo)` with offset.
- **Acceptance:** Zero pure-white backgrounds; contrast verified ≥ 4.5:1 for all normal text.

### Task T-02: Shell & Global Chrome
- **Target Files:** `components/layout/SiteHeader.tsx`, `components/layout/Footer.tsx`, `components/layout/Shell.tsx`
- **Actions:**
  - Refactor `SiteHeader`: Clean left wordmark, generous navigation spacing, quiet active states, prominent Donate button in Quiet Indigo.
  - Implement full-height accessible `MobileNav` drawer with backdrop blur and touch targets ≥ 48px.
  - Refactor `Footer`: 4 clean editorial columns, legal registration details, quiet copyright line.
  - Refactor `Shell.tsx`: Enforce section padding (`py-12 md:py-16 lg:py-20`) and container width (`max-w-container mx-auto px-4 sm:px-6 lg:px-8`).
- **Acceptance:** Keyboard-navigable, zero layout shift on mobile menu toggle.

### Task T-03: Reusable Editorial Primitives
- **Target Files:**
  - `components/composition/ImpactStrip.tsx` (New): Clean horizontal metric flow.
  - `components/composition/EditorialIndex.tsx` (New): Featured-first list pattern with numbered rows.
  - `components/content/StoryCard.tsx`: Refactored to editorial standards.
  - `components/composition/QuietClose.tsx`: Warm, uncluttered closing section.
- **Acceptance:** Eliminates repetitive card grids; reusable across Home, Programmes, and Stories.

### Task T-04: Home Page Refactor
- **Target File:** `app/(site)/page.tsx`
- **Actions:**
  - Maintain Locked Hero with editorial copy ("Shared Vision. Local Action.").
  - Replace dashboard cards with horizontal `ImpactStrip`.
  - Replace `ProgrammesBento` with `EditorialIndex` (01 featured + 02–05 numbered rows).
  - Refactor community story into an asymmetric split feature.
  - Replace dense trust cards with a clean 3-link transparency row (Open Ledger, Governance, Reports).
  - Implement calm `QuietClose`.
- **Acceptance:** Scannable editorial journal aesthetic; zero card soup.

### Task T-05: Programmes Page Refactor
- **Target Files:** `app/(site)/programmes/page.tsx`, `components/content/ProgrammeFilter.tsx`
- **Actions:**
  - Locked Hero: "Five Priorities. One Shared Future."
  - Segmented text filter with mobile horizontal scroll.
  - Featured-first programme presentation: Item 01 large visual + Items 02–05 compact rows.
  - Partner collaboration strip.
- **Acceptance:** Publication-grade programme index; no e-commerce catalog look.

### Task T-06: Stories Page Refactor
- **Target File:** `app/(site)/stories/page.tsx`
- **Actions:**
  - Locked Hero: "Grassroots Stories."
  - Dominant lead story feature (7-column visual + 5-column story content).
  - Secondary story pair with contrasting vertical alignment.
  - Chronological vertical archive list.
- **Acceptance:** Strong photographic lead; clear metadata and reading times.

### Task T-07: About Page Refactor
- **Target File:** `app/(site)/about/page.tsx`
- **Actions:**
  - Locked Hero: "Our Foundations."
  - Institutional origin narrative.
  - Documentary Image Essay: 1 dominant lead + 2 supporting photos with captions.
  - Two-column governance structure (Board & Leadership / Operational Team).
  - Quiet closing statement.
- **Acceptance:** Dignified institutional essay; no repetitive construction imagery.

### Task T-08: Volunteer Page Refactor
- **Target File:** `app/(site)/volunteer/page.tsx`, `components/forms/VolunteerForm.tsx`
- **Actions:**
  - Locked Hero: "Local Action."
  - Concise why-volunteer narrative with mentor testimonial.
  - 3 open editorial commitments (01 Learn, 02 Contribute, 03 Respect).
  - Clean, accessible multi-step form with clear visual fieldsets.
  - Volunteer FAQ accordion.
- **Acceptance:** Smooth form completion flow; zero boxed clutter.

### Task T-09: Get Help Page Refactor
- **Target File:** `app/(site)/get-help/page.tsx`, `components/composition/ContactForm.tsx`
- **Actions:**
  - Locked Hero: "Frontline Care & Assistance."
  - High-priority 24/7 Helpline (+91 98765 43210) and Direct Care Inbox prominent above the fold.
  - Confidentiality guarantee notice.
  - Streamlined request form.
  - High-priority FAQs.
- **Acceptance:** Fast, accessible utility interface; emergency assistance immediately reachable.

### Task T-10: Multi-Breakpoint Visual & A11y Verification
- **Actions:**
  - Validate across 1440px, 1280px, 1024px, 768px, 430px, 390px viewports.
  - Run accessibility audit for contrast, keyboard focus, and screen-reader labels.
  - Verify `prefers-reduced-motion` fallbacks.
- **Acceptance:** Zero critical a11y violations; responsive layouts pass QA checklist.
