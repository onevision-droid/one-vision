# 02 — Nordic Lagoon Design System — One Vision

**Thesis:** One Vision's existing palette (Paper, Mist, Mineral Teal, Deep Forest) already sits on a "Nordic lagoon" axis — cold mineral greens/blues, warm sand neutrals, scarce terracotta sunlight. This document converts that intent into an enforceable token system and component grammar. "Nordic" supplies the discipline: calm, airy, typographically confident, zero decoration without function. "Lagoon" supplies the colour physics: deep teal depths, mist surfaces, warm sand shallows, one warm accent like low sun.

Design personality: **Grounded · Human · Forward** — expressed as *studio-calm, editorially asymmetric, warm-minimal.*

---

## 1. Token architecture

Tokens live in `app/globals.css` using Tailwind v4 CSS-first `@theme`. Three layers:

1. **Primitive** — raw values, never referenced directly by components.
2. **Semantic** — `bg-surface`, `text-primary`, `action-primary` etc. Components use these only.
3. **Component** — compound decisions (e.g., `card`, `prose`) via `@utility` or small component classes.

This indirection is mandatory: when dark mode or theming arrives, only the semantic layer changes.

---

## 2. Colour

### Primitives (hex → token)

```css
--ink:        #10201E;   /* deepest text / footer field */
--forest:     #123E3A;   /* brand depth — lagoon deep water */
--pine:       #1B524C;   /* hover/raised state on forest */
--teal:       #5E8780;   /* mineral mid-water */
--teal-soft:  #8FA9A3;   /* borders, captions on dark */
--mist:       #DCE8E5;   /* lagoon surface haze */
--mist-deep:  #C8D8D4;   /* pressed/hover on mist */
--paper:      #F7F3EA;   /* warm shore — primary background */
--sand:       #D8C8AE;   /* editorial section */
--sand-soft:  #EADFC9;   /* sand hover */
--terra:      #C85B3F;   /* low sun — action */
--terra-deep: #A8462F;   /* action hover/active */
--marigold:   #D7A43A;   /* highlight — graphics only */
--cloud:      #FFFFFF;
--stone:      #6F7672;   /* secondary text */
--stone-deep: #4A524E;   /* tertiary text */
```

### Semantic mapping (light mode default)

| Semantic token | Value | Use |
|---|---|---|
| `--color-surface` | paper | Page background |
| `--color-surface-raised` | cloud | Cards, header bar |
| `--color-surface-sunken` | mist | Bands, wells, code/quote blocks |
| `--color-surface-sand` | sand | Editorial alternates |
| `--color-surface-inverse` | ink | Footer, dark feature sections |
| `--color-surface-brand` | forest | Hero fields, primary dark sections |
| `--color-text-primary` | ink | Body/headings on light |
| `--color-text-secondary` | stone | Meta, captions |
| `--color-text-on-dark` | mist | Text on forest/ink |
| `--color-text-on-dark-muted` | teal-soft | Captions on dark |
| `--color-action-primary` | terra | One primary CTA per view |
| `--color-action-primary-hover` | terra-deep | |
| `--color-action-on-dark` | paper | CTA on dark fields |
| `--color-border-subtle` | mist-deep | Card borders, dividers |
| `--color-border-strong` | teal-soft | Interactive borders |
| `--color-focus-ring` | terra | Global focus-visible ring |

### Hard usage rules (enforced in code review)

1. Terracotta appears **only** on interactive/action elements and the focus ring. Never backgrounds of whole sections.
2. Marigold is **graphic-only** (icons on dark, data-viz highlights). Text in marigold is banned (2.2:1 contrast).
3. Terra as text: only ≥18.66px bold or ≥24px regular (4.6:1 on paper passes AA large-text).
4. Colour ratios per view: ~55% paper/cloud/mist · 25% forest/ink · 10% teal/sand · 10% terra/marigold.
5. Never signal state by colour alone — pair with icon/label (WCAG 1.4.1).

---

## 3. Typography

**Display:** Fraunces (self-hosted, `opsz` axis, optical sizing on). **UI/body:** Inter (self-hosted, variable). Loaded via `next/font/local` with `font-display: swap`, subsets `latin` + any needed extended sets. Fallback stacks declared to avoid FOUC: `Georgia, serif` / `system-ui, sans-serif`.

Fluid scale via `clamp()` — one token per role, no breakpoint jumps:

```css
--text-display-xl: clamp(2.75rem, 1.9rem + 3.4vw, 5.5rem);   /* 44–88 */
--text-display-l:  clamp(2.25rem, 1.6rem + 2.6vw, 4rem);     /* 36–64 */
--text-h1:         clamp(2rem, 1.5rem + 1.8vw, 3.25rem);     /* 32–52 */
--text-h2:         clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);   /* 28–40 */
--text-h3:         clamp(1.375rem, 1.2rem + 0.6vw, 1.875rem);/* 22–30 */
--text-body:       clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);/* 17–19 */
--text-small:      0.9375rem;                                 /* 15 */
--text-caption:    0.875rem;                                 /* 14 */
--text-eyebrow:    0.8125rem;  /* uppercase, tracking 0.12em */
```

Rules:
- `letter-spacing`: display −0.02em; body 0; eyebrow 0.12em.
- Line-height: display 1.05–1.15; headings 1.15–1.25; body 1.6; captions 1.45.
- Max measure: 68ch body prose; 24ch display headlines where asymmetry demands.
- Never all-caps body text. Eyebrow labels only.
- Numeric metrics: `font-feature-settings: "tnum"` via `tabular-nums` utility.

---

## 4. Grid & spacing

- Spacing scale: `4 8 12 16 20 24 32 40 48 64 80 96 128 160` (4px base, exposed as `space-*` tokens).
- Section rhythm: 96–160px desktop vertical padding; 64px mobile. Sections alternate surface tokens (`paper → mist → paper → sand → inverse`) to create "lagoon depth bands" without decorative dividers.
- Grid: 12 col / max 1320px / 32px gutter desktop; 8 col tablet; 4 col mobile, 20px outer padding. Asymmetric compositions allowed only on the 12-col grid (e.g., 7+5, 5+7, 4+8 splits); mobile collapses to single column in deliberate reading order.
- Container utilities: `container-prose` (720px) for long-form stories; `container-wide` (1320px).

---

## 5. Elevation, radius, borders

- **Radius:** `radius-sm 4px` (inputs), `radius-md 8px` (cards, buttons), `radius-lg 16px` (media wells only). No pill buttons. No excessive rounding (anti-pattern #9 in DESIGN.md).
- **Elevation is colour-first, shadow-second:** sunken sections use mist fill before any shadow. Shadows: single soft token `shadow-raised: 0 1px 2px rgb(16 32 30 / 0.06), 0 8px 24px rgb(16 32 30 / 0.08)` — used sparingly, never on dark fields.
- **Borders:** 1px `--color-border-subtle` on cards; 1px `--color-border-strong` on interactive resting states; 2px `--color-focus-ring` on `:focus-visible` with 2px offset.

---

## 6. Interactive grammar (button/link matrix)

| Variant | Surface | Text | Use |
|---|---|---|---|
| `button-primary` | terra | cloud | Max ONE per viewport section |
| `button-secondary` | transparent, 1px ink border | ink | Second action |
| `button-on-dark` | paper | forest | CTA on forest/ink fields |
| `button-quiet` | transparent | forest + underline offset 3px | Tertiary/navigation-ish |
| `link-article` | n/a | ink, underline animates in on hover | In-prose links |

- Min height 48px desktop / 44px touch; padding 12px 24px.
- Hover: 150ms background/translate (≤2px lift only on cards, never buttons).
- Focus-visible: 2px terra ring + offset, never `outline: none` without replacement.
- Disabled: 40% opacity + `cursor: not-allowed` + `aria-disabled` where semantics require.

---

## 7. Media contract

Enforced ratios (prevents CLS and keeps mosaics coherent):

| Pattern | Ratio | Notes |
|---|---|---|
| Full-bleed story | 16:9 (crop 21:9 ≥1440px) | `sizes="100vw"` |
| Editorial mosaic lead | 4:5 | `sizes="(min-width:1024px) 60vw, 100vw"` |
| Mosaic satellites | 1:1 and 3:2 | lazy-loaded, `loading="lazy"` |
| Split narrative | 3:2 or 4:5 | `decoding="async"` |
| Evidence strip support | 16:9 | optional, may hide on mobile |
| Cards (programme/story) | 3:2 | fixed height rows |

- `next/image` everywhere; AVIF/WebP via default loader; no `unoptimized`.
- All content images require authored alt text (CMS field is mandatory, not optional).
- Grain/texture overlays via CSS `background-image` data-URI at ≤5% opacity — never baked into imagery.
- No text inside images. Ever.

---

## 8. Motion

Tokens:

```css
--duration-fast: 150ms;   /* hover, focus */
--duration-base: 250ms;   /* default transition */
--duration-slow: 350ms;   /* section entrances */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* editorial deceleration */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
```

Allowed: image reveal (clip-path or opacity, ≤350ms), hover transitions, gentle staggered section entrance (IntersectionObserver, once), number count-up (ImpactMetric, off by default with reduced motion), horizontal image drift.
Banned: parallax stacking, bouncing springs, cursor effects, autoplay video with sound, scroll-jacking, animation that delays content access.

**Gate:** every JS-driven animation checks `prefers-reduced-motion` and renders final state immediately. CSS transitions live inside `@media (prefers-reduced-motion: no-preference)` or have instant fallbacks.

---

## 9. Composition vocabulary (Nordic Lagoon patterns)

Named, reusable section layouts — pages are sequences of these, never ad-hoc grids:

1. **Shoreline** — full-bleed hero: display headline on paper or forest, image right/below, eyebrow + 2 CTAs.
2. **Depth Band** — alternating surface-colour full-width band carrying a single idea (statement + supporting media).
3. **Mosaic** — 1×(4:5) lead + 3 satellites, asymmetric offsets on the 12-col grid.
4. **Split Narrative** — 5/7 text/media split; media may bleed to viewport edge.
5. **Evidence Shoreline** — metric row (2–4 ImpactMetrics, tabular numerals) + optional supporting image.
6. **Ledger** — editorial list rows (report list, event list): title / meta / action, hairline dividers, no cards.
7. **Quiet Close** — small centred statement + one CTA on inverse (ink) field. Ends every page.

Each pattern accepts `surface` and `reversed` props; nothing else may vary per instance.

---

## 10. Token implementation (`app/globals.css` — authoritative)

```css
@import "tailwindcss";

@theme inline {
  --color-ink: #10201E;
  --color-forest: #123E3A;
  --color-pine: #1B524C;
  --color-teal: #5E8780;
  --color-teal-soft: #8FA9A3;
  --color-mist: #DCE8E5;
  --color-mist-deep: #C8D8D4;
  --color-paper: #F7F3EA;
  --color-sand: #D8C8AE;
  --color-sand-soft: #EADFC9;
  --color-terra: #C85B3F;
  --color-terra-deep: #A8462F;
  --color-marigold: #D7A43A;
  --color-cloud: #FFFFFF;
  --color-stone: #6F7672;
  --color-stone-deep: #4A524E;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --text-display-xl: clamp(2.75rem, 1.9rem + 3.4vw, 5.5rem);
  --text-display-l: clamp(2.25rem, 1.6rem + 2.6vw, 4rem);
  --text-h1: clamp(2rem, 1.5rem + 1.8vw, 3.25rem);
  --text-h2: clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);
  --text-h3: clamp(1.375rem, 1.2rem + 0.6vw, 1.875rem);
  --text-body: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
  --text-small: 0.9375rem;
  --text-caption: 0.875rem;
  --text-eyebrow: 0.8125rem;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-raised: 0 1px 2px rgb(16 32 30 / 0.06), 0 8px 24px rgb(16 32 30 / 0.08);

  --animate-reveal: reveal 350ms var(--ease-out) both;

  @keyframes reveal {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Semantic aliases (`--color-surface` etc.) are defined as CSS custom properties consumed by component classes in `@layer components`; Tailwind v4 colour utilities reference primitives directly (e.g., `bg-forest`, `text-stone`).

---

## 11. Do / Don't (Nordic Lagoon)

**Do:** let whitespace do the branding; alternate depth bands; use Fraunces for one emphatic headline per view; tabular numerals for evidence; hairline borders instead of shadows; allow images to breathe at 4:5.
**Don't:** gradient decoration; glassmorphism; pill CTAs; card grids for everything; terracotta backgrounds; marigold text; drop-shadow stacks; scroll-hijack; emoji/icons as decoration in editorial sections; more than one accent element per viewport.
