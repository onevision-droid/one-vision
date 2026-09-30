import orgData from"@/content/org.json";
import { Metadata } from"next";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { QuietClose } from"@/components/composition/QuietClose";
import { PartnerLogoRow } from"@/components/content/PartnerLogoRow";
import { SplitNarrative } from"@/components/composition/SplitNarrative";
import Link from"next/link";
import { ArrowRight, CheckCircle2, Mail } from"lucide-react";
import Image from"next/image";

import { ImageMosaic } from"@/components/content/ImageMosaic";

export const metadata: Metadata = {
  title:"About | One Vision",
  description:"One Vision is a community-led organisation working for a healthier, greener and more resilient Manipur.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-page">
      <PageHero 
        badge="ABOUT ONE VISION · EST. 1988"
        heading={
          <>
            Our<br/>
            Foundations.
          </>
        }
        description="A community-led organisation working for a healthier, greener and more resilient Manipur since 1988. Formerly known as the Society for Health & Education Manipur."
        image="/about-hero.jpg"
        imageAlt="Community volunteers and organizers collaborating in Manipur"
      />

      {/* Trust Panel (Document Shell via SplitNarrative) */}
      <div className="w-full bg-background">
        <SplitNarrative
          heading={
            <>
              Transparency<br/>& Trust
            </>
          }
          content={
            <div className="space-y-6 sm:space-y-8">
              <p className="font-sans text-lg max-w-prose text-muted-foreground font-light leading-relaxed">
                We believe in evidence over claims. Our outcomes are documented, and our processes are open. We connect government systems and community innovation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-border *:border-b *:border-r *:border-border">
                <div className="p-5 md:p-6 space-y-4 flex flex-col h-full bg-muted">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-primary" />
                    <h3 className="font-sans text-xs uppercase tracking-wider font-semibold text-foreground">Registration</h3>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <p className="font-sans text-sm text-muted-foreground">{orgData.org.legal}</p>
                    <p className="font-sans text-sm font-medium text-foreground">Reg No: {orgData.org.regNo}</p>
                    <p className="font-sans text-sm text-muted-foreground">{orgData.org.location}</p>
                  </div>
                </div>
                <div className="p-5 md:p-6 space-y-4 flex flex-col h-full bg-muted">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-primary" />
                    <h3 className="font-sans text-xs uppercase tracking-wider font-semibold text-foreground">Contact</h3>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <p className="font-sans text-sm text-muted-foreground">{orgData.contact.email}</p>
                    <p className="font-sans text-sm text-muted-foreground">{orgData.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          }
          media={
            <div className="relative w-full h-full min-h-75 lg:min-h-85 bg-muted group overflow-hidden">
              <Image 
                src="/about-hero.jpg" 
                alt="Community trust" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-background/5 pointer-events-none" />
            </div>
          }
        />
      </div>
      
      {/* Partner Marquee */}
      <PartnerLogoRow />

      {/* Image Mosaic: Field Presence */}
      <Section tone="default">
        <Container>
          <ImageMosaic
            heading="Deeply Rooted in Manipur"
            subheading="Our initiatives operate through trusted community networks in Imphal and surrounding districts, upholding local dignity and collective autonomy."
            leadImage={{
              src: "/home-hero-2026.jpg",
              alt: "Community gathering in Imphal streetscape",
              caption: "Local logistics hub and supply coordination point in Imphal.",
              location: "Imphal, Manipur",
            }}
            satellites={[
              {
                src: "/volunteer-hero.jpg",
                alt: "Youth volunteers organizing",
                caption: "Youth volunteer team planning a community initiative.",
                location: "Community Center",
                aspectRatio: "square",
              },
              {
                src: "/community-voices.jpg",
                alt: "Women community leaders",
                caption: "Local leaders coordinating health outreach.",
                location: "District Network",
                aspectRatio: "landscape",
              },
              {
                src: "/programmes-hero.jpg",
                alt: "Community learning workshop",
                caption: "Decentralized training sessions in future skills.",
                location: "FutureWorks Hub",
                aspectRatio: "landscape",
              },
            ]}
          />
        </Container>
      </Section>

      {/* Structure & People */}
      <Section tone="default">
        <Container>
          <div className="flex flex-col">
            <div className="px-6 py-4 md:px-8 md:py-6 border border-b-0 border-border bg-muted">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">The People</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-l border-border *:border-b *:border-r *:border-border">
              <Link href="/about/governance" className="group block p-6 md:p-8 lg:p-10 bg-card hover:bg-muted/50 transition-colors duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors">Governance & Leadership</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  Meet the Board of Trustees shaping our strategic vision and maintaining institutional integrity.
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-primary transition-colors">
                    Read more <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
              <Link href="/about/team" className="group block p-6 md:p-8 lg:p-10 bg-card hover:bg-muted/50 transition-colors duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors">Operational Team</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  Discover the dedicated staff, field workers, and community navigators executing our mission across Manipur.
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-primary transition-colors">
                    Read more <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
      
      <QuietClose
        label="Join the Network"
        heading="Support our work."
        description="Your contribution helps us expand our reach and build more resilient communities in Manipur."
        action={
          <Link href="/donate" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors rounded-sm">
            <span>Donate</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />
    </div>
  );
}
