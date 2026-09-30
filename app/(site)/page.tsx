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
import { ArrowRight, Shield, MessageCircle } from"lucide-react";

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

      {/* ═══ Section 1: Hero (Layout Locked) ═══ */}
      <Hero />

      {/* ═══ Section 2: Impact at a Glance ═══ */}
      <StatsHero
        heading="Community impact, measured."
        description="Healthcare access, ecological restoration, and youth mentorship — this is what lasting change looks like across Manipur."
        ctaLabel="Stories"
        ctaHref="/stories"
        stats={orgData.stats.map((stat) => ({
          value: typeof stat.value === "number" ? stat.value.toLocaleString("en-GB") : String(stat.value),
          suffix: stat.suffix || "",
          label: stat.label,
        }))}
      />

      {/* ═══ Section 3: Our Programmes ═══ */}
      <ProgrammesBento />

      {/* ═══ Section 4: Community Approach (merged WhatWeDo + Method) ═══ */}
      <WhatWeDo />

      {/* ═══ Section 5: Community Story ═══ */}
      <SplitNarrative
        heading="Community Story"
        content={
          <div className="flex flex-col h-full justify-center">
            <div className="font-sans text-xs uppercase tracking-wider text-primary font-semibold mb-6">
              {stories[0].date} — Youth & Future Skills
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
              {stories[0].title}
            </h3>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
              {stories[0].excerpt}
            </p>
            <div className="mt-auto flex items-center gap-4">
              <Link href={`/stories/${stories[0].slug}`} className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors">
                Read Story <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <p className="mt-8 pt-4 border-t border-border font-sans text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
              <Shield className="size-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
              Shared with community consent.
            </p>
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

      {/* ═══ Section 6: Trust, Transparency & Action (merged) ═══ */}
      <div className="bg-background">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Trust heading */}
          <div className="mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-tight">
              Transparency & Accountability
            </h2>
            <p className="font-sans text-base text-muted-foreground mt-3 max-w-2xl">
              Every rupee received is dedicated to grassroots impact. Registered non-profit since 1988.
            </p>
          </div>

          {/* Trust cards */}
          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border mb-16">
            <Link href="/open-ledger" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Open Ledger</span>
                <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mt-3 mb-2">Transparent Accounting</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Every donation tracked. No hidden costs.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:underline underline-offset-4">
                View <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/about/governance" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Governance</span>
                <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mt-3 mb-2">Board & Leadership</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Independent oversight under the Manipur Societies Registration Act.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:underline underline-offset-4">
                View <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/reports" className="group bg-background hover:bg-muted/40 p-6 md:p-8 flex flex-col justify-between transition-colors duration-300">
              <div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-primary">Reports</span>
                <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mt-3 mb-2">Audited Statements</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Annual reports and programme impact evaluations.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:underline underline-offset-4">
                View <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* Closing CTA — merged with contact */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 leading-tight text-balance">
              The future of our communities is something we build together.
            </h2>
            <p className="font-sans text-base text-muted-foreground mb-8 font-light leading-relaxed text-balance">
              Partner with us, volunteer your skills, or reach our community team directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/volunteer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors">
                Volunteer
                <ArrowRight className="size-3.5" />
              </Link>
              <Link href="/get-help" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border text-foreground hover:bg-muted font-medium text-xs transition-colors">
                <MessageCircle className="size-3.5" aria-hidden="true" />
                Get Help
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border text-foreground hover:bg-muted font-medium text-xs transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
