import { Metadata } from "next";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import Image from "next/image";
import { siteSettings } from "@/lib/data/site-settings";
import { Phone, Mail, MapPin, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Volunteer | One Vision",
  description:
    "Join our network of volunteers and make a tangible impact in your community across Manipur.",
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      {/* ═══ 01 — Hero (Layout Locked) ═══ */}
      <PageHero
        badge="JOIN US · VOLUNTEER NETWORK"
        heading={
          <>
            Local<br />
            Action.
          </>
        }
        description="The most effective change is driven by the community. Join our network of local leaders, educators, and volunteers."
        image="/volunteer-hero.jpg"
        imageAlt="Volunteers engaged in local community education and outreach in Manipur"
      />

      {/* ═══ 02 — Why Volunteer (Concise Narrative + Field Image) ═══ */}
      <Section tone="default" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                The Community Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight tracking-tight mb-6">
                Your Skills Matter
              </h2>
              <p className="font-sans text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8">
                Whether you have specialized skills in technology, nursing, education, or simply the time and willingness to help your neighborhood, there is an essential place for you here.
              </p>

              <blockquote className="p-6 border-l-2 border-primary bg-muted/40 text-foreground font-serif text-lg font-light italic leading-relaxed">
                &ldquo;Volunteering with One Vision isn&rsquo;t just about giving hours; it&rsquo;s about building the future of our own neighborhoods with dignity and collective purpose.&rdquo;
                <footer className="mt-3 font-sans text-xs font-semibold text-primary not-italic tracking-wide">
                  — S. Singh, FutureWorks Mentor
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-6 relative aspect-4/3 w-full border border-border bg-muted overflow-hidden">
              <Image
                src="/volunteer-hero.jpg"
                alt="Volunteers organizing community relief supplies"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 03 — Three Editorial Commitments (Open Principles, No Boxes) ═══ */}
      <Section tone="alt" className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="mb-10 pb-4 border-b border-border">
            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
              Mutual Respect
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground">
              Our Commitment to You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pr-8 first:pr-8 first:pl-0">
              <span className="font-mono text-sm font-semibold text-primary">01</span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground mt-2 mb-3">
                Mentorship & Growth
              </h3>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Volunteers work alongside experienced coordinators and mentors. You acquire practical, field-tested experience while making a direct impact.
              </p>
            </div>

            <div className="flex flex-col justify-between pt-6 md:pt-0 md:px-8">
              <span className="font-mono text-sm font-semibold text-primary">02</span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground mt-2 mb-3">
                Clear, Measurable Impact
              </h3>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                We only assign tasks that have verified utility. You will see firsthand how your contributions strengthen community resilience.
              </p>
            </div>

            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
              <span className="font-mono text-sm font-semibold text-primary">03</span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground mt-2 mb-3">
                Respect for Your Time
              </h3>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Your time is valuable. We support flexible scheduling, prioritize focused sessions, and respect your personal and professional boundaries.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 04 — Streamlined Application Form ═══ */}
      <Section tone="default" className="py-16 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column (6 Cols) */}
            <div className="lg:col-span-6 border border-border bg-card p-6 sm:p-8">
              <div className="mb-5 pb-4 border-b border-border">
                <span className="font-sans text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                  Join the Network
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                  Volunteer Application
                </h2>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mt-2">
                  Complete the short profile below. Our volunteer coordinator will connect with you regarding matching opportunities.
                </p>
              </div>

              <VolunteerForm />
            </div>

            {/* Quiet Side Reassurance & Contact (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="p-6 border border-border bg-card space-y-5">
                <div className="flex items-center gap-3 text-primary">
                  <HeartHandshake className="size-5 shrink-0" />
                  <h3 className="font-serif text-xl font-light text-foreground">
                    Community First
                  </h3>
                </div>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                  By joining One Vision, you become part of an indigenous network dedicated to lasting resilience, dignity, and care for every family in Manipur.
                </p>
                <div className="pt-4 border-t border-border space-y-3 font-sans text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-primary shrink-0" />
                    <span>Direct: {siteSettings.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-primary shrink-0" />
                    <span>Helpline: {siteSettings.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span>{siteSettings.address}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/40 border border-border text-xs text-muted-foreground leading-relaxed font-light">
                <strong className="text-foreground font-medium block mb-1">Confidentiality Guarantee:</strong>
                Your contact details and profile data are stored securely and used exclusively for coordinating community volunteer initiatives.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 05 — FAQs ═══ */}
      <FAQ
        tone="alt"
        heading="Volunteer FAQs"
        items={[
          {
            question: "How much time commitment is required?",
            answer:
              "We offer flexible volunteering options. You can participate in weekly scheduled programmes (e.g., 4 hours per week) or join specific seasonal relief and education initiatives.",
          },
          {
            question: "Is orientation or training provided?",
            answer:
              "Yes. Every volunteer participates in a comprehensive orientation covering safeguarding, ethical community engagement, and practical task preparation.",
          },
          {
            question: "Are there opportunities for remote or digital volunteering?",
            answer:
              "Yes. While frontline fieldwork occurs across Manipur, we regularly collaborate with remote volunteers for curriculum development, data analysis, open mapping, and translation.",
          },
        ]}
      />
    </div>
  );
}
