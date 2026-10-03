# DESIGN.md: One Vision Design System: Field Edition

**Project:** One Vision, Society for Health & Education Manipur  
**Document Type:** Canonical Master Design System & Architecture Specification  
**Edition:** Field Edition (September 2026 Redesign)  
**Philosophy:** Nordic Lagom ("Just the right amount": neither sterile nor decorative, neither sparse nor crowded)  
**Working Concept:** "Quiet Humanism": Grounded, Editorial, Warm, Clear, Restrained, Human, Durable

---

## 1. Design Thesis

**One Vision moves away from a generic "minimal NGO website made of cards" to an authoritative editorial civic journal for Manipur: documentary, human, trustworthy, useful, and beautifully restrained.**

The visual system combines:
- **Nordic Lagom:** Disciplined functional restraint, generous breathing room, serene balance, and zero unnecessary visual noise.
- **Editorial Web Design:** Elegant publication-grade typographic pacing, narrative structure, and deliberate asymmetric balance over rigid card matrices.
- **Documentary Storytelling:** Authentic photographic evidence capturing real community members, field workers, and tangible outcomes across Manipur.
- **Warm Mineral Color:** Eliminates clinical white glare with comforting mineral foundations (Bone, Paper, Oat, Stone) and a focused Quiet Indigo action accent.
- **Accessibility-First Engineering:** Native WCAG 2.2 AA compliance, visible high-contrast focus rings, and accessible mobile-first interaction.

---

## 2. Brand Personality: "Quiet Humanism"

Three core values:
**Grounded · Editorial · Restrained**

Supporting traits:
- **Human:** People, stories, field notes, and real evidence are the emotional center.
- **Clear:** The user's next action is obvious without aggressive visual screaming.
- **Warm:** Avoids clinical white surfaces and cold blue-gray palettes.
- **Durable:** Designed to remain contemporary, functional, and dignified for years to come.
- **Local:** Rooted in the lived reality, landscapes, and culture of Manipur.

---

## 3. Logo & Brand Mark

### Typography-Led Wordmark:
**ONE VISION**  
*Society for Health & Education Manipur · Est. 1988*

- **Visual Anchor:** Clean, architectural typography with understated geometry.
- **Prohibitions:** Generic globes, puzzle pieces, clipart hands, gradients, or heavy decorative drop-shadows.
- **Application:** Rendered in deep Ink (`#1B1C19`) on light mineral backgrounds. It is clean and legible at any scale.

---

## 4. Color System: Warm Mineral Foundations

The color system transitions away from high-glare white and electric violet toward a warm neutral foundation balanced by a single quiet brand action color:

| Token | CSS Variable | Hex | Role & Usage | Contrast Ratio |
|---|---|---|---|---|
| **Bone** | `--ov-bone` | `#F2EFE7` | Primary canvas & page background | Base |
| **Paper** | `--ov-paper` | `#FAF8F2` | Primary content surface & elevated panels | Highlight |
| **Oat** | `--ov-oat` | `#E9E4D9` | Soft alternating section wells & backgrounds | Muted ground |
| **Stone** | `--ov-stone` | `#D8D2C8` | Hairline 1px structural borders & dividers | Subtle rule |
| **Ink** | `--ov-ink` | `#1B1C19` | Primary headings, body copy, and structural anchors | 15.0:1 (AAA) |
| **Slate** | `--ov-slate` | `#55564F` | Secondary copy, metadata, subtitles | 6.5:1 (AA) |
| **Moss** | `--ov-moss` | `#586653` | Environmental resilience & community trust signals | 5.2:1 (AA) |
| **Indigo** | `--ov-indigo` | `#5752BC` | Primary brand action (CTA, active nav, focus ring) | 5.5:1 on light / 6.3:1 with white |
| **Indigo Dark** | `--ov-indigo-dark` | `#403B92` | Pressed / hover state for primary CTAs | 8.5:1 with white |
| **Clay** | `--ov-clay` | `#A65B4F` | Important alerts & human warmth accent | 4.2:1 (AA Large) |
| **White** | `--ov-white` | `#FFFFFF` | Rare high-contrast utility highlight | Accent |

### Usage Ratios:
- **Warm Neutrals (Bone, Paper, Oat):** ~70% dominant field.
- **Ink / Slate:** ~20% typographic hierarchy and structural grounding.
- **Quiet Indigo:** ~7% selective interactive actions and key status indicators.
- **Moss & Clay:** ~3% meaningful context and operational alerts.

---

## 5. Typography System

- **Display & Headings:** Contemporary editorial serif (Newsreader / Instrument Serif). Used for narrative authority, headlines, and pull-quotes.
- **UI & Body:** Clean, humanist or neo-grotesk sans (Geist / Manrope / Inter). Used for body copy, UI controls, navigation, and form labels.
- **Data & Metrics:** Tabular monospace (JetBrains Mono / IBM Plex Mono). Used for financial ledger figures, dates, and registration numbers.

### Fluid Typographic Hierarchy
| Level | CSS Fluid Clamp / Value | Line Height | Tracking | Usage Role |
|---|---|---|---|---|
| **Display XL** | `clamp(3rem, 7vw, 7rem)` | 0.95–1.05 | `-0.025em` | Hero main statements |
| **Display L** | `clamp(2.75rem, 5vw, 5rem)` | 1.05–1.15 | `-0.02em` | Page primary titles |
| **Heading H2** | `clamp(1.75rem, 3vw, 3rem)` | 1.15–1.25 | `-0.015em` | Major section headers |
| **Heading H3** | `clamp(1.25rem, 2vw, 2rem)` | 1.25–1.35 | `-0.01em` | Subsection & story headers |
| **Body Large** | `1.125rem–1.25rem` | 1.55–1.65 | `0` | Editorial lead paragraphs (max 65ch) |
| **Body Regular** | `1rem–1.0625rem` | 1.6 | `0` | Base reading copy (max 68ch) |
| **Small / Meta** | `0.875rem` | 1.45 | `+0.01em` | Metadata & image captions |
| **Eyebrow / Badge** | `0.75rem–0.8125rem` | 1.2 | `+0.12em` | Uppercase category identifiers |

---

## 6. Containment Hierarchy & Geometry (Anti-Card Soup)

Do not enclose content blocks in cards simply because they have a title and text. Adhere to the **4-Level Containment Hierarchy**:
1. **Level 1: Open Editorial Section (Default):** No border, no card container. Fluid typography, generous spacing, and whitespace alignment carry the content.
2. **Level 2: Soft Surface Block:** Background shift only (such as Oat `#E9E4D9` on Bone `#F2EFE7`). No border.
3. **Level 3: Bordered Module:** Subtle hairline rule (`1px solid var(--ov-stone)`). Applied strictly when grouping or interaction requires explicit demarcation.
4. **Level 4: Elevated Object (Rare):** Extremely subtle shadow reserved strictly for floating utility elements (modals, dropdown popovers, mobile navigation overlays).

### Radii & Borders:
- **Default Border:** Hairline rule (`1px solid var(--ov-stone)`).
- **Strict Zero-Radius Architecture (Zero Curved Lines / 0px Corner Radii):**
  - All corners throughout the design system are strictly orthogonal 90-degree right angles (`border-radius: 0px` / `rounded-none`).
  - Rounded corners (`rounded-*`), pill shapes (`rounded-full`), circles, and organic curved lines are strictly forbidden.
  - Buttons, cards, images, badges, tabs, dialogs, inputs, textareas, status dots, and popovers must have a border radius of zero (`0px`).


---

## 7. Hero Section Layout Lock (Immutable Contract)

As mandated by `AGENTS.md` Rule 8, all Hero sections across the entire platform (`components/content/Hero.tsx` and `components/composition/PageHero.tsx`) are permanently locked as Full-Viewport Heroes:
- **Viewport Layout:** `min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`
- **Hero Container Dimensions:** `lg:h-95 xl:h-100`
- **Image Aspect Ratio:** 1:1 square (`aspect-square`) with dynamic full-viewport centering.
- **Strict Rule:** Never alter the structural layout classes, container dimensions, or 1:1 image ratio. Only text copy, badges, button links/labels, and image source paths within the hero sections can be modified.

---

## 8. Documentary Photography System

- **Monochrome Documentary:** Standard for archival history, infrastructure, and governance records.
- **Warm Monochrome:** Used for community stories, elder narratives, and craft features.
- **Natural Muted Color:** Used for youth education, clinic care, and environmental projects where vitality is key.
- **Hierarchy:** 1 Hero Image per route → 1 Featured Story Visual → Compact Supporting Images.

---

## 9. Motion & Interaction: "Quiet Motion"

- **Durations:** 160ms to 240ms for micro-interactions, and 300ms to 500ms for editorial entry reveals.
- **Transitions:** Native CSS transitions preferred over bulky runtime animation libraries.
- **Reduced Motion:** Full compliance with `prefers-reduced-motion: reduce`. All animated transitions collapse immediately to zero duration when enabled.

---

## 10. Accessibility & Core Web Vitals (WCAG 2.2 AA)

- **Contrast:** Normal text ≥ 4.5:1, and large text ≥ 3.0:1.
- **Visible Focus:** 2px Quiet Indigo ring with 2px offset.
- **Touch Targets:** Minimum 44×44px on mobile viewports.
- **Web Vitals Targets:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
