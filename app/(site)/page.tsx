import { Metadata } from "next";
import { Hero } from "@/components/content/Hero";
import { StatsHero } from "@/components/composition/StatsHero";
import { WhatWeDo } from "@/components/composition/WhatWeDo";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import { ProgrammesBento } from "@/components/composition/ProgrammesBento";
import { stories } from "@/lib/data/stories";

import orgData from "@/content/org.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Lock, MessageCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "One Vision | Humanitarian Vanguard — Imphal, Manipur",
  description:
    "Decentralised crisis-resilient humanitarian vanguard operating across the Manipur polycrisis zone. 4 operational pillars: Health Equity, Energy Sovereignty, Ecological Restoration, Economic Dignity.",
  openGraph: {
    title: "One Vision | Humanitarian Vanguard — Imphal",
    description:
      "12,400+ people reached. 18 decentralised health nodes. 240kW solar deployed. One vanguard operating in the Manipur polycrisis zone.",
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
  alternateName: "One Vision Manipur",
  url: "https://onevision.org",
  foundingDate: "1988",
  description:
    "Decentralised crisis-resilient humanitarian vanguard. Formerly Society for Health & Education Manipur (1988). Operating across the Manipur polycrisis zone.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Imphal",
    addressRegion: "Manipur",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: orgData.contact.phone,
    contactType: "humanitarian operations",
    email: orgData.contact.email,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />


      {/* 1. Hero — Crisis framing */}
      <div className="border-b border-border-default">
        <Hero />
      </div>

      {/* 1.5. Live Metrics Ticker (Telemetry) */}
      <div className="border-b border-border-default bg-surface">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-default border-t sm:border-t-0 border-border-default">
          <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center border-b sm:border-b-0 border-border-default transition-colors hover:bg-surface-alt">
            <span className="font-mono text-3xl font-bold text-ink-900">18</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-500 mt-2">Local Hubs</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center border-b sm:border-b-0 border-border-default transition-colors hover:bg-surface-alt">
            <span className="font-mono text-3xl font-bold text-ink-900">240kW</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-500 mt-2">Solar Deployed</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center border-b sm:border-b-0 border-border-default transition-colors hover:bg-surface-alt">
            <span className="font-mono text-3xl font-bold text-ink-900">12,400+</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-500 mt-2">People Reached</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center transition-colors hover:bg-surface-alt">
            <span className="font-mono text-3xl font-bold text-ink-900">4</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-500 mt-2">Core Pillars</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics at a Glance */}
      <div className="border-b border-border-default">
        <StatsHero
          heading="What does change look like?"
          description="It looks like a student building their first digital product. A neighbourhood reducing waste. A family finding reliable health information. That's impact."
          ctaLabel="Explore our field reports"
          ctaHref="/stories"
          stats={orgData.stats.map((stat) => ({
            value: typeof stat.value === "number" ? stat.value.toLocaleString("en-GB") : String(stat.value),
            suffix: stat.suffix || "",
            label: stat.label,
          }))}
        />
      </div>

      {/* 3. The 4 Pillars — Operational Dashboard */}
      <div className="border-b border-border-default">
        <ProgrammesBento />
      </div>

      {/* 4. Ground Reality Section */}
      <div className="border-b border-border-default">
        <WhatWeDo />
      </div>

      {/* 4.5 The One Vision Method */}
      <div className="border-b border-border-default bg-paper">
        <div className="mx-auto max-w-container px-0 md:px-0">
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-default transition-colors duration-500 hover:bg-surface">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-1.5 bg-safety-orange shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-safety-orange font-semibold">
                  The One Vision Method
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 tracking-tight leading-[0.95] mb-6">
                We don&apos;t arrive with answers. We build them with communities.
              </h2>
              <p className="font-sans text-role-body md:text-role-body-lg text-ink-500 leading-relaxed mb-8">
                Good decisions begin with good information. Communities often know what is wrong. What they need is a better way to document it, understand it and act on it. One Vision builds tools that turn community knowledge into usable evidence.
              </p>
              <div className="grid grid-cols-2 gap-y-6 gap-x-6 pt-6 border-t border-border-default">
                <div>
                  <div className="font-mono text-2xl font-bold text-ink-900 mb-2">01 Listen</div>
                  <div className="font-sans text-role-body-sm text-ink-500">Understand what people experience.</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-ink-900 mb-2">02 Map</div>
                  <div className="font-sans text-role-body-sm text-ink-500">Document the problem & systems.</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-ink-900 mb-2">03 Co-design</div>
                  <div className="font-sans text-role-body-sm text-ink-500">Develop solutions together.</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-ink-900 mb-2">04 Test & Scale</div>
                  <div className="font-sans text-role-body-sm text-ink-500">Start small, measure, improve, scale.</div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[40vh] lg:h-auto min-h-85 bg-ink-900">
              <Image
                src="/community_voices.jpg"
                alt="Community co-design session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-ink-900/20" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Featured Field Report */}
      <div className="border-b border-border-default">
        <SplitNarrative
          heading="Field Report"
          content={
            <div className="flex flex-col h-full justify-center">
              <div className="font-mono text-[11px] uppercase tracking-widest text-safety-orange font-bold mb-6">
                {stories[0].date} — Youth & Future Skills
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-light text-ink-900 mb-8 leading-tight">
                {stories[0].title}
              </h3>
              <p className="font-sans text-role-body-lg text-ink-500 leading-relaxed mb-12">
                {stories[0].excerpt}
              </p>
              <div className="mt-auto">
                <Link href="/stories" className="inline-flex w-fit items-center gap-2 px-8 py-4 bg-ink-900 hover:bg-safety-orange text-paper font-bold uppercase tracking-widest text-[11px] transition-colors duration-300">
                  Read Full Report <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-12 pt-6 border-t border-border-default flex items-start gap-3 text-ink-500">
                <Shield className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest leading-relaxed font-bold">Identities anonymised.<br />Location withheld for OpSec.</span>
              </div>
            </div>
          }
          media={
            <Image
              src={stories[0].image}
              alt="Field report visual — identities and locations anonymised"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          }
        />
      </div>

      {/* 6. Secure Routing — Core differentiator */}
      <div className="border-b border-border-default bg-ink-900 text-paper">
        <div className="mx-auto max-w-container px-0 md:px-0">
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-paper/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-1.5 bg-safety-orange shrink-0" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-safety-orange font-semibold">
                  OpSec-First
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-paper tracking-tight leading-[0.95] mb-6">
                Need help? Use encrypted channels.
              </h2>
              <p className="font-sans text-role-body md:text-role-body-lg max-w-prose text-paper/70 font-light leading-relaxed mb-8">
                This platform does not collect sensitive data. All crisis-related, health, or assistance requests must use encrypted channels only. We operate in a conflict zone with active digital surveillance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-help" className="inline-flex w-fit items-center gap-2 px-8 py-4 bg-safety-orange hover:bg-paper text-ink-900 font-bold uppercase tracking-widest text-[11px] transition-colors duration-300">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  <span>Secure Contact</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-1 p-6 md:p-8 lg:p-10 border-b border-paper/10 hover:bg-paper/5 transition-colors flex flex-col justify-center group">
                <div className="flex items-start gap-5">
                  <div className="size-12 bg-safety-orange flex items-center justify-center shrink-0">
                    <MessageCircle className="size-5 text-ink-900" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-base font-bold uppercase tracking-wider text-paper mb-1.5">Signal (Recommended)</p>
                    <p className="font-sans text-role-body text-paper/70 leading-relaxed">End-to-end encrypted. 24/7 Response. <br />Number provided upon verification.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8 lg:p-10 hover:bg-paper/5 transition-colors flex flex-col justify-center group">
                <div className="flex items-start gap-5">
                  <div className="size-12 bg-paper/10 flex items-center justify-center shrink-0">
                    <Lock className="size-5 text-paper" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-base font-bold uppercase tracking-wider text-paper mb-1.5">ProtonMail</p>
                    <p className="font-sans text-role-body max-w-prose text-paper/70 leading-relaxed">Encrypted email for non-urgent requests.<br />Response within 24–48h.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Trust & Transparency */}
      <div className="border-b border-border-default bg-paper">
        <div className="mx-auto max-w-container px-0 md:px-0">
          <div className="p-6 md:p-10 lg:p-12 border-b border-border-default">
            <div className="flex items-center gap-3 mb-4">
              <span className="size-1.5 bg-safety-orange shrink-0" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-safety-orange font-semibold">
                Accountability
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 tracking-tight leading-[0.95]">
              Trust is a feature.
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border-default">
            <Link href="/open-ledger" className="group bg-paper hover:bg-surface p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-mono text-sm tracking-widest uppercase text-ink-500 font-bold">Open Ledger</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-ink-900 mt-6 mb-4">Financial Transparency</h3>
                <p className="font-sans text-role-body text-ink-500 leading-relaxed">
                  Every rupee tracked. Real-time allocation data. No hidden fees, no corporate overhead.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-900 mt-8 group-hover:text-safety-orange transition-colors">
                View Ledger <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/about/governance" className="group bg-paper hover:bg-surface p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-mono text-sm tracking-widest uppercase text-ink-500 font-bold">Governance</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-ink-900 mt-6 mb-4">Board & Leadership</h3>
                <p className="font-sans text-role-body text-ink-500 leading-relaxed">
                  Registered NGO since 1988. Board composition, decision-making processes, and conflict of interest policies.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-900 mt-8 group-hover:text-safety-orange transition-colors">
                View Governance <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/reports" className="group bg-paper hover:bg-surface p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
              <div>
                <span className="font-mono text-sm tracking-widest uppercase text-ink-500 font-bold">Field Reports</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-ink-900 mt-6 mb-4">Quarterly Audits</h3>
                <p className="font-sans text-role-body text-ink-500 leading-relaxed">
                  Downloadable field reports, impact audits, and financial statements. Published quarterly.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-900 mt-8 group-hover:text-safety-orange transition-colors">
                View Reports <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 8. Closing CTA — Community Action */}
      <section className="bg-ink-900 text-paper border-t border-border-default overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="relative mx-auto text-center max-w-4xl px-6 py-16 md:py-24 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="size-1.5 bg-safety-orange shrink-0" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-safety-orange">Our Shared Future</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-paper mb-6 leading-[0.95] text-balance">
            The future of our communities is something we build together.
          </h2>
          <p className="font-sans text-base md:text-xl max-w-2xl mx-auto text-paper/70 mb-10 font-light leading-relaxed text-balance">
            One Vision is working with people across Manipur to create healthier communities, protect the environment, expand opportunity and develop solutions that can last. There is work to do. There is also a lot we can build.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <Link href="/programmes" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-5 bg-safety-orange hover:bg-paper text-ink-900 font-bold uppercase tracking-widest text-xs transition-colors duration-300">
              Explore Our Work
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/volunteer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-5 bg-transparent border border-paper/30 text-paper hover:bg-paper hover:text-ink-900 font-bold uppercase tracking-widest text-xs transition-colors duration-300">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
