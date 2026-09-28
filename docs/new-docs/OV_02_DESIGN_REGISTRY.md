<!-- DEPRECATED: This document references the prior design era (Nordic Lagom / Fraunces serif). The canonical design system is now /DESIGN.md (Frontline Humanitarian mandate). -->

# One Vision — Design Registry (Single Source of Truth)
**Status:** v1.0 · **Philosophy:** Nordic Lagom — *fewer, better-defined choices.* Not too much, not too little.
**Rule zero:** Nothing is styled ad hoc. If a value isn't in this registry, it doesn't ship. Missing value → propose a token, get approval, add it here first.

---

## 1. Philosophy Rules (normative)
1. **One accent only.** Clay (`#B85C33`) is the sole warm accent. Navy is primary action, not decoration.
2. **Hairlines over shadows.** Surfaces are flat; separation = 1px `line` borders. Elevation is a rare exception (dropdowns only).
3. **Two typefaces, fixed roles.** Sans = UI & body. Serif = display/editorial only (page H1s, pull quotes, stat numerals). Never swap.
4. **Sentence case everywhere.** No all-caps buttons. Uppercase is reserved for eyebrows/labels at 12px with +0.08em tracking.
5. **4pt grid.** Every spacing value is a multiple of 4.
6. **Grids complete.** Never strand items — if a grid has orphans, change the column count or let one item span.
7. **One dark voice.** Dark sections use exactly `ink-900` with `paper` text — never pure black, always a section-level token decision.
8. **Images are cropped, never squashed.** Fixed aspect slots, `object-fit: cover`, focal point per asset.

---

## 2. Color Tokens

### Primitives
| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAF8F4` | Global page background (warm off-white) |
| `surface` | `#FFFFFF` | Cards, forms, raised content |
| `ink-900` | `#16140F` | Headings, dark sections (warm black — never `#000`) |
| `ink-700` | `#45413A` | Body text |
| `ink-500` | `#6E695F` | Secondary text (min 14px, contrast-checked) |
| `ink-300` | `#A39D90` | Captions/meta only ≥ 4.6:1 on paper → verified 4.7:1 |
| `line` | `#E6E1D6` | Hairline borders, dividers |
| `line-strong` | `#CFC8BA` | Input borders, table rules |
| `navy-600` | `#1B3A5B` | Primary buttons, links, role labels |
| `navy-800` | `#122A44` | Hover/pressed, dark navy text |
| `clay-500` | `#B85C33` | **The only accent** — stat numerals (optional), focus accents, active dots |
| `moss-400` | `#5C6B54` | Reserved for illustration palette reference only — **never a UI color** |
| `danger` | `#A62B1F` | Status "Active"/errors only |

### Semantic
| Token | Value | Use |
|---|---|---|
| `bg-page` | `paper` | Page background |
| `bg-section-alt` | `#F2EFE8` | Alternating section (only via `<Section tone="alt">`) |
| `bg-inverted` | `ink-900` | Dark sections |
| `text-primary` | `ink-900` | H1–H3 |
| `text-body` | `ink-700` | Paragraphs |
| `text-muted` | `ink-500` | Secondary (never below 14px) |
| `text-caption` | `ink-300` | Meta only (never interactive) |
| `text-inverted` | `paper` | On dark |
| `action-primary` | `navy-600` | Buttons/links |
| `action-hover` | `navy-800` | Hover |
| `focus-ring` | `clay-500` @ 40% | Focus visible (2px) |
| `border-default` | `line` | Cards, dividers |
| `border-input` | `line-strong` | Form fields |

**Forbidden:** pure black, pure blue (`#0000FF`-family blues, incl. the ov-13 icon blue `#2E5AAC`), `bg-gray-100`-style cool grays, any hex not listed above.

---

## 3. Typography

**Families** (self-host, `font-display: swap`):
- Sans — `Inter` (UI, body, buttons, labels).
- Serif — `Fraunces` (display only: page H1, pull quotes, stat numerals, story titles).

**Roles (non-negotiable):**
| Role | Font | Size / line | Weight | Letter-spacing | Usage |
|---|---|---|---|---|---|
| `display-xl` | Fraunces | 64/68 | 400 | −0.02em | Page H1 (editorial pages) |
| `display-lg` | Fraunces | 48/56 | 400 | −0.02em | Page H1 (utility pages), story titles |
| `display-md` | Fraunces | 32/40 | 400 | −0.01em | Featured story, pull quotes |
| `heading-xl` | Inter | 32/40 | 600 | −0.01em | Section H2 |
| `heading-lg` | Inter | 24/32 | 600 | 0 | Card titles, H3 |
| `heading-md` | Inter | 20/28 | 600 | 0 | H4, form section titles |
| `body-lg` | Inter | 18/28 | 400 | 0 | Hero leads |
| `body` | Inter | 16/26 | 400 | 0 | Default paragraphs |
| `body-sm` | Inter | 14/22 | 400 | 0 | Dense text, card bodies |
| `label` | Inter | 12/16 | 600 | +0.08em, uppercase | Eyebrows, role labels, stat labels |
| `caption` | Inter | 12/16 | 400 | +0.02em | Meta, bylines, legal |

**Rules:** one H1 per page; measure ≤ 65ch; serif never below 20px; uppercase text only via `label`.

---

## 4. Spacing, Radius, Elevation, Motion

**Spacing scale (4pt):** `1=4 · 2=8 · 3=12 · 4=16 · 5=24 · 6=32 · 7=48 · 8=64 · 9=96 · 10=128`
- Section padding: `py-9` (96) desktop / `py-8` (64) mobile — **always**.
- Container: `max-w-[1200px]`, gutter `24px` (32px ≥ xl).
- Card padding: `p-5` (24); form fields gap `4` (16).

**Radius:** `r-none=0` (images) · `r-sm=4` (inputs) · `r-md=8` (cards) · `r-pill=999` (pills, tags). **No 16/24px radii.**

**Elevation:** `e-0` flat default · `e-1` (dropdown/popover only): `0 8px 24px rgba(22,20,15,.12)`.

**Motion:** durations `fast=150ms · base=250ms`, easing `cubic-bezier(.22,.61,.36,1)`; only transform/opacity; full `prefers-reduced-motion` support.

**Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1440`.

---

## 5. Component Specs

### Button (replaces all 7 variants) — sentence case, weight 500
| Variant | Visual | Height (md) | Use |
|---|---|---|---|
| `primary` | `navy-600` bg, `paper` text, hover `navy-800` | 44px | One primary action per view (SUPPORT, Partner with us) |
| `secondary` | 1px `line-strong` border, `ink-900` text, hover border `navy-600` + text `navy-600` | 44px | Second actions (What we do, Read proposal) |
| `ghost` | transparent, `navy-600` text + arrow icon | 40px | Tertiary/links-to-actions (Explore programmes →) |
| `link` | underlined `navy-600`, hover `navy-800` | n/a | In-text links (View financial audits) |
- Sizes: `sm 36 · md 44 · lg 52`. Icon: `lucide`, 18px, right side only.
- Full-width **only** inside forms. Never a phone number as a button — use `secondary` with phone icon.

### Pill / tag
One component, two tones: `default` (1px `line` border, `ink-700` text, `surface` bg) and `inverted` (`paper/12` bg, `paper` text, on dark). Optional `dot` slot (`clay-500` 6px). Replaces all 5 current styles.

### Card
- `default`: `surface`, 1px `line`, radius `r-md`, padding `24`.
- `flat`: no border, `bg-section-alt` — for grouped text blocks only.
- `inverted`: `ink-900` bg, `paper` text.
- **Killed:** mock-UI screenshot cards, drop-shadow cards, 24px-radius media cards.

### Stat (replaces all 3 stat voices)
- `stat-inline`: hairline-top rule, `label` caption, numeral `Fraunces 48` `ink-900` (optional `clay-500`). Row of N stats with 1px dividers — **used on Home hero & Transparent Outcomes**.
- `stat-card`: compact `default` card, numeral `Fraunces 40`, label `label`, padding 24 — **used on programme pages; max 2 per row, never the giant empty box**.
- One stat = one canonical metric (see Content Registry).

### Form controls
- Input: height 48, `r-sm`, 1px `border-input`, `surface` bg; focus 2px `focus-ring`; label `body-sm` medium above field; placeholder — never prefilled values.
- Segmented toggle (One-time/Monthly): pill container `line` border, active = `navy-600`/`paper`.
- Checkboxes: vertical stack (one column) or true 2-col grid that completes; min hit area 24px box / 44px row.
- Submit: `primary`, full width in forms only.

### Eyebrow
`label` token, format `CATEGORY · CATEGORY` or plain. Replaces "PROGRAMME · HEALTH", "STEP 1 OF 2", "SAFETY FIRST" (in ink, never blue).

### Icons
Lucide only · stroke 1.5 · sizes 16/20/24 · color `ink-900` or `navy-600` only · optional circle = `bg-section-alt` + 40px circle, radius `r-pill`, **no colored tints**.

### Imagery slots (art direction)
| Slot | Ratio | Radius | Notes |
|---|---|---|---|
| `hero-media` | 3:2 | `r-none` | Programme/story heroes |
| `card-media` | 4:3 | `r-none` top-only on cards | All listing cards |
| `story-media` | 16:9 | `r-md` | Stories featured |
| `avatar` | 1:1 | `r-pill` | Initials avatars only (no photos of beneficiaries — dignity rule) |
- Export: WebP + PNG fallback, min 1600px wide for heroes, `@2x`, quality ≥ 80, **no dithering artifacts** — re-export masters.
- `object-fit: cover` with per-asset focal point; alt text required.

### Content Registry (single source of truth — `content/org.json`)
```json
{
  "org": { "name": "One Vision", "legal": "One Vision NGO",
           "regNo": "MN/1234/2020", "location": "Imphal, Manipur, India" },
  "contact": { "email": "contact@onevision.org", "phone": "+91 98765 43210" },
  "locale": "en-GB",
  "stats": [
    { "id": "patients-treated", "value": 4500, "suffix": "+", "label": "Patients treated", "source": "Mobile Health Clinics cumulative" },
    { "id": "communities-reached", "value": 45, "label": "Communities reached" },
    { "id": "youth-enrolled", "value": 320, "label": "Youth enrolled" },
    { "id": "camps-supported", "value": 12, "label": "Camps supported" }
  ],
  "footerNav": ["Programmes","Stories","Get Help","Volunteer","Governance","Our Team","Donate","Contact"],
  "darkSections": { "allowed": true, "rule": "max 1 per page, full-bleed, preceded/followed by paper sections" }
}
```
- Any page showing a stat, reg number, email, or phone must import from this file. Stats are **defined once** — a stat may appear on many pages but means one thing.

---

## 6. Enforcement
1. Tokens live in `tailwind.config` (colors/spacing/radii pulled from `design-tokens.json`) — **class names only, zero hardcoded hex/px** outside config.
2. Lint: stylelint rule bans raw hex in components; a CI grep fails the build on `#` color literals outside tokens.
3. PR checklist: footer nav = registry list · one H1 · buttons ∈ 4 variants · images ∈ ratio slots · no forbidden colors · locale en-GB.
4. Registry changes require a PR that edits this file + `design-tokens.json` together.
