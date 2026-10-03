# 02: Nordic Lagom Design System Specification (Field Edition)

**Project:** One Vision: Society for Health & Education Manipur  
**Status:** Active & Binding  
**System Name:** ONE VISION: FIELD EDITION  
**Framework:** Next.js 16 (App Router) + Tailwind CSS v4 (CSS-first `@theme`)

---

## 1. System Philosophy: "Quiet Humanism"

The One Vision design system unites Nordic functional discipline with the dignity of community-led action in Manipur. It replaces both aggressive brutalism and sterile minimalism with **Nordic Lagom**: *just enough*:
- **Serene Tonal Equilibrium:** Warm mineral neutrals prevent ocular fatigue and create an inviting civic reading atmosphere.
- **Typographic Authority:** An editorial serif anchors community narrative; a refined grotesque sans handles structured interface and data.
- **Photographic Dignity:** Authentic documentary photography serves as evidence and humanity, never mere decoration.
- **Disciplined Restraint:** Containers, borders, icons, shadows, and animations are used only when functionally required.

---

## 2. Token Architecture (Tailwind CSS v4)

Tokens are declared using CSS variables and exposed via Tailwind v4 `@theme inline` in `app/globals.css`.

### 2.1 Color Palette & Semantic Tokens

```css
:root {
  /* Primitive Warm Mineral Palette */
  --ov-bone:         #F2EFE7; /* Primary canvas & page background */
  --ov-paper:        #FAF8F2; /* Elevated content surface & cards */
  --ov-oat:          #E9E4D9; /* Soft alternating section wells */
  --ov-stone:        #D8D2C8; /* Hairline structural borders & dividers */
  --ov-ink:          #1B1C19; /* Primary text, titles, deep accents */
  --ov-slate:        #55564F; /* Secondary text, metadata, captions */
  --ov-moss:         #586653; /* Environmental & trust accent */
  --ov-indigo:       #5752BC; /* Primary brand action & interactive signals */
  --ov-indigo-dark:  #403B92; /* Hover, pressed, and high-contrast CTA */
  --ov-clay:         #A65B4F; /* Urgent notice & warm human highlight */
  --ov-white:        #FFFFFF; /* Pure white accent */

  /* Semantic System Mapping */
  --background:             var(--ov-bone);
  --foreground:             var(--ov-ink);
  --card:                   var(--ov-paper);
  --card-foreground:        var(--ov-ink);
  --popover:                var(--ov-paper);
  --popover-foreground:     var(--ov-ink);
  --primary:                var(--ov-indigo);
  --primary-foreground:     #FFFFFF;
  --secondary:              var(--ov-oat);
  --secondary-foreground:   var(--ov-ink);
  --muted:                  var(--ov-oat);
  --muted-foreground:       var(--ov-slate);
  --accent:                 var(--ov-moss);
  --accent-foreground:      #FFFFFF;
  --destructive:            var(--ov-clay);
  --destructive-foreground: #FFFFFF;
  --border:                 var(--ov-stone);
  --input:                  var(--ov-stone);
  --ring:                   var(--ov-indigo);

  /* Geometry & Radius (Strict Zero-Radius Architecture) */
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-pill: 0px;
}
```

### 2.2 Color Usage & Accessibility Ratios

| Pair | Hex Values | Contrast Ratio | WCAG Compliance |
|---|---|---|---|
| **Ink on Bone** | `#1B1C19` on `#F2EFE7` | **15.0:1** | AAA (All text) |
| **Ink on Paper** | `#1B1C19` on `#FAF8F2` | **16.2:1** | AAA (All text) |
| **Slate on Bone** | `#55564F` on `#F2EFE7` | **6.5:1** | AA (Body & Meta) |
| **Slate on Oat** | `#55564F` on `#E9E4D9` | **5.8:1** | AA (Body & Meta) |
| **White on Indigo** | `#FFFFFF` on `#5752BC` | **6.3:1** | AA (Normal) / AAA (Large) |
| **White on Indigo Dark**| `#FFFFFF` on `#403B92` | **8.5:1** | AAA (All text) |
| **Moss on Bone** | `#586653` on `#F2EFE7` | **5.2:1** | AA (Normal text & icons) |
| **Clay on Bone** | `#A65B4F` on `#F2EFE7` | **4.2:1** | AA (Large text & UI elements) |

---

## 3. Typography Architecture

### 3.1 Font Stack Roles
- **Editorial Serif (`font-serif`):** Contemporary editorial serif (Newsreader / Instrument Serif / Georgia). Used for narrative authority, article headlines, page titles, and prominent quotations.
- **Humanist Sans (`font-sans`):** Clean, utilitarian grotesque sans (Geist / Manrope / Inter). Used for body prose, functional UI, navigation, buttons, and form labels.
- **Tabular Mono (`font-mono`):** Monospace (JetBrains Mono / IBM Plex Mono). Used for financial figures, registration numbers, timeline years, and status codes.

### 3.2 Fluid Typographic Scale
```css
/* Typography Scale (CSS Fluid Clamps) */
--text-display-xl: clamp(3rem, 6vw + 1rem, 6.5rem);   /* Hero statement */
--text-display-l:  clamp(2.5rem, 4.5vw + 1rem, 4.5rem);/* Page titles */
--text-h1:         clamp(2rem, 3vw + 0.5rem, 3.25rem); /* Major section headings */
--text-h2:         clamp(1.5rem, 2vw + 0.5rem, 2.25rem);/* Subsection headers */
--text-h3:         clamp(1.25rem, 1.2vw + 0.5rem, 1.625rem); /* Card titles */
--text-body-lg:    clamp(1.125rem, 0.5vw + 1rem, 1.25rem); /* Lead paragraphs */
--text-body:       1rem;                               /* Base reading prose */
--text-sm:         0.875rem;                           /* Secondary metadata */
--text-xs:         0.75rem;                            /* Badges, eyebrows */
```

### 3.3 Editorial Line Measure & Spacing
- **Body Prose Max Width:** 65–72 characters (`max-w-prose` / ~680px) to prevent eye fatigue.
- **Leading / Line Height:** Headings use tight leading (0.95–1.15); body copy uses generous reading leading (1.55–1.65).
- **Measure Rules:** Paragraphs must never stretch across full 1200px viewports.

---

## 4. Spacing, Grid & Layout System

### 4.1 4px Base Grid
Scale: `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 128px`.
Vertical section rhythms:
- Mobile: `py-12` (48px)
- Tablet: `py-16` (64px)
- Desktop: `py-20` (80px) to `py-24` (96px)

### 4.2 Content Widths & Breakpoints
- **Container Max-Width:** 1240px (`max-w-container mx-auto px-4 sm:px-6 lg:px-8`).
- **Desktop Grid:** 12 columns with 24–32px gutters.
- **Tablet Grid:** 8 columns with 20–24px gutters.
- **Mobile Grid:** 4-column conceptual layout with 16–20px outer padding.

---

## 5. Containment Hierarchy (Anti-Card Soup)

To eliminate repetitive card grids, content containment follows four strict levels:
1. **Level 1: Open Editorial Flow (Primary Default):** Content sits directly on the page canvas (`--background`). Hierarchy is achieved through typography, generous spacing, and subtle horizontal rules.
2. **Level 2: Soft Surface Shift:** Alternating background section using Oat (`--ov-oat`) or Paper (`--ov-paper`). No border.
3. **Level 3: Bordered Module:** Subtle 1px rule (`border border-border`) using Stone (`--ov-stone`). Applied strictly to interactive items, form groupings, and key data rows.
4. **Level 4: Floating Utility Object:** Extremely subtle shadow (`shadow-sm`) reserved exclusively for floating navigation bars, dropdown menus, and modal dialogs.

---

## 6. Component Primitives Specification

1. **`SiteHeader` & `MobileNav`:** Fixed/sticky chrome with warm translucent background (`bg-background/90 backdrop-blur-md`). Clean left-anchored wordmark, generous navigation spacing, quiet Search utility, prominent Donate CTA. Mobile nav expands into a full-height, accessible drawer with generous tap targets (≥48px).
2. **`Hero` & `PageHero` (Layout Locked):** Full-viewport heroes adhering to `AGENTS.md` Rule 8 (`min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`, `lg:h-95 xl:h-100`, 1:1 square image aspect ratio). Only typography, badges, and image sources are customized per route.
3. **`ImpactStrip` / Metric:** Compact horizontal evidence row with bold numerical proof and quiet supporting labels, replacing heavy dashboard cards.
4. **`EditorialIndex`:** Featured-first list pattern. Item 01 features a prominent visual and description; subsequent items (02–05) render as clean, numbered rows.
5. **`StoryFeature` & `StoryList`:** Large photographic lead story paired with compact supporting stories and a chronological archive list.
6. **`ImageEssay`:** Documentary photo grouping (1 lead image + 2 supporting context images with captions).
7. **`Accordion`:** Clean, accessible disclosure element (`@radix-ui/react-accordion`) with smooth height animation and clear chevron state.
8. **`QuietClose`:** Elegant single-action conclusion section with warm background, concise copy, and primary action button.

---

## 7. Motion & Interaction: "Quiet Motion"

Motion in Field Edition communicates state rather than providing spectacle:
- **Duration Scale:**
  - Micro-interactions (hover, active, focus): 150ms–200ms with `ease-out`.
  - Content disclosures (accordion, mobile drawer): 250ms–350ms with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Editorial page reveals: 300ms–450ms subtle fade and 4px upward translation.
- **Prohibited:** Scroll hijacking, bouncing elements, 3D tilts, auto-playing video, floating particles.
- **Accessibility:** Full compliance with `prefers-reduced-motion: reduce`. All transitions collapse to zero duration when reduced motion is requested.
