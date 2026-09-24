import { cn } from "@/lib/utils";
import { SectionWrapper, type CompositionProps } from "./shared";

/**
 * Depth Band — Alternating full-width band carrying a single idea.
 * Doc 02 §9 pattern #2.
 * Statement + supporting media/content.
 */
interface DepthBandProps extends CompositionProps {
  /** Optional heading for the band */
  heading?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
}

export function DepthBand({
  surface = "mist",
  className,
  children,
  heading,
  headingId,
}: DepthBandProps) {
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
        {children}
      </div>
    </SectionWrapper>
  );
}
