# Nordic Lagom × Sci-Fi Design System & Motion Contract

## 1. Design System Tokens

```css
@theme {
  --color-ink-0: #F4F6F8;
  --color-ink-1: #DCE2E8;
  --color-ink-2: #A8B3BD;
  --color-ink-3: #6B7785;
  --color-ink-6: #14181F;
  --color-ink-7: #0B0E13;

  --color-accent: #8FCFE8;
  --color-accent-2: #4DA8C9;
  --color-warm: #D9A86E;
  --color-ok: #7FCBA0;
  --color-bad: #D9886E;

  /* Competency tokens (fixed ordering) */
  --color-c1: #8FCFE8; /* Computational Thinking */
  --color-c2: #7FCBA0; /* Engineering Design */
  --color-c3: #D9A86E; /* Mathematical Reasoning */
  --color-c4: #D9886E; /* Scientific Inquiry */
  --color-c5: #B89BD9; /* Systems Thinking */

  --font-sans: 'Inter', ui-sans-serif, system-ui;
  --font-mono: 'JetBrains Mono', ui-monospace;

  --radius-sm: 0px; /* Sharp corner contract override */
  --ease-standard: cubic-bezier(.2, .7, .2, 1);
}
```

## 2. Core UI/UX Principles

- **Quiet Chrome**: Hairline borders (`1px solid rgba(255, 255, 255, 0.08)`), single primary accent per view, no boxy sidebars or unnecessary decorative furniture.
- **No Pressure / Anti-Gamification**:
  - No countdown timers (use quiet elapsed-time indicators in mono, e.g. `12:45 ELAPSED`).
  - No confetti, streaks, or artificial reward animations. Personal bests are represented with hairline cyan badges.
  - Sentence-case headlines in medium (500) font weight.
- **Chart Visual Hierarchy**:
  - Grid lines: `rgba(255, 255, 255, 0.05)`.
  - Student score series: `#8FCFE8` solid fill/stroke.
  - Cohort comparison series: Dashed `#F4F6F8`.
  - Monospace font for tick values and data labels (`JetBrains Mono`).

## 3. Motion & Focus Contract

- **Timing & Easing**: 200–350ms with `cubic-bezier(.2, .7, .2, 1)` (Lagom curve). Hover states use subtle translateY (1–2px), never scale scaling transform.
- **Assessment Session Constraints**:
  - **Zero animation** while an assessment is active, except for a silent 250ms cross-fade between items.
  - Focus is the primary UX feature.
- **Accessibility**:
  - Cyan focus rings on active elements.
  - Contrast ratios >= 4.5:1 (body text on dark canvas).
  - Respect `prefers-reduced-motion` by disabling starfields, background physics, and bar entry transitions.

## 4. AGENTS.md Layout Enforcements
- Replace absolute positioning / floats with `flex` or `grid`.
- Use `flex flex-col justify-between h-full` for grid card items to bottom-align buttons.
- Use mobile-first spacing (`py-24 md:py-48`).
- Never use fixed pixel typography sizes (e.g., replace `text-[40px]` with `text-4xl`).
