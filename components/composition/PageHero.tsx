import { Section, Container } from "@/components/layout/Shell";
import Image from "next/image";

interface PageHeroProps {
  badge: string;
  heading: React.ReactNode;
  description: string;
  image?: string;
  actions?: React.ReactNode;
}

export function PageHero({
  badge,
  heading,
  description,
  image,
  actions,
}: PageHeroProps) {
  if (image) {
    return (
      <Section tone="default" className="min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center">
        <Container className="w-full">
          <div className="flex flex-col lg:flex-row w-full border border-border-default shadow-none bg-background group overflow-hidden lg:h-95 xl:h-100">
            {/* Left Pane: Content */}
            <div className="flex-1 relative flex flex-col justify-center p-6 md:p-8 lg:p-10 xl:p-12 lg:border-r border-border-default z-10 transition-colors duration-500 hover:bg-surface overflow-hidden">
              <div className="flex items-center gap-3 mb-3 shrink-0">
                <span className="size-2 bg-ink-900 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-900">{badge}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-ink-900 mb-4 leading-[0.95] shrink-0">
                {heading}
              </h1>
              <p className="font-sans text-role-body md:text-role-body-lg text-ink-500 max-w-prose font-light leading-relaxed shrink-0">
                {description}
              </p>
              {actions && (
                <div className="mt-6 flex flex-wrap gap-4 shrink-0">
                  {actions}
                </div>
              )}
            </div>

            {/* Right Pane: 1:1 Aspect Ratio Image */}
            <div className="w-full lg:w-auto lg:aspect-square lg:h-full shrink-0 relative bg-ink-900 border-t lg:border-t-0 border-border-default overflow-hidden aspect-square max-h-80 sm:max-h-96 lg:max-h-none">
              <Image 
                src={image} 
                alt={badge} 
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center grayscale hover:grayscale-0 contrast-125 transition-all duration-700 group-hover:scale-105"
                priority
              />
              {/* Brutalist hard overlay scrim */}
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-black/20" />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Fallback to centered layout if no image
  return (
    <Section tone="default" className="relative overflow-hidden min-h-dvh pt-20 pb-6 md:pt-22 md:pb-8 lg:pt-24 lg:pb-10 flex flex-col justify-center border-b border-border-default bg-paper">
      <Container className="w-full flex flex-col justify-center relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center p-4 w-full">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <span className="size-2 bg-ink-900 shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-900">{badge}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink-900 mb-4 leading-[0.95] shrink-0">
            {heading}
          </h1>
          <p className="font-sans text-role-body md:text-role-body-lg text-ink-500 leading-relaxed max-w-2xl shrink-0">
            {description}
          </p>
          {actions && (
            <div className="mt-6 flex flex-wrap gap-4 shrink-0 justify-center">
              {actions}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
