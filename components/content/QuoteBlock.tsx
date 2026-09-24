import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  quote: string;
  attribution: string;
  role?: string;
  className?: string;
}

export function QuoteBlock({ quote, attribution, role, className }: QuoteBlockProps) {
  return (
    <figure className={cn("pl-6 md:pl-10 border-l-4 border-terra py-2 my-12", className)}>
      <blockquote className="font-fraunces text-2xl md:text-3xl text-ink leading-snug font-light mb-6">
        &quot;{quote}&quot;
      </blockquote>
      <figcaption className="font-inter">
        <span className="block font-semibold text-ink text-sm uppercase tracking-widest">{attribution}</span>
        {role && <span className="block text-ink/60 text-sm mt-1">{role}</span>}
      </figcaption>
    </figure>
  );
}
