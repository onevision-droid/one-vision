import { Section } from "@/components/layout/Shell";
import type { SectionTone } from "@/components/layout/Shell";

export type Surface =
  "paper" | "white" | "ink" | "forest" | "mist" | "sand" | "transparent";

export interface CompositionProps {
  surface?: Surface;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  reversed?: boolean;
}

/**
 * Maps legacy `Surface` to new `SectionTone`.
 */
export function isDarkSurface(surface: Surface | string): boolean {
  return surface === "forest" || surface === "ink";
}

/**
 * Legacy wrapper exported for backwards compatibility.
 * Use `<Section>` and `<Container>` from `@/components/layout/Shell` directly in new code.
 */
export function SectionWrapper({
  surface = "paper",
  className,
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
}: CompositionProps & { "aria-labelledby"?: string }) {
  // Map old surfaces to new tones
  let tone: SectionTone = "default";
  if (surface === "ink" || surface === "forest") tone = "inverted";
  if (surface === "mist" || surface === "sand") tone = "alt";

  return (
    <Section
      id={id}
      tone={tone}
      aria-labelledby={ariaLabelledBy}
      className={className}
    >
      {children}
    </Section>
  );
}
