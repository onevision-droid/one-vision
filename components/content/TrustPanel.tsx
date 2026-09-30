import { cn } from"@/lib/utils";
import { ShieldCheckIcon, BuildingIcon, FileTextIcon } from"lucide-react";
import Link from"next/link";
import { siteSettings } from"@/lib/data/site-settings";

interface TrustPanelProps {
  variant?:"compact" |"full";
  className?: string;
}

export function TrustPanel({ variant ="full", className }: TrustPanelProps) {
  if (variant ==="compact") {
    return (
      <div
        className={cn(
         "bg-muted border border-border flex flex-col md:flex-row gap-0 items-stretch justify-between",
          className
        )}
      >
        <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-border grow">
          <ShieldCheckIcon className="h-6 w-6 text-destructive shrink-0" />
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground mb-1">
              Registered NGO · {siteSettings.registrationNumber}
            </h4>
            <p className="font-sans text-base-sm text-muted-foreground">
              Incorporated under {siteSettings.registrationBody} · 80G Tax Compliant
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-0 text-body-sm font-medium">
          <Link
            href="/about/governance"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors border-r border-border"
          >
            Governance
          </Link>
          <Link
            href="/reports"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors border-r border-border"
          >
            Annual Report
          </Link>
          <Link
            href="/about/governance#safeguarding"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Safeguarding
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
       "bg-muted border-t border-l border-border grid grid-cols-1 md:grid-cols-3 gap-0 *:border-b *:border-r *:border-border",
        className
      )}
    >
      <div className="flex flex-col p-8 md:p-12 hover:bg-foreground group transition-colors duration-500">
        <ShieldCheckIcon className="h-8 w-8 text-destructive shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-foreground group-hover:text-background transition-colors mb-4">
          Registered Entity
        </h4>
        <p className="font-sans text-base text-muted-foreground leading-relaxed group-hover:text-background/70 transition-colors">
          Recognised non-profit under the {siteSettings.registrationBody} (Reg No: {siteSettings.registrationNumber}). Eligible for 80G tax deductions in India.
        </p>
      </div>

      <div className="flex flex-col p-8 md:p-12 hover:bg-foreground group transition-colors duration-500">
        <BuildingIcon className="h-8 w-8 text-destructive shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-foreground group-hover:text-background transition-colors mb-4">
          Local Governance
        </h4>
        <p className="font-sans text-base text-muted-foreground leading-relaxed group-hover:text-background/70 transition-colors mb-8">
          Governed by local civil society leaders based in Imphal, Manipur. Zero-tolerance safeguarding policies strictly enforced across all operations.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-border/50">
          <Link
            href="/about/governance"
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors min-h-10 inline-flex items-center"
          >
            Governance & Board
          </Link>
          <span className="text-muted-foreground group-hover:text-muted-foreground">·</span>
          <Link
            href="/about/governance#safeguarding"
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors min-h-10 inline-flex items-center"
          >
            Safeguarding
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-8 md:p-12 hover:bg-foreground group transition-colors duration-500">
        <FileTextIcon className="h-8 w-8 text-destructive shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-foreground group-hover:text-background transition-colors mb-4">
          Financial Audits
        </h4>
        <p className="font-sans text-base text-muted-foreground leading-relaxed group-hover:text-background/70 transition-colors mb-8">
          We maintain an open ledger and publish verified annual financial audits and outcome metrics for complete public accountability.
        </p>
        <Link
          href="/reports"
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors mt-auto pt-4 border-t border-border/50 min-h-10 inline-flex items-center"
        >
          Read Latest Annual Report
        </Link>
      </div>
    </div>
  );
}
