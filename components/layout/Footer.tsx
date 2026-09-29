"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";
import { 
  ShieldAlert, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUp, 
  Check, 
  Copy, 
  Key, 
  Activity, 
  Radio,
  ExternalLink 
} from "lucide-react";
import { FooterQuickRoute } from "./FooterQuickRoute";

export function Footer() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [imphalTime, setImphalTime] = useState("");

  const PGP_FINGERPRINT = "4D92 81B0 C720 E31D 9F4A";

  useEffect(() => {
    // Update live local time in Imphal (IST: UTC+5:30)
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      setImphalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card text-foreground pt-14 pb-8 md:pt-20 md:pb-12 border-t border-border mt-auto">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        
        {/* Tier 1: Intelligent Jev Fast-Dispatch Navigator */}
        <FooterQuickRoute />

        {/* Tier 2: Real-Time Operational Status Strip */}
        <div className="border border-border bg-muted/40 p-4 mb-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold uppercase tracking-wider text-foreground">
                18/18 Frontline Nodes Operational
              </span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="size-3 text-primary" />
              <span>240kW Microgrid Live</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Radio className="size-3 text-primary" />
              <span>Open Ledger Hourly Sync</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground font-semibold">
            <span>Imphal HQ Time:</span>
            <span className="text-foreground font-mono bg-background px-2 py-0.5 border border-border">
              {imphalTime ? `${imphalTime} IST` : "19:20:00 IST"}
            </span>
          </div>
        </div>

        {/* Tier 3: Main 4-Column Nordic Lagom Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-border">
          
          {/* Column 1: Brand & Operational Pedigree (Col 5) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link 
              href="/" 
              className="inline-block mb-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground uppercase">
                {orgData.org.name}
              </h2>
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 border border-border">
              <span>Established 1988</span>
              <span>·</span>
              <span>Society for Health & Education Manipur</span>
            </div>

            <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-sm mb-6">
              {orgData.org.mandate}
            </p>

            {/* PGP OpSec Fingerprint Tool */}
            <div className="w-full max-w-sm bg-muted/40 border border-border p-3.5 mb-6">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Key className="size-3 text-primary" />
                  <span>OPSEC PGP Fingerprint</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyPgp}
                  className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer"
                  title="Copy PGP Fingerprint"
                >
                  {copiedKey ? (
                    <>
                      <Check className="size-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono text-xs text-foreground tracking-widest select-all">
                {PGP_FINGERPRINT}
              </div>
            </div>

            {/* Emergency Mode Status */}
            {siteSettings.emergencyMode && (
              <div className="inline-flex items-start gap-3 p-3.5 border border-destructive/30 bg-destructive/10 text-destructive text-xs w-full max-w-sm">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold uppercase tracking-wider font-mono text-[10px]">
                    Crisis Response Protocol Active
                  </div>
                  <div className="text-[11px] text-destructive/90 mt-0.5 leading-snug">
                    {siteSettings.emergencyMessage}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Programmes & Action Nodes (Col 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-3.5">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground pb-2 border-b border-border">
              Flagship Programmes
            </h3>
            <Link 
              href="/programmes/community-health-connect" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Community Health Connect</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">18 Nodes</span>
            </Link>
            <Link 
              href="/programmes/local-enterprise-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Local Enterprise & Solar Lab</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">240kW</span>
            </Link>
            <Link 
              href="/programmes/green-manipur-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Green Manipur Lab</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">Ecology</span>
            </Link>
            <Link 
              href="/programmes/futureworks" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>FutureWorks Skills Lab</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">Youth</span>
            </Link>
            <Link 
              href="/programmes/community-data-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Community Data Lab</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">Open Data</span>
            </Link>
            <Link 
              href="/programmes" 
              className="text-xs font-mono font-bold uppercase tracking-wider text-primary pt-2 hover:underline inline-flex items-center gap-1"
            >
              <span>View All 5 Mandates</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>

          {/* Column 3: Accountability & Governance (Col 2) */}
          <div className="lg:col-span-2 flex flex-col space-y-3.5">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground pb-2 border-b border-border">
              Integrity & Trust
            </h3>
            <Link href="/open-ledger" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Open Ledger (Live)
            </Link>
            <Link href="/stories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Field Reports
            </Link>
            <Link href="/reports" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Operational Audits
            </Link>
            <Link href="/about/governance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Board Governance
            </Link>
            <Link href="/about/team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Coordination Team
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Founding Charter
            </Link>
          </div>

          {/* Column 4: Frontline Contact & Direct Helplines (Col 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-3.5">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground pb-2 border-b border-border">
              Frontline Help
            </h3>

            <a 
              href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="size-8 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                <Phone className="size-3.5 group-hover:text-primary" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground block">Field Coordination Line</span>
                <span className="font-mono font-bold text-foreground text-xs">{siteSettings.contactPhone}</span>
              </div>
            </a>

            <a 
              href={`mailto:${siteSettings.contactEmail}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="size-8 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                <Mail className="size-3.5 group-hover:text-primary" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground block">Encrypted Desk Email</span>
                <span className="font-mono font-bold text-foreground text-xs">{siteSettings.contactEmail}</span>
              </div>
            </a>

            <div className="flex items-start gap-3 text-sm text-muted-foreground pt-1">
              <div className="size-8 bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="size-3.5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground block">Depot & Office Location</span>
                <span className="text-xs text-foreground leading-snug">{siteSettings.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/get-help"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-200"
              >
                <span>Request Direct Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 4: Legal, Compliance & Bottom Controls */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-mono text-[11px]">
              &copy; {new Date().getFullYear()} {orgData.org.legal}.
            </p>
            <span className="hidden sm:inline-block w-px h-3 bg-border" />
            <p className="font-mono text-[11px]">
              Reg No: <span className="text-foreground">{siteSettings.registrationNumber}</span>
            </p>
            <span className="hidden sm:inline-block w-px h-3 bg-border" />
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Zero-Tracker / Surveillance-Free
            </span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-foreground transition-colors">A11y</Link>
            
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-background border border-border hover:border-primary text-foreground transition-colors cursor-pointer ml-2"
            >
              <span>Top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
