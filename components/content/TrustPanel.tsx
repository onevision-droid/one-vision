import { cn } from "@/lib/utils";
import { ShieldCheckIcon, BuildingIcon, FileTextIcon } from "lucide-react";
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
          "bg-surface border border-border-default flex flex-col md:flex-row gap-0 items-stretch justify-between",
          className
        )}
      >
        <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-border-default grow">
          <ShieldCheckIcon className="h-6 w-6 text-safety-orange shrink-0" />
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 mb-1">
              Registered NGO · {siteSettings.registrationNumber}
            </h4>
            <p className="font-sans text-role-body-sm text-ink-500">
              Incorporated under {siteSettings.registrationBody} · 80G Tax Compliant
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-0 text-body-sm font-medium">
          <Link
            href="/about/governance"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 hover:bg-ink-900 hover:text-paper transition-colors border-r border-border-default"
          >
            Governance
          </Link>
          <Link
            href="/reports"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 hover:bg-ink-900 hover:text-paper transition-colors border-r border-border-default"
          >
            Annual Report
          </Link>
          <Link
            href="/about/governance#safeguarding"
            className="p-6 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 hover:bg-ink-900 hover:text-paper transition-colors"
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
        "bg-surface border-t border-l border-border-default grid grid-cols-1 md:grid-cols-3 gap-0 *:border-b *:border-r *:border-border-default",
        className
      )}
    >
      <div className="flex flex-col p-8 md:p-12 hover:bg-ink-900 group transition-colors duration-500">
        <ShieldCheckIcon className="h-8 w-8 text-safety-orange shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-ink-900 group-hover:text-paper transition-colors mb-4">
          Registered Entity
        </h4>
        <p className="font-sans text-role-body text-ink-500 leading-relaxed group-hover:text-paper/70 transition-colors">
          Recognised non-profit under the {siteSettings.registrationBody} (Reg No: {siteSettings.registrationNumber}). Eligible for 80G tax deductions in India.
        </p>
      </div>

      <div className="flex flex-col p-8 md:p-12 hover:bg-ink-900 group transition-colors duration-500">
        <BuildingIcon className="h-8 w-8 text-safety-orange shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-ink-900 group-hover:text-paper transition-colors mb-4">
          Local Governance
        </h4>
        <p className="font-sans text-role-body text-ink-500 leading-relaxed group-hover:text-paper/70 transition-colors mb-8">
          Governed by local civil society leaders based in Imphal, Manipur. Zero-tolerance safeguarding policies strictly enforced across all operations.
        </p>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border-default/50">
          <Link
            href="/about/governance"
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 group-hover:text-safety-orange transition-colors"
          >
            Governance & Board
          </Link>
          <span className="text-border-default group-hover:text-border-default/20">·</span>
          <Link
            href="/about/governance#safeguarding"
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 group-hover:text-safety-orange transition-colors"
          >
            Safeguarding
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-8 md:p-12 hover:bg-ink-900 group transition-colors duration-500">
        <FileTextIcon className="h-8 w-8 text-safety-orange shrink-0 mb-8" />
        <h4 className="font-serif text-3xl font-light text-ink-900 group-hover:text-paper transition-colors mb-4">
          Financial Audits
        </h4>
        <p className="font-sans text-role-body text-ink-500 leading-relaxed group-hover:text-paper/70 transition-colors mb-8">
          We maintain an open ledger and publish verified annual financial audits and outcome metrics for complete public accountability.
        </p>
        <Link
          href="/reports"
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 group-hover:text-safety-orange transition-colors mt-auto pt-4 border-t border-border-default/50"
        >
          Read Latest Annual Report
        </Link>
      </div>
    </div>
  );
}
