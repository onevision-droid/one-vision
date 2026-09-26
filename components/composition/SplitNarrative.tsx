import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Shell";
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
      <Container>
        {heading && (
          <h2
            id={headingId}
            className={cn(
              "font-serif font-light tracking-tight",
              "text-display-md",
              "mb-12 lg:mb-16",
            )}
          >
            {heading}
          </h2>
        )}

        <div
          className={cn(
            "grid lg:grid-cols-12 overflow-hidden rounded-3xl border border-border-default bg-surface shadow-xl shadow-black/5",
            reversed ? "lg:[direction:rtl] lg:*:[direction:ltr]" : "",
          )}
        >
          {/* Content: 5 columns */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div
              className={cn(
                "space-y-6",
                "text-body leading-relaxed",
                isDarkSurface(surface) ? "text-paper" : "text-ink-700",
              )}
            >
              {content}
            </div>
          </div>

          {/* Media: 7 columns */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-full min-h-100 w-full overflow-hidden">
              {media}
              {/* Cinematic fade for optional overlay text/badges */}
              <div className="absolute inset-0 bg-linear-to-t from-ink-900/40 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
