import { Section, Container } from "@/components/layout/Shell";
import React from "react";
import {
  HeartPulse,
  Zap,
  Leaf,
  HandCoins,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    id: "health-equity",
    slug: "/programmes/health-equity",
    icon: HeartPulse,
    label: "Pillar 01",
    title: "Conflict-Resilient Health Equity",
    stat: "18 Active Nodes",
    statDetail: "12,400+ patients reached (Q3 2026)",
    description:
      "Mobile tele-health, decentralised ART continuity, psychiatry, and harm reduction across conflict-affected communities and valley districts cut off from Imphal's health system.",
    status: "Active",
    statusColor: "text-status-active",
  },
  {
    id: "energy-sovereignty",
    slug: "/programmes/energy-sovereignty",
    icon: Zap,
    label: "Pillar 02",
    title: "Energy Sovereignty",
    stat: "240 kW Deployed",
    statDetail: "1,200+ households on solar power",
    description:
      "Solar-Kiran renewable microgrid infrastructure for conflict-affected communities and mobile health units. Zero grid dependency during blockades.",
    status: "Active",
    statusColor: "text-status-active",
  },
  {
    id: "ecological-restoration",
    slug: "/programmes/ecological-restoration",
    icon: Leaf,
    label: "Pillar 03",
    title: "Ecological Restoration & Agrarian Resilience",
    stat: "340+ Varieties Banked",
    statDetail: "48 ha agroforestry plots, 280 households",
    description:
      "Loktak Lake bio-economy, indigenous seed bank preservation, and regenerative agroforestry with displaced farming communities.",
    status: "Active",
    statusColor: "text-status-active",
  },
  {
    id: "economic-dignity",
    slug: "/programmes/economic-dignity",
    icon: HandCoins,
    label: "Pillar 04",
    title: "Economic Dignity & Livelihood Rehabilitation",
    stat: "34 Cooperatives",
    statDetail: "890+ cooperative members, avg ₹4,200/mo restored",
    description:
      "Self-help cooperatives and circular micro-economies operating outside the formal banking system disabled by conflict.",
    status: "Active",
    statusColor: "text-status-active",
  },
];

export function ProgrammesBento() {
  return (
    <Section tone="default">
      <Container>
        {/* Header */}
        <div className="border-b border-border-default pb-8 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="size-4 text-safety-orange" aria-hidden="true" />
              <span className="font-sans text-label tracking-widest uppercase text-safety-orange font-semibold">
                Operational Mandate 2026–2030
              </span>
            </div>
            <h2 className="font-sans text-heading-xl md:text-display-md font-medium text-ink-900 leading-tight tracking-tight max-w-2xl">
              Four pillars. One vanguard.
            </h2>
          </div>
          <p className="font-sans text-body text-ink-500 max-w-sm font-light leading-relaxed">
            All operations map to these four mandates. No legacy programs. No
            dilution.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid gap-px bg-border-default md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={pillar.slug}
                className="group bg-surface p-8 flex flex-col gap-6 hover:bg-section-alt transition-colors"
                aria-label={`${pillar.title} — ${pillar.stat}`}
              >
                {/* Label row */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-label tracking-widest uppercase text-ink-500 font-semibold">
                    {pillar.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-status-active block" />
                    <span className="font-sans text-label tracking-widest uppercase text-status-active font-semibold">
                      {pillar.status}
                    </span>
                  </div>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-10 bg-safety-orange flex items-center justify-center">
                    <Icon className="size-5 text-paper" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-heading-lg font-medium text-ink-900 leading-snug tracking-tight">
                    {pillar.title}
                  </h3>
                </div>

                {/* Metric */}
                <div className="border-t border-border-default pt-5">
                  <p className="font-sans text-display-md font-medium text-ink-900 leading-none mb-1">
                    {pillar.stat}
                  </p>
                  <p className="font-sans text-body-sm text-ink-500">
                    {pillar.statDetail}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-body text-ink-500 font-light leading-relaxed flex-1">
                  {pillar.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-body-sm font-sans font-medium text-ink-900 group-hover:gap-3 transition-all">
                  <span>Field data</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
