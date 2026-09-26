# AGENTS.md — One Vision

## 1. Project identity

One Vision is a decentralized, crisis-resilient humanitarian vanguard operating in Imphal and surrounding conflict zones. The product serves as a secure public beacon and data dashboard to:

- broadcast the realities of the polycrisis;
- detail the 4 operational pillars (Health Equity, Energy Sovereignty, Ecological Restoration, Economic Dignity);
- route sensitive assistance requests to encrypted external channels;
- publish verifiable field metrics and resource needs.

The website is a utilitarian tool for survival and coordination, not a marketing site.

## 2. Product principles

1. **Survival before aesthetics.** Every page must deliver vital information or facilitate secure aid.
2. **Maximum OpSec.** Assume all digital infrastructure is compromised; route sensitive comms externally (Signal/ProtonMail). No in-app DB storage of sensitive requests.
3. **Data as Truth.** Quantify impact with stark, unadorned metrics.
4. **Action must be urgent.** Clear, immediate pathways for routing help or receiving support.
5. **Decentralized by Default.** Highlight decentralized nodes (solar microgrids, mobile health) over centralized hubs.
6. **Accessibility is a baseline.** Build to WCAG 2.2 AA intent, accommodating high-stress cognitive load.
7. **Low-bandwidth resilience.** The site must remain operable on inexpensive phones, slow connections, and during blockades (offline/PWA optimized).
8. **No dark patterns.** No deceptive donation defaults or manipulative urgency.
9. **Trust is a feature.** Clearly identify governance, funding deployment, and policies.

## 3. Design direction

Shift to a **Frontline Humanitarian** aesthetic (e.g., Médecins Sans Frontières): stark, high-contrast, data-heavy, utilitarian.

Core visual language:
- stark, high-contrast (Black, White, Safety Orange, Alert Red);
- data-heavy, dashboard-like compositions;
- dense information grids minimizing negative space;
- utilitarian typography (Grotesk sans-serifs, Monospace for data);
- documentary reality over illustration;
- maps, status dashboards, and metrics take precedence.

The visual system must abandon the "calm, editorial, muted mineral colors" of the past. It must reflect urgency, resilience, and unvarnished truth.

## 4. Recommended technical baseline

Use:
- Next.js App Router + TypeScript;
- Tailwind CSS;
- a small, utilitarian component system (shadcn/ui adapted for starkness);
- Supabase for backend (strictly for public metrics and non-sensitive content, implementing extreme RLS if used);
- strict PWA/offline caching strategies.

**Package Manager Rule**: This project is strictly built on `pnpm`. **DO NOT use `npm` or `yarn`** under any circumstances. All dependencies must be managed via `pnpm add`, `pnpm install`, and executed via `pnpm run`.

## 5. Repository structure

Suggested structure:

app/
  (site)/
    page.tsx
    manifesto/
    pillars/
      health-equity/
      energy-sovereignty/
      ecological-restoration/
      economic-dignity/
    field-reports/
    secure-contact/
    deploy-support/
components/
  ui/
  layout/
  content/
  data-vis/
  security/
lib/
  supabase/
  content/
  security/
  analytics/
public/
  documentary/
  assets/
docs/
  DESIGN.md
  CONTENT.md
  ACCESSIBILITY.md
  SECURITY.md

## 6. Component rules

Build components around urgent tasks and data presentation.

Core components:
- BeaconHeader
- EmergencyBanner
- MetricDashboard
- PillarCard
- FieldReportCard
- SecureContactRouting (Instructions for Signal/ProtonMail)
- DataMap
- ResourceNeedList
- Footer

Each component must:
- have a semantic HTML structure;
- support keyboard navigation;
- expose visible focus;
- work without animation (animations should be disabled by default for performance/battery saving);
- have robust mobile/offline behavior defined.

## 7. Accessibility

Minimum target: WCAG 2.2 AA. Accommodate high-stress cognitive load.
Required:
- stark contrast ratios;
- semantic headings;
- clear, unambiguous labels;
- no information conveyed by colour alone;
- touch targets suitable for mobile use in high-stress situations.

## 8. Content rules (The 4 Pillars)

All operations map to:
1. **Conflict-Resilient Health Equity:** Mobile Tele-Health, Psychiatry, Decentralized ART, Harm reduction.
2. **Energy Sovereignty:** Solar-Kiran renewable microgrids for conflict-affected communities and decentralised health centers.
3. **Ecological Restoration & Agrarian Resilience:** Loktak Lake bio-economy, Seed Banks, Agroforestry.
4. **Economic Dignity:** Circular micro-economies, Self-Help Cooperatives.

For sensitive stories:
- Assume all metadata is sensitive.
- Use pseudonyms or absolute anonymisation.
- Never publish exact geographic coordinates of vulnerable community sites or active health outposts.

## 9. Forms and OpSec

**No sensitive intake forms on the web platform.**
All "Get Help" or sensitive communications MUST be routed to encrypted external channels (Signal, ProtonMail).
If a form exists (e.g., for general newsletter), validate all input server-side, rate-limit, and enforce strict CSRF protection. Do not store IP addresses or PII.

## 10. Security

Required:
- Zero-trust architecture for sensitive data (by not collecting it in-app).
- RLS on all public tables in Supabase.
- Secure HTTP headers.
- Secret values only in environment variables.
- No service-role key in browser code.

## 11. Performance

Targets:
- instant first contentful render on mid-range mobile;
- minimal JS payload;
- offline-first/PWA capabilities for blockade resilience;
- optimized data-vis rendering.

## 12. SEO

Every public page needs:
- unique title;
- meta description;
- canonical URL;
- semantic headings.

## 13. Analytics

Measure strictly anonymous usage metrics.
Do not collect IP addresses, location data, or any PII in analytics due to the conflict zone environment.

## 14. Definition of done

A feature is complete only when:
- it serves a vital, urgent purpose;
- OpSec review confirms no sensitive data leakage;
- responsive/offline behavior is verified;
- accessibility is tested under high-stress assumptions;
- visual regression is checked against the stark, utilitarian design tokens.

## 16. gstack

Behavioral rules from gstack (https://github.com/garrytan/gstack), compressed for Antigravity IDE. All 35+ gstack skills have been installed natively into this project's `.agents/skills` directory and are available for immediate use.

### Ethos

- **Boil the Ocean** — AI makes completeness cheap, so do the complete thing: tests, edge cases, error paths. Shortcuts need an explicit, recorded decision.
- **Search Before Building** — know what exists before deciding what to build. Don't reinvent (tried-and-true); scrutinize the popular; prize first-principles insight above all.
- **User Sovereignty** — models recommend, the user decides. Cross-model agreement is signal, never permission. Ask before changing the user's stated direction.
- **Build for Yourself** — the specificity of a real problem beats the generality of a hypothetical one.

### The reuse ladder

Before writing new code, stop at the first rung that holds:
1. A helper, util, or pattern already in this repo.
2. The standard library.
3. A native platform feature (CSS over JS, DB constraint over app code).
4. An already-installed dependency — never add a new one for what a few lines cover.

Then build the complete version of what remains. Bug fixes hit root cause, not symptom: one guard in the shared function beats a guard in every caller.

### Voice

Direct, concrete, builder-to-builder. Name the file, function, command, and user-visible impact. Short paragraphs; end with what to do. No filler, no corporate tone, no AI vocabulary.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
