"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";
import { ArrowUp } from "lucide-react";
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
    <footer className="bg-card text-foreground pt-12 pb-10 md:pt-16 md:pb-12 border-t border-border mt-auto">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        
        {/* Tier 1: Minimalist Community Resource Guide (Powered by TypeSafe Jev) */}
        <FooterQuickRoute />

        {/* Tier 2: Refined 4-Column Navigation (Nordic Lagom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 pb-12 border-b border-border/60">
          
          {/* Column 1: Organization & Non-Profit Heritage (Col 4) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link 
              href="/" 
              className="inline-block mb-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <h2 className="font-serif text-2xl font-light tracking-tight text-foreground">
                {orgData.org.name}
              </h2>
            </Link>

            <p className="font-sans text-xs text-muted-foreground font-medium mb-3">
              Society for Health & Education Manipur · Est. 1988
            </p>

            <p className="text-sm font-sans text-muted-foreground font-light leading-relaxed max-w-sm mb-6">
              {orgData.org.mandate}
            </p>

            {/* Quiet, refined non-profit credentials */}
            <div className="font-sans text-xs text-muted-foreground/80 space-y-1.5 font-light">
              <p>
                Reg. No. <span className="font-mono text-foreground font-medium">{siteSettings.registrationNumber}</span> · Manipur Societies Act, 1989
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-foreground/90 font-medium">12A & 80G Certified Non-Profit</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground">Tax-Deductible</span>
              </div>
            </div>
          </div>

          {/* Column 2: Programmes (Col 3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Programmes
            </h3>
            <div className="flex flex-col space-y-2.5">
              <Link 
                href="/programmes/community-health-connect" 
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                Community Health Connect
              </Link>
              <Link 
                href="/programmes/local-enterprise-lab" 
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                Local Enterprise & Solar Lab
              </Link>
              <Link 
                href="/programmes/green-manipur-lab" 
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                Green Manipur Lab
              </Link>
              <Link 
                href="/programmes/futureworks" 
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                FutureWorks Youth Skills
              </Link>
              <Link 
                href="/programmes/community-data-lab" 
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                Community Data Lab
              </Link>
              <Link 
                href="/programmes" 
                className="text-xs font-sans text-primary hover:text-primary/80 transition-colors pt-1 inline-flex items-center gap-1 group"
              >
                <span>View all programmes</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Integrity & Trust (Col 2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Transparency
            </h3>
            <div className="flex flex-col space-y-2.5">
              <Link href="/open-ledger" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                Open Ledger (Live)
              </Link>
              <Link href="/stories" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                Community Stories
              </Link>
              <Link href="/reports" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                Audited Statements
              </Link>
              <Link href="/about/governance" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                Board & Governance
              </Link>
              <Link href="/about/team" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                Field Coordinators
              </Link>
              <Link href="/about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                1988 Charter
              </Link>
            </div>
          </div>

          {/* Column 4: Community Help & Contact (Col 3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Get in Touch
            </h3>

            <div className="flex flex-col space-y-4">
              <a 
                href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="group block"
              >
                <span className="text-[11px] font-sans text-muted-foreground block font-normal">24/7 Community Desk</span>
                <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {siteSettings.contactPhone}
                </span>
              </a>

              <a 
                href={`mailto:${siteSettings.contactEmail}`}
                className="group block"
              >
                <span className="text-[11px] font-sans text-muted-foreground block font-normal">Official Inquiries</span>
                <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {siteSettings.contactEmail}
                </span>
              </a>

              <div>
                <span className="text-[11px] font-sans text-muted-foreground block font-normal">Field Headquarters</span>
                <span className="font-sans text-sm text-foreground/80 font-light leading-snug">
                  Imphal West, Manipur, India
                </span>
              </div>

              <div className="pt-2">
                <Link 
                  href="/get-help"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-primary hover:text-primary/80 transition-colors group"
                >
                  <span>Get Help</span>
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Quiet Operational Indicator Bar */}
        <div className="py-4 border-b border-border/50 flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-muted-foreground/90 font-light">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>18 Community Clinics Active</span>
            </div>
            <span className="text-border">·</span>
            <span>Solar Powered Field Hubs</span>
            <span className="text-border">·</span>
            <span>Publicly Audited Accounts</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Imphal:</span>
            <span className="font-mono text-foreground">{imphalTime ? `${imphalTime} IST` : "UTC+05:30"}</span>
          </div>
        </div>

        {/* Tier 4: Legal, Compliance & Back to Top */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
          <p className="font-sans text-center md:text-left">
            &copy; {new Date().getFullYear()} {orgData.org.legal}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 font-sans">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
            
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="hover:text-foreground transition-colors cursor-pointer inline-flex items-center gap-1 text-muted-foreground"
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
