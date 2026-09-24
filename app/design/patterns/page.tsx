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

export const metadata: Metadata = {
  title: "Composition Patterns",
  description: "Design system preview of Nordic Lagoon composition patterns.",
};

export default function PatternsPage() {
  return (
    <div className="flex flex-col pb-20">
      <div className="container-wide py-12">
        <h1 className="text-h1 font-display">Composition Patterns</h1>
        <p className="text-body text-text-secondary max-w-2xl mt-4">
          Preview of the Nordic Lagoon composition patterns. These are the macro-layout 
          components used to construct pages.
        </p>
      </div>

      <Shoreline 
        headingId="shoreline-preview"
        eyebrow="Shoreline"
        headline="The primary pattern for introducing major concepts, framing text with ample negative space."
        description="It creates a calm, structured reading environment. The asymmetrical layout guides the eye naturally."
      />

      <DepthBand 
        headingId="depth-band-preview"
        heading={<span className="font-fraunces text-center block">For highly focused, immersive sections.</span>}
      >
        <p className="text-center">
          Used sparingly to break the rhythm and draw absolute attention to a single concept or call to action.
        </p>
      </DepthBand>

      <Mosaic
        headingId="mosaic-preview"
        heading="A rigid, architectural approach to image galleries."
        lead={<div className="w-full h-full bg-mist flex items-center justify-center font-inter text-ink/50">Lead Image</div>}
        satellites={[
          <div key="1" className="w-full h-full bg-mist flex items-center justify-center font-inter text-ink/50">Satellite 1</div>,
          <div key="2" className="w-full h-full bg-mist flex items-center justify-center font-inter text-ink/50">Satellite 2</div>,
          <div key="3" className="w-full h-full bg-mist flex items-center justify-center font-inter text-ink/50">Satellite 3</div>
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
          <div className="w-full h-full min-h-100 bg-mist flex items-center justify-center font-inter text-ink/50 rounded-none">Image</div>
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
