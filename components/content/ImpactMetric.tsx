"use client";

import { useCountUp } from "@/lib/hooks/useCountUp";
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
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center p-8 border-b md:border-b-0 md:border-r border-ink/10 last:border-0 relative">
      <div className="flex items-center gap-2 mb-6">
        <span className="font-fraunces text-4xl md:text-5xl font-light text-ink tabular-nums">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>
      <h4 className="font-inter text-sm uppercase tracking-widest text-ink/70 mb-2 flex items-center justify-center gap-2">
        {label}
        {methodology && (
          <TooltipProvider delay={300}>
            <Tooltip>
              <TooltipTrigger className="text-ink/40 hover:text-ink/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 rounded-none cursor-help">
                <InfoIcon className="h-4 w-4" />
                <span className="sr-only">Methodology details</span>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="max-w-62.5 bg-ink text-paper p-3 text-xs leading-relaxed font-sans z-50">
                <p>{methodology}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </h4>
      <span className="font-inter text-[10px] uppercase tracking-widest text-ink/40">{date}</span>
    </div>
  );
}
