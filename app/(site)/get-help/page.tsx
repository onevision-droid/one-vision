import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import {
  MessageCircle,
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

const signalNumber = siteSettings.contactPhone;

const contactChannels = [
  {
    id: "email",
    icon: Mail,
    label: "General Enquiries",
    value: "hello@onevision.org",
    description:
      "For partnerships, media, and general information about our community programmes.",
    action: "Send Email",
    href: "mailto:hello@onevision.org",
    primary: true,
  },
  {
    id: "signal",
    icon: MessageCircle,
    label: "Community Support",
    value: signalNumber,
    description:
      "For direct community project support or to reach our field operations team. Secure and direct.",
    action: "Message via Signal",
    href: `https://signal.me/#p/${signalNumber}`,
    primary: false,
  },
  {
    id: "phone",
    icon: Phone,
    label: "Field Office",
    value: siteSettings.contactPhone,
    description:
      "Our main office line in Imphal. Available during standard operating hours.",
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
      <Section tone="default">
        <Container className="px-0 md:px-0">
          <div className="px-6 py-4 md:px-8 md:py-6 border-x border-border-default bg-paper">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 tracking-tight leading-tight">
              Ways to reach us.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-border-default *:border-b *:border-r *:border-border-default">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.id} className="bg-surface p-6 md:p-8 flex flex-col h-full group hover:bg-ink-900 transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`shrink-0 size-12 flex items-center justify-center ${
                        channel.primary ? "bg-safety-orange text-ink-900" : "bg-ink-900 text-paper group-hover:bg-safety-orange group-hover:text-ink-900 transition-colors"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-500 group-hover:text-paper/50 transition-colors mb-1">
                        {channel.label}
                      </h3>
                      <p className="font-sans text-role-body font-medium text-ink-900 group-hover:text-paper transition-colors">
                        {channel.value}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-role-body-sm text-ink-500 font-light leading-relaxed mb-6 sm:mb-8 group-hover:text-paper/70 transition-colors">
                    {channel.description}
                  </p>
                  <a
                    href={channel.href}
                    target={channel.id !== "phone" ? "_blank" : undefined}
                    rel={channel.id !== "phone" ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-between mt-auto px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                      channel.primary
                        ? "bg-ink-900 text-paper hover:bg-safety-orange hover:text-ink-900 group-hover:bg-safety-orange group-hover:text-ink-900"
                        : "bg-paper text-ink-900 hover:bg-safety-orange group-hover:bg-paper"
                    }`}
                  >
                    <span>{channel.action}</span>
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </div>
              );
            })}
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
