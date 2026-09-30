import { Metadata } from"next";
import { siteSettings } from"@/lib/data/site-settings";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { FAQ } from"@/components/composition/FAQ";
import { ContactForm } from"@/components/composition/ContactForm";
import { cn } from"@/lib/utils";
import {
  Mail,
  Phone,
  Info,
  ExternalLink,
} from"lucide-react";

export const metadata: Metadata = {
  title: "Community Support & Care Desk | One Vision",
  description:
    "Request healthcare navigation, emergency relief support, or community project assistance from our teams across Manipur.",
};

const contactChannels = [
  {
    id: "phone",
    icon: Phone,
    label: "24/7 Community Care Desk",
    value: siteSettings.contactPhone,
    description:
      "Direct line to our primary clinic navigators and field emergency support desk in Imphal.",
    action: "Call",
    href: `tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`,
    primary: true,
  },
  {
    id: "email",
    icon: Mail,
    label: "Care & Support Inbox",
    value: siteSettings.contactEmail,
    description:
      "For family assistance queries, clinic visits, and local community coordinator requests.",
    action: "Email",
    href: `mailto:${siteSettings.contactEmail}`,
    primary: false,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-background">

      <PageHero
        badge="COMMUNITY SUPPORT DESK · MANIPUR"
        heading={
          <>
            Frontline Care<br />
            & Assistance.
          </>
        }
        description="Need healthcare navigation, maternal support, emergency assistance, or guidance for your village? Our dedicated community teams are here for you."
        image="/contact-hero.jpg"
      />

      {/* 2. Notice */}
      <Section tone="alt">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 lg:p-10 border border-border bg-card">
            <div className="size-14 shrink-0 bg-primary/10 text-primary border border-primary/20 flex items-center justify-center rounded-sm">
              <Info
                className="size-7"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-2 sm:mb-3">
                Compassionate & Confidential Support
              </h2>
              <p className="font-sans text-base max-w-prose text-muted-foreground font-light leading-relaxed">
                Every request is handled with strict confidentiality, dignity, and care by our local community health coordinators. No family is turned away from essential healthcare guidance or emergency relief coordination.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Channels */}
      <Section tone="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-primary mb-2 block">
                Direct Channels
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                Ways to get help.
              </h2>
            </div>
            <p className="font-sans text-body-sm text-muted-foreground font-light max-w-md leading-relaxed">
              Direct community assistance channels to reach our field coordinators, clinic navigators, and local support network across Manipur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 flex flex-col gap-5">
              {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.id}
                  className={cn(
                    "group relative flex flex-col justify-between h-full p-6 md:p-7 rounded-md bg-card border transition-all duration-300 ease-out",
                    channel.primary
                      ? "border-primary/40 shadow-xs hover:border-primary hover:shadow-md hover:-translate-y-0.5"
                      : "border-border/70 shadow-2xs hover:border-foreground/30 hover:shadow-sm hover:-translate-y-0.5"
                  )}
                >
                  <div>
                    {/* Quiet Chrome Header */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={cn(
                          "size-10 rounded-md flex items-center justify-center border transition-colors",
                          channel.primary
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-foreground/5 text-foreground border-black/5 dark:border-border"
                        )}
                      >
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      {channel.primary && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/30" data-badge="pill">
                          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                          Priority
                        </span>
                      )}
                    </div>

                    {/* Channel Category & Value */}
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      {channel.label}
                    </span>
                    <p className="font-mono text-sm font-bold text-foreground break-all mb-3 select-all">
                      {channel.value}
                    </p>

                    {/* Description */}
                    <p className="font-sans text-body-sm text-muted-foreground font-light leading-relaxed mb-6">
                      {channel.description}
                    </p>
                  </div>

                  {/* Modern Hairline Action Button */}
                  <a
                    href={channel.href}
                    target={channel.id !== "phone" ? "_blank" : undefined}
                    rel={channel.id !== "phone" ? "noopener noreferrer" : undefined}
                    className={cn(
                      "inline-flex items-center justify-between w-full px-4 py-2.5 rounded-sm font-sans text-xs font-medium transition-all duration-200",
                      channel.primary
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs"
                        : "border border-border/80 text-foreground hover:border-foreground/60 hover:bg-muted/50"
                    )}
                  >
                    <span>{channel.action}</span>
                    <ExternalLink className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              );
            })}
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FAQs */}
      <FAQ
        tone="default"
        heading="Common Questions"
        items={[
          {
            question:"How can I partner with One Vision?",
            answer:
             "We work with local organizations, businesses, and community leaders. Send an email to our general enquiries address with details about your initiative and how you'd like to collaborate.",
          },
          {
            question:"Can I volunteer from outside Manipur?",
            answer:
             "Yes. While our field operations are entirely local, we have a remote network of professionals (designers, developers, data scientists) supporting our digital tools and infrastructure. Reach out via email.",
          },
          {
            question:"How quickly will you respond?",
            answer:
             "We aim to respond to all inquiries within 2-3 business days. If you are reaching out regarding an active community project, please mention this in your subject line.",
          },
        ]}
      />
    </div>
  );
}
