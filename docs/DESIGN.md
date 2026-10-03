# DESIGN.md — One Vision: Nordic Purposeful Design System

**Project:** One Vision — Society for Health & Education Manipur  
**Document Type:** Canonical Design System Specification & Visual Guidelines  
**Edition:** Nordic Purposeful Design (September 2026 Edition)  
**North Star:** "Clean & Minimal, Human & Authentic, Accessible & Inclusive, Content Focused"  
**Philosophy:** Nordic Lagom ("Just the right amount" — purposeful clarity, serene balance, generous breathing room, understated refinement)

---

## 1. Executive Direction & Design Pillars

A calm, warm, and human-centered design system for One Vision, built for trust, clarity, and impact.
- **Clean & Minimal:** Uncluttered layouts, disciplined geometry, and quiet chrome.
- **Human & Authentic:** Grounded documentary photography and respectful storytelling from Manipur.
- **Accessible & Inclusive:** WCAG 2.2 AA compliant high-contrast color pairings, visible focus states, and minimum 44px touch targets.
- **Content Focused:** Typographic hierarchy guides reading effortlessly without unnecessary visual noise.

---

## 2. Color Palette

A calm, warm, natural palette inspired by Northeast landscapes, designed for clarity, accessibility, and modern minimalism.

| Category | Token / Name | Hex Code | Role & Usage | Contrast Ratio |
|---|---|---|---|---|
| **Primary** | Primary Indigo | `#4F46E5` | Primary brand actions, active links, primary CTA | 7.0:1 (AAA on White) |
| **Primary** | Primary Hover | `#4338CA` | Hover and pressed states for primary actions | 8.8:1 (AAA on White) |
| **Primary** | Primary Light | `#EDE9FE` | Subtle tint for category badges and icon surfaces | Accent surface |
| **Secondary**| Secondary Slate | `#334155` | Strong secondary UI elements, dark badges | 9.6:1 on White |
| **Accent** | Accent Teal | `#10B981` | Positive metric highlights and ecological accents | 3.5:1 (large text / UI) |
| **Accent** | Accent Light | `#D1FAE5` | Soft background for success and impact badges | Tint surface |
| **Neutrals** | Background | `#FAFAF9` | Warm canvas background (Stone-50) | Neutral foundation |
| **Neutrals** | Surface / Card | `#FFFFFF` | Cards, input fields, modal dialogs, elevated containers | Crisp clarity |
| **Neutrals** | Muted | `#F1F5F9` | Wells, pill tags, inactive hover backgrounds | Subtle grounding |
| **Neutrals** | Border | `#E5E7EB` | Hairline structural borders and dividers | Subtle definition |
| **Neutrals** | Text Primary | `#0F172A` | Primary headings, prominent copy, critical text | 15.4:1 (AAA) |
| **Neutrals** | Text Secondary| `#64748B` | Secondary descriptions, subheadings, metadata | 5.2:1 (AA) |
| **Semantic** | Success | `#16A344` | Verified status, success states, green status dots | Semantic indicator |
| **Semantic** | Warning | `#F59E0B` | Pending status, operational notices | Semantic indicator |
| **Semantic** | Error | `#EF4444` | Form errors, urgent alerts | Semantic indicator |
| **Semantic** | Info | `#3B82F6` | Informational announcements | Semantic indicator |

---

## 3. Typography & 7-Level Type Scale

- **Headings (Serif):** `DM Serif Display` — A modern editorial serif for authoritative, human, and trustworthy editorial voice.
- **Body (Sans Serif):** `Inter` — Highly legible, neutral, and versatile workhorse for user interfaces and long-form reading.

### Exact 7-Level Type Scale

| Level | Role | Size / Line-Height | Tracking | Example Usage |
|---|---|---|---|---|
| **H1** | Display | `64px / 72px` (`4rem / 4.5rem`) | `-2%` (`-0.02em`) | Hero major statements, page titles |
| **H2** | Heading | `48px / 56px` (`3rem / 3.5rem`) | `-2%` (`-0.02em`) | Section headlines |
| **H3** | Heading | `32px / 40px` (`2rem / 2.5rem`) | `-1%` (`-0.01em`) | Subsection headers |
| **H4** | Heading | `24px / 32px` (`1.5rem / 2rem`) | `0%` (`0em`) | Card headers, module titles |
| **Body Large** | Editorial Lead | `18px / 28px` (`1.125rem / 1.75rem`) | `0%` (`0em`) | Lead paragraphs, intro text |
| **Body** | Default Prose | `16px / 24px` (`1rem / 1.5rem`) | `0%` (`0em`) | Standard body paragraphs, inputs |
| **Caption** | Meta & Subtext | `14px / 20px` (`0.875rem / 1.25rem`) | `0%` (`0em`) | Timestamps, tags, footnotes |

---

## 4. Buttons & Inputs

### Buttons
- **Primary Button:** `#4F46E5` Indigo solid fill, white text, 0px radius (`rounded-none`), hover: `#4338CA`, accompanied by an arrow `→`.
- **Secondary Button:** White `#FFFFFF` background, `#E5E7EB` border, `#0F172A` text, 0px radius (`rounded-none`), hover: `#F1F5F9`.
- **Ghost Button:** Transparent background, `#0F172A` text, hover: `#F1F5F9`.
- **Icon Button:** Square 32px or 40px icon trigger with subtle border and 0px radius (`rounded-none`).

### Input Fields
- **Default:** `#FFFFFF` background, `#E5E7EB` border, 0px radius (`rounded-none`), 40px height (`h-10`), px-3.5, text-sm.
- **Focused:** `#4F46E5` border with 2px `#4F46E5/20` focus ring.
- **Error:** `#EF4444` border with `#EF4444/20` ring.
- **Success:** `#16A344` border with `#16A344/20` ring.

---

## 5. Tags & Badges

### Rectangular Badges
- **Programme:** `#EDE9FE` background, `#4F46E5` text, rectangular shape (`rounded-none px-3 py-1 text-xs font-medium`).
- **Story:** `#F1F5F9` background, `#334155` text, rectangular shape (`rounded-none`).
- **Impact:** `#D1FAE5` background, `#065F46` text, rectangular shape (`rounded-none`).
- **Volunteer:** `#FEF3C7` background, `#D97706` text, rectangular shape (`rounded-none`).
- **Community:** `#DBEAFE` background, `#2563EB` text, rectangular shape (`rounded-none`).
- **Urgent:** `#FEE2E2` background, `#DC2626` text, rectangular shape (`rounded-none`).

### Status Markers
- **Active:** Green square marker (`#16A344`) + text.
- **Pending:** Amber square marker (`#F59E0B`) + text.
- **Completed:** Slate square marker (`#64748B`) + text.

---

## 6. Navigation (Section 07)

- **Layout:** Sticky header with frosted `#FAFAF9` / `#FFFFFF` backdrop (`backdrop-blur-md`).
- **Brand Lockup:** Sentinel ocular logo + "ONE VISION / Manipur · Est. 1988".
- **Center Links:** Programmes, Stories, About, Get Involved, Contact. Active link features an Indigo underline indicator (`h-0.5 bg-primary`).
- **Right Utilities:**
  - Search trigger: `Q Search...` with `⌘K` keyboard badge (`rounded-none border border-border bg-card`).
  - Action CTA: Indigo `Donate →` button (`bg-primary text-white hover:bg-primary-hover rounded-none`).

---

## 7. Card Components (Section 08)

1. **Programme Card:**
   - 0px radius (`rounded-none`), white `#FFFFFF` card, subtle `#E5E7EB` border.
   - Top image with `Programme` badge and square arrow action button `→`.
   - Serif headline (`DM Serif Display`), secondary slate description, `Learn More →` in `#4F46E5`.
2. **Story Card:**
   - 0px radius (`rounded-none`), white `#FFFFFF` card, subtle `#E5E7EB` border.
   - Top image with `Story` badge and square arrow action button `→`.
   - Serif headline, secondary slate excerpt, `Read Story →` in `#4F46E5`.
3. **Metric Card:**
   - 0px radius (`rounded-none`), white `#FFFFFF` card, subtle `#E5E7EB` border, p-6.
   - Square `#EDE9FE` icon badge with Users/Lucide icon.
   - Bold metric (`2,500+`) and descriptive label (`People Reached`).
   - Bottom graduated lavender/indigo bar chart visual.
4. **Feature Card:**
   - 0px radius (`rounded-none`), dark photographic background with soft gradient overlay.
   - Eyebrow `■ JOIN OUR WORK`.
   - Serif headline (`Support Communities in Manipur.`).
   - White button `Donate Now →` (`bg-white text-slate-900 rounded-none`).

---

## 8. Radius & Shadow System

- **Zero-Radius Rule:** The project forbids rounded corners, curved lines, pill shapes, and circular elements.
- **Corner Angle:** All borders and containers must feature 90-degree orthogonal corners (`rounded-none` / 0px radius).
- **Shadows:** Soft shadows (`shadow-xs`, `shadow-sm`, `shadow-md`) for subtle depth only. No harsh or heavy black drop shadows.

---

## 9. Spacing System

Geometric 4px rhythm:
- `4px` (`gap-1` / `p-1`)
- `8px` (`gap-2` / `p-2`)
- `12px` (`gap-3` / `p-3`)
- `16px` (`gap-4` / `p-4`)
- `24px` (`gap-6` / `p-6`)
- `32px` (`gap-8` / `p-8`)
- `48px` (`gap-12` / `p-12`)
- `64px` (`gap-16` / `p-16`)

---

## 10. Hero Section Structural Lock (Strictly Immutable)

Per Rule 8 of `AGENTS.md`:
- All Hero sections (`Hero.tsx` and `PageHero.tsx`) must strictly remain Full-Viewport Heroes:
  - Layout: `min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`
  - Container heights: `lg:h-95 xl:h-100`
  - Image aspect ratio: 1:1 square (`aspect-square`) with dynamic full-viewport centering.
- Dimensions, aspect ratios, and centering logic are permanently locked. Visual styling adheres strictly to Nordic Lagom Design tokens (DM Serif Display, `#5752BC` primary CTA, zero-radius badges).
