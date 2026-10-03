import orgData from "@/content/org.json";
import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { PartnerLogoRow } from "@/components/content/PartnerLogoRow";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | One Vision",
  description:
    "One Vision is a community-led organisation working for a healthier, greener and more resilient Manipur.",
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

      {/* ═══ 02 — Transparency & Trust ═══ */}
      <Section tone="default" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight">
                Transparency<br />& Trust
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
              <p>
                We believe in evidence over claims. Our outcomes are documented, and our processes are open. We connect government systems and community innovation.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border bg-card flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs font-sans uppercase tracking-wider">
                    <CheckCircle2 className="size-4 text-primary" />
                    <h3>Registration</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-sm text-muted-foreground">{orgData.org.legal}</p>
                    <p className="font-sans text-sm font-medium text-foreground">Reg No: {orgData.org.regNo}</p>
                    <p className="font-sans text-sm text-muted-foreground">{orgData.org.location}</p>
                  </div>
                </div>
                <div className="p-4 border border-border bg-card flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs font-sans uppercase tracking-wider">
                    <Mail className="size-4 text-primary" />
                    <h3>Contact</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-sm text-muted-foreground">{orgData.contact.email}</p>
                    <p className="font-sans text-sm text-muted-foreground">{orgData.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 03 — Image Essay: Deeply Rooted in Manipur ═══ */}
      <Section tone="alt" className="py-16 md:py-24 border-b border-border">
        <Container>
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
              Deeply Rooted in Manipur
            </h2>
            <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
              Our initiatives operate through trusted community networks in Imphal and surrounding districts, upholding local dignity and collective autonomy.
            </p>
          </div>

          {/* Editorial Photo Essay: 1 Lead + 3 Satellites */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Lead Image (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col border border-border bg-card overflow-hidden">
              <div className="relative aspect-4/3 w-full bg-muted">
                <Image
                  src="/home-hero-2026.jpg"
                  alt="Community gathering in Imphal streetscape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex items-start justify-between gap-4 border-t border-border">
                <p className="font-sans text-xs sm:text-sm text-foreground font-light">
                  Local logistics hub and supply coordination point in Imphal.
                </p>
                <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  <MapPin className="size-3 text-primary" />
                  Imphal, Manipur
                </span>
              </div>
            </div>

            {/* Supporting Images (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-muted">
                  <Image
                    src="/volunteer-hero.jpg"
                    alt="Youth volunteers organizing"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex items-start justify-between gap-4 border-t border-border">
                  <p className="font-sans text-xs text-foreground font-light">
                    Youth volunteer team planning a community initiative.
                  </p>
                  <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <MapPin className="size-3 text-primary" />
                    Community Center
                  </span>
                </div>
              </div>

              <div className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-muted">
                  <Image
                    src="/community-voices.jpg"
                    alt="Women community leaders"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex items-start justify-between gap-4 border-t border-border">
                  <p className="font-sans text-xs text-foreground font-light">
                    Local leaders coordinating health outreach.
                  </p>
                  <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <MapPin className="size-3 text-primary" />
                    District Network
                  </span>
                </div>
              </div>

              <div className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-muted">
                  <Image
                    src="/programmes-hero.jpg"
                    alt="Community learning workshop"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex items-start justify-between gap-4 border-t border-border">
                  <p className="font-sans text-xs text-foreground font-light">
                    Decentralized training sessions in future skills.
                  </p>
                  <span className="font-sans text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <MapPin className="size-3 text-primary" />
                    FutureWorks Hub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 04 — Partner Ecosystem ═══ */}
      <PartnerLogoRow />

      {/* ═══ 05 — The People ═══ */}
      <Section tone="default" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="mb-10 pb-4 border-b border-border">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground">
              The People
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Column 1: Governance */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pr-8">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <h3 className="font-serif text-2xl font-light text-foreground mt-2 mb-3">
                  Governance & Leadership
                </h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  Meet the Board of Trustees shaping our strategic vision and maintaining institutional integrity.
                </p>
              </div>
              <Link
                href="/about/governance"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary hover:underline underline-offset-4 py-2 min-h-9"
              >
                <span>Read more</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Column 2: Operational Team */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <h3 className="font-serif text-2xl font-light text-foreground mt-2 mb-3">
                  Operational Team
                </h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  Discover the dedicated staff, field workers, and community navigators executing our mission across Manipur.
                </p>
              </div>
              <Link
                href="/about/team"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary hover:underline underline-offset-4 py-2 min-h-9"
              >
                <span>Read more</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 06 — Closing Action ═══ */}
      <QuietClose
        label="Join the Network"
        heading="Support our work."
        description="Your contribution helps us expand our reach and build more resilient communities in Manipur."
        action={
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-xs font-medium transition-colors rounded-none"
          >
            <span>Donate</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />
    </div>
  );
}
