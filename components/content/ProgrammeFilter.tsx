"use client";

import { useState } from"react";
import { Programme } from"@/lib/data/types";
import { CampaignCard } from"@/components/content/CampaignCard";
import Link from"next/link";
import { ArrowRight } from"lucide-react";

export function ProgrammeFilter({ programmes }: { programmes: Programme[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(programmes.map((p) => p.category)))];

  const filteredProgrammes =
    selectedCategory ==="All"
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-0 border border-border rounded-sm overflow-hidden w-fit mb-0 bg-muted/30">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 font-sans text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border *:border-b *:border-r *:border-border">
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
            className="group flex flex-col bg-muted/40 hover:bg-card hover:shadow-xs transition-all duration-300 p-6 md:p-8 justify-center items-center text-center min-h-75 h-full"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground leading-tight mb-3">
              Partner with us
            </h3>
            <p className="font-sans text-base-sm text-muted-foreground leading-relaxed font-light mb-6 max-w-50">
              Have an initiative that needs community support? Let&apos;s collaborate.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-card group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground text-foreground font-sans text-xs font-medium transition-colors duration-300 rounded-sm shadow-2xs">
              <span>Contact</span>
              <ArrowRight className="size-3.5" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
