import orgData from "@/content/org.json";
import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { PartnerLogoRow } from "@/components/content/PartnerLogoRow";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Image from "next/image";

import { ImageMosaic } from "@/components/content/ImageMosaic";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About | One Vision",
  description: "One Vision is a decentralised crisis-resilient humanitarian vanguard rooted in Imphal. Formerly the Society for Health & Education Manipur (1988). Operating across the Manipur polycrisis zone.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-page pt-20">
      {/* Intro Section */}
      <PageHero 
        badge="Operational Mandate 2026–2030"
        heading={
          <>
            Vanguard.<br/>Not NGO.
          </>
        }
        description="One Vision formally abandoned its legacy NGO model in September 2026. The centralised, brick-and-mortar welfare paradigm is obsolete in a conflict zone. We now operate as a decentralised, crisis-resilient humanitarian vanguard across four operational pillars."
        imageSrc="/new-illustrations/community-support.webp"
        imageAlt="One Vision field operations"
      />

      {/* Trust Panel (Document Shell via SplitNarrative) */}
      <div className="w-full bg-paper pt-12 pb-20 px-4 md:px-0">
        <Container className="mb-12">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </Container>
        
        <SplitNarrative
          heading={
            <>
              Transparency<br/>& Trust
            </>
          }
          content={
            <div className="space-y-10">
              <p className="font-sans text-body-lg text-ink-500 font-light leading-relaxed">
                We believe in evidence over claims. Our outcomes are documented, and our processes are open. We do not use poverty, illness, or grief as visual decoration.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border-default">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-clay-500" />
                    <h3 className="font-sans text-body-sm tracking-widest uppercase font-semibold text-ink-900">Registration</h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-sans text-body-sm text-ink-500">{orgData.org.legal}</p>
                    <p className="font-sans text-body-sm text-ink-500">Reg No: {orgData.org.regNo}</p>
                    <p className="font-sans text-body-sm text-ink-500">{orgData.org.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-clay-500" />
                    <h3 className="font-sans text-body-sm tracking-widest uppercase font-semibold text-ink-900">Contact</h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-sans text-body-sm text-ink-500">{orgData.contact.email}</p>
                    <p className="font-sans text-body-sm text-ink-500">{orgData.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          }
          media={
            <div className="relative w-full h-full min-h-100">
              <Image 
                src="/new-illustrations/imphal-streetscape.webp" 
                alt="Community trust" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
            </div>
          }
        />
      </div>
      
      {/* Partner Marquee */}
      <PartnerLogoRow />

      {/* Image Mosaic: Field Presence */}
      <Section tone="default" className="py-20 border-b border-border-default">
        <Container>
          <ImageMosaic
            heading="Ground-Level Presence Across Manipur"
            subheading="Our initiatives operate through trusted community networks in Imphal and surrounding valley districts, upholding local dignity and collective autonomy."
            leadImage={{
              src: "/new-illustrations/imphal-streetscape.webp",
              alt: "Community gathering in Imphal streetscape",
              caption: "Local logistics hub and supply coordination point in Imphal East.",
              location: "Imphal East, Manipur",
            }}
            satellites={[
              {
                src: "/new-illustrations/volunteer-scene.webp",
                alt: "Youth volunteers organizing relief distribution",
                caption: "Youth volunteer team preparing daily emergency rations.",
                location: "Relief Transit Point",
                aspectRatio: "square",
              },
              {
                src: "/new-illustrations/women-led.webp",
                alt: "Women community leaders coordinating aid distribution",
                caption: "Ima market leaders coordinating household support routes.",
                location: "Ima Keithel Network",
                aspectRatio: "landscape",
              },
              {
                src: "/new-illustrations/youth-learning.webp",
                alt: "Community learning workshop for children",
                caption: "Decentralized classroom sessions in community centers.",
                location: "Ward Education Hall",
                aspectRatio: "landscape",
              },
            ]}
          />
        </Container>
      </Section>

      {/* Structure & People */}
      <Section tone="default">
        <Container>
          <div className="mb-16">
            <h2 className="font-sans text-heading-xl font-medium tracking-tight text-ink-900">
              The People
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/about/governance" className="group block p-6 border border-border-default bg-surface hover:border-action-primary rounded-md transition-all">
              <h3 className="font-serif text-heading-lg font-light text-ink-900 mb-3 group-hover:text-action-primary transition-colors">Governance & Leadership</h3>
              <p className="font-sans text-ink-500 leading-relaxed">
                Meet the Board of Directors shaping our strategic vision and maintaining institutional integrity.
              </p>
            </Link>
            <Link href="/about/team" className="group block p-6 border border-border-default bg-surface hover:border-action-primary rounded-md transition-all">
              <h3 className="font-serif text-heading-lg font-light text-ink-900 mb-3 group-hover:text-action-primary transition-colors">Operational Team</h3>
              <p className="font-sans text-ink-500 leading-relaxed">
                Discover the dedicated staff, field workers, and volunteers executing our mission across Manipur.
              </p>
            </Link>
          </div>
        </Container>
      </Section>
      
      <QuietClose
        label="Join the Network"
        heading="Support our work."
        description="Your contribution helps us expand our reach and build more resilient communities in Imphal."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/donate" className="flex items-center">
                <span>Make a donation</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
