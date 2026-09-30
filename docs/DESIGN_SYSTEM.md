# One Vision — Design System Specification

**Status:** Canonical & Active  
**Design Philosophy:** Nordic Lagom ("just the right amount")  
**Target:** WCAG 2.2 AA  
**Platform:** Next.js 16 (Turbopack) + Tailwind CSS v4  

---

## 1. Overview & Core Principles

One Vision is a crisis beacon and community resilience platform based in Imphal, Manipur. The visual and interaction design embodies the **Nordic Lagom** philosophy:
- **Quiet Chrome & Serene Balance:** Chrome recedes; content and verifiable data take precedence.
- **Generous Breathing Room:** Open, intentional spacing prevents cognitive overload in crisis contexts.
- **Disciplined Geometry:** Hairline borders, subtle corners, and strict structural alignment over decorative clutter.
- **Utilitarian Dignity:** Factual, accountable, and transparent communication—no sensationalism or artificial urgency.

### Core Tenets

1. **Consistency over Novelty:** Reuse established patterns and primitives before authoring new UI elements.
2. **Token-Driven:** Every visual attribute (color, spacing, typography, radius, shadow) must resolve to a semantic token. Magic numbers and ad-hoc hex values are strictly forbidden.
3. **Accessible by Default:** WCAG 2.2 AA compliance is a mandatory foundation, not a post-launch enhancement.
4. **Mobile-First & Resilient:** Resilient responsive design tested down to 320px without horizontal scroll blowouts.

---

## 2. Design Tokens & Foundations

### 2.1 Color System (OKLCH & Semantic Aliases)

The palette balances warm earthen resilience with serene, low-fatigue contrast:

| Semantic Token | Value / OKLCH | Role & Contrast Rule |
| :--- | :--- | :--- |
| `--background` | `oklch(0.985 0.005 85)` | Page background (warm paper tone, anti-halation) |
| `--foreground` | `oklch(0.19 0.015 45)` | Primary high-contrast headings & text (14:1+ on paper) |
| `--card` | `oklch(0.995 0.002 85)` | Card & modal background |
| `--muted` | `oklch(0.95 0.008 80)` | Muted panels, alternating sections, secondary surfaces |
| `--muted-foreground` | `oklch(0.475 0.021 43.1)` | Secondary text, captions, subtitles (≥ 5.8:1 on muted/paper, passes AA) |
| `--border` | `oklch(0.88 0.01 80)` | Hairline 1px borders & dividers |
| `--primary` | `oklch(0.45 0.12 35)` | Deep terracotta/clay accent (Primary CTAs, active highlights) |
| `--primary-foreground`| `oklch(0.99 0.005 85)` | Text on primary actions (Passes AAA) |
| `--ring` | `oklch(0.45 0.12 35 / 0.4)` | 2px visible focus ring |
| `--destructive` | `oklch(0.55 0.18 25)` | Critical alerts & error states |

**Strict Color Prohibitions:**
- Pure black (`#000000`) is prohibited. Use `--foreground` / `ink-900`.
- Pure saturated blues (`#0000FF`) are prohibited.
- Ad-hoc hex values outside token definitions are prohibited.

---

### 2.2 Typography

Typography establishes an authoritative editorial hierarchy with clear font roles:

- **Heading Font:** `DM Sans` (`--font-heading`) — Crisp, human, architectural.
- **Body & UI Font:** `Inter` (`--font-inter`) — Highly legible, neutral, accessible.
- **Data & Monospace Font:** `JetBrains Mono` (`--font-jetbrains-mono`) — Financial ledger numbers, NGO registration identifiers, metadata.

| Level | Size / Line-Height | Tracking | Usage Role |
| :--- | :--- | :--- | :--- |
| `text-display-xl` | 56px / 1.1 | `-0.025em` | Hero main display titles |
| `text-display-lg` | 40px / 1.15 | `-0.02em` | Section primary headers (H2) |
| `text-heading-md` | 24px / 1.25 | `-0.015em` | Card titles, subsection headers (H3) |
| `text-heading-sm` | 18px / 1.35 | `-0.01em` | Group headers, form legends (H4) |
| `text-base` | 16px / 1.6 | `0` | Default body copy & narrative paragraphs |
| `text-sm` | 14px / 1.5 | `0` | Dense metadata, secondary descriptors, card copy |
| `text-xs` | 12px / 1.4 | `+0.05em` | Eyebrow tags, uppercase category badges, table headers |
| `text-mono-xs` | 11px / 1.3 | `+0.08em` | Reg numbers, status codes, currency codes |

---

### 2.3 Spacing Scale (4px Base Grid)

All margins, paddings, gaps, and structural containers resolve strictly to the 4px system:

| Token | Pixels | Usage |
| :--- | :--- | :--- |
| `space-1` (`p-1`, `gap-1`) | 4px | Micro gaps, icon spacers |
| `space-2` (`p-2`, `gap-2`) | 8px | Button inline padding, tight badge gaps |
| `space-3` (`p-3`, `gap-3`) | 12px | Compact card padding, form input inner padding |
| `space-4` (`p-4`, `gap-4`) | 16px | Standard component padding, list gaps |
| `space-6` (`p-6`, `gap-6`) | 24px | Card padding, desktop form gaps |
| `space-8` (`p-8`, `gap-8`) | 32px | Section inner spacing |
| `space-12` (`p-12`, `gap-12`)| 48px | Inter-card section gutters |
| `space-16` (`py-16`) | 64px | Standard section vertical rhythm (mobile) |
| `space-24` (`py-24`) | 96px | Standard section vertical rhythm (desktop) |

---

### 2.4 Shapes & Border Radii (Disciplined Pinning)

To preserve the Nordic architectural aesthetic, border radii are pinned to four strict tokens:

| Token | Value | Allowed Applications |
| :--- | :--- | :--- |
| `rounded-none` | `0px` | Full-viewport Hero sections, dividers, full-bleed bands |
| `rounded-sm` | `2px` | **Primary UI standard:** Buttons, form inputs, badges, step indicators, cards |
| `rounded-md` | `4px` | Modals, floating sheets, toast containers |
| `rounded-full` | `9999px` | **Indicator dots only:** Live status pulse dots, spinner rings. Prohibited on layout containers. |

**Prohibited Shapes:**
- `rounded-2xl`, `rounded-3xl`, and cartoonish bubble capsules on cards or buttons are strictly prohibited.

---

### 2.5 Elevation & Hairlines

- **Hairlines Over Shadows:** Structural separation is achieved via `1px border border-border` rather than heavy drop shadows.
- **Allowed Shadow:** `shadow-2xs` (`0 1px 2px 0 rgb(0 0 0 / 0.04)`) for floating chrome (e.g. search shortcut, floating assistant).

---

### 2.6 Motion & Reduced Motion

- All layout and color transitions use standard durations:
  - `duration-150` for button/link hover micro-interactions.
  - `duration-250` for dropdown and accordion state changes.
  - `duration-400` for drawer transitions.
- **Mandatory Reduced Motion Rule:** All animations must respect `prefers-reduced-motion: reduce`. When active, animated counters (e.g., impact metrics) and transitions must render their final state instantaneously.

---

## 3. Core Component Specifications

### 3.1 Button (`components/ui/button.tsx`)

- **Variants:**
  - `primary`: Background `--primary`, text `--primary-foreground`, hover brightness reduction.
  - `secondary`: Background `--muted`, text `--foreground`, hairline border `--border`.
  - `ghost`: Transparent background, hover background `--muted`.
  - `link`: Underlined link styling with `underline-offset-4`.
- **Sizes & Ergonomics:**
  - `sm`: Height 32px (`h-8`), text 12px.
  - `md`: Height 40px (`h-10` / `min-h-10`), text 14px.
  - `lg`: Height 48px (`h-12`), text 16px.
  - `icon`: Square 40px (`size-10`).
- **Touch Target Rule:** Every interactive button and link on mobile must satisfy $\ge 40\text{px}$ minimum hit area (via `min-h-10` or touch padding).

### 3.2 Badge (`components/ui/badge.tsx`)

- **Role:** Non-interactive status or category indicator.
- **Geometry:** `rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold border`.
- **Variants:** `default` (primary tint), `secondary` (neutral muted), `outline` (hairline border only), `destructive` (danger/urgent).

### 3.3 Card (`components/ui/card.tsx`)

- **Role:** Discrete content container.
- **Styling:** `bg-card text-foreground border border-border rounded-sm p-6 flex flex-col justify-between`.
- **Button Alignment:** Cards with actions must use `flex flex-col justify-between h-full` to pin CTAs to the card bottom.

### 3.4 Form Fields (`components/ui/field.tsx`, `input.tsx`, `textarea.tsx`)

- **Input Styling:** `bg-background border border-border rounded-sm h-10 px-3 font-sans text-sm focus-visible:ring-1 focus-visible:ring-ring`.
- **Labeling:** Every input has an associated `<Label>` linked via `htmlFor`. Checkboxes and toggles include explicit `aria-label` or enclosed text.
- **Error States:** Displayed via `<FieldError>` with accessible error descriptions.

---

## 4. Full-Viewport Hero Specification (Immutable)

Per [`AGENTS.md`](file:///c:/ov/AGENTS.md) Rule 8:
- All Hero sections (`components/content/Hero.tsx` and `components/composition/PageHero.tsx`) are permanently locked as **Full-Viewport Heroes**:
  ```tsx
  min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center
  ```
- **Immutable Dimensions:** Image container `lg:h-95 xl:h-100`, aspect ratio `aspect-square`.
- **Allowed Modifications:** Copy text, badges, button links/labels, and image source paths. Structural layout classes must not be modified.

---

## 5. Accessibility Criteria (WCAG 2.2 AA)

1. **Color Contrast:** All body and descriptive text must meet $\ge 4.5:1$ contrast against their background surfaces (verified $\ge 5.8:1$ across all routes).
2. **Keyboard Navigation:** Every interactive element must be reachable and operable using `Tab`, `Shift+Tab`, `Enter`, and `Space`.
3. **Focus Visibility:** Focus rings must use a 2px high-visibility ring (`ring-1 ring-ring` or `outline-2 outline-ring`) with proper offset. Never use `outline: none` without replacement.
4. **Touch Target Size:** Minimum $40\times 40\text{px}$ touch targets across all mobile breakpoints.
5. **Screen Reader Semantics:** Semantic landmarks (`<header>`, `<nav>`, `<main id="main">`, `<footer>`), explicit `aria-label` on icon-only buttons, and a skip-to-content link as the first focusable element.

---

## 6. Anti-Patterns & Prohibited Usages

| Anti-Pattern | Severity | Why It Fails | Canonical Alternative |
| :--- | :--- | :--- | :--- |
| `w-screen` | **CRITICAL** | Causes horizontal layout scrollbar blowouts on Windows and mobile. | Use `w-full` or container bounds. |
| `h-screen` | **WARNING** | Breaks on mobile due to browser URL bar expansion. | Use `min-h-dvh` or `h-dvh`. |
| `overflow-x-auto` | **WARNING** | Masks accidental layout overflow rather than fixing root sizing. | Fix flex/grid item min-width (`min-w-0`). |
| `rounded-3xl` / `rounded-full` on cards | **WARNING** | Cartoonish, breaks disciplined Nordic Lagom architectural styling. | Use `rounded-sm` or `rounded-md`. |
| Arbitrary text sizes `text-[10rem]` | **CRITICAL** | Destroys responsive hierarchy; causes viewport blowouts. | Use responsive fluid tokens (`text-display-xl`). |
| Arbitrary height classes `min-h-[40px]` | **HINT** | Bypasses canonical Tailwind scale. | Use canonical `min-h-10`. |
| Buttons inside link tags (`<Link><Button/></Link>`) | **CRITICAL** | Nested interactive DOM violation; breaks screen reader navigation. | Use `<Button asChild><Link href="...">...</Link></Button>`. |

---

## 7. Definition of Done (DoD) Checklist

A component, section, or page refactor is **not complete** until every item below is verified:

- [ ] **Token Compliance:** Zero hardcoded hex colors, magic pixel margins, or ad-hoc classes.
- [ ] **Static Audit Passed:** `pnpm audit:static` completes with 0 errors and 0 warnings.
- [ ] **Dead Code & Supply Chain:** `pnpm audit:deadcode` (Knip) completes clean with zero unused dependencies or files.
- [ ] **CSS & Stylelint:** `pnpm lint:css` passes with zero violations.
- [ ] **Component Tests:** `pnpm test` (Vitest) passes 100%.
- [ ] **Visual & A11y Audit:** `pnpm audit:ui` confirms **0 horizontal overflows, 0 touch target warnings, and 0 accessibility violations** across desktop and mobile.
- [ ] **Production Build:** `pnpm build` compiles cleanly under Turbopack without TypeScript or bundling warnings.
