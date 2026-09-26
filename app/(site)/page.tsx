import { Metadata } from "next";
import { Hero } from "@/components/content/Hero";
import { StatsHero } from "@/components/composition/StatsHero";
import { WhatWeDo } from "@/components/composition/WhatWeDo";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { ProgrammesGrid } from "@/components/composition/ProgrammesGrid";
import { QuietClose } from "@/components/composition/QuietClose";

import { ProgrammesBento } from "@/components/composition/ProgrammesBento";
import { stories } from "@/lib/data/stories";

import orgData from "@/content/org.json";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "One Vision | Humanitarian Vanguard — Imphal, Manipur",
  description:
    "Decentralised crisis-resilient humanitarian vanguard operating across the Manipur polycrisis zone. 4 operational pillars: Health Equity, Energy Sovereignty, Ecological Restoration, Economic Dignity.",
  openGraph: {
    title: "One Vision | Humanitarian Vanguard — Imphal",
    description:
      "12,400+ people reached. 18 decentralised health nodes. 240kW solar deployed. One vanguard operating in the Manipur polycrisis zone.",
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
  alternateName: "One Vision Manipur",
  url: "https://onevision.org",
  foundingDate: "1988",
  description:
    "Decentralised crisis-resilient humanitarian vanguard. Formerly Society for Health & Education Manipur (1988). Operating across the Manipur polycrisis zone.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Imphal",
    addressRegion: "Manipur",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: orgData.contact.phone,
    contactType: "humanitarian operations",
    email: orgData.contact.email,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />


      {/* 1. Hero — Crisis framing */}
      <div className="border-b border-border-default">
        <Hero />
      </div>

      {/* 2. Key Metrics at a Glance */}
      <div className="border-b border-border-default">
        <StatsHero
          heading="Ground Reality: Q3 2026"
          description="All metrics are documented and verifiable. Sources available via field operations logs. No estimates."
          ctaLabel="Read the Q3 2026 field report"
          ctaHref="/stories"
          stats={orgData.stats.map((stat) => ({
            value: typeof stat.value === "number" ? stat.value.toLocaleString("en-GB") : String(stat.value),
            suffix: stat.suffix || "",
            label: stat.label,
          }))}
        />
      </div>

      {/* 3. The 4 Pillars — Operational Dashboard */}
      <div className="border-b border-border-default">
        <ProgrammesBento />
      </div>

      {/* 4. Ground Reality Section */}
      <div className="border-b border-border-default">
        <WhatWeDo />
      </div>

      {/* 5. Programmes / Pillar Detail Grid */}
      <div className="border-b border-border-default">
        <ProgrammesGrid />
      </div>

      {/* 6. Featured Field Report */}
      <div className="border-b border-border-default">
        <SplitNarrative
          heading="Field Report"
          content={
            <div className="prose prose-lg">
              <div className="text-label uppercase tracking-widest text-ink-500 font-semibold mb-4">
                {stories[0].date} — Pillar 1: Health Equity
              </div>
              <h3 className="font-sans text-heading-xl font-medium mb-4">
                {stories[0].title}
              </h3>
              <p>{stories[0].excerpt}</p>
              <div className="mt-6 pt-6 border-t border-border-default flex items-center gap-2 text-body-sm text-ink-500">
                <Shield className="size-4" aria-hidden="true" />
                <span>Identities anonymised. Location withheld for OpSec.</span>
              </div>
            </div>
          }
          media={
            <Image
              src={stories[0].image}
              alt="Field report visual — identities and locations anonymised"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          }
        />
      </div>

      {/* 7. Closing CTA — Deploy Support */}
      <QuietClose
        label="Critical Funding Needed"
        heading="Three campaigns need immediate support."
        description="Every rupee deployed goes directly to field operations. Full financial transparency via our open ledger."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6 bg-safety-orange hover:bg-safety-orange-dim text-paper"
            render={
              <Link href="/donate" className="flex items-center">
                <span>Deploy Support</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
