import type { Config } from "tailwindcss";

/**
 * Tailwind v4 — CSS-first configuration.
 *
 * All design tokens (colors, typography, spacing, etc.) are defined in
 * app/globals.css inside an @theme block. This file is kept ONLY for the
 * `content` glob, which is still needed so that the Tailwind PostCSS plugin
 * knows which files to scan for class names.
 *
 * Do NOT add tokens here — they will conflict with the CSS @theme block.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
