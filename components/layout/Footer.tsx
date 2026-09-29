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
  Shield, 
  Heart, 
  Activity, 
  Sparkles,
  ExternalLink 
} from "lucide-react";
import { FooterQuickRoute } from "./FooterQuickRoute";

export function Footer() {
  const [imphalTime, setImphalTime] = useState("");

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card text-foreground pt-14 pb-8 md:pt-20 md:pb-12 border-t border-border mt-auto">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        
        {/* Tier 1: Intelligent Community Care Guide (Powered by TypeSafe Jev) */}
        <FooterQuickRoute />

        {/* Tier 2: Community Operations & Reach Overview */}
        <div className="border border-border bg-muted/30 p-4 mb-14 flex flex-wrap items-center justify-between gap-4 font-sans text-xs rounded-[2px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-foreground">
                18 Community Health Centres Active
              </span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="size-3.5 text-primary" />
              <span>Solar Powered Rural Infrastructure</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="size-3.5 text-primary" />
              <span>100% Publicly Audited Accounts</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <span>Imphal Local Time:</span>
            <span className="text-foreground font-mono bg-background px-2 py-0.5 border border-border rounded-[2px]">
              {imphalTime ? `${imphalTime} IST` : "IST (UTC+05:30)"}
            </span>
          </div>
        </div>

        {/* Tier 3: Main 4-Column Community Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-border">
          
          {/* Column 1: Organization & Heritage (Col 4) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link 
              href="/" 
              className="inline-block mb-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <h2 className="font-serif text-2xl font-light tracking-tight text-foreground">
                {orgData.org.name}
              </h2>
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 font-sans text-xs text-muted-foreground bg-muted px-2.5 py-1 border border-border rounded-[2px]">
              <span>Established 1988</span>
              <span>·</span>
              <span>Society for Health & Education Manipur</span>
            </div>

            <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-sm mb-6">
              {orgData.org.mandate}
            </p>

            {/* Official Registration & Tax Exemption Box */}
            <div className="w-full max-w-sm bg-muted/40 border border-border p-3.5 mb-6 rounded-[2px]">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Shield className="size-3.5 text-primary" />
                  <span>Non-Profit Registration</span>
                </span>
                <span className="font-sans text-[11px] text-muted-foreground font-normal">Manipur, India</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Reg No: <span className="font-mono text-foreground font-medium">{siteSettings.registrationNumber}</span> under the Manipur Societies Registration Act, 1989.
              </p>
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between font-sans text-xs text-muted-foreground">
                <span>12A & 80G Certified</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Tax-Deductible Giving</span>
              </div>
            </div>

            {/* Community Support Notice */}
            {siteSettings.emergencyMode && (
              <div className="inline-flex items-start gap-3 p-3.5 border border-primary/30 bg-primary/5 text-foreground text-xs w-full max-w-sm rounded-[2px]">
                <ShieldAlert className="size-4 shrink-0 mt-0.5 text-primary" />
                <div>
                  <div className="font-semibold font-sans text-xs">
                    Community Response Active
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {siteSettings.emergencyMessage}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Programmes (Col 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground pb-2 border-b border-border">
              Flagship Programmes
            </h3>
            <Link 
              href="/programmes/community-health-connect" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Community Health Connect</span>
              <span className="font-sans text-xs text-muted-foreground/70 group-hover:text-primary">18 Centres</span>
            </Link>
            <Link 
              href="/programmes/local-enterprise-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Local Enterprise & Solar Lab</span>
              <span className="font-sans text-xs text-muted-foreground/70 group-hover:text-primary">240kW Clean Power</span>
            </Link>
            <Link 
              href="/programmes/green-manipur-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Green Manipur Lab</span>
              <span className="font-sans text-xs text-muted-foreground/70 group-hover:text-primary">Conservation</span>
            </Link>
            <Link 
              href="/programmes/futureworks" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>FutureWorks Youth Skills</span>
              <span className="font-sans text-xs text-muted-foreground/70 group-hover:text-primary">Mentorship</span>
            </Link>
            <Link 
              href="/programmes/community-data-lab" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
            >
              <span>Community Data Lab</span>
              <span className="font-sans text-xs text-muted-foreground/70 group-hover:text-primary">Open Research</span>
            </Link>
            <Link 
              href="/programmes" 
              className="text-xs font-sans font-semibold text-primary pt-2 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore All Initiatives</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>

          {/* Column 3: Integrity & Trust (Col 2) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground pb-2 border-b border-border">
              Integrity & Trust
            </h3>
            <Link href="/open-ledger" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Open Ledger (Live)
            </Link>
            <Link href="/stories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Community Stories
            </Link>
            <Link href="/reports" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Audited Statements
            </Link>
            <Link href="/about/governance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Board Governance
            </Link>
            <Link href="/about/team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Field Coordinators
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              1988 Founding Charter
            </Link>
          </div>

          {/* Column 4: Community Help & Contact (Col 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-3.5">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground pb-2 border-b border-border">
              Community Help
            </h3>

            <a 
              href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="size-9 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors rounded-[2px]">
                <Phone className="size-4 text-primary" />
              </div>
              <div>
                <span className="font-sans text-xs text-muted-foreground block">24/7 Community Helpline</span>
                <span className="font-sans font-semibold text-foreground text-xs">{siteSettings.contactPhone}</span>
              </div>
            </a>

            <a 
              href={`mailto:${siteSettings.contactEmail}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="size-9 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors rounded-[2px]">
                <Mail className="size-4 text-primary" />
              </div>
              <div>
                <span className="font-sans text-xs text-muted-foreground block">Office Email</span>
                <span className="font-sans font-semibold text-foreground text-xs">{siteSettings.contactEmail}</span>
              </div>
            </a>

            <div className="flex items-start gap-3 text-sm text-muted-foreground pt-1">
              <div className="size-9 bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5 rounded-[2px]">
                <MapPin className="size-4 text-primary" />
              </div>
              <div>
                <span className="font-sans text-xs text-muted-foreground block">Main Office Location</span>
                <span className="text-xs text-foreground leading-snug">{siteSettings.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/get-help"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs sm:text-[13px] font-semibold transition-colors duration-200 rounded-[2px]"
              >
                <span>Request Community Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 4: Legal, Compliance & Bottom Controls */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-sans text-xs">
              &copy; {new Date().getFullYear()} {orgData.org.legal}.
            </p>
            <span className="hidden sm:inline-block w-px h-3 bg-border" />
            <p className="font-sans text-xs">
              Registered Non-Profit: <span className="text-foreground font-mono">{siteSettings.registrationNumber}</span>
            </p>
            <span className="hidden sm:inline-block w-px h-3 bg-border" />
            <span className="font-sans text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Section 80G Certified · Surveillance-Free
            </span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 font-sans text-xs">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
            
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-background border border-border hover:border-primary text-foreground transition-colors cursor-pointer ml-2 rounded-[2px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
