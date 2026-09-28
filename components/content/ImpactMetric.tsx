"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface ImpactMetricProps {
 value: number;
 prefix?: string;
 suffix?: string;
 label: string;
 date: string;
 methodology?: string;
}

export function ImpactMetric({ value, prefix = "", suffix = "", label, date, methodology }: ImpactMetricProps) {
 return (
 <div className="flex flex-col items-center justify-center text-center p-8 border-b md:border-b-0 md:border-r border-ink/10 last:border-0 relative">
 <div className="flex items-center gap-2 mb-6">
 <span className="font-sans text-heading-xl md:text-display-md font-light text-ink-900 tabular-nums">
 {prefix}<NumberTicker value={value} className="text-ink-900 tracking-normal dark:text-ink-900" />{suffix}
 </span>
 </div>
 <h4 className="font-sans text-sm uppercase tracking-widest text-ink-700 mb-2 flex items-center justify-center gap-2">
 {label}
 {methodology && (
 <TooltipProvider delay={300}>
 <Tooltip>
 <TooltipTrigger className="text-ink-500 hover:text-ink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 cursor-help">
 <InfoIcon className="h-4 w-4" />
 <span className="sr-only">Methodology details</span>
 </TooltipTrigger>
 <TooltipContent side="top" align="center" className="max-w-62.5 bg-ink-900 text-paper p-3 text-xs leading-relaxed font-sans z-50">
 <p>{methodology}</p>
 </TooltipContent>
 </Tooltip>
 </TooltipProvider>
 )}
 </h4>
 <span className="font-sans text-[10px] uppercase tracking-widest text-ink-500">{date}</span>
 </div>
 );
}
