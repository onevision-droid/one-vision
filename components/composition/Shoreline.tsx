import { cn } from "@/lib/utils";
import { SectionWrapper, isDarkSurface, type CompositionProps } from "./shared";

/**
 * Shoreline — Full-bleed hero composition.
 * Display headline on paper or forest, image right/below, eyebrow + CTAs.
 * Doc 02 §9 pattern #1.
 */
interface ShorelineProps extends CompositionProps {
  /** Small label above the headline */
  eyebrow?: React.ReactNode;
  /** Large display headline (can contain JSX for line breaks) */
  headline: React.ReactNode;
  /** Supporting paragraph */
  description?: string;
  /** CTA buttons rendered in a flex row */
  actions?: React.ReactNode;
  /** Media content (image, illustration) rendered on the right/below */
  media?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
}

export function Shoreline({
  surface = "paper",
  reversed = false,
  className,
  eyebrow,
  headline,
  description,
  actions,
  media,
  headingId,
}: ShorelineProps) {
  const dark = isDarkSurface(surface);

  return (
    <SectionWrapper
      surface={surface}
      aria-labelledby={headingId}
      className={cn("overflow-hidden", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-5 xl:px-6">
        <div
          className={cn(
            "grid gap-12 items-center",
            "lg:grid-cols-[1fr_1fr]",
            reversed && "lg:[direction:rtl] lg:*:[direction:ltr]",
          )}
        >
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            {eyebrow && (
              <div
                className={cn("eyebrow", dark ? "text-paper" : "text-stone")}
              >
                {eyebrow}
              </div>
            )}
            <h1
              id={headingId}
              className={cn(
                "font-serif font-light tracking-tight leading-[1.05]",
                "text-display-lg",
              )}
            >
              {headline}
            </h1>
            {description && (
              <p
                className={cn(
                  "max-w-135 text-body leading-relaxed",
                  dark ? "text-paper" : "text-stone",
                )}
              >
                {description}
              </p>
            )}
            {actions && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {actions}
              </div>
            )}
          </div>

          {/* Media */}
          {media && (
            <div className="relative w-full aspect-4/3 lg:aspect-square overflow-hidden rounded-none">
              {media}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
