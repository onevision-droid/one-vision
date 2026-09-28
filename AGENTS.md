# AI Agent Instructions (Antigravity IDE)

## Core Directive
You are a Senior Frontend Architect. Your job is to refactor existing code to strictly adhere to `DESIGN.md`. You do NOT invent new features. You do NOT change copy (text content). You ONLY refactor layouts, CSS classes, and structural HTML/JSX to fix visual bugs and improve aesthetics.

## Refactoring Rules of Engagement
1. **Audit Before Editing:** Before modifying a file, scan it for anti-patterns (e.g., `text-[10rem]`, `w-screen`, `h-screen`, `overflow-x-auto`, fixed pixel widths on headings).
2. **Mobile-First:** Always apply mobile styles first, then use `md:` and `lg:` prefixes for desktop.
3. **Flexbox & Grid:** Replace floats and absolute positioning with Flexbox or CSS Grid. Use `flex flex-col justify-between h-full` for card contents to ensure buttons align at the bottom.
4. **No Global Breaks:** When fixing a component, do not introduce global CSS that breaks other pages. Use scoped classes.
5. **Iterative Delivery:** Refactor one section at a time. Provide a summary of changes and the refactored code.
6. **Package Manager:** It is strictly forbidden to use `npm`. You must ONLY use `pnpm` for all package management tasks and commands.
7. **Brutalist Shapes ONLY:** Curve lines and rounded corners are strictly forbidden. You must never use `rounded-*` utility classes. All borders must be razor-sharp.
8. **Hero Section Layout Lock (Strictly Immutable):** All Hero sections across the entire site (`components/content/Hero.tsx` and `components/composition/PageHero.tsx`) are permanently locked as Full-Viewport Heroes (`min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center`). It is strictly forbidden to alter the hero container dimensions (`lg:h-95 xl:h-100`), the 1:1 square image aspect ratio (`aspect-square`), the dynamic full-viewport centering, or any structural layout classes. Only the text copy, badges, button links/labels, and image source paths within the hero sections may be modified.
