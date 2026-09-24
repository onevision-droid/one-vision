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
    <section className={cn("bg-white @container py-24 md:py-32", className)}>
      <div className="mx-auto max-w-4xl px-6">
        <Card className="p-8 md:p-16 border-ink/10 bg-paper shadow-sm flex flex-col items-center text-center">
          {label && (
            <div className="text-ink/60 mb-6 text-sm font-medium uppercase tracking-widest">
              {label}
            </div>
          )}
          
          <h2 className="text-balance font-fraunces text-3xl md:text-5xl font-light text-ink leading-[1.15]">
            {heading}
          </h2>
          
          {description && (
            <p className="text-ink/70 mt-6 max-w-xl text-balance text-lg font-light leading-relaxed">
              {description}
            </p>
          )}
          
          {action && <div className="mt-10">{action}</div>}
        </Card>
      </div>
    </section>
  );
}
