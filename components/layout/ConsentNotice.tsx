"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ov_privacy_consent_acknowledged";

function subscribe(callback: () => void) {
 window.addEventListener("storage", callback);
 return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
 try {
 return localStorage.getItem(STORAGE_KEY) === "true";
 } catch {
 return true;
 }
}

function getServerSnapshot() {
 return true;
}

export function ConsentNotice() {
 const isAcknowledged = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

 const handleAcknowledge = () => {
 try {
 localStorage.setItem(STORAGE_KEY, "true");
 window.dispatchEvent(new Event("storage"));
 } catch {
 // Ignore write errors
 }
 };

 if (isAcknowledged) return null;

 return (
 <aside
 role="region"
 aria-label="Privacy and data notice"
 className="fixed bottom-0 left-0 right-0 z-50 bg-muted border-t border-border shadow-[0_-8px_32px_rgba(22,20,15,0.08)] py-5 px-5 pb-6 md:py-6 md:px-8 md:pb-8 text-foreground transition-all duration-300"
 >
 <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-5 md:gap-8">
 <div className="flex items-start gap-4 flex-1">
 <div className="p-2 bg-muted-alt border border-border shrink-0 text-action-primary hidden md:flex mt-0.5">
 <ShieldCheck className="size-5" />
 </div>

 <div className="space-y-1.5">
 <h3 className="font-sans text-body-sm font-semibold text-foreground flex items-center gap-2">
 <ShieldCheck className="size-4 md:hidden text-action-primary" />
 Privacy & Trust First
 </h3>
 <p className="font-sans text-caption text-muted-foreground font-light leading-relaxed max-w-3xl pr-4">
 One Vision uses only essential storage and privacy-respecting analytics to gauge community needs. We never run third-party advertising or sell your personal data.
 </p>
 </div>
 </div>

 <div className="flex items-center gap-4 shrink-0 w-full md:w-auto pt-2 md:pt-0">
 <Button
 onClick={handleAcknowledge}
 variant="primary"
 className="px-6 py-2.5 text-body-sm font-semibold flex-1 md:flex-none"
 >
 Acknowledge
 </Button>
 <Link
 href="/privacy"
 className="text-caption font-medium text-action-primary hover:text-action-hover underline underline-offset-4 px-2"
 >
 Privacy Policy
 </Link>
 </div>
 </div>
 </aside>
 );
}