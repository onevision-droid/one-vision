import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import { ContactForm } from "@/components/composition/ContactForm";
import { Phone, Mail, ShieldAlert, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Support & Care Desk | One Vision",
  description:
    "Direct community care, healthcare navigation, and emergency relief assistance across Manipur.",
};

export default function ContactPage() {
  const phoneTel = `tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`;
  const emailMailto = `mailto:${siteSettings.contactEmail}`;

  return (
    <div className="flex flex-col w-full bg-background">
      {/* ═══ 01 — Hero (Layout Locked) ═══ */}
      <PageHero
        badge="COMMUNITY SUPPORT DESK · MANIPUR"
        heading={
          <>
            Frontline Care<br />
            & Assistance.
          </>
        }
        description="Healthcare navigation, maternal support, and emergency assistance for every village in Manipur."
        image="/contact-hero.jpg"
        imageAlt="Community support coordinator on the ground in Manipur"
      />

      {/* ═══ 02 — High-Priority Direct Channels (Unburied, Unmistakable) ═══ */}
      <Section tone="alt" className="py-10 md:py-14 border-b border-border bg-muted">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-6 sm:p-8 md:p-10 border border-border bg-card">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-none bg-destructive animate-pulse" />
                <span className="font-sans text-xs uppercase tracking-wider text-destructive font-semibold">
                  24/7 Community Care Desk
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight">
                Need immediate help or medical navigation?
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground font-light leading-relaxed mt-2">
                Call our frontline field desk directly for urgent healthcare guidance, relief coordination, or local assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={phoneTel}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-sm font-medium rounded-none shadow-xs transition-colors min-h-12"
              >
                <Phone className="size-4" />
                <span>Call {siteSettings.contactPhone}</span>
              </a>
              <a
                href={emailMailto}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-background border border-border text-foreground hover:bg-muted font-sans text-sm font-medium rounded-none transition-colors min-h-12"
              >
                <Mail className="size-4 text-primary" />
                <span>Email Care Inbox</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 03 — Confidentiality & Dignity Notice ═══ */}
      <Section tone="default" className="py-8 md:py-10 border-b border-border">
        <Container>
          <div className="flex items-start gap-4 p-5 sm:p-6 border border-border bg-card/60">
            <ShieldAlert className="size-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-light text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-medium">Confidential & Dignified: </strong>
              Every request is handled with strict confidentiality and community care by local health navigators. No individual or family is turned away from essential healthcare guidance, relief advice, or local referral.
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 04 — Assistance Request Form & Office Details ═══ */}
      <Section tone="default" className="py-12 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Request Form (7 Cols) */}
            <div className="lg:col-span-7 border border-border bg-card p-6 sm:p-8 md:p-10">
              <div className="mb-6 pb-4 border-b border-border">
                <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                  Online Request
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                  Send a Message
                </h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mt-1">
                  Our coordinators review digital requests within 24 hours. For medical emergencies, please use the direct telephone helpline above.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Field Office Details (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 md:p-8 border border-border bg-card space-y-6">
                <h4 className="font-serif text-xl font-light text-foreground">
                  Support Channels
                </h4>

                <div className="space-y-4 font-sans text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Clock className="size-4 text-primary shrink-0 mt-1" />
                    <div>
                      <span className="text-foreground font-medium block">Helpline Hours</span>
                      <span className="text-xs">24 hours a day, 7 days a week for urgent assistance.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="size-4 text-primary shrink-0 mt-1" />
                    <div>
                      <span className="text-foreground font-medium block">General Enquiries</span>
                      <a href={emailMailto} className="text-xs text-primary hover:underline min-h-9 py-2 inline-flex items-center">
                        {siteSettings.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 text-primary shrink-0 mt-1" />
                    <div>
                      <span className="text-foreground font-medium block">Field Operations Hub</span>
                      <span className="text-xs leading-relaxed block">{siteSettings.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border bg-muted/40 text-xs text-muted-foreground leading-relaxed font-light">
                <strong className="text-foreground font-medium block mb-1">Need help from outside Manipur?</strong>
                If you are inquiring on behalf of family members residing in Manipur, please include their district or village name in the message form so we can connect you with the appropriate local coordinator.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══ 05 — Essential FAQs ═══ */}
      <FAQ
        tone="alt"
        heading="Common Questions"
        items={[
          {
            question: "How quickly will One Vision respond to my request?",
            answer:
              "Urgent calls to our 24/7 care desk are handled immediately. Online message submissions are reviewed and assigned to regional field coordinators within 24 hours.",
          },
          {
            question: "Are One Vision services free of cost?",
            answer:
              "Yes. All direct community healthcare navigation, maternal support kits, and emergency relief services provided by One Vision are completely free of charge.",
          },
          {
            question: "Can I request assistance on behalf of a neighbor or relative?",
            answer:
              "Yes. Community members regularly reach out on behalf of elders, vulnerable neighbors, or relatives. Please provide reliable contact details for reaching them.",
          },
          {
            question: "Which districts in Manipur are currently covered?",
            answer:
              "Our active hubs cover Imphal West, Imphal East, Bishnupur, Thoubal, and surrounding rural communities, with mobile teams deployed across broader districts as required.",
          },
        ]}
      />
    </div>
  );
}
