import { Section, Container } from"@/components/layout/Shell";
import { ArrowRight } from"lucide-react";
import Link from"next/link";

interface StatProps {
 value: string | number;
 label: string;
 description?: string;
 suffix?: string;
}

interface StatsHeroProps {
 heading: string;
 description: string;
 stats: StatProps[];
 ctaLabel?: string;
 ctaHref?: string;
 tone?:"default" |"alt" |"inverted";
}

export function StatsHero({
 heading,
 description,
 stats,
 ctaLabel,
 ctaHref,
 tone ="alt",
}: StatsHeroProps) {
 return (
  <Section tone={tone} className="py-8 lg:py-14 bg-background">
  <Container>
    <div className="bg-background border border-border overflow-hidden flex flex-col lg:flex-row">
      <div className="lg:w-5/12 flex flex-col p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-border transition-colors hover:bg-muted">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4 sm:mb-6">
          {heading}
        </h2>
        <p className="font-sans text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md leading-relaxed font-light">
          {description}
        </p>
        {ctaLabel && ctaHref && (
          <div className="mt-auto pt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-colors duration-300 rounded-[2px]"
            >
              {ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="lg:w-7/12 bg-muted/40">
        <ul className="grid grid-cols-1 sm:grid-cols-2 h-full">
          {stats.map((stat, i) => (
            <li
              key={i}
              className={`flex flex-col justify-center p-6 lg:p-8 border-b border-border transition-colors hover:bg-muted/80 ${
                i % 2 !== 0 ? "sm:border-l" : ""
              } ${
                i >= stats.length - (stats.length % 2 === 0 ? 2 : 1) ? "sm:border-b-0" : ""
              }`}
            >
              <h3 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {stat.value}
                {stat.suffix && (
                  <span className="text-2xl sm:text-3xl text-primary ml-1">
                    {stat.suffix}
                  </span>
                )}
              </h3>
  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
  {stat.label}
  </p>
  {stat.description && (
  <p className="font-sans text-base-sm text-muted-foreground max-w-prose">
  {stat.description}
  </p>
  )}
  </li>
  ))}
  </ul>
  </div>
  </div>
  </Container>
 </Section>
 );
}
