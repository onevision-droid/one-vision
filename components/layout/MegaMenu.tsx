"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { programmes } from "@/lib/data/programmes";
import {
  ArrowRight,
  Heart,
  Leaf,
  Briefcase,
  TrendingUp,
  BarChart3,
  Layers,
} from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { label: "All Programmes", href: "/programmes", id: "all" },
  { label: "Healthy Communities", href: "/programmes?category=Healthy+Communities", id: "Healthy Communities" },
  { label: "Climate & Environment", href: "/programmes?category=Climate+%26+Environment", id: "Climate & Environment" },
  { label: "Youth & Future Skills", href: "/programmes?category=Youth+%26+Future+Skills", id: "Youth & Future Skills" },
  { label: "Livelihoods & Enterprise", href: "/programmes?category=Livelihoods+%26+Enterprise", id: "Livelihoods & Enterprise" },
  { label: "Innovation & Evidence", href: "/programmes?category=Innovation+%26+Evidence", id: "Innovation & Evidence" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "community-health-connect": <Heart className="size-3.5" />,
  "green-manipur-lab": <Leaf className="size-3.5" />,
  futureworks: <Briefcase className="size-3.5" />,
  "local-enterprise-lab": <TrendingUp className="size-3.5" />,
  "community-data-lab": <BarChart3 className="size-3.5" />,
};

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProgrammes =
    selectedCategory === "all"
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="programmes-mega-menu"
          role="region"
          aria-label="Programmes Navigation Menu"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-215 max-w-[95vw] bg-card border border-border rounded-none shadow-lg p-6 z-50 text-foreground"
          onMouseLeave={onClose}
        >
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* ═══ Column 1: Pillar Categories (3 cols) ═══ */}
            <div className="col-span-3 flex flex-col space-y-1 border-r border-border pr-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-3 block">
                Categories
              </span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-none font-sans text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <span className="size-1.5 rounded-none bg-primary" />}
                  </button>
                );
              })}
            </div>

            {/* ═══ Column 2: Spotlight Feature Card (4 cols) ═══ */}
            <div className="col-span-4 flex flex-col justify-between border-r border-border pr-4">
              <div className="space-y-3">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-none bg-muted border border-border">
                  <Image
                    src="/home-hero-2026.jpg"
                    alt="Community-led solutions in Manipur"
                    fill
                    sizes="(max-width: 1024px) 30vw, 250px"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-serif text-base text-foreground font-normal leading-snug">
                  Community-led solutions for a stronger Manipur.
                </h4>
                <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed">
                  Direct action, transparent accountability, and local youth leadership across valley and hill districts.
                </p>
              </div>

              <Link
                href="/programmes"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-primary hover:text-primary-hover transition-colors mt-4 pt-3 border-t border-border"
              >
                <span>View all programmes</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* ═══ Column 3: Featured Programmes List (5 cols) ═══ */}
            <div className="col-span-5 flex flex-col pl-2">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Featured Programmes
                </span>
                <span className="font-sans text-[11px] text-muted-foreground">
                  {filteredProgrammes.length} available
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                {filteredProgrammes.map((p) => {
                  const icon = categoryIcons[p.slug] || <Layers className="size-3.5" />;
                  return (
                    <Link
                      key={p.id}
                      href={`/programmes/${p.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between p-2 rounded-none hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="size-7 rounded-none bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {icon}
                        </span>
                        <div>
                          <span className="font-sans text-xs font-medium text-foreground group-hover:text-primary transition-colors block">
                            {p.title}
                          </span>
                          <span className="font-sans text-[11px] text-muted-foreground block">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
