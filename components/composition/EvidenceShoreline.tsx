import { cn } from "@/lib/utils";
import { SectionWrapper, type CompositionProps } from "./shared";

/**
 * Evidence Shoreline — metric row (2–4 ImpactMetrics) + optional supporting image.
 * Doc 02 §9 pattern #5.
 */
interface EvidenceShorelineProps extends CompositionProps {
  /** Optional heading */
  heading?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
  /** Metric components (2–4 ImpactMetric instances) */
  metrics: React.ReactNode;
  /** Optional supporting image */
  media?: React.ReactNode;
  /** Optional methodology footnote */
  footnote?: React.ReactNode;
}

export function EvidenceShoreline({
  surface = "mist",
  className,
  heading,
  headingId,
  metrics,
  media,
  footnote,
}: EvidenceShorelineProps) {
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

        <div className={cn("grid gap-8", media ? "lg:grid-cols-12" : "")}>
          {/* Metrics */}
          <div className={cn(media ? "lg:col-span-8" : "")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-mist-deep rounded-none overflow-hidden">
              {metrics}
            </div>
          </div>

          {/* Optional media */}
          {media && (
            <div className="lg:col-span-4">
              <div className="relative aspect-video overflow-hidden rounded-none">
                {media}
              </div>
            </div>
          )}
        </div>

        {/* Methodology footnote */}
        {footnote && (
          <div className="mt-6 text-(length:--text-caption) text-stone">
            {footnote}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
