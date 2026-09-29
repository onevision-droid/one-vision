import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import { ContactForm } from "@/components/composition/ContactForm";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  Info,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | One Vision",
  description:
    "Reach out to partner, volunteer, or request support for your community project.",
};

const contactChannels = [
  {
    id: "email",
    icon: Mail,
    label: "General Enquiries",
    value: "hello@onevision.org",
    description:
      "For public partnerships, media inquiries, and general project information.",
    action: "Send Email",
    href: "mailto:hello@onevision.org",
    primary: true,
  },
  {
    id: "phone",
    icon: Phone,
    label: "Field Office Line",
    value: siteSettings.contactPhone,
    description:
      "Our main operational desk in Imphal. Available during standard operating hours.",
    action: "Call Office",
    href: `tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`,
    primary: false,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-paper">

      <PageHero
        badge="REACH OUT"
        heading={
          <>
            Let&apos;s<br/>
            Connect.
          </>
        }
        description="Reach out to partner, volunteer, or request support for your community project. We are always looking to collaborate."
        image="/contact-hero.jpg"
      />

      {/* 2. Notice */}
      <Section tone="alt" className="border-b border-border-default">
        <Container className="px-0 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 lg:p-10 border-x border-border-default bg-surface/50">
            <div className="size-14 shrink-0 bg-safety-orange flex items-center justify-center">
              <Info
                className="size-7 text-ink-900"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-900 mb-2 sm:mb-3">
                Community First
              </h2>
              <p className="font-sans text-role-body max-w-prose text-ink-500 font-light leading-relaxed">
                We believe the best solutions come from within the community. If you have an idea, a project, or a need in your neighbourhood, reach out. We are always looking to support local leaders and initiatives.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Channels */}
      {/* 3. Channels (Nordic Lagom) */}
      <Section tone="default" className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-safety-orange mb-2 block">
                Direct Channels
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 tracking-tight leading-tight">
                Ways to reach us.
              </h2>
            </div>
            <p className="font-sans text-body-sm text-ink-500 font-light max-w-md leading-relaxed">
              Frontline communication protocols for verified coordination, medical assistance, and operational enquiries.
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
                    "group relative flex flex-col justify-between h-full p-6 md:p-7 rounded-md bg-surface border transition-all duration-300 ease-out",
                    channel.primary
                      ? "border-safety-orange/40 shadow-xs hover:border-safety-orange hover:shadow-md hover:-translate-y-1"
                      : "border-border-default/70 shadow-2xs hover:border-ink-900/30 hover:shadow-sm hover:-translate-y-1"
                  )}
                >
                  <div>
                    {/* Quiet Chrome Header */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={cn(
                          "size-10 rounded-md flex items-center justify-center border transition-colors",
                          channel.primary
                            ? "bg-safety-orange/10 text-safety-orange border-safety-orange/20"
                            : "bg-ink-900/5 text-ink-900 dark:bg-white/5 dark:text-paper border-black/5 dark:border-white/10"
                        )}
                      >
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      {channel.primary && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-safety-orange bg-safety-orange/10 rounded-full border border-safety-orange/20" data-badge="pill">
                          <span className="size-1.5 rounded-full bg-safety-orange animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>

                    {/* Channel Category & Value */}
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-500 block mb-1">
                      {channel.label}
                    </span>
                    <p className="font-mono text-sm font-bold text-ink-900 break-all mb-3 select-all">
                      {channel.value}
                    </p>

                    {/* Description */}
                    <p className="font-sans text-body-sm text-ink-500 font-light leading-relaxed mb-6">
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
                        ? "bg-action-primary text-paper hover:bg-action-hover shadow-2xs"
                        : "border border-border-default/80 text-ink-900 hover:border-ink-900/60 hover:bg-black/2 dark:hover:bg-white/4"
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
            question: "How can I partner with One Vision?",
            answer:
              "We work with local organizations, businesses, and community leaders. Send an email to our general enquiries address with details about your initiative and how you'd like to collaborate.",
          },
          {
            question: "Can I volunteer from outside Manipur?",
            answer:
              "Yes. While our field operations are entirely local, we have a remote network of professionals (designers, developers, data scientists) supporting our digital tools and infrastructure. Reach out via email.",
          },
          {
            question: "How quickly will you respond?",
            answer:
              "We aim to respond to all inquiries within 2-3 business days. If you are reaching out regarding an active community project, please mention this in your subject line.",
          },
        ]}
      />
    </div>
  );
}
