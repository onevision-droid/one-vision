import React from"react";
import Link from"next/link";
import { ArrowRight } from"lucide-react";
import { Section, Container } from"@/components/layout/Shell";

const keyFacts = [
  {
    stat:"CLIMATE",
    label:"Extreme Weather",
    detail:"Floods and landslides threaten communities, homes, and everyday livelihoods.",
  },
  {
    stat:"ECOLOGY",
    label:"Environmental Stress",
    detail:"Pollution and degradation threaten clean air, water, and natural infrastructure.",
  },
  {
    stat:"YOUTH",
    label:"Future Skills",
    detail:"Young people need practical pathways and mentorship into new digital industries.",
  },
  {
    stat:"COMMUNITY",
    label:"Access to Services",
    detail:"Communities need better access to reliable information, services and opportunities.",
  },
];

export function WhatWeDo() {
  return (
    <Section tone="default" className="border-t border-border py-8 lg:py-14 bg-background">
      <Container>
        <div className="grid lg:grid-cols-2 items-stretch border border-border bg-muted">
          {/* Left: Context Statement */}
          <div className="flex flex-col p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-primary shrink-0" />
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Community Reality in Manipur
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-6 text-foreground">
              The challenges are evolving.<br />
              Our grassroots response must meet them.
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed flex-1">
              <p>
                Manipur has extraordinary cultural heritage, vibrant communities, and young people eager to build a brighter future.
              </p>
              <p>
                Yet climate disruptions, environmental pressure, uneven access to primary healthcare, and limited economic opportunities place immense strain on daily life.
              </p>
              <p className="font-medium text-foreground">
                These challenges cannot be addressed in isolation. One Vision connects community healthcare, sustainable ecology, rural solar energy, and youth livelihoods.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-[13px] transition-colors duration-300 w-fit rounded-[2px]"
              >
                <span>Read Our Founding Mandate</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: Key Facts Grid */}
          <div className="flex flex-col bg-background">
            {keyFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex-1 p-8 lg:p-10 flex flex-col justify-center transition-colors hover:bg-muted/50 ${index < 3 ? 'border-b border-border' : ''}`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl leading-snug tracking-tight text-foreground font-light">
                    {fact.label}
                  </h3>
                  <span className="font-sans text-xs uppercase tracking-wider font-semibold text-primary shrink-0">
                    {fact.stat}
                  </span>
                </div>
                <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md">
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
