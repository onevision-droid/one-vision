import { Metadata } from "next";
import { siteSettings } from "@/lib/data/site-settings";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import {
  Shield,
  MessageCircle,
  Mail,
  Phone,
  AlertTriangle,
  Lock,
  ExternalLink,
} from "lucide-react";
import { EmergencyBanner } from "@/components/content/EmergencyBanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Secure Contact | One Vision",
  description:
    "Reach One Vision securely via Signal or ProtonMail. No sensitive data is collected on this platform. All crisis-related communications must use encrypted channels only.",
};

// Signal number extracted from site settings
const signalNumber = siteSettings.contactPhone;

const secureChannels = [
  {
    id: "signal",
    icon: MessageCircle,
    label: "Signal (Recommended)",
    value: signalNumber,
    description:
      "End-to-end encrypted. Use for all crisis-related, health, or sensitive assistance requests. Available 24/7. Do not use regular SMS.",
    action: "Open Signal",
    href: `https://signal.me/#p/${signalNumber}`,
    urgent: true,
  },
  {
    id: "protonmail",
    icon: Mail,
    label: "ProtonMail",
    value: "secure@onevision.proton.me",
    description:
      "End-to-end encrypted email. Use for detailed case submissions or documentation. Response within 24–48 hours.",
    action: "Send Encrypted Email",
    href: "mailto:secure@onevision.proton.me",
    urgent: false,
  },
  {
    id: "phone",
    icon: Phone,
    label: "Field Phone (Non-sensitive only)",
    value: siteSettings.contactPhone,
    description:
      "For general enquiries and non-sensitive information only. Do NOT share personal crisis details over an unencrypted phone call.",
    action: `tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`,
    href: `tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`,
    urgent: false,
  },
];


export default function SecureContactPage() {
  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* 1. Page Hero */}
      <PageHero
        badge="OpSec-First"
        heading={
          <>
            Secure Contact.
            <br />
            No in-app intake.
          </>
        }
        description="This platform does not collect sensitive data. All crisis-related, health, or assistance requests must use encrypted channels only. Assume standard web forms are compromised."
        imageSrc="/new-illustrations/help-desk.webp"
        imageAlt="Secure communications protocol"
      />

      {/* 2. OpSec Warning */}
      <Section tone="alt" className="border-b border-border-default">
        <Container>
          <Breadcrumbs items={[{ label: "Secure Contact", href: "/get-help" }]} />
          <div className="mt-8 flex items-start gap-6 p-6 border border-safety-orange/30 bg-safety-orange/5">
            <AlertTriangle
              className="size-6 text-safety-orange shrink-0 mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-sans text-body font-semibold text-ink-900 mb-2">
                Operational Security Notice
              </h2>
              <p className="font-sans text-body-sm text-ink-500 font-light leading-relaxed">
                We operate in a conflict zone where digital communications are
                actively monitored. This website does <strong>not</strong>{" "}
                contain any intake forms for sensitive requests. All case
                submissions, health requests, and assistance needs must be routed
                through encrypted channels below. Do not email sensitive
                information to standard addresses.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Secure Channels */}
      <Section tone="default">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="size-4 text-ink-500" aria-hidden="true" />
              <span className="font-sans text-label tracking-widest uppercase text-ink-500 font-semibold">
                Encrypted Channels Only
              </span>
            </div>
            <h2 className="font-sans text-heading-xl md:text-display-md font-medium text-ink-900 tracking-tight">
              How to reach us securely.
            </h2>
          </div>

          <div className="grid gap-px bg-border-default md:grid-cols-3">
            {secureChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.id} className="bg-surface p-8 flex flex-col gap-6">
                  {channel.urgent && (
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-safety-orange block animate-pulse" />
                      <span className="font-sans text-label tracking-widest uppercase text-safety-orange font-semibold">
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 size-10 flex items-center justify-center ${
                        channel.urgent ? "bg-safety-orange" : "bg-field-black"
                      }`}
                    >
                      <Icon className="size-5 text-paper" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-sans text-body-sm font-semibold uppercase tracking-wider text-ink-900 mb-1">
                        {channel.label}
                      </h3>
                      <p className="font-sans text-body font-medium text-ink-900">
                        {channel.value}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-body-sm text-ink-500 font-light leading-relaxed flex-1">
                    {channel.description}
                  </p>
                  <a
                    href={channel.href}
                    target={channel.id !== "phone" ? "_blank" : undefined}
                    rel={channel.id !== "phone" ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 font-sans text-body-sm font-semibold uppercase tracking-widest px-6 py-3 transition-colors ${
                      channel.urgent
                        ? "bg-safety-orange text-paper hover:bg-safety-orange-dim"
                        : "border border-border-default text-ink-900 hover:bg-section-alt"
                    }`}
                  >
                    {channel.action}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. What to include in your message */}
      <Section tone="alt" className="border-t border-border-default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="size-4 text-ink-500" aria-hidden="true" />
                <span className="font-sans text-label tracking-widest uppercase text-ink-500 font-semibold">
                  Message Protocol
                </span>
              </div>
              <h2 className="font-sans text-heading-xl font-medium text-ink-900 mb-6 tracking-tight">
                What to include.
              </h2>
              <ul className="space-y-4 font-sans text-body text-ink-500 font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="font-sans text-label text-ink-900 font-semibold uppercase tracking-widest mt-0.5 shrink-0">01</span>
                  <span>Your general area (district only — do not send GPS coordinates or full address).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-sans text-label text-ink-900 font-semibold uppercase tracking-widest mt-0.5 shrink-0">02</span>
                  <span>The nature of the need (health, shelter, food, energy, economic). General description only.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-sans text-label text-ink-900 font-semibold uppercase tracking-widest mt-0.5 shrink-0">03</span>
                  <span>Number of individuals affected.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-sans text-label text-ink-900 font-semibold uppercase tracking-widest mt-0.5 shrink-0">04</span>
                  <span>A secure way to reach you back (Signal preferred).</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-heading-xl font-medium text-ink-900 mb-6 tracking-tight">
                What not to include.
              </h2>
              <ul className="space-y-4 font-sans text-body text-ink-500 font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-alert-red font-semibold">✕</span>
                  <span>Full names of individuals at risk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-alert-red font-semibold">✕</span>
                  <span>Exact GPS coordinates or address of camps or safe houses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-alert-red font-semibold">✕</span>
                  <span>Medical diagnoses (use general terms: "needs ART" is sufficient).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-alert-red font-semibold">✕</span>
                  <span>Any information over unencrypted channels (regular email, SMS, or WhatsApp).</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. FAQs */}
      <FAQ
        tone="default"
        heading="Common Questions"
        items={[
          {
            question: "Why don't you have an online contact form?",
            answer:
              "We operate in a conflict zone with active digital surveillance. Standard web forms submit data to servers that can be compromised, subpoenaed, or monitored. We do not collect sensitive intake data on this platform. Signal and ProtonMail provide end-to-end encryption that protects both you and us.",
          },
          {
            question: "Is Signal available in conflict-affected areas?",
            answer:
              "Signal works over any internet connection including mobile data. During internet blockades, our teams use cached protocols. If connectivity is unavailable, please ask someone in a connected area to relay your contact details via Signal.",
          },
          {
            question: "How quickly will you respond?",
            answer:
              "Emergency or health-related Signal messages: within 4–6 hours during operational hours. ProtonMail: within 24–48 hours. We prioritise based on urgency category. If your situation is life-threatening, contact emergency services first.",
          },
          {
            question: "Can I request help for someone else?",
            answer:
              "Yes. You can send a message on behalf of a family member, neighbour, or community group. Use only the information that person has consented to share. Do not include sensitive details without explicit consent.",
          },
        ]}
      />
    </div>
  );
}
