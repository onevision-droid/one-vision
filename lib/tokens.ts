/**
 * Typed token exports for programmatic use in TypeScript.
 * Source of truth: docs/02-NORDIC-LAGOON-DESIGN-SYSTEM.md
 * CSS source of truth: app/globals.css @theme inline
 *
 * Use these when you need token values in JS/TS (e.g., for
 * dynamic styles, canvas rendering, or structured data).
 * For CSS styling, always use the CSS custom properties directly.
 */

// ── Colours ──

export const colours = {
  ink: "#10201E",
  forest: "#123E3A",
  pine: "#1B524C",
  teal: "#5E8780",
  tealSoft: "#8FA9A3",
  mist: "#DCE8E5",
  mistDeep: "#C8D8D4",
  paper: "#F7F3EA",
  sand: "#D8C8AE",
  sandSoft: "#EADFC9",
  terra: "#C85B3F",
  terraDeep: "#A8462F",
  marigold: "#D7A43A",
  cloud: "#FFFFFF",
  stone: "#6F7672",
  stoneDeep: "#4A524E",
} as const;

export type ColourToken = keyof typeof colours;

// ── Surfaces ──

export const surfaces = [
  "paper",
  "mist",
  "sand",
  "forest",
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

// ── Radii ──

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
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
