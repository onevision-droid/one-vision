import * as React from "react";
import { Users, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  bars?: number[];
  className?: string;
}

export function MetricCard({
  value,
  label,
  icon: Icon = Users,
  bars = [25, 40, 55, 70, 85, 100, 60],
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-none bg-card border border-border p-6 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <div>
        <div className="size-11 rounded-none bg-primary-light flex items-center justify-center text-primary mb-5">
          <Icon className="size-5 text-primary" aria-hidden="true" />
        </div>

        <div className="space-y-1">
          <div className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </div>
          <div className="font-sans text-sm text-muted-foreground font-normal">
            {label}
          </div>
        </div>
      </div>

      {/* Nordic Soft Lavender/Indigo Bar Graphic */}
      <div className="mt-8 pt-4 border-t border-border/40 flex items-end gap-1.5 h-12" aria-hidden="true">
        {bars.map((heightPercent, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-none bg-primary/20 hover:bg-primary/40 transition-colors duration-200"
            style={{ height: `${Math.max(15, Math.min(100, heightPercent))}%` }}
          />
        ))}
      </div>
    </div>
  );
}
