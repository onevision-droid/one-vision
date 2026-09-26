# Changelog

## Overview
This changelog details the comprehensive transition of "One Vision" from inconsistent, generic Tailwind/Shadcn styling to a strict, token-based design system compliant with the One Vision Design Registry (`OV_02_DESIGN_REGISTRY.md`).

## Phase 0: Design Tokens & Shell
- Added `design-tokens.json` to act as the single source of truth for all spacing, colors, and typography.
- Updated `tailwind.config.ts` to consume design tokens, mapping them to `bg-surface`, `text-primary`, `font-serif`, etc.
- Removed legacy unapproved colors (pure black, pure blue, hex values not in palette).
- Created `Shell.tsx` (`<Section>` and `<Container>`) to enforce strict vertical rhythm and horizontal boundaries (4pt grid).

## Phase 1: Grid & Spacing Refactoring
- Migrated legacy `px`, `rem`, and custom paddings (e.g. `py-24`, `px-8`) to `Section` and `Container` equivalents.
- Audited layout files (`app/layout.tsx`, `page.tsx`) to implement the `Section` wrapper where needed.
- Enforced 4pt scale across component spacings.

## Phase 2: Component Overhaul
- **Button**: Stripped 7 generic variants to 4 strict registry variants: `primary`, `secondary`, `ghost`, `link`. Unified heights mapping to token variables (`sm`, `md`, `lg`).
- **Badge/Pill**: Dropped 5 styles to favor 2 strict tones: `default` and `inverted`. Implemented `hasDot` feature.
- **Card**: Forced `rounded-none`, unified paddings to token scale (24px default).
- **Forms**: Enforced `min-h-touch-target` (44px) across `input`, `textarea`, `select`, `checkbox`. Standardized focus rings to `outline-focus` instead of generic `ring`.

## Phase 3: Pages & Templates
- Rewrote the `Hero.tsx` component to adopt `<Section>` and `<Container>` wrappers and strict tokens.
- Ported `/about/team/page.tsx` from raw markup to `Section`, `Container`, and `SectionBadge`.
- Confirmed `EvidenceShoreline` and `ImpactMetric` correctly utilize grid requirements (`grid-cols-2`, `md:grid-cols-4`).

## Phase 4: Imagery
- Processed images universally to remove generic rounded corners (`rounded-md`, `rounded-lg`) and custom drop shadows.
- Enforced `rounded-none` and `border-border-default` where appropriate.

## Phase 5: Content & Empty States
- Created a missing `app/not-found.tsx` to handle zero states properly, utilizing the `Section` and `Container` templates alongside basic `AlertCircle` iconography.

## Phase 6: Form & Security (Visuals)
- Transformed legacy form variables (`bg-mist`, `border-forest/20`, `text-forest`) in `VolunteerForm.tsx`, `HelpRequestForm.tsx`, `DonateForm.tsx`, and `SupportFinder.tsx` to the standard registry tokens (`bg-surface-alt`, `border-border-default`, `text-text-primary`, etc.).

## Phase 7: Single Source of Truth for Content
- Created `content/org.json` to act as the single source of truth for the organization's registration numbers, locations, and contact methods according to the Design Registry.
- Refactored `lib/data/site-settings.ts` to source data from `org.json`.
- Updated `/about/page.tsx` to read dynamic data from `org.json` rather than using hardcoded values, and updated its component tokens (e.g. `bg-page`, `text-text-primary`) for registry compliance.
- Removed hardcoded unapproved Tailwind styles from `Footer.tsx` (like `bg-white` and `text-ink/60`) and replaced them with explicit design tokens.

## Conclusion
The codebase now accurately reflects the Nordic Lagom inspired design directives established in the Design Registry. Components are restricted, predictable, and maintain the intended aesthetic of One Vision without reliance on ad-hoc Tailwind styling.
