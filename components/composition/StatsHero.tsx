import { Section, Container } from "@/components/layout/Shell";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
  tone?: "default" | "alt" | "inverted";
}

export function StatsHero({
  heading,
  description,
  stats,
  ctaLabel,
  ctaHref,
  tone = "alt",
}: StatsHeroProps) {
  return (
    <Section tone={tone} className="border-t border-border-default">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col pt-4">
            <h2 className="font-sans text-heading-xl font-medium text-ink-900 mb-6">
              {heading}
            </h2>
            <p className="text-body-lg text-ink-500 font-light leading-relaxed mb-8">
              {description}
            </p>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="group flex items-center gap-2 text-ink-900 font-semibold tracking-widest uppercase text-caption hover:text-action-primary transition-colors w-fit"
              >
                {ctaLabel}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-default">
              {stats.map((stat, i) => (
                <li
                  key={i}
                  className="flex flex-col bg-paper p-8 lg:p-12 h-full"
                >
                  <h3 className="font-serif text-display-md font-light text-ink-900 mb-4">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-heading-xl text-ink-500">
                        {stat.suffix}
                      </span>
                    )}
                  </h3>
                  <p className="text-body font-medium text-ink-900 mb-2">
                    {stat.label}
                  </p>
                  {stat.description && (
                    <p className="text-body-sm text-ink-500 font-light leading-relaxed">
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
