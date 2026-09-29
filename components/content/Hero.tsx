import Link from"next/link";
import { ArrowRight, ArrowUpRight } from"lucide-react";
import { Section, Container } from"@/components/layout/Shell";
import Image from"next/image";

export function Hero() {
  return (
    <Section tone="default" className="min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center">
      <Container className="w-full">
        <div className="flex flex-col lg:flex-row w-full border border-border shadow-none bg-background group overflow-hidden lg:h-95 xl:h-100">
          {/* Left Pane: Content */}
          <div className="flex-1 relative flex flex-col justify-center p-6 md:p-8 lg:p-10 xl:p-12 lg:border-r border-border z-10 transition-colors duration-500 hover:bg-muted overflow-hidden">
            <div className="flex items-center gap-3 mb-3 shrink-0">
              <span className="size-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Manipur Community NGO · Est. 1988
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-4 leading-[0.95] shrink-0">
              Shared<br/>Vision<span className="text-primary">.</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-muted-foreground max-w-prose font-light leading-relaxed shrink-0">
              Serving the communities of Manipur with healthcare, sustainable livelihoods, ecological restoration, and youth mentorship.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 shrink-0">
              <Link
                href="/programmes"
                className="bg-primary text-primary-foreground hover:bg-opacity-90 hover:-translate-y-px transition-all flex items-center justify-center gap-2 px-6 py-2.5 rounded-[3px] font-sans text-xs sm:text-[13px] font-semibold"
              >
                Explore Our Work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link 
                href="/volunteer"
                className="bg-transparent text-foreground border border-border hover:bg-muted hover:-translate-y-px transition-all flex items-center justify-center gap-2 px-6 py-2.5 rounded-[3px] font-sans text-xs sm:text-[13px] font-medium"
              >
                Get Involved
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Pane: 1:1 Aspect Ratio Image */}
          <div className="w-full lg:w-auto lg:aspect-square lg:h-full shrink-0 relative bg-muted border-t lg:border-t-0 border-border overflow-hidden aspect-square max-h-80 sm:max-h-96 lg:max-h-none">
            <Image 
              src="/home-hero-2026.jpg" 
              alt="Manipuri youth and elders collaborating around a table" 
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-center transition-all duration-700 group-hover:scale-105"
              priority
            />
            {/* Subtle soft scrim */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
