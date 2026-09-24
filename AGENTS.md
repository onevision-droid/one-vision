# AGENTS.md — One Vision

## 1. Project identity

One Vision is a community-focused NGO web platform for Imphal and surrounding communities. The product should make it easy to:

- understand what One Vision does;
- discover active community programmes and campaigns;
- request or find help;
- volunteer, partner, or contribute;
- read trustworthy stories, reports, and updates;
- see tangible outcomes without sensationalising hardship;
- contact the organisation safely.

The website is a public-service interface first and a brand/marketing site second.

## 2. Product principles

1. **People before promotion.** Every page should answer a real user need.
2. **Dignity over spectacle.** Never use poverty, illness, grief, or disaster as visual decoration.
3. **Evidence over claims.** Quantify impact only when the organisation can substantiate it.
4. **Local by default.** Use Imphal/Manipur context, local voices, familiar places, and relevant languages.
5. **Action must be obvious.** A visitor should quickly understand what they can do next.
6. **Accessibility is a baseline.** Build to WCAG 2.2 AA intent, not merely visual compliance.
7. **Low-bandwidth resilience.** The site must remain useful on inexpensive phones and unstable connections.
8. **Editorial consistency.** Stories, programmes, reports, and campaigns must share a predictable content grammar.
9. **No dark patterns.** No deceptive donation defaults, forced newsletter opt-ins, or manipulative urgency.
10. **Trust is a feature.** Clearly identify the organisation, contact channels, governance, funding information, policies, and evidence.

## 3. Design direction

Use the supplied reference as a structural inspiration, not a visual copy.

Core visual language:
- editorial, architectural, calm;
- generous negative space;
- large image-led sections;
- asymmetrical but disciplined grids;
- muted mineral colours;
- occasional high-chroma action colour;
- restrained borders and shadows;
- large, confident headlines;
- short copy blocks;
- modular image mosaics;
- long-form storytelling;
- quiet transitions rather than excessive animation.

The secondary illustration language is:
- retro-modernist cinematic illustration;
- deep blue-green, red-orange, cream-white and mineral neutrals;
- geometric perspective;
- hard side lighting;
- long cast shadows;
- flat colour blocks;
- fine line details;
- subtle grain/matte paper texture;
- contemplative, human scenes;
- no text, watermark, logo, photorealistic 3D, or glossy corporate CGI.

## 4. Recommended technical baseline

Use:
- Next.js App Router + TypeScript;
- Tailwind CSS;
- a small, documented component system;
- Supabase for PostgreSQL, authentication, storage and row-level security;
- a lightweight editorial/admin interface inside the application;
- an image CDN/optimization pipeline;
- a transactional email provider;
- a compliant Indian donation/payment provider after NGO legal/tax requirements are confirmed.

Do not introduce microservices in v1. Keep the system modular inside one deployable application.

**Package Manager Rule**: This project is strictly built on `pnpm`. **DO NOT use `npm` or `yarn`** under any circumstances. All dependencies must be managed via `pnpm add`, `pnpm install`, and executed via `pnpm run`.

## 5. Repository structure

Suggested structure:

app/
  (site)/
    page.tsx
    about/
    programmes/
    campaigns/
    stories/
    get-help/
    volunteer/
    donate/
    contact/
    reports/
  admin/
components/
  ui/
  layout/
  content/
  forms/
  media/
lib/
  supabase/
  content/
  validation/
  analytics/
  seo/
public/
  illustrations/
  brand/
  icons/
content/
docs/
  DESIGN.md
  CONTENT.md
  ACCESSIBILITY.md
  ARCHITECTURE.md

## 6. Component rules

Build components around user tasks, not arbitrary visual fragments.

Core components:
- SiteHeader
- MobileNavigation
- Hero
- ActionBar
- ProgrammeCard
- CampaignCard
- StoryCard
- ImpactMetric
- QuoteBlock
- ImageMosaic
- Timeline
- ReportCard
- VolunteerForm
- HelpRequestForm
- DonationSelector
- DonationTrustPanel
- PartnerLogoRow
- FAQ
- NewsletterForm
- Footer
- Consent/PrivacyNotice
- Breadcrumbs
- Search

Each component must:
- have a semantic HTML structure;
- support keyboard navigation;
- expose visible focus;
- work without animation;
- have mobile behavior defined;
- accept meaningful alt text where images are content;
- avoid text embedded inside images.

## 7. Accessibility

Minimum target: WCAG 2.2 AA.

Required:
- semantic headings;
- landmarks;
- keyboard operation;
- visible focus state;
- sufficient contrast;
- reduced-motion support;
- descriptive link labels;
- form labels and error messages;
- accessible modal/dialog behavior;
- captions/transcripts for meaningful video;
- alt text policy;
- skip-to-content link;
- no information conveyed by colour alone;
- touch targets suitable for mobile use.

Test with keyboard navigation, screen-reader spot checks, automated accessibility testing and real mobile devices.

## 8. Content rules

Every programme/campaign must have:
- purpose;
- who it serves;
- location;
- current status;
- what One Vision actually does;
- how someone can participate/request help;
- evidence or update date where applicable;
- responsible contact;
- related stories/resources.

Avoid vague claims such as “changing thousands of lives” unless supported by a documented metric.

For sensitive stories:
- obtain consent;
- avoid unnecessary identifying details;
- avoid humiliating imagery;
- let people retain agency over how they are represented;
- provide context;
- never fabricate quotes or outcomes.

## 9. Forms and data

Validate all public input server-side.

Protect:
- help requests;
- contact details;
- volunteer records;
- donation metadata;
- uploaded documents;
- admin accounts.

Use least-privilege access and Supabase Row Level Security.

Do not store payment-card data.

## 10. Security

Required:
- RLS on all user-related tables;
- server-side authorization for admin actions;
- rate limiting on public forms;
- bot/spam protection;
- secure HTTP headers;
- CSRF-safe form architecture;
- file type/size validation;
- malware scanning for user uploads where uploads are enabled;
- audit logs for sensitive admin changes;
- secret values only in environment variables;
- no service-role key in browser code.

## 11. Performance

Targets:
- fast first contentful render on mid-range mobile;
- responsive images using modern formats;
- lazy-load below-the-fold media;
- avoid autoplay video by default;
- avoid huge hero assets;
- keep JS client-side usage minimal;
- prefer server-rendered content;
- provide meaningful loading states.

The website must remain useful on slow connections.

## 12. SEO

Every public page needs:
- unique title;
- meta description;
- canonical URL;
- Open Graph image;
- structured data where appropriate;
- semantic headings;
- descriptive URLs;
- sitemap;
- robots policy;
- useful internal linking.

Important content should be indexable without requiring client-side interaction.

## 13. Analytics

Measure user needs rather than vanity metrics.

Recommended events:
- donate_start
- donate_complete
- volunteer_start
- volunteer_complete
- help_request_start
- help_request_complete
- campaign_action
- report_download
- story_open
- search
- contact_submit

Do not collect unnecessary sensitive information in analytics.

## 14. Visual QA

Before merging a page:
- test 320px, 375px, 768px, 1024px, 1440px and large desktop;
- check long headings;
- check long translated/local-language strings;
- check empty/error states;
- check keyboard navigation;
- check reduced motion;
- check image loading;
- check dark/high-contrast conditions where applicable;
- compare against DESIGN.md tokens rather than pixel-copying the reference.

## 15. Definition of done

A feature is complete only when:
- content and empty states exist;
- responsive behavior is defined;
- accessibility is tested;
- loading/error states exist;
- SEO metadata exists;
- analytics events are defined where relevant;
- security/privacy implications are reviewed;
- no console errors remain;
- visual regression is checked;
- documentation is updated.

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
