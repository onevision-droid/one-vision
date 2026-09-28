# One Vision Design System & Constraints

## Core Philosophy
Modern Human-Centered Editorial. Professional, trustworthy, and highly legible. No aggressive brutalism. Focus on structured layouts and intentional whitespace.

## 1. Typography & Scaling (CRITICAL)
- **Rule:** NEVER use viewport-width (`vw`) or massive fixed sizes for font sizes. This causes the "zoomed in" and overflow issues.
- **Headings:** Use fluid typography via `clamp()`.
  - H1: `clamp(2.5rem, 5vw, 4.5rem)` - Max size 72px.
  - H2: `clamp(2rem, 4vw, 3rem)` - Max size 48px.
  - H3: `clamp(1.5rem, 3vw, 2rem)` - Max size 32px.
- **Body:** Max width of 65ch for readability. `text-base` or `text-lg`. Line-height `1.6`.
- **Fonts:** Sans-serif for headings (e.g., Inter, Plus Jakarta Sans). Monospace only for data/metrics, never for long paragraphs.

## 2. Layout & Grid (CRITICAL)
- **Container:** ALL content must be wrapped in a max-width container (e.g., `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`). No exceptions.
- **Overflow:** Apply `overflow-hidden` to section wrappers to prevent horizontal scrolling.
- **Vertical Rhythm:** Use consistent section padding. `py-16 md:py-24 lg:py-32`. Do not use `h-screen` for content sections.
- **Grids:** 
  - Use CSS Grid for cards. 
  - Desktop: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`.
  - Ensure cards stretch to fill their grid cells (`h-full`).

## 3. Components
- **Buttons:** Solid, high-contrast. No harsh drop shadows. Use `rounded-none` or `rounded-sm` for a sharp, modern look. Hover states must be distinct (e.g., invert colors).
- **Cards:** Use `border border-gray-200` (light gray, not harsh black). Add `p-6` or `p-8`. Add a subtle `hover:border-orange-500` transition.
- **Images:** Must have `w-full h-auto aspect-video object-cover` to prevent layout breakage.
