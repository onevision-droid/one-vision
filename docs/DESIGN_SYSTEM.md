# One Vision — Design System Specification (Field Edition)

**Status:** Canonical & Active  
**Design Philosophy:** Nordic Lagom ("Just the right amount")  
**Design Direction:** ONE VISION — FIELD EDITION (September 2026)  
**Target:** WCAG 2.2 AA Compliance  
**Platform:** Next.js 16 (Turbopack) + Tailwind CSS v4 (CSS-first `@theme`)

---

## 1. Overview & Core Philosophy

One Vision is a community-led health, education, and ecological resilience organization serving Manipur since 1988 (formerly Society for Health & Education Manipur).

The visual and interaction architecture embodies **Quiet Humanism** through **Nordic Lagom**:
- **Quiet Chrome & Serene Balance:** Navigation and interface chrome recede; human storytelling, documentary evidence, and verifiable community impact take precedence.
- **Generous Breathing Room:** Warm, open negative space prevents cognitive overload and ocular fatigue.
- **Disciplined Restraint:** Replace generic "card soup" and heavy borders with open typography, soft tonal shifts, and intentional alignment.
- **Warm Mineral Foundations:** Soft Bone, Paper, Oat, and Stone surfaces provide material warmth without clinical glare.
- **Quiet Brand Action:** Deeper, dignified Quiet Indigo (`#5752BC`) serves as the focused primary action color.

---

## 2. Token Architecture & Color Palette

All tokens are defined in `app/globals.css` using native CSS variables and exposed via Tailwind v4 `@theme inline`.

### 2.1 Color Tokens

| Semantic Token | Primitive CSS Var | Hex Value | Role & Contrast Rule |
|---|---|---|---|
| `--color-background` | `--ov-bone` | `#F2EFE7` | Primary canvas & page background (Anti-halation) |
| `--color-card` | `--ov-paper` | `#FAF8F2` | Primary content surface & elevated elements |
| `--color-muted` | `--ov-oat` | `#E4DFD3` | Soft alternating section bands & wells |
| `--color-border` | `--ov-stone` | `#D9D4C7` | Hairline 1px structural rules & dividers |
| `--color-foreground` | `--ov-ink` | `#1B1C19` | Primary headings, body copy, and structural anchors (15:1 AAA) |
| `--color-muted-foreground` | `--ov-slate` | `#5C5E58` | Secondary copy, metadata, subtitles (6.5:1 AA) |
| `--color-primary` | `--ov-indigo` | `#5752BC` | Primary interactive actions, active navigation, focus rings |
| `--color-primary-hover` | `--ov-indigo-hover` | `#433EA8` | Action hover & pressed states (8.5:1 on white) |
| `--color-ov-moss` | `--ov-moss` | `#3B6E52` | Environmental, ecological & community trust signals |
| `--color-destructive` | `--ov-clay` | `#A84B2B` | Important alerts & human warmth accent |
| `--color-card` | `--card` | `#FAF8F2` | Intentional high-contrast surface accents |

### 2.2 Prohibitions & Strict Rules:
- Pure white `#FFFFFF` is prohibited as a full-page background.
- Faint low-contrast gray text (< 4.5:1) is strictly forbidden.
- Bright electric purple/magenta is forbidden; use Quiet Indigo.
- Excessive multi-colored gradients, glowing dropshadows, and neon borders are banned.

---

## 3. Typography Architecture

- **Editorial Display & Headings:** Editorial Serif (`font-serif` via Newsreader / Instrument Serif). Used for all major page titles, section anchors, and narrative quotes.
- **Interface & Body Prose:** Utilitarian Grotesque Sans (`font-sans` via Geist / Manrope / Inter). Used for body text, navigation, forms, and interactive buttons.
- **Data & Numerical Proof:** Tabular Monospace (`font-mono` via JetBrains Mono / IBM Plex Mono). Used for financial ledger entries, registration codes, dates, and statistics.

### Fluid Typography Scale:
- **Display XL (Hero):** `clamp(3rem, 6vw + 1rem, 6.5rem)` / Line height 0.95–1.05
- **Display L (Page Titles):** `clamp(2.5rem, 4.5vw + 1rem, 4.5rem)` / Line height 1.05–1.15
- **Heading H2 (Section):** `clamp(1.75rem, 3vw + 0.5rem, 3rem)` / Line height 1.15–1.25
- **Heading H3 (Subsections):** `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` / Line height 1.25–1.35
- **Body Large (Leads):** `1.125rem–1.25rem` / Line height 1.55–1.65 / Max width 65ch
- **Body Regular:** `1rem–1.0625rem` / Line height 1.6 / Max width 68ch
- **Small / Metadata:** `0.875rem` / Line height 1.45
- **Eyebrow / Badge:** `0.75rem–0.8125rem` / Uppercase tracking +0.12em

---

## 4. Layout, Spacing & Containment

### 4.1 Spacing Scale (4px Base Grid)
- Micro: `4px, 8px, 12px, 16px`
- Component: `24px, 32px, 48px`
- Section: `64px, 80px, 96px, 128px`
- Max Content Width: `1240px` (`max-w-container mx-auto px-4 sm:px-6 lg:px-8`)

### 4.2 4-Level Containment Hierarchy:
1. **Level 1 — Open Editorial Section:** Default layout. Clean typography and generous whitespace.
2. **Level 2 — Soft Surface Block:** Background shift to Oat (`#E9E4D9`) or Paper (`#FAF8F2`).
3. **Level 3 — Bordered Module:** Subtle 1px rule (`border border-border`). Used selectively.
4. **Level 4 — Elevated Object:** Subtle utility shadow (`shadow-sm`) reserved for popovers and dialogs.

---

## 5. Hero Section Lock (Immutable Contract)

All hero sections across the entire platform (`components/content/Hero.tsx` and `components/composition/PageHero.tsx`) adhere to the strict layout lock in `AGENTS.md` Rule 8:
- Viewport Centering: `min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`
- Container Height: `lg:h-95 xl:h-100`
- Image Ratio: 1:1 Square (`aspect-square`) with dynamic full-viewport centering.
- *Strict Rule:* Never alter the structural layout classes, container heights, or 1:1 image aspect ratio. Only text copy, badges, button links/labels, and image source paths within the hero sections can be modified.

---

## 6. Documentary Photography System

- **Monochrome Documentary:** Primary treatment for archival history, governance, and infrastructural evidence.
- **Warm Monochrome:** Reserved for community stories, elder portraits, and craft narratives.
- **Natural Muted Color:** Reserved for environmental restoration and youth workshops where natural vitality is essential.
- **Hierarchy:** 1 Hero Image per route → 1 Featured Story Visual → Compact Context Thumbnails.

---

## 7. Quiet Motion & Accessibility

- **Standard Transitions:** 160ms–240ms duration with subtle easing.
- **Motion Reduction:** Fully respects `prefers-reduced-motion: reduce`.
- **Target Touch Size:** Minimum 44×44px for all mobile interactive elements.
- **WCAG Target:** Full WCAG 2.2 AA certification across all views.
