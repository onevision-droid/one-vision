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
