import { cn } from "@/lib/utils";
import { SectionWrapper, isDarkSurface, type CompositionProps } from "./shared";

/**
 * Ledger — Editorial list rows with hairline dividers.
 * No card grid. Title / meta / action per row.
 * Doc 02 §9 pattern #6.
 */
interface LedgerProps extends CompositionProps {
  /** Optional heading */
  heading?: React.ReactNode;
  /** Heading ID for aria-labelledby */
  headingId?: string;
  /** Optional action link in the heading area */
  headerAction?: React.ReactNode;
}

export function Ledger({
  surface = "paper",
  className,
  children,
  heading,
  headingId,
  headerAction,
}: LedgerProps) {
  const dark = isDarkSurface(surface);

  return (
    <SectionWrapper
      surface={surface}
      aria-labelledby={headingId}
      className={className}
    >
      <div className="container-wide">
        {(heading || headerAction) && (
          <div
            className={cn(
              "flex flex-col md:flex-row justify-between items-start md:items-end gap-4",
              "border-b pb-8 mb-10 lg:mb-14",
              dark ? "border-teal-soft/20" : "border-ink/10"
            )}
          >
            {heading && (
              <h2
                id={headingId}
                className={cn(
                  "font-display font-light tracking-tight",
                  "text-(length:--text-h2)"
                )}
              >
                {heading}
              </h2>
            )}
            {headerAction && (
              <div className="shrink-0">{headerAction}</div>
            )}
          </div>
        )}

        {/* Ledger rows rendered as children */}
        <div
          className={cn(
            "divide-y",
            dark ? "divide-teal-soft/20" : "divide-ink/10"
          )}
        >
          {children}
        </div>
      </div>
    </SectionWrapper>
  );
}

/**
 * Individual Ledger row.
 * Renders title, meta info, and an optional action.
 */
interface LedgerRowProps {
  /** Row number (e.g., "01") for numbered ledgers */
  number?: string;
  /** Primary title */
  title: React.ReactNode;
  /** Meta information (status, location, date, etc.) */
  meta?: React.ReactNode;
  /** Optional action element (link, button) */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional chip/badge (e.g., status) */
  chip?: React.ReactNode;
}

export function LedgerRow({
  number,
  title,
  meta,
  action,
  className,
  chip,
}: LedgerRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center gap-3 md:gap-6",
        "py-5 lg:py-6",
        "group",
        className
      )}
    >
      {number && (
        <span className="text-(length:--text-caption) tabular-nums text-stone font-sans shrink-0 w-8">
          {number}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          {chip}
          <span className="font-display font-light text-(length:--text-h3) tracking-tight truncate">
            {title}
          </span>
        </div>
        {meta && (
          <div className="text-(length:--text-small) text-stone leading-relaxed">
            {meta}
          </div>
        )}
      </div>
      {action && (
        <div className="shrink-0 md:ml-auto">{action}</div>
      )}
    </div>
  );
}
