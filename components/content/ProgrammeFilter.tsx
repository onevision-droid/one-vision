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
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-0 border border-border-default w-fit mb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${
              selectedCategory === cat
                ? "bg-ink-900 text-paper"
                : "bg-surface text-ink-500 hover:bg-surface-alt hover:text-ink-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border-default *:border-b *:border-r *:border-border-default">
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
            className="group flex flex-col bg-surface hover:bg-ink-900 transition-colors duration-300 p-6 md:p-8 justify-center items-center text-center min-h-75 h-full"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-ink-900 group-hover:text-paper transition-colors leading-tight mb-3">
              Partner with us
            </h3>
            <p className="font-sans text-role-body-sm text-ink-500 group-hover:text-paper/70 transition-colors leading-relaxed font-light mb-6 max-w-50">
              Have an initiative that needs support? Let&apos;s collaborate.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 border border-ink-900 group-hover:border-safety-orange group-hover:bg-safety-orange text-ink-900 group-hover:text-paper font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">
              <span>Contact us</span>
              <ArrowRight className="size-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
