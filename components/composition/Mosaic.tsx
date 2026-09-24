import { cn } from "@/lib/utils";
import { SectionWrapper, type CompositionProps } from "./shared";

/**
 * Mosaic — 1×(4:5) lead + 3 satellites, asymmetric on 12-col grid.
 * Doc 02 §9 pattern #3.
 */
interface MosaicProps extends CompositionProps {
  /** The large lead image/content (4:5 ratio) */
  lead: React.ReactNode;
  /** Up to 3 satellite images/content (1:1 or 3:2) */
  satellites?: React.ReactNode[];
  /** Optional heading */
  heading?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
  /** Optional supporting content (quote, text) shown alongside */
  support?: React.ReactNode;
}

export function Mosaic({
  surface = "paper",
  reversed = false,
  className,
  lead,
  satellites = [],
  heading,
  headingId,
  support,
}: MosaicProps) {
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
            "grid gap-6 lg:gap-8",
            "lg:grid-cols-12",
            reversed && "lg:[direction:rtl] lg:*:[direction:ltr]"
          )}
        >
          {/* Lead image: spans 7 columns */}
          <div className="lg:col-span-7">
            <div className="aspect-4/5 relative overflow-hidden rounded-none">
              {lead}
            </div>
          </div>

          {/* Satellites + support: span 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {support && <div>{support}</div>}
            {satellites.map((satellite, i) => (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-none",
                  i === 0 ? "aspect-square" : "aspect-3/2"
                )}
              >
                {satellite}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
