# 03 — Page Sections Blueprint — One Vision

Every page is a deliberate sequence of the seven composition patterns (Shoreline, Depth Band, Mosaic, Split Narrative, Evidence Shoreline, Ledger, Quiet Close) defined in doc 02 §9. Sections marked **[new]** are additions beyond DESIGN.md §13–17. Every page ends with Quiet Close. Every page carries: breadcrumbs (except `/`), unique H1, SEO metadata, and one primary CTA per viewport.

---

## `/` — Homepage (9 sections)

1. **Shoreline hero** — eyebrow "Community organisation · Imphal, Manipur", display statement *"A stronger Imphal begins with people who show up for one another."*, one-sentence explainer, CTAs **Get Involved** (primary) / **Find Support** (secondary). Media: full-bleed documentary or commissioned illustration, 16:9→21:9.
2. **Depth Band — "What is happening now"** — 3 active programme/campaign entries as Ledger rows (not cards): status chip, title, one-line summary, location, date, arrow link. **[new]** "Last updated" stamp for evidence discipline.
3. **Mosaic — "The people"** — 4:5 lead portrait + satellites; consent-verified human stories; one pull quote (QuoteBlock).
4. **Depth Band — "What we do"** — five programme pillars as numbered Ledger rows (01–05): Community Support / Youth & Education / Health & Wellbeing / Livelihoods & Opportunity / Environment & Resilience. Configurable via CMS, not hard-coded.
5. **Evidence Shoreline** — 3 metrics max, each with number + unit + period + geography + methodology link. `[data-animate]` count-up, reduced-motion instant. **[new]** methodology footnote anchor.
6. **Split Narrative — featured story** — long-form excerpt, 3:2 image, "Read the story" quiet link + related programme tag.
7. **Depth Band — "Take part"** — 4 asymmetric tiles (Volunteer / Partner / Donate / Share knowledge) on mist band; each tile = icon + 2 lines + quiet link; exactly one tile carries button-primary styling per viewport rotation.
8. **Ledger — Transparency** — latest annual report, governance note, funding summary, safeguarding policy link; small Trust Panel.
9. **Quiet Close** — dusk Imphal image + single invitation + primary CTA.

**[new] Section-level additions:** emergency strip (see Get Help) pinned above footer on all pages; language notice placeholder.

---

## `/about` — About (7 sections)

1. **Shoreline** — H1 + founding statement + timeline anchor. Surface: forest, reversed.
2. **Split Narrative — who we are** — mission/values in prose; values as 3 numbered lines (Grounded · Human · Forward) not icon cards.
3. **Mosaic — place** — Imphal/Manipur imagery + local context paragraph; "why here" evidence.
4. **Ledger — Timeline** — founding → milestones → today; each entry: date, title, one line; horizontal on desktop, vertical on mobile.
5. **[new] Depth Band — "How we work"** — 4 operating principles (listen first, partner locally, measure honestly, publish openly) as editorial rows.
6. **[new] Ledger — Team & governance** — leadership/staff list with roles + governance document links; photos optional (4:5), dignity-first; safeguarding lead named.
7. **Trust Panel (full)** + Quiet Close.

---

## `/programmes` — index (5 sections)

1. **Shoreline** — H1 + one-line scope + filter affordance (status/location). **[new]** Filter bar: status (Active / Paused / Completed), geography, pillar. URL-param driven, SSR-friendly.
2. **Ledger — programme list** — rows: pillar chip, title, summary, geography, status, people-served metric (if substantiated), arrow. No card grid.
3. **[new] Evidence Shoreline — portfolio stats** — totals with methodology link (not lifetime vague claims: "In FY 2025–26…").
4. **[new] Depth Band — "Start something with us"** — community-proposal CTA + contact route.
5. Quiet Close.

## `/programmes/[slug]` — detail (9 sections)

1. **Shoreline** — pillar eyebrow, H1, summary, status chip, geography, start date.
2. **Split Narrative — problem/approach** — two-column editorial: "The challenge" / "What we do".
3. **[new] Depth Band — "Who this serves"** — audience + eligibility + how to join/request.
4. **Evidence Shoreline — impact** — programme metrics with dates/methodology.
5. **[new] Mosaic — field evidence** — 1 lead + 3 contextual images, consent metadata in caption credit line.
6. **[new] Timeline — programme milestones**.
7. **Ledger — related stories & documents** — StoryCards + downloadable reports (file type/size shown).
8. **Trust Panel (compact)** + lead contact + Quiet Close.

---

## `/campaigns` — index (4 sections)

1. **Shoreline** — H1 + "current campaigns" framing.
2. **Ledger — active campaigns** — objective, deadline (honest, no fake countdowns), progress evidence where real, CTA.
3. **[new] Depth Band — past campaigns** — archived Ledger with outcome one-liner (what happened after it ended).
4. Quiet Close.

## `/campaigns/[slug]` — detail (8 sections)

1. **Shoreline** — objective-led H1, context dek, status, dates.
2. **Split Narrative — why this matters**.
3. **[new] Evidence Shoreline — progress** — only verified numbers; if none, say what will be measured.
4. **Depth Band — the action** — what One Vision does + what the reader can do (sign, share, volunteer, fund).
5. **[new] FAQ (Accordion primitive)** — 3–6 real questions; honest answers ("we don't provide X; here's who does").
6. **Ledger — updates** — dated update log; newest first; RSS-ready structure.
7. Trust Panel (compact) + Quiet Close.

---

## `/stories` — index (5 sections)

1. **Shoreline** — editorial H1 + tagline; surface: sand band intro.
2. **[new] Featured story** — large Mosaic, one per view.
3. **Ledger — story index** — title, dek, date, location, tag, read time; filter by tag/programme.
4. **[new] Depth Band — "Share your story"** — contribution pathway with consent explainer link.
5. Quiet Close.

## `/stories/[slug]` — article (8 sections)

1. **Shoreline (article)** — H1, dek, byline, date, location, consent note.
2. **Prose body** — `container-prose` 720px; drop-cap optional; pull quotes; in-article images 4:5/3:2; `link-article` styling.
3. **[new] "What changed" box** — outcome summary per CONTENT.md story grammar (points 5–6).
4. **[new] "What you can do"** — one contextual action tied to the story's programme.
5. **[new] Related reading** — 3 Ledger rows.
6. Trust Panel (compact) + Quiet Close.

---

## `/get-help` — Support Finder (core differentiator, 6 sections)

1. **[new] Emergency banner** (first element, above H1, persistent): distinguishes emergency services / external orgs / One Vision support. Never styled as marketing.
2. **Shoreline** — calm H1: "Find support"; reassurance copy: free, confidential, no obligation.
3. **[new] Support Finder (interactive)** — 3-step progressive disclosure, no dead ends:
   - Step 1 — "What do you need help with?" (chips: Food & essentials / Health / Education / Safety / Livelihood / Listening support)
   - Step 2 — "Where are you?" (Imphal East/West/South/North/Rural/other — selects relevant resources)
   - Step 3 — Result states: (a) One Vision provides → programme link + Help Request Form; (b) partner provides → referral card with contact; (c) nobody in network → honest message + nearest external directory entry.
   All steps keyboard-navigable, URL-state encoded (`?need=food&area=imphal-east`), SSR initial render.
4. **Split Narrative — how requests work** — what happens after submit (review → contact within X working days), privacy promise.
5. **[new] Help Request Form** — progressive fields (need type → location → contact preference → details → consent); server-validated (zod), honeypot + rate limit; confirmation state with reference ID and expected next step.
6. Quiet Close.

---

## `/get-involved` — hub (6 sections)

1. **Shoreline** — H1 + "many ways to take part".
2. **[new] Pathways Ledger** — Volunteer / Partner / Donate / Skill-share / Corporate support: each row = what it involves, time commitment, next step.
3. **Depth Band — "Volunteer with us"** — preview + CTA to `/volunteer`.
4. **[new] Split Narrative — partner story** — one partner testimonial + logo row (PartnerLogoRow, monochrome, ≤6).
5. **[new] Events teaser** — next 3 events as Ledger rows; link `/events`.
6. Quiet Close.

## `/volunteer` (5 sections)

1. **Shoreline** — H1 + expectations (time, conduct, safeguarding training).
2. **[new] "What volunteers do"** — 4 real activity descriptions, mist band.
3. **VolunteerForm** — progressive: interest → location → availability → skills → contact → consent (DESIGN.md §17). Inline validation, error summary on submit, focus management, confirmation with response-time promise.
4. **[new] FAQ** — safeguarding, expenses, age requirements, data use.
5. Quiet Close.

## `/donate` (6 sections)

1. **Shoreline** — H1 + what donations support (specific, rupee-anchored ranges only where substantiated).
2. **[new] DonationSelector** — one-time/monthly toggle (if legally cleared), suggested amounts + custom, fee transparency note, 80G receipt note (pending legal confirmation — feature-flagged).
3. **Trust Panel (prominent, right rail on desktop, stacked on mobile)** — registration identity, governance link, annual report, safeguarding.
4. **[new] Impact ledger** — "What ₹X supported" evidence rows with dates.
5. **[new] Other ways to give** — bank transfer, in-kind, legacy — Ledger with instructions.
6. Quiet Close.

## `/events` + `/events/[slug]` **[new routes]**
- Index: Shoreline → Upcoming Ledger (date, venue, capacity, registration state) → Past events archive (outcome one-liners) → Quiet Close.
- Detail: Shoreline (date/time/location/registration CTA) → Description prose → Venue/accessibility notes → Related programme → Quiet Close.

## `/reports` (4 sections)

1. **Shoreline** — H1 + "we publish what we measure".
2. **Ledger — annual reports** — year, period, PDF (size/pages), summary line.
3. **[new] Ledger — financial summaries & policy documents** — 80G, FCRA status (once confirmed), safeguarding, privacy.
4. Quiet Close.

## `/contact` (4 sections)

1. **Shoreline** — H1 + response-time promise.
2. **[new] Contact route chooser** — "I want to…" (get help / volunteer / partner / media / general) → routes to correct form/email; prevents inbox chaos.
3. **ContactSubmissions form** + office address/map (static image, accessible), phone/WhatsApp hours.
4. Quiet Close.

## `/search` **[new]**
Shoreline with prominent search field → grouped results (Programmes / Stories / Campaigns / Reports / Events) with counts → empty state ("Try different words — or browse programmes") → recent/popular links. DB-backed phase 1.

## Footer (global, 4 columns)
Programmes · Get involved · Organisation (about/reports/governance/team) · Contact + legal (privacy/accessibility/terms) + language selector slot + Trust Panel micro-line (registration no., "Registered NGO · Imphal").

---

## Cross-page addition checklist
- [ ] Emergency strip component (global, dismissible per session)
- [ ] Breadcrumbs on all non-home pages
- [ ] Trust Panel: compact + full variants
- [ ] EmptyState/ErrorState per listing (no results, load failure, offline notice)
- [ ] "Last updated" stamps on evidence sections
- [ ] One primary CTA per viewport — enforced in review
- [ ] Every listing page: filter → Ledger → pagination (numbered, not infinite scroll)
