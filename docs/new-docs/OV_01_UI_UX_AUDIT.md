# One Vision — Full UI/UX Audit Report
**Date:** 2026-09-24 · **Scope:** 15 desktop screenshots (Home, What We Do ×2, Stories, Get Help, Volunteer, About, Donate, 4× Programme detail, School Aushadhi Lab, Our Team, Governance)
**Method:** Heuristic evaluation (Nielsen 10), Lagom design-language audit, content-integrity cross-check, accessibility spot-check.
**Note:** Every screenshot shows the Next.js dev-tools badge (the "N" circle). It is a dev artifact — disable it in production builds and never include it in design screenshots.

---

## 1. Executive Summary

**Overall design-consistency score: 2.5 / 5.** The site has a clear information architecture, a genuinely distinctive illustration style, and a credible Lagom ambition — but **there is no design-token registry**, so every page has quietly invented its own typography, buttons, pills, cards, spacing and backgrounds. The result is 6+ button styles, 4 pill styles, 3 stat-display styles, 4 background families, and 2 typefaces used with no role rules — the exact opposite of "inte för mycket, inte för litet."

### What is working (protect these)
- **Illustration language:** one coherent warm-halftone editorial family (ochre/sage/clay/ink) across all imagery. This is the brand's strongest asset.
- **Header:** consistent on all pages — logo, 5 nav items, navy SUPPORT CTA, active underline.
- **Programme-detail template** (ov-9 → ov-12): one shared layout with eyebrow / serif title / VOLUNTEER CTA / illustration / Impact & Reach.
- **Governance & Team pages:** the most disciplined pages — quiet hierarchy, consistent role labels, restrained color.
- **Footer legal bar:** registration line, legal links, © 2026 block are stable everywhere.

### The five critical failures
| # | Issue | Evidence |
|---|-------|----------|
| C1 | **No design-token registry** — root cause of all drift | Every page differs in type, buttons, pills, radii, backgrounds |
| C2 | **Content conflict: registration number** | About: `NGO Registration #123456` vs Donate: `Reg No: MN/1234/2020` |
| C3 | **Stat integrity failure** | `4,500+` is simultaneously "people reached" (Home) and "patients treated" (Mobile Health) |
| C4 | **Footer navigation parity fails** | Some pages list `Governance · Our Team`, others don't (compare ov-9 vs ov-15 footers) |
| C5 | **Typeface roles undefined** | Page titles: serif on ov-9/ov-13/ov-14, sans on ov-1/ov-6/ov-7 — same element, two voices |

---

## 2. The Lagom Gap — Philosophy Audit

The School Aushadhi Lab page literally quotes the Swedish axiom, yet the site violates it structurally. Lagom is not a color palette — it is **fewer, better-defined choices**.

| Lagom principle | Current state | Verdict |
|---|---|---|
| Restraint ("not too much") | 6+ button variants, 4 pill styles, 4 background families, 3 stat styles, 2 ungoverned typefaces | ✗ |
| Functional equilibrium | Every element has a purpose… except decorative mock-UI cards on Home, one-off textures, centered one-offs | ✗ |
| Visual quiet / clear zoning | Dark blocks (Stories hero, Safety First, Biophysical) drop in with no transition rule; blue accent appears exactly once (ov-13) | ✗ |
| Material honesty | Hairline borders vs drop shadows vs flat — three surface languages | ✗ |
| Just-right density | Stat cards waste ~70% of their box; icon feature rows are cramped; section padding swings 64–160px | ✗ |

**Conclusion:** the site doesn't need more design — it needs **fewer decisions, made once, in a registry.**

---

## 3. Global Systems Audit

### 3.1 Layout & Grid
- No consistent container: hero text column ~520px, Donate form card ~840px, cards ~380px — widths are per-page improvisations.
- **Orphan grid items everywhere:** What We Do = 3 cards + 1 stranded (ov-2/ov-8); Get Help options = 2+2+1 (ov-4); Volunteer checkboxes = 2+2+1 (ov-5). Nothing should be stranded — grids must complete.
- Section vertical rhythm varies wildly (~64px to ~160px); no baseline spacing scale.

### 3.2 Typography (the #1 visible inconsistency)
- Two families in play — a geometric/humanist sans and a high-contrast serif display — with **no assignment rules**:
  - Serif titles: Mobile Health Clinics, School Aushadhi Lab, The Team Behind the Vision, Find Support or Request Assistance, Become a Volunteer, Local Stories.
  - Sans titles: What we do., Fund Community Resilience, Grounded. Human. Forward., Accountable. Community-led., Impact & Reach.
- Ad-hoc scale: heroes at ~64/56/48px; body at 15/16/17px; meta labels at 11–12px with mixed tracking and casing.
- Same element, different voices: page H1 alone appears in both typefaces across the site.

### 3.3 Color
- Good bones: warm paper background, ink text, navy primary — visible on most pages.
- Drift: **blue icons** (ov-13 principles), **light-blue icon circles** (ov-6, ov-7), a **blue "SAFETY FIRST" label** (ov-5), three different near-blacks for dark sections, and at least three grays for secondary text with no token names.
- Red used only for "Active" status — fine, but untokenized.

### 3.4 Components — catalogued variants
| Component | Variants found | Should be |
|---|---|---|
| Button | navy uppercase (SUPPORT, VOLUNTEER FOR THIS), navy + arrow (GET INVOLVED →), outline + arrow (WHAT WE DO ↗), black pill (Read full story), gray text link (Read our manifesto →), full-width navy (Proceed to Payment / Submit Request), left-aligned navy (Submit Application), phone-number pill (+91 98765 43210) | 4 tokens: `primary`, `secondary`, `ghost`, `link` × 2 sizes |
| Pill / tag | dot pill (● Active Initiatives), dot pill dark (● Assistance Portal), plain pill (Project Proposal), gray pill (Our People, Make a Contribution) | 1 component, 2 tones |
| Card | bordered light, borderless, dark, raised mock-UI (Home "In Action"), giant stat box, white form card on gray | 3 tokens: `default`, `flat`, `inverted` |
| Form inputs | gray-fill (Get Help), white with border (Volunteer/Donate), prefixed ₹ input, segmented toggle, checkbox grid | 1 input spec |
| Stat display | hero stat row (Home), giant gray card (programme pages), large sans numbers (Transparent Outcomes) | 1 stat component, 2 sizes |
| Icons | navy line icons, blue solid icons, gray line icons, light-blue circled icons | Lucide, 1.5px stroke, ink or navy only |

### 3.5 Imagery
- Strength: one illustration family, warm halftone, limited palette — keep.
- Failures:
  - **Arbitrary aspect ratios:** hero 4:3, cards 3:2, story ~16:9, avatars 1:1 — no ratio registry; some slots squash images to fit (Home hero).
  - **Corner radii drift:** 0 / 8 / 16 / 24px across cards and heroes.
  - **Dithering/export artifacts** visible in several images (over-compressed PNGs).
  - No focal-point or art-direction rules; alt text unverifiable.

### 3.6 Content Integrity
- **Registration conflict:** `#123456` (About) vs `MN/1234/2020` (Donate). Pick one, single-source it.
- **Stat reuse:** 4,500+ / 45 / 320 appear on Home and again as programme metrics — either one canonical definition each, or distinct numbers.
- **Locale mixing:** "Community support, **organized**." vs "**Organisations** aligned." (same page!). Commit to en-GB (`programmes`, `organised`) — already dominant.
- Contact email/phone are consistent everywhere else. © 2026 consistent.

### 3.7 Accessibility (spot-check)
- Caption/meta text (11–12px gray on gray/white) likely fails 4.5:1 contrast.
- **Donate form prefills fake PII** (`Jane Doe`, `jane@example.com`, `ABCDE1234F`) as *values* — anti-pattern; use placeholders.
- Footer links and icon-row labels have small hit areas (< 44px).
- Focus rings, reduced-motion, alt text: unverifiable from screenshots — must be checked in code.
- One `<h1>` per page appears respected.

---

## 4. Per-Page Audit

### P1 · Home (ov-1) — 2.4/5
- **Working:** clear hero; stats present; "Explore Our Work" 2×2 grid is the best component on the page.
- **Issues:**
  - Hero button pair (filled + outline w/ ↗) doesn't match the uppercase navy language elsewhere. *(M)*
  - Stat labels ("PEOPLE REACHED") are ~11px gray — illegible, unaligned baselines. *(H)*
  - "Community support, organized." 3-col cards mix text-top/image-bottom while "Explore Our Work" uses image-top — two card dialects on one page. *(M)*
  - Icon feature row (Resource Routing…) cramped, tiny icons, no hit area. *(M)*
  - **"Our Mission" centered constellation block is a one-off** centered layout + gray link button ("Read our manifesto →"). *(M)*
  - "Community Support In Action" cards are **mock product-UI screenshots with drop shadows** — visually loud, off-system, un-Lagom. *(H)*
  - "Transparent Outcomes" numbers are huge sans; different stat voice from hero stats. *(M)*
  - CTA band has a one-off grid texture background. *(L)*
  - Hero illustration card + caption ("IMPHAL, MANIPUR / Community resilience in action") is a unique caption style. *(L)*

### P2/P8 · What We Do (ov-2, ov-8) — 2.2/5
- **Working:** card design itself is decent (image-top, ACTIVE eyebrow, arrow).
- **Issues:**
  - **3 + 1 orphan grid** — the flagship consistency failure. Four programmes → 4-col row (desktop) or 2×2; or make the first card featured. *(Critical → C1)*
  - Card images 3:2 here but 4:3 elsewhere. *(H)*
  - "What we do." title in sans contradicts serif titles on sub-pages. *(C5)*

### P3 · Stories (ov-3) — 3.0/5
- **Working:** dark hero is atmospheric; featured story split is a good editorial pattern; "Dignity over spectacle" tone is right.
- **Issues:**
  - Only page with full dark hero — needs a background-rule token, not a one-off. *(M)*
  - "Read full story" **black pill button** — 7th button variant. *(H)*
  - Illustration radius ~24px — largest on site, untokenized. *(M)*
  - Byline styles clash: "By T. Singh" (sentence case) vs "A. SHARMA" / "M. DEVI" (all caps). *(M)*

### P4 · Get Help (ov-4) — 2.6/5
- **Working:** wizard concept ("Step 1 of 2") is genuinely helpful; helpline callout is clear.
- **Issues:**
  - **5 option buttons in a 2-col grid → orphan 5th** ("Other"). Use 5-col, or 2+3 with deliberate spanning. *(H — orphan grids)*
  - Helpline "button" is a phone-number pill — cute, but a new variant; make it a `secondary` button with phone icon. *(M)*
  - RESET link style unique. *(L)*
  - Form inputs gray-filled vs white-bordered elsewhere. *(M)*

### P5 · Volunteer (ov-5) — 2.7/5
- **Working:** testimonial adds warmth; dark "Safety First" section has real presence; governance strip builds trust.
- **Issues:**
  - **"SAFETY FIRST" in blue** — the only blue label on the site. Tokenize or kill. *(H — color drift)*
  - Checkbox grid 2+2+**1 orphan** again. *(H)*
  - "Submit Application" is left-aligned while Donate's equivalent is full-width — one form-button rule needed. *(M)*
  - Illustration card radius (24px) and warm-paper card on gray bg — one-off surface pairing. *(M)*
  - Dark section butts against light sections with no transition rule. *(M)*

### P6 · About (ov-6) — 3.0/5
- **Working:** "Grounded. Human. Forward." has conviction; Transparency & Trust split is clean.
- **Issues:**
  - **`NGO Registration #123456` conflicts with Donate's `MN/1234/2020`. *(Critical → C2)***
  - Light-blue circled icons (Registration, Contact) — icon-tint drift. *(M)*

### P7 · Donate (ov-7) — 3.1/5
- **Working:** most systematic page — numbered form sections, amount grid, trust card, 80G explanation. This is the template to standardize forms against.
- **Issues:**
  - **Prefilled fake PII as input values** (Jane Doe / jane@example.com / ABCDE1234F) — must be placeholders. *(H — a11y/UX)*
  - Only page with breadcrumbs — adopt everywhere or nowhere. *(M)*
  - Icon tints (blue shield, gray doc, gray lock) vs elsewhere. *(M)*

### P9–P12 · Programme details (ov-9…ov-12) — 2.4/5 each
- **Working:** shared template — biggest consistency win on the site; illustrations are strong.
- **Issues:**
  - **The giant stat card:** an ~800×500px gray box containing one tiny centered number ("4,500+ PATIENTS TREATED" / "320 STUDENTS ENROLLED"). ~70% empty space — the single worst layout on the site. *(Critical visual)*
  - "Impact & Reach" body text partially hidden **behind the Next.js dev badge** in the screenshot — the badge overlaps content at this width. *(L, dev hygiene)*
  - Stats duplicate Home stats (4,500/45/320/12) — canonical definitions needed. *(C3)*
  - Footer here omits Governance/Our Team → parity failure. *(C4)*
  - No cross-links to other programmes, no Donate CTA — dead-end pages. *(M)*
  - "VOLUNTEER FOR THIS" uppercase navy ≠ Home's "Volunteer with us →" — same action, two voices. *(M)*

### P13 · School Aushadhi Lab (ov-13) — 1.6/5
- **Working:** genuinely interesting content; the five-zone biophysical table is informative; roadmap is a good idea.
- **Issues — this page is a separate design system:**
  - **Solid blue icons** (Functional Equilibrium, Organic Materiality…) — the only blue on the entire site. *(H)*
  - Italic serif zone titles (Respiratory & Immune) — italic display type appears nowhere else. *(M)*
  - Pill pair "Project Proposal / Seeking Funding" — 5th pill style. *(M)*
  - Dark "Biophysical Layout" block + white text table with hairline rows — table styling exists nowhere else; cramped rows. *(M)*
  - Roadmap timeline: hollow circles, year labels small-caps, connector line — one-off component, dot fill logic unclear. *(M)*
  - Dense multi-paragraph blocks betray the whitespace discipline of Governance/Team. *(M)*
  - Footer here has the *fewest* links — parity failure again. *(C4)*

### P14 · Our Team (ov-14) — 3.2/5
- **Working:** department grouping (Medical Ops / Outreach / Admin) is logical; navy uppercase role labels are crisp; "Contact the Team →" matches the SUPPORT button language.
- **Issues:**
  - **Borderless name cards** vs Governance's bordered cards — sibling pages, two dialects. Pick one. *(M)*
  - 3 / 3 / 2 headcounts leave ragged columns; fine, but align to a strict 2-col grid with fixed row height. *(L)*
  - "Board of Directors" is an inline underlined link — link styling undefined. *(L)*

### P15 · Governance (ov-15) — 3.4/5
- **Working:** the most Lagom page on the site — quiet, balanced, well-zoned. Leadership cards + Key Policies 3-col is exemplary.
- **Issues:**
  - Lead cards have asymmetric left rule + name/title/desc stack — slightly fussy; standardize to the common card. *(L)*
  - Policy body text gray-on-white at 15px — contrast check needed. *(L)*

---

## 5. Master Issue Registry

| ID | Issue | Severity | Phase |
|----|-------|----------|-------|
| C1 | No design-token registry — root cause | 🔴 Critical | 0 |
| C2 | Registration number conflict | 🔴 Critical | 5 |
| C3 | Stats reused across contexts / no canonical definitions | 🔴 Critical | 5 |
| C4 | Footer nav parity failure | 🔴 Critical | 1 |
| C5 | Typeface roles undefined | 🔴 Critical | 0–1 |
| H1 | 6+ button variants | 🟠 High | 2 |
| H2 | Giant stat cards (~70% empty) | 🟠 High | 3 |
| H3 | Image aspect ratios & radii arbitrary | 🟠 High | 2, 4 |
| H4 | Prefilled fake PII / placeholder anti-patterns | 🟠 High | 3 |
| H5 | Icon color drift (blue / light-blue circles) | 🟠 High | 2 |
| H6 | Orphan grid items (3+1, 2+2+1 ×3) | 🟠 High | 1–3 |
| H7 | 4–5 pill styles | 🟠 High | 2 |
| H8 | Background rules absent (white/gray/paper/black) | 🟠 High | 1 |
| H9 | Contrast failures on small gray text | 🟠 High | 6 |
| M1 | Breadcrumbs only on Donate | 🟡 Medium | 3 |
| M2 | Dark sections without system/transition | 🟡 Medium | 1 |
| M3 | Byline/meta styles clash | 🟡 Medium | 3 |
| M4 | en-GB / en-US mixing | 🟡 Medium | 5 |
| M5 | Timeline component one-off | 🟡 Medium | 3 |
| M6 | Unstyled table (biophysical zones) | 🟡 Medium | 3 |
| M7 | Programme pages are dead ends (no cross-links/Donate) | 🟡 Medium | 3 |
| M8 | Testimonial/avatar card one-off | 🟡 Medium | 2 |
| M9 | Centered one-off layouts (Mission, Stories hero) | 🟡 Medium | 3 |
| M10 | Bordered vs borderless sibling cards | 🟡 Medium | 2 |
| L1 | Next.js dev badge in all screenshots | 🟢 Low | 0 |
| L2 | Alt text / focus rings / reduced-motion unverified | 🟢 Low | 6 |
| L3 | Dithering/export artifacts in illustrations | 🟢 Low | 4 |
| L4 | Unique caption style (Home hero) | 🟢 Low | 3 |
| L5 | One-off CTA grid texture | 🟢 Low | 3 |
| L6 | Link styling undefined (manifesto, board, audits) | 🟢 Low | 2 |

---

## 6. Page Consistency Scorecard

| Page | Score /5 | One-line verdict |
|---|---|---|
| Governance | 3.4 | The Lagom benchmark — protect it |
| Our Team | 3.2 | Good structure; unify card dialect |
| Donate | 3.1 | Best form system; fix PII prefill |
| Stories | 3.0 | Strong mood; kill pill button, unify bylines |
| About | 3.0 | Clean; content conflict is the blocker |
| Get Help | 2.6 | Good wizard; orphan grid + input styles |
| Volunteer | 2.7 | Warm; blue label, orphan checkboxes |
| Home | 2.4 | Most visible page, most dialects |
| Programme ×4 | 2.4 | Solid template; stat card ruins it |
| What We Do | 2.2 | Orphan grid is the site's signature flaw |
| School Aushadhi | 1.6 | A second design system living inside the site |
| **Mean** | **2.5** | **Target after plan: ≥ 4.2** |
