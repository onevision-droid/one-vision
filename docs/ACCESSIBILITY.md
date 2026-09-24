# ACCESSIBILITY.md — One Vision

## Target

WCAG 2.2 AA — intent, not just checklist compliance.

## Principles

1. Accessibility is acceptance criteria, not a follow-up task.
2. Every interactive element must be keyboard-operable with visible focus.
3. Content must be perceivable without relying on colour alone.
4. The site must remain functional on assistive technology.
5. Low-bandwidth and low-spec devices are first-class targets.

## Structural requirements

### Landmarks & headings
- `<header>` with `<nav>` for site navigation
- `<main id="main">` for primary content
- `<footer>` for site footer
- Single `<h1>` per page
- Proper heading hierarchy (no skipped levels)
- `aria-labelledby` on sections with headings

### Skip link
- First focusable element in the DOM
- Visible on `:focus`
- Target: `#main`

### Focus management
- Global focus-visible ring: 2px `--color-terra` + 2px offset
- Never `outline: none` without a replacement
- Focus returns to trigger after modal/dialog close
- Form errors: focus moves to first error or error summary

## Contrast rules

| Combination | Ratio | Usage |
|---|---|---|
| Ink (#10201E) on Paper (#F7F3EA) | ~17:1 | Body text — passes AAA |
| Stone (#6F7672) on Paper (#F7F3EA) | ~4.6:1 | Secondary text — passes AA |
| Terra (#C85B3F) on Paper (#F7F3EA) | ~4.6:1 | **Large text only** (≥18.66px bold or ≥24px regular) |
| Marigold (#D7A43A) on Paper (#F7F3EA) | ~2.2:1 | **Never for text** — graphics/icons on dark fields only |
| Mist (#DCE8E5) on Forest (#123E3A) | ~5.6:1 | Text on dark sections — passes AA |
| Paper (#F7F3EA) on Forest (#123E3A) | ~8.5:1 | CTA text on dark sections — passes AAA |

## Reduced motion

- All CSS animations inside `@media (prefers-reduced-motion: no-preference)` or with instant fallbacks
- All JS-driven animations check `prefers-reduced-motion` via `matchMedia` and render final state immediately when reduced
- Count-up animations (ImpactMetric) disabled by default under reduced motion

## Touch targets

- Minimum 48×48px desktop, 44×44px mobile
- Navigation links, buttons, cards, and form controls must meet this minimum
- Enforced as a design token

## Forms

- Every input has a visible `<label>` (not placeholder-only)
- Error messages use `aria-describedby` linking to the input
- Error summaries use `role="alert"` for screen-reader announcement
- Focus moves to first error on submit failure
- Required fields use `aria-required="true"`
- Progressive disclosure steps announce new content

## Modals & dialogs

- Focus trapped while open
- ESC closes
- Focus returns to trigger element on close
- `aria-modal="true"` and appropriate role
- Body scroll locked while open

## Images & media

- All content images require authored `alt` text (CMS field is mandatory)
- Decorative images use `alt=""`
- No text inside images
- Video: captions/transcripts for meaningful content
- No autoplay video with sound

## Testing protocol

### Automated
- axe-core scan on every page (target: 0 critical/serious violations)
- Lighthouse accessibility score ≥ 95

### Manual keyboard pass
- [ ] Tab through entire page — all interactive elements reachable
- [ ] Visible focus ring on every focused element
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys navigate within radio groups, tabs, accordions
- [ ] ESC closes modals, sheets, dropdowns
- [ ] Skip link works and is visible on focus
- [ ] Forms completable by keyboard alone

### Screen reader
- Spot check with NVDA (Windows) and VoiceOver (macOS/iOS) on:
  1. Homepage navigation and hero
  2. Support Finder (Get Help) complete flow
  3. Volunteer form submission

### Responsive
- Test at 320px, 375px, 768px, 1024px, 1440px
- No horizontal scroll at any breakpoint
- Touch targets remain ≥ 44px on mobile

## Accessibility statement page

Route: `/accessibility`

Content:
- Commitment to WCAG 2.2 AA
- Known limitations (if any)
- How to report accessibility issues
- Contact information
- Date of last review
