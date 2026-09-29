import { Section, Container } from"@/components/layout/Shell";
import { cn } from"@/lib/utils";

interface QuietCloseProps {
  label?: string;
  heading: string;
  description?: string;
  action?: React.ReactNode;
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
    <Section tone="default" className={cn("py-8 lg:py-14 bg-muted", className)}>
      <Container className="max-w-4xl px-0 md:px-0">
        <div className="p-8 md:p-12 lg:p-14 border border-border bg-foreground text-background flex flex-col items-center text-center">
          {label && (
            <div className="flex items-center gap-3 mb-6">
              <span className="size-1.5 bg-destructive shrink-0" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-background/80">
                {label}
              </div>
            </div>
          )}

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-background leading-[0.98] tracking-tight">
            {heading}
          </h2>

          {description && (
            <p className="font-sans text-lg text-background/70 mt-6 max-w-xl text-balance leading-relaxed font-light">
              {description}
            </p>
          )}

          {action && <div className="mt-8">{action}</div>}
        </div>
      </Container>
    </Section>
  );
}
