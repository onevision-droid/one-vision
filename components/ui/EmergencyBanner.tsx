"use client";

import { useState, useSyncExternalStore } from"react";
import { AlertTriangleIcon, X } from"lucide-react";
import Link from"next/link";
import { cn } from"@/lib/utils";

interface EmergencyBannerProps {
 title?: string;
 description?: string;
 actionLabel?: string;
 actionHref?: string;
 dismissible?: boolean;
 className?: string;
}

export function EmergencyBanner({
 title ="Immediate Crisis & Emergency Guidance",
 description ="One Vision provides community aid and relief logistics, not first-response emergency dispatch. For life-threatening emergencies, call official services immediately.",
 actionLabel,
 actionHref,
 dismissible = true,
 className,
}: EmergencyBannerProps) {
 // useSyncExternalStore: server snapshot = false (banner visible),
 // client snapshot reads sessionStorage. React reconciles cleanly with no
 // hydration mismatch and no setState-in-effect lint violation.
 const storedDismissed = useSyncExternalStore(
 () => () => {}, // sessionStorage has no push updates — no-op subscribe
 () => dismissible && sessionStorage.getItem("ov_emergency_banner_dismissed") ==="true",
 () => false, // server snapshot: always render banner on SSR
 );
 const [manualDismissed, setManualDismissed] = useState(false);
 const isDismissed = storedDismissed || manualDismissed;

 const handleDismiss = () => {
 setManualDismissed(true);
 if (dismissible) {
 sessionStorage.setItem("ov_emergency_banner_dismissed","true");
 }
 };

 if (isDismissed) {
 return null;
 }


 return (
 <div
 role="region"
 aria-label="Emergency information"
 className={cn(
"bg-foreground text-background border-b border-border px-4 py-3 md:py-4 w-full z-30 transition-all",
 className
 )}
 >
 <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
 <div className="flex items-start gap-3">
 <div className="size-8 bg-danger/20 border border-danger/40 flex items-center justify-center shrink-0 mt-0.5">
 <AlertTriangleIcon className="h-4 w-4 text-danger shrink-0" />
 </div>
 <div className="space-y-1">
 <div className="flex flex-wrap items-center gap-2">
 <span className="font-semibold font-sans text-body-sm text-background tracking-wide uppercase">
 {title}
 </span>
 <span className="text-background/40 hidden md:inline">·</span>
 <span className="text-caption text-background/70 font-light">
 {description}
 </span>
 </div>


 </div>
 </div>

 <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
 {actionLabel && actionHref && (
 <Link
 href={actionHref}
 className="bg-background text-foreground hover:bg-background/90 px-3 py-1.5 text-caption font-semibold uppercase tracking-wider transition-colors"
 >
 {actionLabel}
 </Link>
 )}

 {dismissible && (
 <button
 onClick={handleDismiss}
 aria-label="Dismiss emergency banner"
 className="p-1 text-background/60 hover:text-background transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-paper"
 >
 <X className="h-4 w-4" />
 </button>
 )}
 </div>
 </div>
 </div>
 );
}
