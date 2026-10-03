import Link from"next/link";
import { ArrowRight, ArrowUpRight } from"lucide-react";
import { Section, Container } from"@/components/layout/Shell";
import Image from"next/image";

export function Hero() {
  return (
    <Section tone="default" className="min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center">
      <Container className="w-full">
        <div className="flex flex-col lg:flex-row w-full border border-border shadow-none bg-background group overflow-hidden lg:h-95 xl:h-100">
          {/* Left Pane: Content (50%) */}
          <div className="w-full lg:w-1/2 relative flex flex-col justify-center p-6 md:p-8 lg:p-10 xl:p-12 lg:border-r border-border z-10 transition-colors duration-500 hover:bg-muted overflow-hidden">
            <div className="flex items-center gap-3 mb-3 shrink-0">
              <span className="size-2 rounded-none bg-primary shrink-0" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Manipur Community NGO · Est. 1988
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-4 leading-[0.95] shrink-0">
              Shared<br />Vision<span className="text-primary">.</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-muted-foreground max-w-md font-light leading-relaxed shrink-0">
              Serving communities across Manipur with healthcare,{' '}
              <br className="hidden sm:inline" />
              sustainable livelihoods, and ecological resilience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 shrink-0">
              <Link
                href="/programmes"
                className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs hover:-translate-y-px transition-all flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-sans text-xs font-medium min-h-11 sm:min-h-10"
              >
                <span>Our Work</span>
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
              <Link 
                href="/volunteer"
                className="bg-card text-foreground border border-border hover:bg-muted shadow-xs hover:-translate-y-px transition-all flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-sans text-xs font-medium min-h-11 sm:min-h-10"
              >
                <span>Volunteer</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Pane: 50% Hero Image */}
          <div className="w-full lg:w-1/2 shrink-0 relative bg-muted border-t lg:border-t-0 border-border overflow-hidden aspect-square lg:aspect-auto h-72 sm:h-80 md:h-80 lg:h-full">
            <Image 
              src="/home-hero-2026.jpg" 
              alt="Manipuri youth and elders collaborating around a table" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-700 group-hover:scale-105"
              priority
              loading="eager"
            />
            {/* Subtle soft scrim */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
