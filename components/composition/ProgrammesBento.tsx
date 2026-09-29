import { Section, Container } from"@/components/layout/Shell";
import React from"react";
import {
  HeartPulse,
  Leaf,
  Laptop,
  HandCoins,
  LineChart,
  Activity,
  ArrowRight
} from"lucide-react";
import Link from"next/link";
import { programmes } from"@/lib/data/programmes";

const icons = {
 "community-health-connect": HeartPulse,
 "green-manipur-lab": Leaf,
 "futureworks": Laptop,
 "local-enterprise-lab": HandCoins,
 "community-data-lab": LineChart,
};

export function ProgrammesBento() {
  return (
    <Section tone="default" className="py-8 lg:py-14 border-t border-border bg-background">
      <Container className="px-0 md:px-0">
        <div className="border-b lg:border-x border-border p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 bg-background">
          <div>
            <div className="flex items-center gap-3 mb-4 bg-foreground text-background w-fit px-3.5 py-1.5 border border-foreground">
              <Activity className="size-4 text-primary" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Operational Mandate 2026–2030
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight text-foreground">
              Five Priorities.<br />
              One Shared Future.
            </h2>
          </div>
          <p className="font-sans text-lg text-muted-foreground max-w-sm border-l-[3px] border-primary pl-6 py-2">
            Our work is structured around five flagship programmes driving long-term community resilience.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-default border-x border-border border-b bg-background">
          {programmes.map((pillar, index) => {
            const Icon = icons[pillar.slug as keyof typeof icons] || Activity;
            return (
              <Link
                key={pillar.id}
                href={`/programmes/${pillar.slug}`}
                className="group flex flex-col h-full bg-card border-b border-l-[3px] border-l-fjord border-r border-border hover:bg-background transition-colors duration-300"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="font-mono text-2xl font-bold tracking-tight text-foreground/40 group-hover:text-primary transition-colors">
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {pillar.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="shrink-0 size-12 bg-background flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-light text-foreground mt-1 group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12 flex-1">
                    {pillar.description}
                  </p>

                  {/* Metrics / Read More */}
                  <div className="border-t border-border pt-6 mt-auto">
                    <p className="font-mono text-4xl font-bold tracking-tight text-foreground mb-2">
                      {pillar.metrics[0].value}
                    </p>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
                      {pillar.metrics[0].label}
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary group-hover:underline underline-offset-4 transition-all">
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
