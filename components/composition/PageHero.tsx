import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Section, Container } from "@/components/layout/Shell";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import { BlurFade } from "@/components/ui/blur-fade";

interface PageHeroProps {
  badge: string;
  heading: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function PageHero({
  badge,
  heading,
  description,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <Section
      tone="default"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 border-b border-border-default"
    >
      <HalftoneBackground />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <BlurFade delay={0.1} offset={12} inView direction="up">
              <Badge variant="default" className="mb-6 md:mb-8">
                {badge}
              </Badge>
            </BlurFade>
            <BlurFade delay={0.25} offset={16} inView direction="up">
              <h1 className="font-serif text-display-xl md:text-display-2xl font-light leading-[1.05] tracking-tight text-ink-900 mb-6">
                {heading}
              </h1>
            </BlurFade>
            <BlurFade delay={0.4} offset={16} inView direction="up">
              <p className="font-sans text-body-lg text-ink-500 leading-relaxed font-light">
                {description}
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={0.55} offset={32} inView direction="left" className="relative hidden md:block">
            {/* Outer offset frame for depth */}
            <div className="absolute inset-0 border border-border-default translate-x-4 translate-y-4 z-0 pointer-events-none" />
            <div className="relative aspect-4/3 w-full overflow-hidden border border-border-default bg-surface z-10">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </BlurFade>
          {/* Mobile version without offset frame */}
          <BlurFade delay={0.4} offset={24} inView direction="up" className="relative aspect-video w-full overflow-hidden border border-border-default md:hidden mt-8">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="90vw"
              className="object-cover"
              priority
            />
          </BlurFade>
        </div>
      </Container>
    </Section>
  );
}
