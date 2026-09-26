"use client";

import { useState } from "react";
import { Programme } from "@/lib/data/types";
import { CampaignCard } from "@/components/content/CampaignCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProgrammeFilter({ programmes }: { programmes: Programme[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(programmes.map((p) => p.category)))];

  const filteredProgrammes =
    selectedCategory === "All"
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-action-primary text-paper border border-action-primary"
                : "bg-surface text-ink-500 hover:text-ink-900 border border-border-default hover:border-ink-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
        {filteredProgrammes.map((p) => (
          <CampaignCard
            key={p.id}
            title={p.title}
            summary={p.description}
            status={p.status}
            image={p.image}
            href={`/programmes/${p.slug}`}
          />
        ))}

        {selectedCategory === "All" && (
          <Link
            href="/contact"
            className="group flex flex-col border border-dashed border-border-default hover:border-action-primary bg-surface rounded-md transition-colors p-8 justify-center items-center text-center min-h-100"
          >
            <h3 className="font-sans text-heading-lg font-medium text-ink-900 group-hover:text-action-primary transition-colors leading-tight mb-4">
              Partner with us
            </h3>
            <p className="font-sans text-body-sm text-ink-500 leading-loose font-light mb-6 max-w-50">
              Have an initiative that needs support? Let&apos;s collaborate.
            </p>
            <div className="flex items-center text-caption tracking-widest uppercase text-ink-900 font-semibold group-hover:text-action-primary transition-colors">
              <span>Contact us</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
