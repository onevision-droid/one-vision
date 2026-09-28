# DESIGN.md — One Vision Design System

## 1. Design thesis

**One Vision is a crisis beacon: stark, data-heavy, utilitarian. Every pixel must serve survival, coordination, or truth. Urgency and resilience over spectacle.**

The visual system combines:
- the high-contrast, dashboard-like composition of frontline humanitarian operations (MSF, ICRC field reporting);
- the data integrity and transparency of crisis data platforms;
- the accessibility and cognitive-load awareness of emergency communication systems;
- a distinct Imphal/Manipur operational context.

Do not soften this system. It is not a marketing site. It is a public data beacon for a polycrisis zone.

## 2. Brand personality

Three words:
**Stark · Resilient · Accountable**

Supporting traits:
- urgent, not performative;
- factual, not emotional;
- utilitarian, not decorative;
- transparent, not polished;
- local, not generic.

## 3. Logo direction

### Primary concept: The Open V

Typography-led wordmark:

**ONE VISION**

The "V" is the visual anchor. Two clean strokes suggesting convergence, collective action, forward movement.

The mark must work in one colour at any size. Brutalist — no rounded treatments, no embellishments.

Avoid:
- generic hands, globes, hearts, puzzle pieces;
- literal eye icons;
- NGO clip-art;
- complex emblems;
- any rounded or soft treatment.

### Lockups

1. Horizontal: symbol/wordmark + descriptor
2. Wordmark-only
3. Compact V monogram
4. One-colour stamp for documents/social avatars

## 4. Colour system

### Core palette (Utilitarian Emergency)

| Token | Hex | Role |
|---|---|---|
| Paper | #FAFAFA | Primary base (off-white, prevents halation) |
| Surface | #FFFFFF | Raised cards/elements |
| Ink 900 | #171717 | Primary text, headers |
| Ink 700 | #262626 | Body text |
| Ink 500 | #525252 | Muted text, secondary |
| Ink 300 | #A3A3A3 | Disabled/captions |
| Ink 100 | #E5E5E5 | Borders, dividers |
| Safety Orange | #F97316 | Primary action, urgency |
| Safety Orange Dim | #EA580C | Action hover |
| Alert Red | #DC2626 | Critical/destructive |
| Field Black | #171717 | Inverted backgrounds |
| Hazard Yellow | #EAB308 | Warning state |
| Status Active | #16A34A | Operational status |

### Usage ratio

- 60% Paper/Surface/Ink (neutral base);
- 25% Field Black (inverted sections, header, footer);
- 10% Safety Orange (action, urgency);
- 5% Alert Red/Status Active (status indicators only).

Safety Orange is the primary accent. It marks actions and urgency. Alert Red is reserved for critical states. Do not use accent colours decoratively.

## 5. Typography

**UI/Body:** Inter — utilitarian grotesk sans-serif
**Data/Metrics:** JetBrains Mono or IBM Plex Mono — for all numerical data, stats, codes, reference IDs

No serif fonts. The editorial serif era is deprecated.

Typography hierarchy:
- Display XL: 72px desktop, fluid scale to ~40px mobile;
- Display LG: 56px desktop;
- Display MD: 40px desktop;
- Heading XL: 32px;
- Heading LG: 24px;
- Heading MD: 20px;
- Body LG: 18px;
- Body: 16px;
- Body SM: 14px;
- Label: 12px uppercase tracking-widest;
- Caption: 12px.

Mobile sizes should scale fluidly using `clamp()`, not abrupt breakpoint jumps.

## 6. Grid

Desktop:
- 12-column grid;
- max content width: 1200px;
- 24–32px gutters.

Tablet:
- 8 columns.

Mobile:
- 4 columns;
- 20px outer padding.

Use dense, dashboard-like compositions. Minimise negative space in favour of vital data.

## 7. Spacing

Base unit: 4px.

Common values:
4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

Sections should use 64–96px vertical spacing. No "editorial breathing room" — density is a feature.

## 8. Photography direction

Photography must feel documentary and operationally secure.

Required:
- real field operations;
- anonymised subjects (hands, environments, blurred faces);
- equipment, infrastructure, solar arrays, health stations;
- data displays, maps, operational dashboards;
- before/after only when genuinely meaningful.

Forbidden:
- exploitative suffering imagery;
- generic stock charity scenes;
- posed group photos;
- over-saturated filters;
- exact geographic coordinates of vulnerable sites in metadata.

All photography must pass OpSec review before publication.

## 9. Border radius

**Zero everywhere.** Brutalist mandate.

`border-radius: 0px` is enforced globally via `!important`. Do not use `rounded-*` Tailwind classes. They are dead code.

## 10. Motion

Motion budget is minimal. This site targets inexpensive phones and slow connections.

Allowed:
- 150–250ms hover transitions (opacity, background-color);
- state-change feedback (button press, toast entry, focus ring) at ~100ms;
- subtle section entrance (opacity 0→1, no spatial transform).

Forbidden:
- parallax;
- spring physics;
- staggered reveals;
- scroll-driven transforms;
- any animation that delays access to content;
- any animation that adds >5KB to the JS bundle.

Respect `prefers-reduced-motion`:
- Decorative animations: disabled entirely;
- State-change feedback: preserved at ~100ms;
- Never use a global 0.01ms kill switch — it destroys useful feedback.

## 11. Header

Desktop:
- ONE VISION wordmark left;
- Navigation items: Field Reports, The 4 Pillars, Secure Contact, About;
- "Deploy Support" action button (right);
- Search (Cmd+K).

Mobile:
- Wordmark;
- Hamburger menu;
- Search icon.

Header must remain under 64px height. Fixed position with transparent-to-solid scroll treatment.

## 12. Homepage composition

### Section 01 — Hero (Crisis Beacon)
Large utilitarian statement with key metrics.
Actions: Deploy Support, Secure Contact.

**Layout Lock (Immutable):**
- Proportions: Asymmetrical card with `flex-1` content on the left and 1:1 `aspect-square` image container on the right (`lg:h-95 xl:h-100`).
- Sizing: Card height strictly locked to `380px` (`lg:h-95`) and `400px` (`xl:h-100`).
- Section Clearance: `pt-24 md:pt-26 lg:pt-28 pb-4 md:pb-6 lg:pb-6` ensuring full viewport fit on compact laptop displays (1280x585) without vertical scroll.
- Rule: Layout, geometry, height, and width are permanently frozen across all pages (`Hero.tsx` and `PageHero.tsx`). Only internal content may change.

### Section 02 — Key Metrics (StatsHero)
Q3 2026 ground reality data. Verifiable, dated, sourced.

### Section 03 — The 4 Pillars (ProgrammesBento)
Operational dashboard: Health Equity, Energy Sovereignty, Ecological Restoration, Economic Dignity.
Each pillar shows: status, metric, description, link.

### Section 04 — Ground Reality (WhatWeDo)
Current deployments and active operations.

### Section 05 — Field Report (SplitNarrative)
One featured story with anonymised imagery.

### Section 06 — Secure Routing
Link to /get-help with OpSec messaging. This is the core differentiator.

### Section 07 — Trust & Transparency
Governance, funding deployment, reports, open ledger links.

### Section 08 — Closing CTA (QuietClose)
Single clear action: Deploy Support.

## 13. Information architecture

Top-level routes:

/
 /about
 /programmes
 /programmes/[slug]
 /campaigns
 /campaigns/[slug]
 /stories
 /stories/[slug]
 /get-help (Secure Contact — routes to Signal/ProtonMail)
 /volunteer
 /donate
 /events
 /reports
 /open-ledger
 /contact
 /search
 /privacy
 /accessibility
 /terms

## 14. Get Help / Secure Contact

**No in-app intake forms.** All sensitive communications route to:
1. Signal (recommended, end-to-end encrypted);
2. ProtonMail (for detailed case submissions);
3. Field phone (non-sensitive only).

The page must explain:
- why web forms are not used (active surveillance);
- what to include in messages;
- what NOT to include (GPS, full names, diagnoses);
- expected response times.

## 15. Donation experience

Design for trust:
- explain what donations support (which pillar/operation);
- one-time donations (recurring when legally cleared);
- fee transparency;
- organisation identity and registration;
- route to certified payment gateway;
- never store card/UPI details in-app.

## 16. Forms

All forms follow a single pattern:
- Labels: `text-body-sm font-semibold text-ink-900 uppercase tracking-widest`
- Inputs: `h-12` height, `border-border-default`, `bg-transparent`
- Submit: `<Button variant="primary">` with Lucide arrow icon
- Honeypot: `name="ov_system_field"`, `sr-only`, `aria-hidden`
- Validation: Zod schema, inline error messages

## 17. Accessibility

Minimum target: WCAG 2.2 AA.
Required:
- stark contrast ratios (4.5:1 minimum for text);
- semantic headings and landmarks;
- `<main id="main-content">` target for skip link;
- clear, unambiguous labels;
- no information conveyed by colour alone;
- 44×44px minimum touch targets;
- keyboard navigation with visible focus indicators;
- `prefers-reduced-motion` respected intentionally.

## 18. Content rules

See CONTENT.md for full editorial system.
Key: factual, urgent, evidence-led. No marketing language.

## 19. Design anti-patterns

Do not:
- modify or alter the Hero section layout, height, width, padding, or 1:1 image aspect ratio (layout is permanently locked);
- use rounded corners anywhere;
- use gradients as decoration;
- use serif fonts;
- use generic charity imagery;
- use excessive shadows;
- make every CTA red;
- bury contact information;
- create fake impact numbers;
- collect sensitive data in web forms;
- add animations that delay content access;
- use parallax or spring physics;
- load unnecessary font weights.
