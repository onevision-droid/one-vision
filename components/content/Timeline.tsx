import { cn } from "@/lib/utils";

export interface TimelineItem {
 year: string;
 title: string;
 description: string;
 status?: "completed" | "active" | "upcoming";
 tag?: string;
}

export interface TimelineProps {
 heading?: string;
 subheading?: string;
 items: TimelineItem[];
 className?: string;
}

export function Timeline({
 heading,
 subheading,
 items,
 className,
}: TimelineProps) {
 return (
 <div className={cn("w-full space-y-10", className)}>
 {(heading || subheading) && (
 <div className="space-y-3 max-w-2xl">
 {heading && (
 <h2 className="font-sans text-display-md font-light tracking-tight text-ink-900">
 {heading}
 </h2>
 )}
 {subheading && (
 <p className="font-sans text-body-lg max-w-prose text-ink-500 font-light leading-relaxed">
 {subheading}
 </p>
 )}
 </div>
 )}

 <ol role="list" className="relative border-l border-border-default ml-3 sm:ml-4 space-y-12 sm:space-y-16">
 {items.map((item, index) => {
 const isCompleted = item.status === "completed" || (!item.status && index < items.length - 1);
 const isActive = item.status === "active";
 const isUpcoming = item.status === "upcoming";

 return (
 <li
 key={`${item.year}-${index}`}
 className="relative pl-8 sm:pl-10 group"
 >
 {/* Timeline marker dot: filled for completed, active glow for active, hollow for upcoming */}
 <div
 aria-hidden="true"
 className={cn(
 "absolute -left-1.75 top-1.5 size-3.5 transition-transform duration-200 group-hover:scale-125",
 isCompleted && "bg-ink-900 border-2 border-surface",
 isActive && "bg-action-primary ring-4 ring-action-primary/20 border-2 border-surface",
 isUpcoming && "bg-surface border-2 border-ink-400"
 )}
 />

 <div className="flex flex-col space-y-2">
 <div className="flex flex-wrap items-center gap-3">
 <span className="font-sans text-caption uppercase tracking-wider font-semibold text-action-primary bg-action-primary/8 px-2 py-0.5 ">
 {item.year}
 </span>
 {item.tag && (
 <span className="font-sans text-caption uppercase tracking-wider text-ink-400">
 {item.tag}
 </span>
 )}
 {isActive && (
 <span className="inline-flex items-center gap-1.5 text-caption font-medium text-action-primary">
 <span className="size-1.5 bg-action-primary animate-pulse" />
 Active Phase
 </span>
 )}
 </div>

 <h3 className="font-sans text-heading-md font-medium text-ink-900 leading-snug">
 {item.title}
 </h3>

 <p className="font-sans text-body-sm text-ink-500 font-light leading-relaxed max-w-2xl">
 {item.description}
 </p>
 </div>
 </li>
 );
 })}
 </ol>
 </div>
 );
}