import { cn } from "@/lib/utils";
import { ShieldCheckIcon, BuildingIcon, FileTextIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";

interface TrustPanelProps {
  variant?: "compact" | "full";
  className?: string;
}

export function TrustPanel({ variant = "full", className }: TrustPanelProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "bg-card border border-border flex flex-col md:flex-row gap-0 items-stretch justify-between rounded-none overflow-hidden",
          className
        )}
      >
        <div className="flex items-center gap-4 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-border grow">
          <ShieldCheckIcon className="size-6 text-primary shrink-0" aria-hidden="true" />
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-foreground mb-0.5">
              Registered NGO · {siteSettings.registrationNumber}
            </h4>
            <p className="font-sans text-xs text-muted-foreground font-light">
              Incorporated under {siteSettings.registrationBody} · 80G Tax Compliant
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-0 text-xs font-sans font-medium">
          <Link
            href="/about/governance"
            className="px-4 sm:px-5 min-h-11 text-muted-foreground hover:text-foreground transition-colors border-r border-border inline-flex items-center"
          >
            Governance
          </Link>
          <Link
            href="/reports"
            className="px-4 sm:px-5 min-h-11 text-muted-foreground hover:text-foreground transition-colors border-r border-border inline-flex items-center"
          >
            Annual Report
          </Link>
          <Link
            href="/about/governance#safeguarding"
            className="px-4 sm:px-5 min-h-11 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
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
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      <div className="flex flex-col p-6 sm:p-8 bg-card border border-border hover:border-primary/40 rounded-none transition-all duration-300">
        <div className="size-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <ShieldCheckIcon className="size-5 text-primary shrink-0" aria-hidden="true" />
        </div>
        <h4 className="font-serif text-2xl font-light text-foreground mb-3 leading-snug">
          Registered Entity
        </h4>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-1">
          Recognised non-profit under the {siteSettings.registrationBody} (Reg No: {siteSettings.registrationNumber}). Eligible for 80G tax deductions in India.
        </p>
        <div className="pt-4 border-t border-border/60">
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            12A & 80G Certified
          </span>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8 bg-card border border-border hover:border-primary/40 rounded-none transition-all duration-300">
        <div className="size-10 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
          <BuildingIcon className="size-5 text-accent shrink-0" aria-hidden="true" />
        </div>
        <h4 className="font-serif text-2xl font-light text-foreground mb-3 leading-snug">
          Local Governance
        </h4>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-1">
          Governed by local civil society leaders based in Imphal, Manipur. Zero-tolerance safeguarding policies strictly enforced across all operations.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60 font-sans text-xs">
          <Link
            href="/about/governance"
            className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 py-2 min-h-9"
          >
            <span>Governance</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Link
            href="/about/governance#safeguarding"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center py-2 min-h-9"
          >
            Safeguarding
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8 bg-card border border-border hover:border-primary/40 rounded-none transition-all duration-300">
        <div className="size-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <FileTextIcon className="size-5 text-primary shrink-0" aria-hidden="true" />
        </div>
        <h4 className="font-serif text-2xl font-light text-foreground mb-3 leading-snug">
          Financial Audits
        </h4>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-1">
          We maintain an open ledger and publish verified annual financial audits and outcome metrics for complete public accountability.
        </p>
        <div className="pt-4 border-t border-border/60 font-sans text-xs">
          <Link
            href="/reports"
            className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 py-2 min-h-9"
          >
            <span>Read Annual Report</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
