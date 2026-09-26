import { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { Card, CardContent } from "@/components/ui/card";
import { DonateForm } from "@/components/forms/DonateForm";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { TrustPanel } from "@/components/content/TrustPanel";

export const metadata: Metadata = {
  title: "Donate | One Vision",
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
    <div className="flex flex-col w-full bg-paper pt-20">
      <PageHero
        badge="Make a Contribution"
        heading={
          <>
            Fund Community <br />
            Resilience.
          </>
        }
        description="Your contribution directly funds rapid disaster relief, mobile health clinics, and educational resources. No unnecessary red tape, just direct impact."
        imageSrc="/new-illustrations/community-support.webp"
        imageAlt="Community members"
      />

      <Section tone="default" className="pt-16 pb-24">
        <Container>
          <div className="mb-12">
            <Breadcrumbs items={[{ label: "Donate", href: "/donate" }]} />
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start mb-16">
            {/* Main Donation Form */}
            <div className="space-y-8">
              <Card className="border-border-default shadow-none bg-paper rounded-none">
                <CardContent className="p-8 md:p-10">
                  <DonateForm recurringEnabled={env.DONATE_RECURRING_ENABLED} allocationPreference={campaign} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <Card className="border-border-default shadow-none bg-surface-alt rounded-none">
                <CardContent className="p-6">
                  <h4 className="font-sans font-medium text-heading-md text-ink-900 mb-3">
                    Prefer to donate supplies?
                  </h4>
                  <p className="font-sans text-body-sm text-ink-500 font-light mb-4 leading-relaxed">
                    We accept non-perishable food, medical supplies, and educational
                    materials directly at our Imphal distribution warehouse.
                  </p>
                  <Link
                    href="/contact"
                    className="text-action-primary hover:text-action-hover text-body-sm font-medium underline underline-offset-4"
                  >
                    View drop-off locations & guidelines
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border-default shadow-none bg-surface-alt rounded-none">
                <CardContent className="p-6">
                  <h4 className="font-sans font-medium text-heading-md text-ink-900 mb-3">
                    Statutory Exemption
                  </h4>
                  <p className="font-sans text-body-sm text-ink-500 font-light leading-relaxed">
                    Donations from Indian residents qualify for 50% tax deduction
                    under Section 80G of the Income Tax Act. A stamped receipt is
                    emailed immediately upon transaction settlement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Full Prominent Trust Panel */}
          <div className="pt-8 border-t border-border-default">
            <span className="text-caption uppercase tracking-widest text-ink-500 font-semibold mb-4 block">
              Governance & Integrity
            </span>
            <TrustPanel variant="full" />
          </div>
        </Container>
      </Section>
    </div>
  );
}
