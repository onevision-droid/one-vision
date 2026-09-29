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
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-primary shrink-0" />
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Our Five Flagship Programmes
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight text-foreground">
              Five Priorities.<br />
              One Shared Future.
            </h2>
          </div>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-sm border-l-2 border-primary pl-4 py-1">
            Our initiatives are rooted in long-term community partnerships across health, environment, youth, and livelihoods.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-x border-border border-b bg-background">
          {programmes.map((pillar, index) => {
            const Icon = icons[pillar.slug as keyof typeof icons] || Activity;
            return (
              <Link
                key={pillar.id}
                href={`/programmes/${pillar.slug}`}
                className="group flex flex-col h-full bg-card border-b border-l-[3px] border-l-border hover:border-l-primary border-r border-border hover:bg-muted/30 transition-colors duration-300"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                    Priority 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="font-sans text-xs font-medium text-muted-foreground">
                      {pillar.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 size-11 bg-background flex items-center justify-center text-foreground group-hover:text-primary transition-colors border border-border rounded-[2px]">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-light text-foreground mt-0.5 group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                    {pillar.description}
                  </p>

                  {/* Metrics / Read More */}
                  <div className="border-t border-border pt-5 mt-auto">
                    <p className="font-serif text-3xl font-light tracking-tight text-foreground mb-1">
                      {pillar.metrics[0].value}
                    </p>
                    <p className="font-sans text-xs font-medium text-muted-foreground mb-4">
                      {pillar.metrics[0].label}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary group-hover:underline underline-offset-4 transition-all">
                      Learn about this initiative <ArrowRight className="size-3.5" />
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
