import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmergencyBannerProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmergencyBanner({ title, description, actionLabel, actionHref, className }: EmergencyBannerProps) {
  return (
    <div className={cn("bg-terra text-white px-4 py-3 md:py-4 w-full", className)}>
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <AlertTriangleIcon className="h-5 w-5 shrink-0 mt-0.5 md:mt-0" />
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span className="font-bold font-fraunces text-sm md:text-base tracking-wide">{title}</span>
            <span className="hidden md:inline text-white/60 text-xs">|</span>
            <span className="text-sm font-inter">{description}</span>
          </div>
        </div>
        
        {actionLabel && actionHref && (
          <Link 
            href={actionHref}
            className="shrink-0 bg-white text-terra hover:bg-mist px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
