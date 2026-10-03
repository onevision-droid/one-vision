import orgData from "@/content/org.json";
import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { PartnerLogoRow } from "@/components/content/PartnerLogoRow";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { FeatureCard } from "@/components/content/FeatureCard";

export const metadata: Metadata = {
  title: "About | One Vision",
  description:
    "One Vision is a community-led organisation working for a healthier, greener and more resilient Manipur since 1988.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      {/* ═══ 01 — Hero (Layout Locked) ═══ */}
      <PageHero
        badge="ABOUT ONE VISION · EST. 1988"
        heading={
          <>
            Our<br />
            Foundations.
          </>
        }
        description="A community-led organisation working for a healthier, greener and more resilient Manipur since 1988. Formerly known as the Society for Health & Education Manipur."
        image="/about-hero.jpg"
        imageAlt="Community volunteers and organizers collaborating in Manipur"
      />

      {/* ═══ 02 — Institutional Origin & Mandate ═══ */}
      <Section tone="default" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                Origin & Purpose
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight">
                Rooted in Community.<br />
                Guided by Evidence.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
              <p>
                Established in 1988 as the Society for Health & Education Manipur, One Vision was founded on a simple principle: lasting civic resilience is achieved when local communities hold the authority, knowledge, and tools to shape their own futures.
              </p>
              <p>
                Over nearly four decades of service through periods of economic strain, logistical isolation, and ecological challenges, we have maintained continuous grassroots presence across Imphal and neighboring districts. We do not impose prepackaged external models; we partner directly with residents, elders, and young leaders to build durable systems of care.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs font-sans mb-1">
                    <ShieldCheck className="size-4 text-primary" />
                    <span>Legal Status</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Reg. No. {orgData.org.regNo} · Manipur Societies Registration Act, 1989
                  </p>
                </div>
                <div className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs font-sans mb-1">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>Fiscal Transparency</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    12A & 80G Certified Non-Profit · Complete open accounting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 03 — Documentary Image Essay: Deeply Rooted in Manipur ═══ */}
      <Section tone="alt" className="py-16 md:py-24 border-b border-border">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
              Documentary Field Notes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
              Deeply Rooted in Manipur
            </h2>
            <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
              Our initiatives operate through trusted community networks across Imphal and rural districts, upholding local dignity and collective autonomy.
            </p>
          </div>

          {/* Editorial Photo Essay: 1 Lead + 2 Satellites */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Lead Image (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col border border-border bg-card overflow-hidden">
              <div className="relative aspect-4/3 w-full bg-muted">
                <Image
                  src="/home-hero-2026.jpg"
                  alt="Community members and organizers gathered in discussion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex items-start justify-between gap-4 border-t border-border">
                <p className="font-sans text-xs sm:text-sm text-foreground font-light">
                  Local logistics and field strategy session with neighborhood coordinators in Imphal.
                </p>
                <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  <MapPin className="size-3 text-primary" />
                  Imphal West
                </span>
              </div>
            </div>

            {/* Supporting Images (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Supporting Image 1 */}
              <div className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-muted">
                  <Image
                    src="/volunteer-hero.jpg"
                    alt="Youth volunteers organizing community distribution"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex items-start justify-between gap-4 border-t border-border">
                  <p className="font-sans text-xs text-foreground font-light">
                    Youth volunteers sorting and packaging maternal health relief kits.
                  </p>
                  <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <MapPin className="size-3 text-primary" />
                    Care Hub
                  </span>
                </div>
              </div>

              {/* Supporting Image 2 */}
              <div className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-muted">
                  <Image
                    src="/community-voices.jpg"
                    alt="Community health coordinator consulting with elder resident"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex items-start justify-between gap-4 border-t border-border">
                  <p className="font-sans text-xs text-foreground font-light">
                    Direct health consultation and digital record navigation for rural families.
                  </p>
                  <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <MapPin className="size-3 text-primary" />
                    Bishnupur
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 04 — Partner Ecosystem ═══ */}
      <PartnerLogoRow />

      {/* ═══ 05 — Two-Column Governance ═══ */}
      <Section tone="default" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="mb-10 pb-4 border-b border-border">
            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
              Institutional Oversight
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground">
              Governance & The Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Column 1: Board & Governance */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pr-8">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <h3 className="font-serif text-2xl font-light text-foreground mt-2 mb-3">
                  Governance & Board of Trustees
                </h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  Independent civic leaders, retired educators, and public health practitioners who guide our long-term strategic direction, audit financial records, and ensure absolute fidelity to our founding charter.
                </p>
              </div>
              <Link
                href="/about/governance"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary hover:underline underline-offset-4 py-2 min-h-9"
              >
                <span>Read Board Charter & Membership</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Column 2: Operational Team */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <h3 className="font-serif text-2xl font-light text-foreground mt-2 mb-3">
                  Operational Team & Coordinators
                </h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  Full-time staff, field coordinators, clinic navigators, and logistics volunteers who manage daily relief missions, run workshops, and coordinate directly with local community councils.
                </p>
              </div>
              <Link
                href="/about/team"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary hover:underline underline-offset-4 py-2 min-h-9"
              >
                <span>Meet the Operational Team</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 06 — Call to Partnership & Support (Section 08 Feature Card) ═══ */}
      <Section tone="alt" className="py-12 md:py-16 border-b border-border">
        <Container className="max-w-4xl">
          <FeatureCard
            eyebrow="JOIN OUR WORK"
            title="Support Communities in Manipur."
            buttonText="Donate Now"
            buttonHref="/donate"
            image="/about-hero.jpg"
          />
        </Container>
      </Section>

      {/* ═══ 07 — Closing Action ═══ */}
      <QuietClose
        label="Civic Stewardship"
        heading="Support sustainable community action in Manipur."
        description="Every contribution directly strengthens community healthcare, local enterprise, and climate resilience."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-xs sm:text-sm font-medium transition-colors rounded-none shadow-xs"
            >
              <span>Support Our Work</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground hover:bg-muted font-sans text-xs sm:text-sm font-medium transition-colors rounded-none shadow-xs"
            >
              <span>Volunteer</span>
            </Link>
          </div>
        }
      />
    </div>
  );
}
