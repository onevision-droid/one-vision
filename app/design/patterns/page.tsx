import { Metadata } from "next";
import { Shoreline } from "@/components/composition/Shoreline";
import { EvidenceShoreline } from "@/components/composition/EvidenceShoreline";
import { DepthBand } from "@/components/composition/DepthBand";
import { Mosaic } from "@/components/composition/Mosaic";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { Ledger, LedgerRow } from "@/components/composition/Ledger";
import { QuietClose } from "@/components/composition/QuietClose";
import { ImpactMetric } from "@/components/content/ImpactMetric";
import { Button } from "@/components/ui/button";
import { ProgrammeCard } from "@/components/content/CampaignCard";
import { StoryCard } from "@/components/content/StoryCard";
import { MetricCard } from "@/components/content/MetricCard";
import { FeatureCard } from "@/components/content/FeatureCard";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Composition Patterns | One Vision Design System",
  description: "Design system preview of Nordic Purposeful Design components and patterns.",
};

export default function PatternsPage() {
  return (
    <div className="flex flex-col pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 xl:px-6 py-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 rounded-none bg-primary" />
          <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            One Vision Design System
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-foreground">
          Nordic Purposeful Design Patterns
        </h1>
        <p className="text-body text-muted-foreground max-w-2xl mt-4 font-normal leading-relaxed">
          Clean, calm, and human-centered design primitives and card layouts built for trust, clarity, and impact.
        </p>

        {/* ═══ Section 06: Tags & Badges Preview ═══ */}
        <div className="mt-10 p-6 border border-border bg-card rounded-none shadow-xs">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            06. Tags & Badges
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="programme">Programme</Badge>
            <Badge variant="story">Story</Badge>
            <Badge variant="impact">Impact</Badge>
            <Badge variant="volunteer">Volunteer</Badge>
            <Badge variant="community">Community</Badge>
            <Badge variant="urgent">Urgent</Badge>
            <span className="text-border mx-2">|</span>
            <Badge variant="active">Active</Badge>
            <Badge variant="pending">Pending</Badge>
            <Badge variant="completed">Completed</Badge>
          </div>
        </div>

        {/* ═══ Section 08: Card Components Preview ═══ */}
        <div className="mt-12">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            08. Card Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* 1. Programme Card */}
            <div className="flex flex-col">
              <ProgrammeCard
                title="Community Health Connect"
                summary="Reliable health information and preventive services for stronger communities."
                status="Programme"
                href="/programmes"
                image="/home-hero-2026.jpg"
              />
              <span className="text-[11px] font-sans text-muted-foreground mt-2 text-center">Programme Card</span>
            </div>

            {/* 2. Story Card */}
            <div className="flex flex-col">
              <StoryCard
                title="Local Voices, Real Change"
                summary="Stories of resilience, leadership and shared humanity from across Manipur."
                href="/stories"
                image="/community-voices.jpg"
                badge="Story"
              />
              <span className="text-[11px] font-sans text-muted-foreground mt-2 text-center">Story Card</span>
            </div>

            {/* 3. Metric Card */}
            <div className="flex flex-col">
              <MetricCard
                value="2,500+"
                label="People Reached"
                bars={[20, 35, 50, 65, 80, 95, 70]}
              />
              <span className="text-[11px] font-sans text-muted-foreground mt-2 text-center">Metric Card</span>
            </div>

            {/* 4. Feature Card */}
            <div className="flex flex-col">
              <FeatureCard
                eyebrow="JOIN OUR WORK"
                title="Support Communities in Manipur."
                buttonText="Donate Now"
                buttonHref="/donate"
                image="/about-hero.jpg"
              />
              <span className="text-[11px] font-sans text-muted-foreground mt-2 text-center">Feature Card</span>
            </div>
          </div>
        </div>
      </div>

      <Shoreline 
        headingId="shoreline-preview"
        eyebrow="Shoreline"
        headline="The primary pattern for introducing major concepts, framing text with ample negative space."
        description="It creates a calm, structured reading environment. The asymmetrical layout guides the eye naturally."
      />

      <DepthBand 
        headingId="depth-band-preview"
        heading={<span className="font-sans text-center block">For highly focused, immersive sections.</span>}
      >
        <p className="text-center text-muted-foreground font-light">
          Used sparingly to break the rhythm and draw absolute attention to a single concept or call to action.
        </p>
      </DepthBand>

      <Mosaic
        headingId="mosaic-preview"
        heading="A rigid, architectural approach to image galleries."
        lead={<div className="w-full h-full bg-muted flex items-center justify-center font-sans text-muted-foreground">Lead Image</div>}
        satellites={[
          <div key="1" className="w-full h-full bg-muted flex items-center justify-center font-sans text-muted-foreground">Satellite 1</div>,
          <div key="2" className="w-full h-full bg-muted flex items-center justify-center font-sans text-muted-foreground">Satellite 2</div>,
          <div key="3" className="w-full h-full bg-muted flex items-center justify-center font-sans text-muted-foreground">Satellite 3</div>
        ]}
      />

      <SplitNarrative
        headingId="split-narrative-preview"
        heading="Pairing detailed context with an anchoring image."
        content={
          <p>
            This pattern grounds abstract ideas by pairing them immediately with concrete, visual evidence.
          </p>
        }
        media={
          <div className="w-full h-full min-h-100 bg-muted flex items-center justify-center font-sans text-muted-foreground">Image</div>
        }
      />

      <EvidenceShoreline 
        headingId="evidence-preview"
        heading="Quantifying the work we do."
        metrics={
          <>
            <ImpactMetric value={1200} label="Families Supported" date="Last Month" />
            <ImpactMetric value={340} label="Volunteers Active" date="Ongoing" />
          </>
        }
      />

      <Ledger heading="Structured, scannable lists." headingId="ledger-preview">
        <LedgerRow title="Community Outreach" meta="Started 2024" />
        <LedgerRow title="Youth Education" meta="Ongoing" />
      </Ledger>

      <QuietClose
        heading="Ready to get involved?"
        action={<Button size="lg">Join Us</Button>}
      />
    </div>
  );
}
