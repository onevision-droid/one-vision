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
          "bg-surface border border-border-default p-6 rounded-md flex flex-col md:flex-row gap-6 items-start md:items-center justify-between",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <ShieldCheckIcon className="h-8 w-8 text-action-primary shrink-0" />
          <div>
            <h4 className="font-sans font-semibold text-body-sm text-ink-900">
              Registered NGO · {siteSettings.registrationNumber}
            </h4>
            <p className="font-sans text-caption text-ink-500">
              Incorporated under {siteSettings.registrationBody} · 80G Tax Compliant
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-body-sm font-medium">
          <Link
            href="/about/governance"
            className="text-action-primary hover:text-action-hover underline underline-offset-4"
          >
            Governance
          </Link>
          <span className="text-border-default">·</span>
          <Link
            href="/reports"
            className="text-action-primary hover:text-action-hover underline underline-offset-4"
          >
            Annual Report
          </Link>
          <span className="text-border-default">·</span>
          <Link
            href="/about/governance#safeguarding"
            className="text-action-primary hover:text-action-hover underline underline-offset-4"
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
        "bg-surface border border-border-default p-8 rounded-md grid grid-cols-1 md:grid-cols-3 gap-8",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <ShieldCheckIcon className="h-8 w-8 text-action-primary shrink-0" />
        <h4 className="font-sans font-semibold text-heading-md text-ink-900">
          Registered Entity
        </h4>
        <p className="font-sans text-body-sm text-ink-500 leading-relaxed">
          Recognised non-profit under the {siteSettings.registrationBody} (Reg No: {siteSettings.registrationNumber}). Eligible for 80G tax deductions in India.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <BuildingIcon className="h-8 w-8 text-action-primary shrink-0" />
        <h4 className="font-sans font-semibold text-heading-md text-ink-900">
          Local Governance
        </h4>
        <p className="font-sans text-body-sm text-ink-500 leading-relaxed">
          Governed by local civil society leaders based in Imphal, Manipur. Zero-tolerance safeguarding policies strictly enforced across all operations.
        </p>
        <div className="flex items-center gap-3 mt-auto pt-2">
          <Link
            href="/about/governance"
            className="text-body-sm font-medium text-action-primary hover:text-action-hover underline underline-offset-4"
          >
            Governance & Board
          </Link>
          <span className="text-border-default">·</span>
          <Link
            href="/about/governance#safeguarding"
            className="text-body-sm font-medium text-action-primary hover:text-action-hover underline underline-offset-4"
          >
            Safeguarding
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FileTextIcon className="h-8 w-8 text-action-primary shrink-0" />
        <h4 className="font-sans font-semibold text-heading-md text-ink-900">
          Financial Audits
        </h4>
        <p className="font-sans text-body-sm text-ink-500 leading-relaxed">
          We maintain an open ledger and publish verified annual financial audits and outcome metrics for complete public accountability.
        </p>
        <Link
          href="/reports"
          className="text-body-sm font-medium text-action-primary hover:text-action-hover underline underline-offset-4 mt-auto pt-2"
        >
          Read Latest Annual Report
        </Link>
      </div>
    </div>
  );
}
