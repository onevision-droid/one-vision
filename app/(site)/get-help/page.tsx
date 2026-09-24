import { Metadata } from "next";
import { SupportFinder } from "@/components/forms/SupportFinder";
import { SectionBadge } from "@/components/composition/SectionBadge";
import { HelpRequestForm } from "@/components/forms/HelpRequestForm";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Get Help | One Vision",
  description: "Find support, access active programmes, or request direct assistance in Imphal and Manipur.",
};

export default function GetHelpPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      
      {/* 1. Header / Intro */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10 flex flex-col items-center text-center">
          <SectionBadge>
            <span className="flex size-1.5 rounded-full bg-primary mr-2"></span>
            Assistance Portal
          </SectionBadge>
          <h1 className="text-balance font-fraunces text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6 max-w-4xl">
            Find Support or Request Assistance
          </h1>
          <p className="text-balance font-sans text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            We are here to help connect you with the right resources, whether it&apos;s through our active programmes or direct assistance.
          </p>
        </div>
      </section>

      {/* 2. Emergency Contact Box */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="max-w-4xl mx-auto bg-background p-6 rounded-2xl border border-border flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h3 className="font-fraunces font-medium text-lg text-foreground">Immediate Needs?</h3>
                <p className="text-sm text-muted-foreground">Call our helpline directly for urgent support.</p>
              </div>
            </div>
            <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 w-fit">
              {siteSettings.contactPhone}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Support Finder */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-fraunces text-3xl md:text-5xl font-light tracking-tight text-foreground">
              Find the right programme
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <SupportFinder />
          </div>
        </div>
      </section>

      {/* 4. Direct Assistance Form */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
           <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-fraunces text-3xl md:text-5xl font-light tracking-tight text-foreground mb-6">
              Can&apos;t find what you need?
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              If our active programmes don&apos;t cover your specific needs, please submit a direct request. We will review it and connect you with partner organizations if we cannot help directly.
            </p>
          </div>
          <div className="max-w-3xl mx-auto p-8 md:p-12 bg-background rounded-3xl border border-border shadow-sm">
            <HelpRequestForm />
          </div>
        </div>
      </section>

    </div>
  );
}
