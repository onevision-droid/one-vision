import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "default" | "alt" | "inverted";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The semantic tone of the section, determining background and text colors.
   * @default "default"
   */
  tone?: SectionTone;
}

/**
 * Section wrapper enforcing the strict padding rules: 96px desktop / 64px mobile.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ tone = "default", className, children, ...props }, ref) => {
    const toneClasses = {
      default: "bg-paper text-ink-700",
      alt: "bg-section-alt text-ink-700",
      inverted: "bg-ink-900 text-paper",
    };

    return (
      <section
        ref={ref}
        data-tone={tone}
        className={cn(
          "py-8 md:py-9", // 64px mobile, 96px desktop
          toneClasses[tone],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Container enforcing max-width of 1200px and strict gutter rules: 24px (32px >= xl).
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-5 xl:px-6", // 24px default, 32px >= xl
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";
