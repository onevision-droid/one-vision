"use client";

import { Section, Container } from"@/components/layout/Shell";
import orgData from"@/content/org.json";

const stats = orgData.stats.slice(0, 3).map((s) => ({
  value: `${s.value.toLocaleString()}${s.suffix ||""}`,
  label: s.label,
}));

export function HeroStats() {
  return (
    <Section tone="default" className="w-full border-b-2 border-border bg-background py-0 md:py-0 lg:py-0">
      <Container>
        <div className="flex flex-col sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-ink-900">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 py-5 sm:py-7 flex-1 items-center justify-center text-center bg-background hover:bg-muted transition-colors"
            >
              <span className="font-sans text-display-sm font-extrabold text-foreground tabular-nums uppercase tracking-tighter">
                {stat.value}
              </span>
              <span className="font-sans text-body-sm font-bold tracking-widest uppercase text-destructive mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
