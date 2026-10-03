# 01: UI/UX Audit & Visual Analysis (September 2026)

**Project:** One Vision: Society for Health & Education Manipur  
**Scope:** Evaluation of live interfaces across 6 core views (Home, Programmes, Stories, About, Volunteer, Get Help) and underlying frontend implementation.  
**Audit Standard:** Nordic Lagom Principles, WCAG 2.2 AA Accessibility, Core Web Vitals.

---

## 1. Executive Summary & Verdict

The current One Vision website possesses a respectable architectural foundation: dignified typography, authentic documentary photography, structured navigation, and a recognized brand accent. However, the current visual implementation suffers from **template fatigue** and **visual flatness**.

### Current System Scorecard
| Audit Dimension | Current Rating | Core Finding | Target (Field Edition) |
|---|---|---|---|
| **Tonal Depth & Surfaces** | 2.0 / 5 | Excessive pure-white glare; sterile clinic feel; lack of material warmth | Warm mineral neutrals (Bone, Paper, Oat) |
| **Containment & Geometry** | 2.2 / 5 | "Card soup": nearly every content chunk is trapped in a bordered box | 4-tier containment hierarchy (Open space default) |
| **Typography Hierarchy** | 3.2 / 5 | Dignified serifs, but gray body copy is often too faint (< 4.5:1 contrast) | Deep charcoal Ink (`#1B1C19`) + Slate (`#55564F`) |
| **Color Distribution** | 2.5 / 5 | Electric purple action color dominates due to zero tonal counterweight | Deeper Quiet Indigo (`#5752BC`) with warm neutrals |
| **Editorial Rhythm** | 2.5 / 5 | Repetitive rhythm: Section → Border → Gray Band → Card Grid | Editorial storytelling flow with asymmetric pacing |
| **Photographic Hierarchy** | 3.0 / 5 | Strong documentary assets, but repetitive crops reused across pages | Controlled narrative roles (Hero, Lead, Evidence) |
| **Mobile Responsiveness** | 2.2 / 5 | Desktop layout shrunken down into narrow viewports (~390–480px) | True mobile-first editorial stacked architecture |
| **Accessibility (WCAG 2.2)** | 2.8 / 5 | Sub-4.5:1 text contrast on muted copy; small mobile touch targets | Strictly verified AA contrast & 44px+ hit targets |

---

## 2. In-Depth Global Visual Findings

### A. The White is Doing Too Much Work (Visual Glare)
- **Observed Issue:** The predominant visual background is harsh, near-pure white (`#FFFFFF` or `oklch(1 0 0)`). Alternating sections rely almost exclusively on cold light-gray bands (`#F5F5F5`).
- **Psychological Impact:** Excessive glare, weak atmospheric depth, clinical/sterile aesthetic reminiscent of hospital stationery rather than a warm community initiative.
- **Redesign Remedy:** Introduce the warm mineral surface system:
  - Base canvas: Bone `#F2EFE7`
  - Content ground: Paper `#FAF8F2`
  - Alternating wells: Oat `#E9E4D9`
  - Hairline dividers: Stone `#D8D2C8`
  - White `#FFFFFF` is retained solely as an intentional contrast accent.

### B. "Card Soup": Too Many Bordered Boxes
- **Observed Issue:** The interface repeatedly nests paragraphs, links, and lists inside bordered rectangles with light-gray backgrounds. Over 70% of viewport elements sit within cards.
- **Psychological Impact:** Visual exhaustion and template fatigue. The user feels like they are browsing an inventory catalog rather than engaging with human stories.
- **Redesign Remedy:** Implement the **4-Level Containment Hierarchy**:
  - *Level 1 (Default):* Open editorial sections with typography and whitespace alignment doing the work.
  - *Level 2:* Soft surface tonal shifts (Oat/Paper), borderless.
  - *Level 3:* Bordered cards only when interactive state or strict grouping demands it.
  - *Level 4:* Subtle elevated objects reserved strictly for overlays and dropdowns.

### C. Overuse of Uppercase Eyebrow Labels
- **Observed Issue:** Almost every heading has an uppercase, tracked eyebrow label perched on top.
- **Psychological Impact:** When every element announces itself with an eyebrow label, visual hierarchy collapses. The labels lose their indexing value and become visual noise.
- **Redesign Remedy:** Restrict eyebrows strictly to section category, programme pillar, story publication metadata, and critical status badges.

### D. Body Copy Contrast Deficit
- **Observed Issue:** Secondary text frequently drops to faint gray tones (`oklch(0.475 0.021 43.1)` or `#737373`), which on pale backgrounds fails the 4.5:1 WCAG 2.2 AA contrast threshold under variable lighting conditions.
- **Redesign Remedy:** Anchor all primary text in deep charcoal Ink (`#1B1C19`, 15:1 contrast on Bone) and secondary text in warm Slate (`#55564F`, 6.5:1 contrast).

### E. Electric Violet Dominance (Lack of Counterweight)
- **Observed Issue:** The action purple (`oklch(0.457 0.24 277.023)`) stands out with harsh, synthetic intensity against the stark white background, creating visual discord.
- **Redesign Remedy:** Re-anchor the purple/indigo brand family into **Quiet Indigo** (`#5752BC`) and **Indigo Dark** (`#403B92`). Grounded against warm mineral Bone and Oat surfaces, Indigo functions as a quiet, authoritative signal for primary actions rather than a jarring neon highlight.

### F. Modular Section Fatigue (The Repetitive Stack)
- **Observed Issue:** Scrolling down any page reveals an unvarying cadence: `Section → Border → Gray Band → 3-Card Grid → Section → Border → CTA`.
- **Redesign Remedy:** Create publication-grade editorial pacing:
  `Hero statement → Immediate compact impact proof → Asymmetric narrative feature → Numbered index rows → Generous breathing space → Quiet closing action`.

### G. Photographic Asset Duplication
- **Observed Issue:** The same hero photography (`/about-hero.jpg`, `/volunteer-hero.jpg`, `/home-hero-2026.jpg`) is repeated across multiple pages in both hero banners and secondary cards.
- **Redesign Remedy:** Establish a strict photographic role hierarchy:
  - Archival & Infrastructure → Documentary Monochrome
  - Community Narratives & Voices → Warm Monochrome
  - Healthcare & Youth Activities → Natural Muted Color
  - Unique image assignment per major section.

### H. Mobile Degradation (Desktop-in-Miniature)
- **Observed Issue:** On narrow viewports (~390px to 480px), desktop multi-column grids and horizontal layouts are simply squeezed down, resulting in crowded text, wrapped metadata badges, and cramped form fields.
- **Redesign Remedy:** Design strictly mobile-first:
  - Collapse multi-column compositions into unified, elegant vertical axes.
  - Convert dense 3-card rows into clear, sequential editorial lists.
  - Ensure all interactive touch targets meet or exceed 44×44px.
  - Provide full-width edge-to-edge documentary imagery where appropriate.

---

## 3. Page-Specific Audit Findings

### 3.1 Home Page (`/`)
- **Current State:** Tries to explain all organizational capabilities simultaneously with boxed bento grids, multiple stat sections, and competing CTA buttons.
- **Key Issues:** Card soup in the 5 priorities section; repeated stats blocks; disconnected trust cards.
- **Prescription:** Transform 5 priorities into an editorial index (1 featured item + 4 clean numbered rows). Compact the stats into a single horizontal impact strip.

### 3.2 Programmes Page (`/programmes`)
- **Current State:** A filter bar followed by a repetitive 3-column grid of bordered cards (`CampaignCard`).
- **Key Issues:** Looks like a commercial product catalog; filter buttons wrap awkwardly on mobile.
- **Prescription:** Transition to a featured-first editorial list with a quiet segmented filter (horizontal scroll on mobile) and compact descriptive rows.

### 3.3 Stories Page (`/stories`)
- **Current State:** Hero section, wide featured card, followed by a 3-card grid titled "More Stories".
- **Key Issues:** The featured story image lacks dominance; the 3 lower cards are identical in visual weight.
- **Prescription:** Elevate the featured story with prominent imagery and clear bylines; format secondary stories into 2 compact features plus a vertical chronological archive list.

### 3.4 About Page (`/about`)
- **Current State:** Hero, followed by a SplitNarrative trust panel, partner marquee, and an image mosaic.
- **Key Issues:** Reuses the construction image twice in adjacent sections; the governance section lacks clear, authoritative two-column layout.
- **Prescription:** Curate an authentic documentary photo essay (1 dominant image + 2 contextual images with captions); establish clean two-column governance (Leadership & Operational Team).

### 3.5 Volunteer Page (`/volunteer`)
- **Current State:** Combines an image block, testimonial quote, a 3-card commitment grid, long form, and FAQs.
- **Key Issues:** Heavy visual compartmentalization; the 3 commitments are boxed in bulky cards; form feels lengthy.
- **Prescription:** Convert the 3 commitments into clean numbered editorial principles (01 Learn, 02 Contribute, 03 Respect); organize the application into clean visual fieldsets with clear input focus states.

### 3.6 Get Help Page (`/get-help`)
- **Current State:** Utility page that mixes editorial storytelling with helpline information and contact forms.
- **Key Issues:** Emergency helpline is boxed in a small card alongside an email card; urgent assistance is not immediately prominent.
- **Prescription:** Elevate direct emergency/care desk contact (Call + Email) to the top priority above the fold; streamline message form with clear input hierarchy; provide 3–5 high-value FAQs.
