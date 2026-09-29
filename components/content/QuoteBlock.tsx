import { cn } from"@/lib/utils";
import { Quote } from"lucide-react";

interface QuoteBlockProps {
 quote: string;
 attribution: string;
 role?: string;
 className?: string;
}

export function QuoteBlock({ quote, attribution, role, className }: QuoteBlockProps) {
 return (
  <div className={cn("space-y-4 border-l border-action-primary bg-destructive/5 p-6 md:p-8 my-12", className)}>
  <figure className="flex items-start gap-4 md:gap-6">
  <Quote className="mt-1 h-8 w-8 shrink-0 text-destructive opacity-60" />
 <div className="flex flex-col">
 <blockquote className="font-sans text-heading-md md:text-heading-lg text-foreground leading-snug font-light mb-6">
 &quot;{quote}&quot;
 </blockquote>
 <figcaption className="font-sans">
 <span className="block font-semibold text-foreground text-sm uppercase tracking-widest">{attribution}</span>
 {role && <span className="block text-muted-foreground text-sm mt-1">{role}</span>}
 </figcaption>
 </div>
 </figure>
 </div>
 );
}
