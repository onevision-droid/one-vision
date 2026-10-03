# ACCESSIBILITY.md: One Vision: Field Edition

**Project:** One Vision: Society for Health & Education Manipur  
**Standard:** WCAG 2.2 AA (Full Conformance)  
**Philosophy:** Accessibility is an inherent architectural foundation, not a post-launch cosmetic patch.

---

## 1. Core Principles

1. **Perceivable:** Information and UI components must be presentable to users in ways they can perceive (high contrast, text alternatives, no color-only state signaling).
2. **Operable:** All functionality must be operable through keyboard navigation and touch gestures, with ample time and zero traps.
3. **Understandable:** Layouts and language must be predictable, clear, and reassuring.
4. **Reliable:** Code must parse cleanly across browsers, screen readers, and assistive devices.

---

## 2. Contrast Ratios & Color Compliance (Field Edition)

All primary, secondary, and accent combinations are tested against WCAG 2.2 AA (minimum 4.5:1 for normal text, 3.0:1 for large text / graphical UI indicators):

| Color Combination | Foreground / Background | Contrast Ratio | Conformance Status | Usage Guidelines |
|---|---|---|---|---|
| **Ink on Bone** | `#1B1C19` on `#F2EFE7` | **15.0:1** | AAA Pass | Primary headings, body copy, reading blocks |
| **Ink on Paper** | `#1B1C19` on `#FAF8F2` | **16.2:1** | AAA Pass | Elevated cards, forms, content panels |
| **Slate on Bone** | `#55564F` on `#F2EFE7` | **6.5:1** | AA Pass | Secondary text, subtitles, footnotes |
| **Slate on Oat** | `#55564F` on `#E9E4D9` | **5.8:1** | AA Pass | Secondary text on alternating section wells |
| **White on Indigo** | `#FFFFFF` on `#5752BC` | **6.3:1** | AA Pass (AAA Large) | Primary interactive buttons, badges, active tabs |
| **White on Indigo Dark** | `#FFFFFF` on `#403B92` | **8.5:1** | AAA Pass | Button hover, pressed states, high-contrast actions |
| **Moss on Bone** | `#586653` on `#F2EFE7` | **5.2:1** | AA Pass | Environmental badges, status tags, icons |
| **Clay on Bone** | `#A65B4F` on `#F2EFE7` | **4.2:1** | AA Pass (Large text & UI) | Warning banners, urgent notice headers |
| **Stone on Bone** | `#D8D2C8` on `#F2EFE7` | **1.2:1** | N/A (Decorative divider) | Structural hairlines; never used for text |

*Strict Rule:* Never use light gray text for functional or narrative copy. Never convey system state using color alone. Always pair color with text labels or distinct icons.

---

## 3. Keyboard Navigation & Focus Management

- **Global Focus Ring:**
  `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  (2px Quiet Indigo outline with 2px offset).
- **Never suppress outlines:** `outline: none` without a visible `:focus-visible` replacement is strictly banned.
- **Skip Link:** A persistent skip-to-content anchor sits as the first element in the DOM, immediately revealed upon Tab key press:
  `<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ...">Skip to content</a>`.
- **Focus Restoration:** Modals, sheets, and mobile drawers return focus to their triggering elements upon dismissal.
- **Form Error Focus:** Upon submission failure, keyboard focus shifts smoothly to the first erroneous input field or error summary banner.

---

## 4. Touch Targets & Responsive Interaction

- **Target Sizing:** All interactive elements (links, buttons, filter chips, accordion headers) must provide an active hit target of at least **44 × 44px** on mobile viewports (`min-h-11 min-w-11` or generous padding).
- **Target Spacing:** Minimum 8px spacing between adjacent touch targets to eliminate erroneous taps.
- **Single-Axis Reading:** Mobile viewports must never trigger horizontal scrolling. All content flows along a singular, vertical reading axis.

---

## 5. Reduced Motion & Sensory Considerations

- All CSS motion and framer-motion transitions must respect the `prefers-reduced-motion: reduce` media query.
- Under reduced motion:
  - Animation durations collapse to `0ms`.
  - Content appears immediately without opacity or positional transitions.
  - Count-up metric animations render their final target values immediately.

---

## 6. Forms & Interactive Inputs

- **Explicit Labels:** Every input, textarea, and select control possesses a permanent, visible `<label>` element connected via `htmlFor`. Placeholder text is supplementary and never a replacement for a label.
- **Accessible Error Messaging:** Error descriptions link directly to inputs using `aria-describedby="[input-id]-error"`.
- **Field Grouping:** Related checkboxes and radio controls are wrapped in `<fieldset>` with descriptive `<legend>` tags.
