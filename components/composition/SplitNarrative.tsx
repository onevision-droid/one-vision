import { cn } from "@/lib/utils";
import { SectionWrapper, isDarkSurface, type CompositionProps } from "./shared";

/**
 * Split Narrative — 5/7 text/media split.
 * Media may bleed to viewport edge.
 * Doc 02 §9 pattern #4.
 */
interface SplitNarrativeProps extends CompositionProps {
  /** Text/content side */
  content: React.ReactNode;
  /** Media side (image, illustration) */
  media: React.ReactNode;
  /** Optional heading */
  heading?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
}

export function SplitNarrative({
  surface = "paper",
  reversed = false,
  className,
  content,
  media,
  heading,
  headingId,
}: SplitNarrativeProps) {
  return (
    <SectionWrapper
      surface={surface}
      aria-labelledby={headingId}
      className={className}
    >
      <div className="container-wide">
        {heading && (
          <h2
            id={headingId}
            className={cn(
              "font-display font-light tracking-tight",
              "text-(length:--text-h2)",
              "mb-12 lg:mb-16"
            )}
          >
            {heading}
          </h2>
        )}

        <div
          className={cn(
            "grid gap-12 lg:gap-16 items-center",
            "lg:grid-cols-12",
            reversed
              ? "lg:[direction:rtl] lg:*:[direction:ltr]"
              : ""
          )}
        >
          {/* Content: 5 columns */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                "space-y-6",
                "text-(length:--text-body) leading-relaxed",
                isDarkSurface(surface) ? "text-teal-soft" : "text-stone-deep"
              )}
            >
              {content}
            </div>
          </div>

          {/* Media: 7 columns */}
          <div className="lg:col-span-7">
            <div className="relative aspect-3/2 overflow-hidden rounded-none">
              {media}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
