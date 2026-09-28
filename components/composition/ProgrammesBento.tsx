import { Section, Container } from "@/components/layout/Shell";
import React from "react";
import {
  HeartPulse,
  Leaf,
  Laptop,
  HandCoins,
  LineChart,
  Activity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { programmes } from "@/lib/data/programmes";

const icons = {
  "community-health-connect": HeartPulse,
  "green-manipur-lab": Leaf,
  "futureworks": Laptop,
  "local-enterprise-lab": HandCoins,
  "community-data-lab": LineChart,
};

export function ProgrammesBento() {
  return (
    <Section tone="default" className="py-8 lg:py-14 border-t border-border-default bg-paper">
      <Container className="px-0 md:px-0">
        {/* Header */}
        <div className="border-b lg:border-x border-border-default p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 bg-surface">
          <div>
            <div className="flex items-center gap-3 mb-4 bg-ink-900 text-paper w-fit px-3.5 py-1.5 border border-ink-900">
              <Activity className="size-4 text-safety-orange" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Operational Mandate 2026–2030
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight text-ink-900">
              Five Priorities.<br />
              One Shared Future.
            </h2>
          </div>
          <p className="font-sans text-role-body-lg text-ink-500 max-w-sm border-l-4 border-safety-orange pl-6 py-2">
            Our work is structured around five flagship programmes driving long-term community resilience.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-default border-x border-border-default border-b bg-paper">
          {programmes.map((pillar, index) => {
            const Icon = icons[pillar.slug as keyof typeof icons] || Activity;
            return (
              <Link
                key={pillar.id}
                href={`/programmes/${pillar.slug}`}
                className="group flex flex-col h-full bg-paper border-b border-border-default hover:bg-ink-900 transition-colors duration-300"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between p-6 border-b border-border-default group-hover:border-paper/20 transition-colors">
                  <span className="font-mono text-2xl font-bold tracking-tight text-ink-900 group-hover:text-paper transition-colors">
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-safety-orange animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-500 group-hover:text-paper/60 transition-colors">
                      {pillar.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="shrink-0 size-12 bg-surface flex items-center justify-center text-ink-900 group-hover:bg-safety-orange transition-colors">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-light text-ink-900 mt-1 group-hover:text-paper transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-role-body text-ink-500 leading-relaxed mb-12 flex-1 group-hover:text-paper/70 transition-colors">
                    {pillar.description}
                  </p>

                  {/* Metrics / Read More */}
                  <div className="border-t border-border-default pt-6 mt-auto group-hover:border-paper/20 transition-colors">
                    <p className="font-mono text-4xl font-bold tracking-tight text-ink-900 mb-2 group-hover:text-paper transition-colors">
                      {pillar.metrics[0].value}
                    </p>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-500 mb-6 group-hover:text-paper/60 transition-colors">
                      {pillar.metrics[0].label}
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-900 group-hover:text-safety-orange transition-colors">
                      Explore programme <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
