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
 * Section wrapper enforcing Nordic Lagom vertical rhythm: py-12 md:py-16 lg:py-20.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ tone = "default", className, children, ...props }, ref) => {
    const toneClasses = {
      default: "bg-background text-foreground",
      alt: "bg-muted text-foreground",
      inverted: "bg-foreground text-background",
    };

    return (
      <section
        ref={ref}
        data-tone={tone}
        className={cn(
          "py-12 md:py-16 lg:py-20",
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
          "mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8",
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
