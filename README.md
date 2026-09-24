# One Vision — NGO Web Platform

A community-focused NGO web platform for Imphal and surrounding communities. Public-service interface first, brand/marketing site second.

## Documentation hierarchy

| Layer | Location | Purpose |
|---|---|---|
| **Canonical overview** | Root (`AGENTS.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, `PRODUCT.md`) | High-level rules, principles, and identity |
| **Detailed specifications** | `docs/01-05` | Authoritative implementation specs (audit, tokens, page blueprints, production plan, task specs) |
| **Historical** | `ONE-VISION-PROJECT-BLUEPRINT.md` | Original compiled blueprint (read-only reference) |

When a root doc and a `docs/` spec conflict, the `docs/` version is authoritative (it's the refined, expanded version).

## Stack

- **Framework:** Next.js App Router + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`)
- **Components:** shadcn/ui primitives
- **Backend (Phase 2):** Supabase (PostgreSQL, Auth, Storage, RLS)
- **Hosting:** Vercel

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key documents

- [`AGENTS.md`](AGENTS.md) — Engineering, content, security, and delivery rules
- [`DESIGN.md`](DESIGN.md) — Visual identity and UI/UX system
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — Technical architecture and implementation sequence
- [`CONTENT.md`](CONTENT.md) — Editorial voice, impact language, content governance
- [`docs/02-NORDIC-LAGOON-DESIGN-SYSTEM.md`](docs/02-NORDIC-LAGOON-DESIGN-SYSTEM.md) — Authoritative token system
- [`docs/03-PAGE-SECTIONS-BLUEPRINT.md`](docs/03-PAGE-SECTIONS-BLUEPRINT.md) — Page-by-page section specs
- [`docs/05-AI-AGENT-TASK-SPEC.md`](docs/05-AI-AGENT-TASK-SPEC.md) — Task specs with acceptance criteria

## Design principles

1. **People before promotion** — Every page answers a real user need
2. **Dignity over spectacle** — Never use hardship as decoration
3. **Evidence over claims** — Quantify impact only when substantiated
4. **Action must be obvious** — Visitors know what they can do next
5. **Trust is a feature** — Organisation identity, governance, and policies are visible
