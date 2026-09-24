import { cn } from "@/lib/utils";
import { ShieldCheckIcon, BuildingIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";

interface TrustPanelProps {
  variant?: "compact" | "full";
  className?: string;
}

export function TrustPanel({ variant = "full", className }: TrustPanelProps) {
  if (variant === "compact") {
    return (
      <div className={cn("bg-mist p-6 rounded-none flex flex-col md:flex-row gap-6 items-center justify-between", className)}>
        <div className="flex items-center gap-4">
          <ShieldCheckIcon className="h-8 w-8 text-forest" />
          <div>
            <h4 className="font-fraunces font-bold text-ink">Registered NGO</h4>
            <p className="font-inter text-sm text-ink/70">80G compliant for tax exemptions</p>
          </div>
        </div>
        <Link href="/about/governance" className="text-sm font-medium text-forest hover:text-pine underline underline-offset-4">
          View full governance details
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("bg-mist p-8 rounded-none grid grid-cols-1 md:grid-cols-3 gap-8", className)}>
      <div className="flex flex-col gap-3">
        <ShieldCheckIcon className="h-8 w-8 text-forest" />
        <h4 className="font-fraunces font-bold text-lg text-ink">Registered Entity</h4>
        <p className="font-inter text-sm text-ink/80">
          Recognised NGO under Section 8 of the Companies Act. Registered for 80G tax exemptions in India.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <BuildingIcon className="h-8 w-8 text-forest" />
        <h4 className="font-fraunces font-bold text-lg text-ink">Local Governance</h4>
        <p className="font-inter text-sm text-ink/80">
          Governed by a board of local community leaders and experts based in Imphal, Manipur.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <FileTextIcon className="h-8 w-8 text-forest" />
        <h4 className="font-fraunces font-bold text-lg text-ink">Financial Audits</h4>
        <p className="font-inter text-sm text-ink/80">
          We publish our annual financial reports and impact metrics for full public transparency.
        </p>
        <Link href="/reports" className="text-sm font-medium text-forest hover:text-pine underline underline-offset-4 mt-2">
          Read Annual Reports
        </Link>
      </div>
    </div>
  );
}
