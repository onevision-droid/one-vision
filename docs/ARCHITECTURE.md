# Architecture & Technical Baseline (One Vision)

## 1. Tech Stack
- **Framework**: Next.js App Router (React Server Components).
- **Language**: TypeScript (strict mode enabled).
- **Styling**: Tailwind CSS (with canonical `aspect-4/3` syntax and utility classes driven by `design-tokens.json`).
- **Database/Auth**: Supabase (PostgreSQL).
- **Package Manager**: pnpm.

## 2. Security & Data Model
- **Supabase RLS (Row Level Security)**:
  - All public form submissions (`donations`, `help_requests`, `volunteer_applications`) use the `anon` key.
  - Public can `INSERT` but cannot `SELECT`, `UPDATE`, or `DELETE`.
  - Admin users with appropriate roles can read/manage data.
- **Forms**: Built with `react-hook-form` and `zod` for robust client-side and server-side validation.
- No service-role keys are exposed in the browser code.

## 3. Deployment & Performance
- **Server Rendering**: Prefer server-rendered pages for SEO and performance.
- **Image Optimization**: Use `next/image` heavily for WebP optimization and responsive sizing.
- **Minimal JS**: Defer heavy client-side execution; keep interactions (like modal toggles) lightweight.

## 4. Admin Dashboard
- Lightweight editorial and triaging interface built inside the application (`/admin`).
- Fetches all forms concurrently using `Promise.all` and renders accessible data tables with status flags.
