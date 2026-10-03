import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout/Shell";
import { programmes } from "@/lib/data/programmes";

export function EditorialIndex() {
  const [featured, ...rest] = programmes;

  return (
    <Section tone="default" className="py-16 md:py-20 lg:py-24">
      <Container>
        {/* Section Header: Open & Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 pb-6 sm:pb-8 border-b border-border/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-secondary/80 border border-border text-muted-foreground mb-4">
              <span className="size-1.5 rounded-none bg-primary" aria-hidden="true" />
              <span className="font-sans text-xs uppercase tracking-widest font-semibold">
                Five Priorities
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.12] tracking-tight">
              Five Priorities.<br />
              One Shared Future.
            </h2>
          </div>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-md lg:max-w-lg font-light leading-relaxed">
            Our initiatives are rooted in long-term community partnerships across health, climate resilience, youth skills, and local enterprise.
          </p>
        </div>

        {/* Editorial Index Grid: Harmonized Asymmetric Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Featured Programme (Item 01) — 5 Columns */}
          <Link
            href={`/programmes/${featured.slug}`}
            className="lg:col-span-5 group relative flex flex-col justify-between h-full bg-card border border-border hover:border-primary/50 rounded-none overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="relative aspect-16/10 sm:aspect-video lg:aspect-4/3 w-full overflow-hidden bg-muted">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-3 py-1 text-[11px] font-mono font-medium text-foreground border border-border/80 rounded-none">
                Priority 01 · {featured.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
              <div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                  {featured.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                  {featured.description}
                </p>
              </div>

              <div className="pt-5 border-t border-border flex items-end justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl font-light text-foreground block leading-none">
                    {featured.metrics[0].value}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground block mt-1.5">
                    {featured.metrics[0].label}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 font-sans text-xs font-medium text-foreground bg-secondary group-hover:bg-primary group-hover:text-primary-foreground px-4 py-2.5 rounded-none border border-border group-hover:border-primary transition-all duration-200 shrink-0">
                  <span>Explore</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Numbered Editorial Rows (Items 02–05) — 7 Columns */}
          <div className="lg:col-span-7 flex flex-col h-full justify-between divide-y divide-border border-y border-border">
            {rest.map((programme, index) => {
              const priorityNum = String(index + 2).padStart(2, "0");
              return (
                <Link
                  key={programme.id}
                  href={`/programmes/${programme.slug}`}
                  className="group relative flex-1 flex flex-col justify-center p-5 sm:p-6 lg:p-7 transition-all duration-200 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-primary before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                      <span className="font-mono text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none shrink-0 mt-0.5">
                        {priorityNum}
                      </span>
                      <div className="min-w-0">
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                          {programme.category}
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
                          {programme.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 max-w-xl">
                          {programme.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-6 sm:shrink-0 pt-3 sm:pt-0 border-t border-border/40 sm:border-t-0">
                      <div className="text-left sm:text-right">
                        <span className="font-serif text-xl sm:text-2xl font-light text-foreground block leading-none">
                          {programme.metrics[0].value}
                        </span>
                        <span className="font-sans text-[11px] text-muted-foreground block mt-1">
                          {programme.metrics[0].label}
                        </span>
                      </div>
                      <span className="size-9 rounded-none border border-border bg-background flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 group-hover:translate-x-0.5 transition-all shrink-0">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
