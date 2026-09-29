import { Metadata } from"next";
import { Hero } from"@/components/content/Hero";
import { StatsHero } from"@/components/composition/StatsHero";
import { WhatWeDo } from"@/components/composition/WhatWeDo";
import { SplitNarrative } from"@/components/composition/SplitNarrative";
import { ProgrammesBento } from"@/components/composition/ProgrammesBento";
import { stories } from"@/lib/data/stories";

import orgData from"@/content/org.json";
import Image from"next/image";
import Link from"next/link";
import { ArrowRight, Shield, MessageCircle, ExternalLink, Phone, Mail } from"lucide-react";

export const metadata: Metadata = {
  title: "One Vision | Community Health, Relief & Sustainable Development — Manipur",
  description:
    "Serving Manipur's communities since 1988 (formerly Society for Health & Education Manipur). Working across healthcare, disaster relief, sustainable ecology, and youth livelihoods with complete financial transparency.",
  openGraph: {
    title: "One Vision | Community Health & Sustainable Development — Manipur",
    description:
      "12,400+ people supported. 18 community health centres. 25+ villages and neighbourhoods reached across Manipur since 1988.",
    url: "https://onevision.org",
    siteName: "One Vision",
    locale: "en_GB",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "One Vision",
  alternateName: "Society for Health & Education Manipur",
  url: "https://onevision.org",
  foundingDate: "1988",
  description:
    "Community-led non-profit organisation working for health equity, environmental restoration, and resilient livelihoods across Manipur. Established in 1988 as the Society for Health & Education Manipur.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Imphal",
    addressRegion: "Manipur",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: orgData.contact.phone,
    contactType: "community support and relief",
    email: orgData.contact.email,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />


      {/* 1. Hero — Community framing */}
      <div className="border-b border-border">
        <Hero />
      </div>

      {/* 1.5. Community Reach & Impact Band */}
      <div className="bg-muted/30 text-foreground border-b border-border">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center transition-colors hover:bg-muted/60">
              <span className="font-serif text-3xl sm:text-4xl font-light text-foreground">25+</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">Communities Reached</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center transition-colors hover:bg-muted/60">
              <span className="font-serif text-3xl sm:text-4xl font-light text-foreground">18</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">Community Health Centres</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center transition-colors hover:bg-muted/60">
              <span className="font-serif text-3xl sm:text-4xl font-light text-foreground">12,400+</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">People Supported</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center transition-colors hover:bg-muted/60">
              <span className="font-serif text-3xl sm:text-4xl font-light text-foreground">500+</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">Young People Mentored</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics at a Glance */}
      <div className="border-b border-border">
        <StatsHero
          heading="What does community change look like?"
          description="It looks like a young person gaining practical livelihood skills. A neighbourhood restoring clean waterways. A family accessing reliable medicine and preventative health care. That is lasting impact."
          ctaLabel="Read Stories"
          ctaHref="/stories"
          stats={orgData.stats.map((stat) => ({
            value: typeof stat.value === "number" ? stat.value.toLocaleString("en-GB") : String(stat.value),
            suffix: stat.suffix || "",
            label: stat.label,
          }))}
        />
      </div>

      {/* 3. The 5 Programmes — Core Initiatives */}
      <div className="border-b border-border">
        <ProgrammesBento />
      </div>

      {/* 4. Ground Reality Section */}
      <div className="border-b border-border">
        <WhatWeDo />
      </div>

      {/* 4.5 The One Vision Method */}
      <div className="border-b border-border bg-muted">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="p-8 md:p-14 lg:p-24 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-border transition-colors duration-500">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-tight max-w-xl">
                We don&apos;t arrive with answers. We build them with <span className="underline decoration-primary decoration-2 underline-offset-8">communities</span>.
              </h2>
            </div>
            <div className="relative w-full h-[40vh] lg:h-auto min-h-85 bg-muted">
              <Image
                src="/community_voices.jpg"
                alt="Community co-design session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 pointer-events-none bg-background/5" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Featured Community Story */}
      <div className="border-b border-border">
        <SplitNarrative
          heading="Community Story"
          content={
            <div className="flex flex-col h-full justify-center">
              <div className="font-sans text-xs uppercase tracking-wider text-primary font-semibold mb-6">
                {stories[0].date} — Youth & Future Skills
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
                {stories[0].title}
              </h3>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-12">
                {stories[0].excerpt}
              </p>
              <div className="mt-auto">
                <Link href={`/stories/${stories[0].slug}`} className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors rounded-sm">
                  Read Story <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-12 pt-6 border-t border-border flex items-start gap-3 text-muted-foreground">
                <Shield className="size-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span className="font-sans text-xs leading-relaxed">Stories shared with community consent to celebrate local leadership and protect privacy.</span>
              </div>
            </div>
          }
          media={
            <Image
              src={stories[0].image}
              alt="Community story visual"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          }
        />
      </div>

      {/* 6. Grassroots Assistance & Contact */}
      <div className="border-b border-border bg-card text-foreground">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-2 rounded-full bg-primary shrink-0" />
                <span className="font-sans text-xs tracking-wider uppercase text-muted-foreground font-semibold">
                  Grassroots Assistance
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-[0.95] mb-6">
                Need help or looking to partner? Reach our community team.
              </h2>
              <p className="font-sans text-base md:text-lg max-w-prose text-muted-foreground font-light leading-relaxed mb-8">
                Whether you need health assistance, disaster relief, or want to collaborate on local community projects, our coordinators are on the ground across Manipur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-help" className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors rounded-sm">
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                  <span>Get Help</span>
                  <ExternalLink className="size-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-1 p-6 md:p-8 lg:p-10 border-b border-border hover:bg-muted/50 transition-colors flex flex-col justify-center group">
                <div className="flex items-start gap-5">
                  <div className="size-12 bg-muted flex items-center justify-center shrink-0 border border-border rounded-[2px]">
                    <Phone className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-base font-semibold text-foreground mb-1">Community Helpline</p>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">Direct line for healthcare support and emergency assistance.<br />{orgData.contact.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8 lg:p-10 hover:bg-muted/50 transition-colors flex flex-col justify-center group">
                <div className="flex items-start gap-5">
                  <div className="size-12 bg-muted flex items-center justify-center shrink-0 border border-border rounded-[2px]">
                    <Mail className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-base font-semibold text-foreground mb-1">General Enquiries</p>
                    <p className="font-sans text-sm max-w-prose text-muted-foreground leading-relaxed">For civil society partnerships, volunteer queries, and institutional relations.<br />{orgData.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Trust & Transparency */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="p-6 md:p-10 lg:p-12 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="size-2 rounded-full bg-primary shrink-0" />
              <span className="font-sans text-xs tracking-wider uppercase text-muted-foreground font-semibold">
                Integrity & Trust
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-[0.95]">
              Rooted in Transparency & Accountability
            </h2>
            <p className="font-sans text-base text-muted-foreground mt-3 max-w-2xl">
              Every rupee received is dedicated to grassroots impact in Manipur. Registered non-profit since 1988 with public financial reporting.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
            <Link href="/open-ledger" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Open Ledger</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mt-4 mb-3">Transparent Accounting</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Every donation and grant allocation tracked with hourly updates. No hidden costs, with maximum funding directed to field programmes.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-8 group-hover:underline underline-offset-4 transition-colors">
                Open Ledger <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/about/governance" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Governance</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mt-4 mb-3">Board & Leadership</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Governed under the Manipur Societies Registration Act (1989). Independent board oversight, bylaws, and conflict of interest policies.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-8 group-hover:underline underline-offset-4 transition-colors">
                Governance <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/reports" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Reports</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mt-4 mb-3">Audited Statements</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Download verified annual reports, statutory auditor certificates, and programme impact evaluations.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-8 group-hover:underline underline-offset-4 transition-colors">
                Reports <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 8. Closing CTA — Community Action */}
      <section className="bg-muted/30 text-foreground border-t border-border overflow-hidden relative">
        <div className="relative mx-auto text-center max-w-4xl px-6 py-16 md:py-24 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="size-2 rounded-full bg-primary shrink-0" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">Our Shared Future</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-[0.95] text-balance">
            The future of our communities is something we build together.
          </h2>
          <p className="font-sans text-base md:text-xl max-w-2xl mx-auto text-muted-foreground mb-10 font-light leading-relaxed text-balance">
            One Vision is working with families, youth, and local leaders across Manipur to build healthier communities, restore fragile ecosystems, and expand economic opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <Link href="/programmes" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors rounded-sm">
              Our Work
              <ArrowRight className="size-3.5" />
            </Link>
            <Link href="/volunteer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border text-foreground hover:bg-muted font-medium text-xs transition-colors rounded-sm">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
