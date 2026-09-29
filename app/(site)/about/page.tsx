import orgData from "@/content/org.json";
import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { PartnerLogoRow } from "@/components/content/PartnerLogoRow";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Image from "next/image";

import { ImageMosaic } from "@/components/content/ImageMosaic";

export const metadata: Metadata = {
  title: "About | One Vision",
  description: "One Vision is a community-led organisation working for a healthier, greener and more resilient Manipur.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-page">
      <PageHero 
        badge="ABOUT US"
        heading={
          <>
            The<br/>
            Foundation.
          </>
        }
        description="A community-led organisation working for a healthier, greener and more resilient Manipur. We connect local innovation with lasting support."
        image="/about-hero.jpg"
        imageAlt="Community volunteers and organizers collaborating in Manipur"
      />

      {/* Trust Panel (Document Shell via SplitNarrative) */}
      <div className="w-full bg-background border-b border-border">
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
                    <CheckCircle2 className="size-4 text-destructive" />
                    <h3 className="font-mono text-[10px] tracking-widest uppercase font-bold text-foreground">Registration</h3>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <p className="font-sans text-base-sm text-muted-foreground">{orgData.org.legal}</p>
                    <p className="font-sans text-base-sm font-medium text-foreground">Reg No: {orgData.org.regNo}</p>
                    <p className="font-sans text-base-sm text-muted-foreground">{orgData.org.location}</p>
                  </div>
                </div>
                <div className="p-5 md:p-6 space-y-4 flex flex-col h-full bg-muted">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-destructive" />
                    <h3 className="font-mono text-[10px] tracking-widest uppercase font-bold text-foreground">Contact</h3>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <p className="font-sans text-base-sm text-muted-foreground">{orgData.contact.email}</p>
                    <p className="font-sans text-base-sm text-muted-foreground">{orgData.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          }
          media={
            <div className="relative w-full h-full min-h-75 lg:min-h-85 bg-foreground group overflow-hidden">
              <Image 
                src="/about-hero.jpg" 
                alt="Community trust" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
            </div>
          }
        />
      </div>
      
      {/* Partner Marquee */}
      <PartnerLogoRow />

      {/* Image Mosaic: Field Presence */}
      <Section tone="default">
        <Container className="px-0 md:px-0">
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
      <Section tone="default" className="border-t border-border">
        <Container className="px-0 md:px-0">
          <div className="flex flex-col">
            <div className="px-6 py-4 md:px-8 md:py-6 border-x border-border bg-muted">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">The People</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-border *:border-b *:border-r *:border-border">
              <Link href="/about/governance" className="group block p-6 md:p-8 lg:p-10 bg-muted hover:bg-foreground transition-colors duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-3 sm:mb-4 group-hover:text-background transition-colors">Governance & Leadership</h3>
                <p className="font-sans text-base text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed">
                  Meet the Board of Directors shaping our strategic vision and maintaining institutional integrity.
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors">
                    Read more <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
              <Link href="/about/team" className="group block p-6 md:p-8 lg:p-10 bg-muted hover:bg-foreground transition-colors duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-3 sm:mb-4 group-hover:text-background transition-colors">Operational Team</h3>
                <p className="font-sans text-base text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed">
                  Discover the dedicated staff, field workers, and volunteers executing our mission across Manipur.
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors">
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
          <Link href="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-destructive">
            <span>Make a donation</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    </div>
  );
}
