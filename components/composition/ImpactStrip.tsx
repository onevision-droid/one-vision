import React from "react";
import { Section, Container } from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

export interface ImpactStat {
  value: string | number;
  suffix?: string;
  label: string;
}

interface ImpactStripProps {
  stats: ImpactStat[];
  className?: string;
  tone?: "default" | "alt" | "inverted";
}

export function ImpactStrip({
  stats,
  className,
  tone = "alt",
}: ImpactStripProps) {
  return (
    <Section tone={tone} className={cn("py-8 md:py-12 border-y border-border", className)}>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col justify-center",
                idx > 0 && idx % 2 === 0 ? "pt-6 lg:pt-0" : "",
                idx % 2 !== 0 ? "pt-6 sm:pt-0 pl-0 sm:pl-4 lg:pl-8" : "lg:first:pl-0 lg:pl-8"
              )}
            >
              <div className="flex items-baseline gap-0.5">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="font-serif text-2xl sm:text-3xl font-light text-primary">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground font-medium tracking-wide mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
