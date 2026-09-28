import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Shell";

const keyFacts = [
  {
    stat: "CLIMATE",
    label: "Extreme Weather",
    detail: "Floods and landslides threaten communities, homes, and everyday livelihoods.",
  },
  {
    stat: "ECOLOGY",
    label: "Environmental Stress",
    detail: "Pollution and degradation threaten clean air, water, and natural infrastructure.",
  },
  {
    stat: "YOUTH",
    label: "Future Skills",
    detail: "Young people need practical pathways and mentorship into new digital industries.",
  },
  {
    stat: "COMMUNITY",
    label: "Access to Services",
    detail: "Communities need better access to reliable information, services and opportunities.",
  },
];

export function WhatWeDo() {
  return (
    <Section tone="default" className="border-t border-border-default py-8 lg:py-14 bg-paper">
      <Container className="px-0 md:px-0">
        <div className="grid lg:grid-cols-2 items-stretch border-x border-border-default bg-surface">
          {/* Left: Context Statement */}
          <div className="flex flex-col p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-border-default">
            <div className="flex items-center gap-3 mb-6">
              <span className="size-1.5 bg-safety-orange shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500 font-bold">
                The Problem Statement
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-6 text-ink-900">
              The challenges are changing.<br />
              Our response must change with them.
            </h2>
            
            <div className="space-y-6 text-role-body-lg text-ink-500 font-light leading-relaxed flex-1">
              <p>
                Manipur has extraordinary natural wealth, strong communities and a generation growing up in a rapidly changing world.
              </p>
              <p>
                But climate pressure, environmental degradation, unequal access to opportunity, changing health needs and limited pathways into future work are creating new challenges.
              </p>
              <p className="font-semibold text-ink-900">
                These problems cannot be solved one at a time. One Vision works across the connections. People. Health. Environment. Opportunity.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-border-default">
              <Link 
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink-900 hover:bg-safety-orange text-paper font-bold uppercase tracking-widest text-[11px] transition-colors duration-300 w-fit"
              >
                <span>Read Our Mandate</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: Key Facts Grid */}
          <div className="flex flex-col bg-paper">
            {keyFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex-1 p-8 lg:p-12 flex flex-col justify-center transition-colors hover:bg-surface-alt ${index < 3 ? 'border-b border-border-default' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <p className="font-mono text-4xl md:text-5xl leading-none tracking-tight text-ink-900 font-bold">
                    {fact.stat}
                  </p>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-500 pb-1">
                    {fact.label}
                  </p>
                </div>
                <p className="font-sans text-role-body text-ink-500 max-w-md">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
