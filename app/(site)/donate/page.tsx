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
        badge="COMMUNITY GIVING · 80G TAX EXEMPT"
        heading={
          <>
            Every Rupee<br/>
            Powers Community.
          </>
        }
        description="Support frontline community health centres, youth mentorship, and sustainable grassroots livelihoods in Manipur. 100% transparent, audited, and tax-exempt."
        image="/donate-hero.jpg"
        imageAlt="Community aid distribution and sustainable support in Manipur"
      />

      <Section tone="default">
        <Container>
          <div className="grid lg:grid-cols-[1fr_380px] gap-0 items-start border border-border">
            {/* Main Donation Form */}
            <div className="p-6 md:p-8 lg:p-10 w-full max-w-3xl lg:border-r border-border bg-card">
              <DonateForm recurringEnabled={env.DONATE_RECURRING_ENABLED} allocationPreference={campaign} />
            </div>

            {/* Sidebar Information */}
            <div className="flex flex-col h-full bg-background">
              <div className="p-6 md:p-8 border-b border-border bg-card hover:bg-muted/40 transition-colors">
                <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-3 sm:mb-4">
                  Prefer to donate supplies?
                </h4>
                <p className="font-sans text-base text-muted-foreground font-light mb-4 sm:mb-6 leading-relaxed">
                  We accept educational materials, clinic supplies, solar lamps, and medical hardware for our 18 community health centres.
                </p>
                <Link
                  href="/contact"
                  className="font-sans text-xs font-medium uppercase tracking-wider text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Inquire about physical drop-offs</span> &rarr;
                </Link>
              </div>

              <div className="p-6 md:p-8 bg-muted/40 border-b border-border">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">
                  Tax Deduction
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-3 sm:mb-4">
                  Section 80G Exemption
                </h4>
                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
                  Donations from Indian residents qualify for 50% tax deduction
                  under Section 80G of the Income Tax Act. A verified, digitally stamped receipt is
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
