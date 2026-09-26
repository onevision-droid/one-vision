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
      <div className="mx-auto w-full max-w-7xl px-5 xl:px-6">
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
        {children}
      </div>
    </SectionWrapper>
  );
}
