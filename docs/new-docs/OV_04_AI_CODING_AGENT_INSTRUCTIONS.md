<!-- DEPRECATED: This document references the prior design era (Nordic Lagom / Fraunces serif). The canonical design system is now /DESIGN.md (Frontline Humanitarian mandate). -->

# One Vision — Instructions for the AI Coding Agent
**Use:** paste the Master Prompt below into your coding agent's first message, then run each Phase Prompt in order. The agent must have the repo, `OV_02_DESIGN_REGISTRY.md`, and `design-tokens.json`.

---

## MASTER PROMPT (paste first)

```
You are a senior design-systems engineer working on "One Vision", a Next.js + Tailwind
NGO website (Imphal, Manipur). The site's UI has drifted: 7 button styles, 5 pill styles,
2 typefaces with no roles, 4 background families, orphan grids, conflicting content.

Your single source of truth is docs/design-registry.md (human) + design-tokens.json
(machine). Read BOTH before touching code.

ABSOLUTE RULES — violating any is a failed task:
1. NO hardcoded hex values, font names, px spacing, radii, or shadows outside
   tailwind.config + design-tokens.json. All styling via tokens/Tailwind classes.
2. Exactly 2 typefaces: Inter (UI/body) and Fraunces (display: page H1s, pull quotes,
   stat numerals ONLY). Serif never below 20px.
3. Exactly 4 button variants exist: primary, secondary, ghost, link. Delete every other.
4. One accent color (clay #B85C33) — decorative use only. Navy #1B3A5B = actions/links.
   NEVER use pure black or pure blue. Dark sections = ink-900 #16140F only.
5. All spacing on the 4pt scale (4/8/12/16/24/32/48/64/96/128). Section padding 96 desktop,
   64 mobile, via the <Section> component only.
6. Media uses ratio slots only: hero-media 3:2, card-media 4:3, story-media 16:9,
   avatar 1:1 — object-fit: cover. Never squash. Radii: 0/4/8/pill only.
7. Locale is en-GB: "programmes", "organised". Dates like "12 October 2024".
8. Org facts, stats, contacts, footer nav come ONLY from content/org.json. Never type
   registration numbers, emails, phones, or statistics as literals.
9. One <h1> per page. Uppercase text only via the `label` style (12px, +0.08em).
10. a11y: WCAG 2.2 AA — contrast ≥ 4.5:1, 44px targets, visible 2px clay focus rings,
    prefers-reduced-motion respected, alt text on all images.
11. If a value you need is missing from the registry: STOP, propose the token in your
    summary, and use the nearest existing token meanwhile. Never invent silently.

WORKFLOW (strict order — do not skip phases):
  Phase 0 tokens+primitives → Phase 1 shell/grids → Phase 2 components →
  Phase 3 pages → Phase 4 imagery → Phase 5 content → Phase 6 a11y/QA → Phase 7 polish.
After each phase: run `npm run build` and `npm run lint`; fix all errors; produce a
screenshot set (1440px) of every changed page and a change list.

DEFINITION OF DONE for every task: build passes, lint passes, zero hardcoded values in
changed files (`grep -nE "#[0-9a-fA-F]{6}" <changed files>` must return nothing),
registry checklist below passes.

REGISTRY PR CHECKLIST (run mentally per page):
[ ] Footer nav identical on all routes (from content/org.json)
[ ] Buttons ∈ {primary, secondary, ghost, link}; one primary action per view
[ ] Pills use the single Pill component (2 tones max)
[ ] Cards ∈ {default, flat, inverted}
[ ] Fonts: Inter everywhere except approved display-* roles (Fraunces)
[ ] Spacing on 4pt scale; sections via <Section tone> with correct padding
[ ] Images in ratio slots, alt text present, no distortion
[ ] No forbidden colors (pure black/blue/cool grays), no colored icon fills
[ ] One H1; eyebrows/labels use `label` token; sentence-case buttons
[ ] en-GB copy; stats/facts imported from content/org.json
[ ] Interactive elements ≥44px hit area with visible focus ring
Start by reading the registry docs and the current tailwind.config, then implement Phase 0.
```

---

## PHASE PROMPTS (run in order; each assumes previous done)

**Phase 0 — Foundations**
```
Implement design-tokens.json into tailwind.config (colors, spacing, radii, fontFamily,
boxShadow, transitionDuration). Create primitives: <Section tone="page|alt|inverted">,
<Eyebrow>, <Container>. Replace all literal dark backgrounds with ink-900 (no pure black).
Convert footer to render nav from content/org.json → footerNav; verify all routes share it.
Create content/org.json from current site facts (reg MN/1234/2020, contact
contact@onevision.org / +91 98765 43210, footerNav list of 8, stats dictionary with ids
patients-treated 4500+, communities-reached 45, youth-enrolled 320, camps-supported 12).
Disable the Next.js dev indicator in non-dev environments. Acceptance: zero raw hex in
components/; footer identical on all pages; build+lint green.
```

**Phase 1 — Shell & grids**
```
Fix every orphan grid: (1) /what-we-do — 4 programme cards in a completed 4-col (xl) / 2×2
(md) grid with equal heights; (2) /get-help — 5 support options in an intentional 5-col (lg)
or 2+3 completed rows; (3) /volunteer — areas of interest as a single vertical checkbox
stack. Standardize section rhythm: alternate page/alt tones by section index; max ONE
inverted (dark) section per page. Replace hero + Transparent Outcomes stats with stat-inline
(hairline top, Fraunces numeral, 12px tracked label, dividers between). Remove the CTA grid
texture. Acceptance: no stranded grid item at 1440/1024/768/375 (verify each breakpoint).
```

**Phase 2 — Components**
```
Build ui components: Button (variants primary/secondary/ghost/link × sizes sm/md/lg,
sentence case, icon-right optional, full-width only in forms), Pill (tones default/
inverted, optional clay dot), Card (default/flat/inverted), Input (48px, r-sm, bordered,
focus ring, label above, placeholder only — never prefilled values), Stat (inline/card),
Eyebrow. Migrate ALL existing usages: uppercase navy buttons → primary; outline ↗ →
secondary; text arrows → ghost; in-text → link; the black "Read full story" pill →
primary. Replace all 5 pill styles. Converge Governance + Team cards to Card default.
Replace Home "Community Support In Action" mock-UI screenshot cards with three Card
default cards (Lucide icon, heading, one line). Standardize all icons: Lucide 1.5px,
ink-900 or navy-600, optional neutral circle; delete every blue/tinted icon. Delete any
remaining component not in this list. Acceptance: grep finds no other button/pill/card
implementations; Storybook/stories file for each.
```

**Phase 3 — Pages (batched)**
```
Batch A — Programme detail template (applies to 4 routes): remove the giant stat box;
render stats as Stat cards (max 2, content width); move "Current Status: Active" into a
Pill with clay dot in the eyebrow row; add "Other programmes" 3-card cross-link row and a
ghost "Support this programme" link; unify title to display-lg serif, VOLUNTEER CTA →
primary, second CTA secondary.
Batch B — Home: hero → display-lg, primary+secondary buttons, stat-inline row; merge the
two card dialects into card-media (4:3) default cards; Mission block → Section alt + ghost.
Batch C — Stories: featured image → story-media 16:9 r-md; bylines to caption token,
en-GB dates; Read full story → primary. Get Help: inputs → Input spec; RESET → link.
Volunteer: SAFETY FIRST → Eyebrow (paper on dark); submit → full-width primary.
Batch D — About/Donate/Team/Governance: facts from org.json; remove prefilled PII values
→ placeholders; breadcrumbs on all depth≥2 pages; Team cards → Card default, strict 2-col
grid; Governance lead cards → Card default.
Batch E — School Aushadhi Lab: swap blue icons → navy Lucide; zone titles → heading-lg
sans; build a tokenized Table (line rows, 16px padding); pills/buttons → registry
components; extract Timeline component (filled dot = completed, hollow = upcoming) for the
5-year roadmap; break dense copy with Section alt; Lagom quote → display-md pull quote.
Acceptance per batch: screenshots 1440px + checklist + build/lint green.
```

**Phase 4 — Imagery**
```
Audit every <Image>/img: assign each to a ratio slot (hero-media 3:2, card-media 4:3,
story-media 16:9, avatar 1:1) with fixed aspect boxes (no CLS); ensure object-cover with
sensible focal points; fix the squashed Home hero image. Add descriptive alt text to all
images. Where source files allow, re-export as WebP @2x (heroes ≥1600px, cards ≥1200px,
quality ≥80) to kill dithering artifacts — prioritize the 6 most-visible images if masters
are unavailable.
```

**Phase 5 — Content integrity**
```
Replace every literal registration number, email, phone, address with imports from
content/org.json (fixes the #123456 vs MN/1234/2020 conflict). Enforce the stats
dictionary: each stat id has ONE canonical meaning; pages import by id — resolve the
"4,500+ people reached vs patients treated" conflict by defining it once
(recommendation: patients-treated, cumulative, sourced to Mobile Health Clinics).
Locale sweep: en-GB spellings and date formats site-wide; auto copyright year.
```

**Phase 6 — A11y & QA**
```
Contrast audit (axe + manual): bump any text < 4.5:1. Focus-visible: 2px clay ring on all
interactive elements; keyboard-complete the get-help wizard and all forms. Hit areas ≥44px
(footer links, icon rows, pills). prefers-reduced-motion honored. Lighthouse CI budgets:
a11y ≥95, perf ≥90, best-practices ≥95 on all routes; axe scan: zero serious/critical.
Responsive pass at 1440/1024/768/375 on every page; re-verify no orphan grids wrap.
```

**Phase 7 — Polish**
```
Transitions to tokens (150/250ms, transform/opacity only). Subset fonts + font-display
swap; preload hero images; lazy-load below-fold. Remove any decorative hover effects that
add noise (Lagom: prefer none). Final pass: compare every page against the audit's Lagom
scorecard; fix any remaining ✗. Produce final screenshot set + changelog.
```

---

## Anti-patterns to explicitly forbid the agent
- "Just this once" hardcoding a hex/px value → fail.
- Adding a 5th button "temporarily" → fail.
- Using serif for card titles or body → fail.
- Cool gray (`gray-100/200`) surfaces → fail; use `paper`/`alt` (`#F2EFE8`).
- Colored icon fills, emoji icons, or icon fonts → fail.
- Hiding the giant stat box with `hidden` instead of replacing the component → fail.
- Editing copy locale to en-US, or typing facts by hand instead of importing org.json.
- CSS `!important`, inline `style=` props for visual values.

## If the agent gets stuck
- Missing token → it must propose the addition (name, value, rationale) and continue with nearest token.
- Conflicting instructions elsewhere in the repo (old docs, comments) → registry wins; report the conflict.
- Unclear which variant a UI element should be → `secondary` for actions, `link` for in-text; flag in summary.
