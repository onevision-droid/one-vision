# One Vision — Project Blueprint

## AGENTS.md

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


---

## DESIGN.md

# DESIGN.md — One Vision Design System

## 1. Design thesis

**One Vision should feel like a trusted civic studio rooted in Imphal: calm enough to listen, clear enough to act, and human enough to remember the people behind every programme.**

The visual system combines:
- the editorial restraint and spatial discipline of the supplied architecture/web reference;
- the action-oriented campaign structure seen in major NGOs;
- the clarity, accessibility and information hierarchy associated with public-health communication;
- a distinct Imphal/Manipur visual vocabulary.

Do not imitate Greenpeace, WHO, or the supplied reference. Borrow principles, then create a One Vision identity.

## 2. Brand personality

Three words:
**Grounded · Human · Forward**

Supporting traits:
- credible, not bureaucratic;
- hopeful, not sentimental;
- local, not provincial;
- contemporary, not trendy;
- expressive, not noisy.

## 3. Logo direction

### Primary concept: The Open V

Create a typography-led wordmark:

**ONE VISION**

The “V” is the visual anchor. Construct it as two clean strokes that subtly suggest:
- two people meeting;
- an open path;
- a valley/horizon;
- collective vision.

The mark should work in one colour before any secondary treatment is introduced.

Avoid:
- generic hands;
- globe icons;
- hearts;
- puzzle pieces;
- literal eye icons;
- NGO clip-art;
- complex emblems.

### Lockups

1. Horizontal: symbol/wordmark + descriptor
2. Wordmark-only
3. Compact V monogram
4. One-colour stamp for documents/social avatars

The logo must remain legible at small sizes.

## 4. Colour system

### Core palette

| Token | Hex | Role |
|---|---|---|
| Ink | #10201E | Primary text, footer |
| Deep Forest | #123E3A | Primary brand field |
| Mineral Teal | #5E8780 | Secondary field |
| Mist | #DCE8E5 | Soft background |
| Paper | #F7F3EA | Primary warm background |
| Sand | #D8C8AE | Editorial section |
| Terracotta | #C85B3F | Action/accent |
| Marigold | #D7A43A | Secondary highlight |
| Cloud | #FFFFFF | Cards and negative space |
| Stone | #6F7672 | Secondary text |

### Usage ratio

Approximate:
- 55% Paper/Cloud/Mist;
- 25% Deep Forest/Ink;
- 10% Mineral Teal/Sand;
- 10% Terracotta/Marigold accents.

The accent colours are scarce. They should communicate action, not decorate every component.

## 5. Typography

Recommended pairing:

**Display:** Fraunces or a similar high-quality editorial serif  
**UI/body:** Inter or a similar neutral sans-serif

If licensing or performance requires a simpler stack:
- use Inter for body/UI;
- use a locally hosted editorial serif for display.

Typography hierarchy:
- Display XL: 64–88px desktop;
- Display L: 48–64px;
- H1: 42–56px;
- H2: 32–42px;
- H3: 24–30px;
- body: 17–19px;
- small: 14–15px.

Mobile sizes should be reduced fluidly, not through abrupt jumps.

## 6. Grid

Desktop:
- 12-column grid;
- max content width: approximately 1280–1360px;
- 24–32px gutters.

Tablet:
- 8 columns.

Mobile:
- 4 columns;
- 20px outer padding.

Use asymmetric compositions deliberately, but maintain alignment to the underlying grid.

## 7. Spacing

Base unit: 4px.

Common values:
4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128.

Major editorial sections should have 96–160px vertical breathing room on desktop.

## 8. Photography direction

Photography should feel documentary and respectful.

Preferred:
- real community participation;
- volunteers working with people rather than posing over them;
- hands and environments when identity should be protected;
- neighbourhood streets;
- schools/community spaces;
- local landscapes;
- quiet portraits with consent;
- before/after context only when genuinely meaningful.

Avoid:
- exploitative suffering imagery;
- generic stock-photo “charity” scenes;
- excessive smiling-for-camera imagery;
- poverty porn;
- over-saturated filters.

## 9. Illustration direction

Use illustration for:
- campaign explainers;
- programme introductions;
- empty states;
- annual reports;
- social campaign assets;
- sensitive topics where photography could compromise dignity/privacy.

### Master illustration prompt

“Retro-modernist cinematic editorial illustration of [SUBJECT], rooted in Imphal and Manipur. Large areas of high-purity colour blocks: deep blue-green background, red-orange architectural elements, cream-white planes and mineral neutrals. Minimal geometric composition with architectural perspective, hard side illumination, long crisp shadows and generous negative space. Quiet, human and contemplative atmosphere. Flat colour blocks combined with fine linework and subtle local details. Slight grain, matte printed-paper texture, restrained vintage character. Contemporary editorial art direction, culturally specific without stereotypes. No text, no watermark, no logo, no 3D render, no glossy CGI, no photorealistic photography.”

### Illustration subjects to commission

1. Community volunteers meeting residents.
2. A neighbourhood resource/help desk.
3. Young people learning together.
4. Women-led community work.
5. Elder/community knowledge exchange.
6. Flood/rain preparedness without disaster spectacle.
7. Healthcare access/navigation.
8. Education and youth development.
9. Local environment/community stewardship.
10. A quiet Imphal street/community space at dusk.
11. A family receiving information/support.
12. Volunteers mapping community needs.

## 10. Image composition

Use four recurring patterns:

### A. Full-bleed story
Large image + short editorial statement.

### B. Editorial mosaic
One large image with 2–4 smaller contextual images.

### C. Split narrative
Text on one side, documentary image on the other.

### D. Evidence strip
Three to five metrics/cards with a supporting image.

Avoid card grids everywhere. The reference works partly because the page periodically changes composition.

## 11. Motion

Motion should feel like editorial pacing.

Allowed:
- subtle image reveal;
- 150–350ms hover transitions;
- gentle section entrance;
- horizontal image drift;
- restrained number animation.

Avoid:
- parallax everywhere;
- bouncing cards;
- excessive cursor effects;
- autoplay video with sound;
- motion that delays access to content.

Respect prefers-reduced-motion.

## 12. Header

Desktop:
- One Vision wordmark left;
- navigation centre/right;
- primary “Support” action;
- optional language selector.

Suggested nav:
**What We Do · Stories · Get Help · Get Involved · About**

Keep the header visually light.

Mobile:
- wordmark;
- menu;
- persistent high-priority action only when useful.

## 13. Homepage composition

### Section 01 — Hero
Large editorial statement:
**A stronger Imphal begins with people who show up for one another.**

Supporting line explaining One Vision in one sentence.

Actions:
- Get Involved
- Find Support

Visual:
large documentary/illustration composition, not a generic charity collage.

### Section 02 — What is happening
3–4 active programme/campaign stories.

### Section 03 — The people
Portrait/story-led human section.

### Section 04 — What we do
Programme pillars:
- Community Support
- Youth & Education
- Health & Wellbeing
- Livelihoods & Opportunity
- Environment & Resilience

These should be configurable rather than hard-coded if the organisation's actual programme structure differs.

### Section 05 — Evidence
Impact metrics with dates and methodology.

### Section 06 — Story
One long-form feature with large image.

### Section 07 — Take part
Volunteer / partner / donate / share knowledge.

### Section 08 — Transparency
Reports, governance, funding information, policies.

### Section 09 — Closing
A quiet image and a single clear invitation.

## 14. Information architecture

Top-level routes:

/
 /about
 /programmes
 /programmes/[slug]
 /campaigns
 /campaigns/[slug]
 /stories
 /stories/[slug]
 /get-help
 /get-involved
 /volunteer
 /donate
 /events
 /reports
 /contact
 /search
 /privacy
 /accessibility
 /terms

Potential phase-2 routes:
 /resources
 /community-directory
 /partner-with-us
 /impact
 /languages/[locale]

## 15. Get Help experience

This is a core differentiator.

The user should be able to:
1. identify what kind of support they need;
2. see whether One Vision directly provides it;
3. find a relevant programme/resource;
4. submit a safe request if appropriate;
5. receive a confirmation and expected next step.

Do not promise emergency response unless One Vision actually provides it.

Emergency information must clearly distinguish:
- emergency services;
- external organisations;
- One Vision's own support.

## 16. Donation experience

Design for trust:
- explain what donations support;
- offer one-time and recurring options if legally/operationally supported;
- make fees/charges clear where relevant;
- show organisation identity;
- provide receipts/confirmation;
- publish appropriate financial/impact documentation;
- never imply that a specific rupee amount guarantees an individual outcome unless substantiated.

## 17. Volunteer experience

Form fields should be progressive:
1. interest;
2. location;
3. availability;
4. skills;
5. contact;
6. consent.

After submission:
- clear confirmation;
- expected response time;
- what happens next.

## 18. Content model

Core entities:

### Programme
- title
- slug
- summary
- problem
- approach
- geography
- status
- start date
- people served
- impact metrics
- lead/contact
- images
- related stories
- documents

### Campaign
- title
- objective
- context
- action
- status
- start/end
- evidence
- CTA
- media

### Story
- title
- dek
- author
- date
- location
- body
- hero media
- people/consent metadata
- related programme

### Report
- title
- reporting period
- document
- summary
- publication date

### Event
- title
- date/time
- location
- description
- registration
- capacity
- status

## 19. Accessibility language

The design should anticipate English plus relevant local-language content.

Do not bake copy into images.

Allow:
- longer strings;
- different line lengths;
- translated navigation labels;
- language-specific metadata;
- locale-aware dates and numbers.

## 20. Responsive behavior

Desktop is not the master layout. Define every composition from mobile upward.

At mobile:
- mosaics collapse to a deliberate reading order;
- decorative images may disappear;
- tables become cards;
- horizontal navigation becomes scrollable or stacked;
- forms become single-column;
- CTAs remain visible;
- typography stays comfortable.

## 21. Trust and transparency module

Create a reusable “Trust Panel” containing:
- legal/registration identity as applicable;
- governance information;
- contact information;
- funding transparency;
- annual reports;
- safeguarding/privacy policy;
- correction/contact pathway.

This should appear contextually, not as a wall of legal text.

## 22. Design anti-patterns

Do not:
- copy Greenpeace's visual identity;
- copy WHO's visual identity;
- use a generic NGO green;
- use a globe/hand/heart logo cliché;
- fill every section with cards;
- use gradients as decoration;
- use stock charity imagery;
- use excessive rounded UI;
- use huge shadows;
- make every CTA red;
- bury contact information;
- make donation the only visible action;
- create fake impact numbers.

## 23. Success criteria

A visitor should understand within approximately 10 seconds:
- who One Vision is;
- where it works;
- what it does;
- how they can participate.

A person seeking help should find a relevant route without reading the entire homepage.

A donor should be able to understand:
- who receives the money;
- what it supports;
- how the organisation demonstrates accountability.

A volunteer should be able to submit interest quickly on a phone.


---

## ARCHITECTURE.md

# ARCHITECTURE.md — One Vision Web App

## Recommended stack

### Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS
- accessible component primitives
- server components by default
- client components only for interactive behavior

### Data/backend
- Supabase PostgreSQL
- Supabase Auth for staff/admin accounts
- Supabase Storage for controlled media/documents
- Row Level Security
- server-side service layer

### Editorial
Start with a custom lightweight admin CMS because the content model is small and the organisation needs a tailored workflow.

Add a headless CMS only if editorial complexity grows beyond the custom interface.

### Hosting
- Vercel or equivalent managed Next.js platform
- Supabase managed infrastructure
- CDN/image optimization

## Data model

Tables:

profiles
staff_roles
programmes
programme_metrics
campaigns
stories
events
reports
media_assets
volunteer_submissions
help_requests
contact_submissions
donations
partners
site_settings
audit_logs

All sensitive tables require explicit RLS policies.

## Roles

viewer
- public content only

editor
- create/edit content
- cannot manage staff permissions

admin
- content + operational workflows

super_admin
- permissions/security/settings

Do not create a large permission system until the organisation actually needs it.

## Public/private boundary

Public:
- published programmes
- published stories
- public reports
- public events
- public impact data

Private:
- help requests
- volunteer submissions before publication
- staff data
- donor metadata
- internal notes
- audit logs

## Search

Phase 1:
- database-backed search across published content.

Phase 2:
- semantic search only if there is a demonstrated need for a large resource library.

Do not add AI search merely because it is fashionable.

## AI policy

AI may assist with:
- content tagging;
- internal search;
- translation drafts;
- accessibility checks;
- content summaries.

AI must not:
- invent impact statistics;
- decide eligibility for essential support;
- fabricate case stories;
- automatically publish sensitive content;
- make high-impact decisions about people seeking assistance.

Human review is required for public-facing sensitive content.

## Donation/payment boundary

The payment processor should own card/UPI/payment details.

The One Vision application should receive:
- transaction/reference ID;
- amount;
- currency;
- status;
- donor contact details only where needed;
- receipt metadata.

Confirm Indian NGO registration, tax-exemption/80G status, FCRA applicability and payment-provider requirements with qualified professionals before launch. Do not encode legal assumptions into the UI.

## Observability

Track:
- application errors;
- payment failures;
- form failures;
- API latency;
- image failures;
- uptime.

Avoid logging sensitive form contents.

## Deployment environments

development
staging
production

Production secrets must never be committed.

## Testing

Unit:
- validation;
- content utilities;
- permission rules.

Integration:
- forms;
- authentication;
- donation callbacks;
- RLS.

E2E:
- mobile navigation;
- volunteer form;
- help request;
- donation;
- search;
- admin publishing.

Accessibility:
- automated scan;
- keyboard pass;
- screen-reader spot check.

Visual:
- responsive screenshots for major routes.

## Implementation sequence

Phase 0 — Discovery
- confirm mission/programmes;
- identify legal entity and donation requirements;
- interview 5–10 representative users;
- collect existing brand/assets;
- define content owners.

Phase 1 — Foundation
- repository;
- design tokens;
- typography;
- logo;
- base components;
- Supabase;
- deployment;
- analytics.

Phase 2 — Public site
- homepage;
- about;
- programmes;
- stories;
- campaigns;
- reports;
- contact.

Phase 3 — Community actions
- get help;
- volunteer;
- events;
- donation.

Phase 4 — Admin
- content management;
- submissions;
- moderation;
- audit logs.

Phase 5 — Hardening
- accessibility;
- performance;
- security;
- SEO;
- content QA;
- backup/recovery;
- launch rehearsal.

## Definition of launch readiness

The site is launch-ready when:
- all core pages have real reviewed content;
- all forms have tested operational ownership;
- donations are legally and operationally cleared;
- accessibility has been reviewed;
- privacy/terms/safeguarding policies are published as applicable;
- performance is acceptable on mid-range mobile;
- monitoring is active;
- rollback is documented.


---

## CONTENT.md

# CONTENT.md — One Vision Editorial System

## Editorial voice

Write:
- plain;
- specific;
- warm;
- respectful;
- locally grounded;
- evidence-led.

Prefer:
“Volunteers helped 42 households access flood-preparedness information in July 2026.”

Over:
“We transformed thousands of lives through our incredible work.”

## Story structure

1. What happened?
2. Why does it matter?
3. Who is involved?
4. What did One Vision actually do?
5. What changed?
6. What remains?
7. What can the reader do?

## Impact language

Every metric should have:
- number;
- unit;
- period;
- geography;
- source/measurement method where appropriate.

Example:
“128 young people completed the 2026 digital-skills programme in Imphal East.”

Do not use lifetime totals without a date or definition.

## Sensitive stories

Consent should cover:
- image use;
- name;
- location;
- story details;
- publication channels.

Use pseudonyms or anonymisation when appropriate.

## Calls to action

Use one primary action per section:
- Get Help
- Volunteer
- Support the Work
- Join a Programme
- Read the Story
- Download the Report

Avoid “Learn More” when a specific label is possible.

## Homepage content hierarchy

1. identity and purpose
2. current needs/work
3. people and stories
4. programmes
5. evidence
6. ways to participate
7. transparency
8. contact

## Content governance

Every content item has:
- owner;
- author;
- publication date;
- review date;
- status;
- source/evidence;
- media consent state where relevant.

Sensitive or high-impact content requires a second reviewer.


---

## README.md

# One Vision — Web App Project Plan

This folder contains the implementation blueprint for the One Vision NGO website/app.

## Documents

- `AGENTS.md` — engineering, content, security and delivery rules.
- `DESIGN.md` — visual identity and UI/UX system.
- `ARCHITECTURE.md` — technical architecture and implementation sequence.
- `CONTENT.md` — editorial voice, impact language and content governance.

## Design reference audit

The supplied reference is an extremely long editorial landing page with a strong architecture/portfolio sensibility. Its visible strengths are:

- very clear visual rhythm;
- large image-led compositions;
- generous white space;
- restrained pale blue/cream/stone palette;
- modular image mosaics;
- strong use of device mockups;
- alternating light and dark sections;
- deliberate full-width imagery;
- a long-scroll narrative rather than a conventional SaaS dashboard;
- repeated typography/image pairing that creates a premium editorial feel.

The reference should **not** be copied literally. One Vision should translate its spatial discipline into a public-service experience.

## What to borrow from Greenpeace

Use the campaign/action model:
- current campaign or programme;
- clear action;
- volunteer pathway;
- donation/support pathway;
- stories and updates;
- visible evidence of work.

Greenpeace India currently combines campaigns, stories, volunteer participation and donation explanations in its public experience. This is useful as an information-architecture reference, not as a visual template.

## What to borrow from WHO

Use:
- clear information hierarchy;
- audience-first communication;
- accessibility;
- plain language;
- multilingual readiness;
- credible information;
- purposeful calls to action.

WHO's current communications guidance explicitly emphasises accessible, relevant, actionable, timely, credible and understandable communication.

## One Vision's difference

One Vision should be:
**less institutional than WHO, less campaign-aggressive than Greenpeace, and more intimate/local than either.**

The design should feel like a calm civic space for Imphal.

## Proposed homepage statement

Working direction:

> A stronger Imphal begins with people who show up for one another.

This is a working creative direction, not final copy. Validate it with One Vision leadership and community members.

## First visual production set

Generate/commission:
1. One Vision logo system.
2. Imphal hero illustration.
3. Community support illustration.
4. Youth/education illustration.
5. Health/wellbeing illustration.
6. Women/community leadership illustration.
7. Environment/resilience illustration.
8. Volunteer scene.
9. Help-desk scene.
10. Imphal streetscape editorial image/illustration.
11. Annual report cover system.
12. Social campaign templates.

## First build milestone

The first usable prototype should contain:
- responsive homepage;
- About;
- Programmes listing/detail;
- Stories listing/detail;
- Get Help;
- Volunteer;
- Donate placeholder/flow;
- Contact;
- admin content model;
- design tokens;
- accessibility baseline.

Do not build every possible feature before validating the core experience with real users.
