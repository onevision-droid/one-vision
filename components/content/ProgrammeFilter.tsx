"use client";

import { useState, useEffect, useMemo } from "react";
import { Programme } from "@/lib/data/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ProgrammeFilter({
  programmes,
  initialCategory = "All",
}: {
  programmes: Programme[];
  initialCategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(programmes.map((p) => p.category)))],
    [programmes]
  );

  // Sync with initialCategory prop changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Sync with browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const cat = url.searchParams.get("category") || "All";
      setSelectedCategory(cat);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const filteredProgrammes =
    selectedCategory === "All"
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  const [lead, ...subsequent] = filteredProgrammes;

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {/* ═══ Quiet Filter Control (Responsive Flex-Wrap) ═══ */}
      <div className="w-full pb-3 border-b border-border">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 font-sans text-xs font-medium transition-colors rounded-none cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Featured-First Programme Presentation ═══ */}
      {lead && (
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Primary Lead Feature (Item 01) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-card group overflow-hidden rounded-none shadow-xs">
            <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7 w-full overflow-hidden bg-muted min-h-64 sm:min-h-80 lg:min-h-96">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-95"
                priority
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-sans font-medium text-foreground border border-border rounded-none">
                01 · {lead.category}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="size-1.5 rounded-none bg-emerald-500" />
                  <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    {lead.status} Initiative
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {lead.title}
                </h2>
                <p className="font-sans text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-6">
                  {lead.description}
                </p>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-light text-foreground block">
                    {lead.metrics[0].value}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {lead.metrics[0].label}
                  </span>
                </div>
                <Link
                  href={`/programmes/${lead.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-xs font-medium rounded-none transition-colors"
                >
                  <span>Explore Programme</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Subsequent Programmes (Compact Editorial Rows) */}
          {subsequent.length > 0 && (
            <div className="flex flex-col divide-y divide-border border-y border-border">
              {subsequent.map((prog, idx) => {
                const rowNum = String(idx + 2).padStart(2, "0");
                return (
                  <Link
                    key={prog.id}
                    href={`/programmes/${prog.slug}`}
                    className="group py-6 md:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-muted/30 px-3 sm:px-4 -mx-3 sm:-mx-4"
                  >
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <span className="font-mono text-sm font-semibold text-primary pt-0.5 shrink-0">
                        {rowNum}
                      </span>
                      <div>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                          {prog.category}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors mb-1.5">
                          {prog.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-xl line-clamp-2">
                          {prog.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:shrink-0 pl-8 sm:pl-0 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="font-serif text-xl font-light text-foreground block">
                          {prog.metrics[0].value}
                        </span>
                        <span className="font-sans text-[11px] text-muted-foreground">
                          {prog.metrics[0].label}
                        </span>
                      </div>
                      <span className="size-8 rounded-none border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══ Collaborative Partner Strip ═══ */}
      <div className="p-6 md:p-8 border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-none shadow-xs">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
            Community Collaboration
          </span>
          <h3 className="font-serif text-2xl font-light text-foreground">
            Partner with One Vision
          </h3>
          <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mt-1 max-w-lg">
            Have a grassroots initiative or institutional programme that needs community support, research evidence, or volunteer mobilization?
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-card border border-border hover:bg-muted hover:border-primary/40 text-foreground font-sans text-xs font-medium transition-colors rounded-none shrink-0"
        >
          <span>Initiate Partnership</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
