import { Section, Container } from "@/components/layout/Shell";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuietCloseProps {
  /** Small kicker text above the heading */
  label?: string;
  /** Main statement/heading */
  heading: string;
  /** Secondary explanatory text */
  description?: string;
  /** Action button or links */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function QuietClose({
  label,
  heading,
  description,
  action,
  className,
}: QuietCloseProps) {
  return (
    <Section tone="default" className={cn("@container", className)}>
      <Container className="max-w-4xl">
        <Card className="p-8 md:p-16 border-border-default bg-surface shadow-none rounded-md flex flex-col items-center text-center">
          {label && (
            <div className="text-label text-ink-500 mb-6 font-semibold uppercase tracking-widest">
              {label}
            </div>
          )}

          <h2 className="text-balance font-sans text-heading-xl md:text-display-md font-medium text-ink-900 leading-[1.15]">
            {heading}
          </h2>

          {description && (
            <p className="text-ink-500 mt-6 max-w-xl text-balance text-body-lg font-light leading-relaxed">
              {description}
            </p>
          )}

          {action && <div className="mt-10">{action}</div>}
        </Card>
      </Container>
    </Section>
  );
}
