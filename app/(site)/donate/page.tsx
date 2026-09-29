import { Metadata } from"next";
import { notFound } from"next/navigation";
import { env } from"@/lib/env";
import { DonateForm } from"@/components/forms/DonateForm";
import Link from"next/link";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { TrustPanel } from"@/components/content/TrustPanel";

export const metadata: Metadata = {
  title:"Donate | One Vision",
  description:
   "Support community resilience in Manipur. Transparent, direct, and accountable allocation of resources.",
};

export default async function DonatePage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const campaign = typeof searchParams.campaign === 'string' ? searchParams.campaign : 'general';
  if (!env.DONATE_ENABLED) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero
        badge="SUPPORT US"
        heading={
          <>
            Fund<br/>
            Resilience.
          </>
        }
        description="Directly fund community-led innovation, health programs, and youth development. We build for the long term."
        image="/donate-hero.jpg"
        imageAlt="Community aid distribution and sustainable support in Manipur"
      />

      <Section tone="default">
        <Container className="px-0 md:px-0">
          <div className="grid lg:grid-cols-[1fr_380px] gap-0 items-start border-x border-b border-border">
            {/* Main Donation Form */}
            <div className="p-6 md:p-8 lg:p-10 w-full max-w-3xl lg:border-r border-border bg-muted">
              <DonateForm recurringEnabled={env.DONATE_RECURRING_ENABLED} allocationPreference={campaign} />
            </div>

            {/* Sidebar Information */}
            <div className="flex flex-col h-full bg-background">
              <div className="p-6 md:p-8 border-b border-border group hover:bg-foreground transition-colors duration-500">
                <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-3 sm:mb-4 group-hover:text-background transition-colors">
                  Prefer to donate resources?
                </h4>
                <p className="font-sans text-base text-muted-foreground font-light mb-4 sm:mb-6 leading-relaxed group-hover:text-background/70 transition-colors">
                  We accept books, computers, and medical supplies for our community hubs and health connect programs.
                </p>
                <Link
                  href="/contact"
                  className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground hover:text-destructive group-hover:text-destructive underline underline-offset-4 transition-colors"
                >
                  Inquire about physical drop-offs &rarr;
                </Link>
              </div>

              <div className="p-6 md:p-8 bg-foreground group">
                <h4 className="font-serif text-xl sm:text-2xl font-light text-background mb-3 sm:mb-4">
                  Statutory Exemption
                </h4>
                <p className="font-sans text-base text-background/70 font-light leading-relaxed">
                  Donations from Indian residents qualify for 50% tax deduction
                  under Section 80G of the Income Tax Act. A stamped receipt is
                  emailed immediately upon transaction settlement.
                </p>
              </div>
            </div>
          </div>

          {/* Full Prominent Trust Panel */}
          <div className="pt-8 lg:pt-10 border-t border-border">
            <span className="text-caption uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">
              Governance & Integrity
            </span>
            <TrustPanel variant="full" />
          </div>
        </Container>
      </Section>
    </div>
  );
}
