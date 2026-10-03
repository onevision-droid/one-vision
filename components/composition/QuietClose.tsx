import { Section, Container } from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

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
    <Section tone="default" className={cn("bg-muted", className)}>
      <Container className="max-w-4xl">
        <div className="p-8 md:p-10 lg:p-12 border border-border bg-card text-foreground flex flex-col items-center text-center rounded-none shadow-xs">
          {label && (
            <div className="flex items-center gap-3 mb-5">
              <span className="size-1.5 bg-primary shrink-0" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          )}

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight tracking-tight">
            {heading}
          </h2>

          {description && (
            <p className="font-sans text-base sm:text-lg text-muted-foreground mt-4 max-w-xl text-balance leading-relaxed font-light">
              {description}
            </p>
          )}

          {action && <div className="mt-8">{action}</div>}
        </div>
      </Container>
    </Section>
  );
}
