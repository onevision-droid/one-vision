import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Shell";
import { SectionWrapper, type CompositionProps } from "./shared";

interface SplitNarrativeProps extends CompositionProps {
  content: React.ReactNode;
  media: React.ReactNode;
  heading?: React.ReactNode;
  headingId?: string;
}

export function SplitNarrative({
  surface = "paper",
  reversed = false,
  className,
  content,
  media,
  heading,
  headingId,
}: SplitNarrativeProps) {
  return (
    <SectionWrapper
      surface={surface}
      aria-labelledby={headingId}
      className={className}
    >
      <Container className="px-0 md:px-0">
        {heading && (
          <div className="border-b lg:border-x border-border-default px-6 py-4 md:px-8 md:py-5 bg-surface">
            <div className="flex items-center gap-3">
              <span className="size-1.5 bg-safety-orange shrink-0" />
              <h2
                id={headingId}
                className="font-mono text-[11px] uppercase tracking-widest text-ink-500 font-bold"
              >
                {heading}
              </h2>
            </div>
          </div>
        )}

        <div
          className={cn(
            "grid lg:grid-cols-12 overflow-hidden border-b lg:border-x border-border-default bg-paper",
            reversed ? "lg:[direction:rtl] lg:*:[direction:ltr]" : "",
          )}
        >
          {/* Content: 6 columns — 50% */}
          <div className="lg:col-span-6 p-6 md:p-10 lg:p-12 lg:border-r border-border-default flex flex-col justify-center">
            <div
              className={cn(
                "space-y-6",
                "font-sans leading-relaxed text-ink-900",
              )}
            >
              {content}
            </div>
          </div>

          {/* Media: 6 columns — 50% */}
          <div className="lg:col-span-6 relative bg-ink-900 border-t lg:border-t-0 border-border-default">
            <div className="relative h-full min-h-75 lg:min-h-85 w-full overflow-hidden [&>img]:grayscale [&>img]:hover:grayscale-0 [&>img]:transition-all [&>img]:duration-700">
              {media}
              {/* Brutalist overlay */}
              <div className="absolute inset-0 bg-ink-900/10 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
