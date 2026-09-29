import { Section, Container } from"@/components/layout/Shell";
import { cn } from"@/lib/utils";
import React from"react";
import { Card } from"@/components/ui/card";
import { ArrowRight } from"lucide-react";
import Link from"next/link";
import Image from"next/image";
import { Button } from"@/components/ui/button";
import { programmes } from"@/lib/data/programmes";
export function ProgrammesGrid() {
  return (
    <Section tone="default" className="border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-balance font-sans text-heading-xl md:text-display-md font-medium text-foreground">
              Explore Our Work
            </h2>
            <p className="text-muted-foreground mt-4 text-balance text-body-lg font-light max-w-xl">
              We operate across four core pillars to build immediate resilience
              and long-term capacity in Manipur.
            </p>
          </div>
          <Button
            variant="secondary"
            nativeButton={false}
            render={
              <Link href="/programmes" className="flex items-center gap-2">
                <span>See full directory</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-4">
          {programmes.slice(0, 4).map((programme) => (
            <Card
              key={programme.id}
              className="group relative flex flex-col justify-between p-0 overflow-hidden bg-muted border border-border hover:border-line-strong transition-colors"
            >
              <Link
                href={`/programmes/${programme.slug}`}
                className="absolute inset-0 z-20 focus:outline-hidden"
                aria-label={`View ${programme.title} details`}
              />

              <div className="p-8 pb-0 space-y-3 z-10 relative">
                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2 border border-border bg-background/80 backdrop-blur-sm px-3 py-1 font-medium text-foreground shadow-xs">
                    {programme.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2", programme.status ==="Active" ?"bg-status-active" :"bg-hazard-yellow")} />
                    {programme.status}
                  </div>
                  <span className="text-border-strong">•</span>
                  <span className="truncate">{programme.location}</span>
                </div>

                <h3 className="text-foreground font-medium text-heading-md flex items-center justify-between pr-4 mt-2">
                  {programme.title}
                  <ArrowRight className="size-4 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>
                <p className="text-muted-foreground text-body-sm font-light leading-relaxed max-w-md">
                  {programme.description}
                </p>
              </div>

              <div className="relative h-64 w-full mt-4 mask-[linear-gradient(to_bottom,transparent,white_40%)]">
                <Image
                  src={programme.image}
                  alt={programme.title}
                  fill
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
