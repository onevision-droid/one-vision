/**
 * Typed token exports for programmatic use in TypeScript.
 * Source of truth: docs/02-NORDIC-LAGOON-DESIGN-SYSTEM.md
 * CSS source of truth: app/globals.css @theme inline
 *
 * Use these when you need token values in JS/TS (e.g., for
 * dynamic styles, canvas rendering, or structured data).
 * For CSS styling, always use the CSS custom properties directly.
 */

// ── Colours (DESIGN.md Section 4: Utilitarian Emergency) ──

export const colours = {
  // Core palette
  paper: "#FAFAFA",
  surface: "#FFFFFF",
  ink900: "#171717",
  ink700: "#262626",
  ink500: "#525252",
  ink300: "#A3A3A3",
  ink100: "#E5E5E5",
  safetyOrange: "#F97316",
  safetyOrangeDim: "#EA580C",
  alertRed: "#DC2626",
  fieldBlack: "#171717",
  hazardYellow: "#EAB308",
  statusActive: "#16A34A",

  // Compatibility aliases
  ink: "#171717",
  cloud: "#FFFFFF",
  stone: "#525252",
  teal: "#16A34A",
  tealSoft: "#E5E5E5",
  marigold: "#EAB308",
  terra: "#F97316",
  terraDeep: "#EA580C",
} as const;

export type ColourToken = keyof typeof colours;

// ── Surfaces ──

export const surfaces = [
  "paper",
  "surface",
  "surface-alt",
  "field-black",
  "ink",
] as const;

export type Surface = (typeof surfaces)[number];

// ── Typography ──

export const fontFamilies = {
  display: "var(--font-fraunces), Georgia, serif",
  sans: "var(--font-inter), system-ui, sans-serif",
} as const;

// ── Spacing (4px base) ──

export const spacingScale = [
  4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160,
] as const;

// ── Motion ──

export const motion = {
  durationFast: 150,
  durationBase: 250,
  durationSlow: 350,
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ── Radii (DESIGN.md Section 9: Brutalist Mandate) ──

export const radii = {
  none: 0,
  sm: 0,
  md: 0,
  lg: 0,
} as const;

// ── Media breakpoints ──

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

// ── Image ratios (doc 02 §7) ──

export const imageRatios = {
  fullBleed: "16/9",
  fullBleedWide: "21/9",
  mosaicLead: "4/5",
  mosaicSatelliteSquare: "1/1",
  mosaicSatelliteLandscape: "3/2",
  splitNarrative: "3/2",
  card: "3/2",
  evidenceStrip: "16/9",
} as const;
