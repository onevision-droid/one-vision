import { cn } from "@/lib/utils";
import type { Surface } from "@/lib/tokens";

/**
 * Shared props for all composition pattern components.
 * Every page is a sequence of these patterns (doc 02 §9).
 */
export interface CompositionProps {
  /** Surface colour for the section background */
  surface?: Surface;
  /** Reverse text/media layout on desktop */
  reversed?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Section content */
  children?: React.ReactNode;
  /** ID for aria-labelledby (auto-generated from heading if provided) */
  id?: string;
}

/** Map surface token to Tailwind background class */
export const surfaceBgClass: Record<Surface, string> = {
  paper: "bg-paper",
  mist: "bg-mist",
  sand: "bg-sand",
  forest: "bg-forest",
  ink: "bg-ink",
};

/** Map surface to text colour class */
export const surfaceTextClass: Record<Surface, string> = {
  paper: "text-ink",
  mist: "text-ink",
  sand: "text-ink",
  forest: "text-mist",
  ink: "text-mist",
};

/** Whether surface is a dark field */
export function isDarkSurface(surface: Surface): boolean {
  return surface === "forest" || surface === "ink";
}

/** Base section wrapper with consistent rhythm, surface, and semantics */
export function SectionWrapper({
  surface = "paper",
  className,
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
}: CompositionProps & { "aria-labelledby"?: string }) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "section-rhythm",
        surfaceBgClass[surface],
        surfaceTextClass[surface],
        className
      )}
    >
      {children}
    </section>
  );
}
