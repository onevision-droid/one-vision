import React from "react";
import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/layout/Shell";

const keyFacts = [
  {
    stat: "May 2023",
    label: "Conflict began",
    detail: "Ethnic conflict and civil unrest disrupts health, energy, and economic infrastructure across Manipur",
  },
  {
    stat: "3+ Years",
    label: "Sustained crisis",
    detail: "No political resolution. Structural humanitarian gaps persist across valley districts.",
  },
  {
    stat: "18 Nodes",
    label: "Health access restored",
    detail: "Decentralised mobile health nodes serving conflict-affected communities Q3 2026",
  },
  {
    stat: "4 Pillars",
    label: "Our mandate",
    detail: "Health Equity, Energy, Ecology, Economic Dignity",
  },
];

export function WhatWeDo() {
  return (
    <Section tone="inverted" className="border-t border-field-black">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 items-start">
          {/* Left: Context Statement */}
          <div className="space-y-8 pt-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Radio className="size-4 text-safety-orange animate-pulse" aria-hidden="true" />
                <span className="font-sans text-label tracking-widest uppercase text-safety-orange font-semibold">
                  Ground Reality
                </span>
              </div>
              <h2 className="font-sans text-heading-xl md:text-display-md font-medium text-paper leading-tight tracking-tight">
                The crisis is structural. Our response is permanent.
              </h2>
            </div>

            <p className="font-sans text-body-lg text-paper/70 font-light leading-relaxed">
              Traditional NGO models built for acute emergencies have failed in
              Manipur. The conflict that began in May 2023 has become a
              long-duration polycrisis. Supply chains are severed. Centralised
              infrastructure is compromised. State support is unreliable.
            </p>

            <p className="font-sans text-body-lg text-paper/70 font-light leading-relaxed">
              One Vision abandoned its legacy model in September 2026. Every
              resource is now deployed through decentralised, conflict-resilient
              infrastructure designed to survive blockades and operate without
              external grid dependency.
            </p>

            <div className="pt-2">
              <Button
                variant="secondary"
                className="gap-2 border-paper/20 text-paper hover:bg-paper/10"
                nativeButton={false}
                render={
                  <Link href="/about">
                    <span>Our mandate</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                }
              />
            </div>
          </div>

          {/* Right: Key Facts Grid */}
          <div className="grid grid-cols-2 gap-px bg-paper/10">
            {keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="bg-field-black p-8 flex flex-col gap-3"
              >
                <p className="font-sans text-display-md font-medium text-safety-orange leading-none">
                  {fact.stat}
                </p>
                <p className="font-sans text-body-sm font-semibold uppercase tracking-widest text-paper">
                  {fact.label}
                </p>
                <p className="font-sans text-body-sm text-paper/50 font-light leading-relaxed">
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
