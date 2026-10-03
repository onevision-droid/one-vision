import { Metadata } from "next";
import { Hero } from "@/components/content/Hero";
import { ImpactStrip } from "@/components/composition/ImpactStrip";
import { EditorialIndex } from "@/components/composition/EditorialIndex";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { QuietClose } from "@/components/composition/QuietClose";
import { stories } from "@/lib/data/stories";
import orgData from "@/content/org.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "One Vision | Community Health, Relief & Sustainable Development — Manipur",
  description:
    "Serving Manipur's communities since 1988 (formerly Society for Health & Education Manipur). Working across healthcare, disaster relief, sustainable ecology, and youth livelihoods with complete financial transparency.",
  openGraph: {
    title: "One Vision | Community Health & Sustainable Development — Manipur",
    description:
      "12,400+ people supported. 18 community health centres. 25+ villages and neighbourhoods reached across Manipur since 1988.",
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
  alternateName: "Society for Health & Education Manipur",
  url: "https://onevision.org",
  foundingDate: "1988",
  description:
    "Community-led non-profit organisation working for health equity, environmental restoration, and resilient livelihoods across Manipur. Established in 1988 as the Society for Health & Education Manipur.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Imphal",
    addressRegion: "Manipur",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: orgData.contact.phone,
    contactType: "community support and relief",
    email: orgData.contact.email,
  },
};

export default function Home() {
  const featuredStory = stories[0];

  return (
    <div className="flex flex-col w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* ═══ 01 — Editorial Hero (Layout Locked) ═══ */}
      <Hero />

      {/* ═══ 02 — Proof of Impact (Compact Horizontal Strip) ═══ */}
      <ImpactStrip
        tone="alt"
        stats={[
          { value: "2,500+", label: "Families reached" },
          { value: "500+", label: "Young people trained" },
          { value: "25+", label: "Communities engaged" },
          { value: "22+", label: "Local partners" },
        ]}
      />

      {/* ═══ 03 — Five Priorities (Editorial Programme Index) ═══ */}
      <EditorialIndex />

      {/* ═══ 04 — One Human Story (Asymmetric Editorial Feature) ═══ */}
      <SplitNarrative
        heading="Community Story"
        content={
          <div className="flex flex-col h-full justify-center">
            <div className="font-sans text-xs uppercase tracking-wider text-primary font-semibold mb-4 sm:mb-6">
              {featuredStory.date} — Youth & Future Skills
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
              {featuredStory.title}
            </h3>
            <p className="font-sans text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8">
              {featuredStory.excerpt}
            </p>
            <div className="mt-auto flex items-center gap-4">
              <Link
                href={`/stories/${featuredStory.slug}`}
                className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors rounded-none"
              >
                <span>Read Story</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <p className="mt-8 pt-4 border-t border-border font-sans text-xs text-muted-foreground leading-relaxed flex items-center gap-2">
              <Shield className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              Shared with verified community consent.
            </p>
          </div>
        }
        media={
          <Image
            src={featuredStory.image}
            alt="Community story documentary visual"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        }
      />

      {/* ═══ 05 — Accountability (Clean 3-Link Transparency Row) ═══ */}
      <section className="py-12 md:py-16 border-t border-border bg-background">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 pb-4 border-b border-border">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                Transparency & Evidence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                Accountability & Open Governance
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light max-w-md">
              Every rupee received is dedicated to grassroots impact. Registered non-profit society in Manipur since 1988.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            <Link
              href="/open-ledger"
              className="group flex flex-col justify-between pt-6 md:pt-0 md:pl-8 first:pl-0"
            >
              <div>
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors mt-2 mb-2">
                  Open Ledger
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Transparent accounting. Every donation and disbursement tracked with zero hidden costs.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:translate-x-0.5 transition-transform">
                <span>View Ledger</span>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <Link
              href="/about"
              className="group flex flex-col justify-between pt-6 md:pt-0 md:pl-8"
            >
              <div>
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors mt-2 mb-2">
                  Governance
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Independent board oversight and community accountability under the Manipur Societies Registration Act.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:translate-x-0.5 transition-transform">
                <span>View Governance</span>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <Link
              href="/reports"
              className="group flex flex-col justify-between pt-6 md:pt-0 md:pl-8"
            >
              <div>
                <span className="font-mono text-xs text-primary font-semibold">03</span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors mt-2 mb-2">
                  Reports
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Audited financial statements, annual impact reports, and field evaluations available for open public review.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary mt-6 group-hover:translate-x-0.5 transition-transform">
                <span>View Reports</span>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 06 — Closing CTA (Quiet Close) ═══ */}
      <QuietClose
        label="Community First"
        heading="The future of our communities is something we build together."
        description="Partner with us, volunteer your skills, or connect directly with our local field team across Manipur."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium rounded-none transition-colors"
            >
              <span>Volunteer</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/get-help"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-border text-foreground hover:bg-muted font-sans text-xs font-medium rounded-none transition-colors"
            >
              <span>Get Help</span>
            </Link>
          </div>
        }
      />
    </div>
  );
}
