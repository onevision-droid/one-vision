import { Metadata } from "next";
import { Hero } from "@/components/content/Hero";
import { WhatWeDo } from "@/components/composition/WhatWeDo";
import { CommunityAction } from "@/components/composition/CommunityAction";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { EvidenceShoreline } from "@/components/composition/EvidenceShoreline";
import { ProgrammesGrid } from "@/components/composition/ProgrammesGrid";
import { QuietClose } from "@/components/composition/QuietClose";
import { EmergencyBanner } from "@/components/ui/EmergencyBanner";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { ImpactMetric } from "@/components/content/ImpactMetric";
import { ProgrammesBento } from "@/components/composition/ProgrammesBento";
import { MissionNetwork } from "@/components/composition/MissionNetwork";
import { stories } from "@/lib/data/stories";
import { siteSettings } from "@/lib/data/site-settings";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const defaultMetadata: Metadata = {
  title: "One Vision | Community Organisation in Imphal",
  description: "A community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
  openGraph: {
    title: "One Vision | Community Organisation",
    description: "Building resilience across Imphal and Manipur.",
    url: "https://onevision.org",
    siteName: "One Vision",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-paper">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Bento Grid */}
      <ProgrammesBento />

      {/* 3. Mission Network - Introduction */}
      <MissionNetwork />

      {/* 3. What We Do - Active Programmes Overview */}
      <WhatWeDo />

      {/* 4. Programmes Grid - Explore Our Work */}
      <ProgrammesGrid />

      {/* 5. SplitNarrative - Featured Story */}
      <SplitNarrative
        heading="Latest Story"
        content={
          <div className="prose prose-lg">
            <h3 className="font-fraunces text-3xl font-light mb-4">{stories[0].title}</h3>
            <p>{stories[0].excerpt}</p>
            <QuoteBlock 
              quote="When the floods hit, we didn't wait for outside help. We organized ourselves."
              attribution={stories[0].author}
            />
          </div>
        }
        media={
          <Image src={stories[0].image} alt="Featured story" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-none" />
        }
      />

      {/* 6. CommunityAction - Operational Features */}
      <CommunityAction />

      {/* 7. EvidenceShoreline - Impact Metrics */}
      <EvidenceShoreline
        heading="Transparent Outcomes"
        metrics={
          <>
            <ImpactMetric value={1200} label="Families Supported" date="Last Month" />
            <ImpactMetric value={45} label="Active Volunteers" date="Ongoing" />
            <ImpactMetric value={12} label="Relief Camps" date="Current" />
            <ImpactMetric value={85} suffix="%" label="Fund Efficiency" date="2025 Audit" />
          </>
        }
      />

      {/* 8. QuietClose - Call to Action */}
      <QuietClose
        label="Join the Network"
        heading="Ready to get involved?"
        description="Whether you can offer time, specialized skills, or resources, every single contribution helps build resilience in Imphal."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/volunteer" className="flex items-center">
                <span>Volunteer with us</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />

      {/* 9. EmergencyBanner - Strip above footer */}
      {siteSettings.emergencyMode && (
        <EmergencyBanner 
          title="Emergency Relief Active" 
          description={siteSettings.emergencyMessage}
          actionLabel="View Details"
          actionHref="/campaigns/winter-relief"
        />
      )}
    </div>
  );
}

export function generateMetadata() {
  return {
    ...defaultMetadata,
    other: {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "One Vision",
        "url": "https://onevision.org",
        "description": "A community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Imphal",
          "addressRegion": "Manipur",
          "addressCountry": "IN"
        }
      })
    }
  }
}
