import { Section, Container } from"@/components/layout/Shell";
import Image from"next/image";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

interface TestimonialMosaicProps {
  heading: React.ReactNode;
  description?: string;
  testimonials: Testimonial[];
  tone?:"default" |"alt" |"inverted";
}

export function TestimonialMosaic({
  heading,
  description,
  testimonials,
  tone ="alt",
}: TestimonialMosaicProps) {
  // We'll structure a masonry-like CSS grid
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-sans text-heading-xl font-medium text-foreground mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-body-lg max-w-prose  text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* 3-column masonry grid logic using CSS columns or flex/grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`bg-background p-8 border border-border flex flex-col justify-between ${
                // Add some staggered height simulation or specific spans if desired
                idx === 1 || idx === 4 ?"md:mt-8" :""
              }`}
            >
              <blockquote className="font-sans text-heading-md font-light text-foreground leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                {t.image ? (
                  <div className="relative w-12 h-12 overflow-hidden shrink-0 border border-border">
                    <Image
                      src={t.image}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 shrink-0 bg-muted-alt border border-border flex items-center justify-center">
                    <span className="font-sans text-body-lg text-foreground font-light">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-body-sm max-w-prose font-medium text-foreground">
                    {t.author}
                  </p>
                  {t.role && (
                    <p className="text-caption text-muted-foreground">{t.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
