"use client";

import React from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card text-foreground pt-12 pb-8 md:pt-14 md:pb-10 border-t border-border mt-auto">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">

        {/* 3-Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-border/60">
          
          {/* Column 1: Organisation Identity */}
          <div className="flex flex-col items-start">
            <Link 
              href="/" 
              className="inline-flex items-center min-h-10 mb-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <h2 className="font-serif text-xl font-light tracking-tight text-foreground">
                {orgData.org.name}
              </h2>
            </Link>

            <p className="font-sans text-xs text-muted-foreground font-medium mb-3">
              Society for Health & Education Manipur · Est. 1988
            </p>

            <p className="text-sm font-sans text-muted-foreground font-light leading-relaxed max-w-xs mb-5">
              {orgData.org.mandate}
            </p>

            {/* Non-profit credentials */}
            <div className="font-sans text-xs text-muted-foreground space-y-1 font-light">
              <p>
                Reg. No. <span className="font-mono text-foreground font-medium">{siteSettings.registrationNumber}</span> · Manipur Societies Act, 1989
              </p>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-foreground/90 font-medium">12A & 80G Certified</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground">Tax-Deductible</span>
              </div>
            </div>
          </div>

          {/* Column 2: Key Links */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Explore
            </h3>
            <div className="flex flex-col space-y-0.5">
              <Link href="/programmes" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                Programmes
              </Link>
              <Link href="/stories" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                Stories
              </Link>
              <Link href="/open-ledger" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                Open Ledger
              </Link>
              <Link href="/reports" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                Reports
              </Link>
              <Link href="/about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                About
              </Link>
              <Link href="/volunteer" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-2 inline-block">
                Volunteer
              </Link>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Contact
            </h3>
            <div className="flex flex-col space-y-3">
              <a 
                href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="group block py-1"
              >
                <span className="text-[11px] font-sans text-muted-foreground block">Community Desk</span>
                <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {siteSettings.contactPhone}
                </span>
              </a>

              <a 
                href={`mailto:${siteSettings.contactEmail}`}
                className="group block py-1"
              >
                <span className="text-[11px] font-sans text-muted-foreground block">Enquiries</span>
                <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {siteSettings.contactEmail}
                </span>
              </a>

              <div className="py-1">
                <span className="text-[11px] font-sans text-muted-foreground block">Headquarters</span>
                <span className="font-sans text-sm text-foreground/80 font-light">
                  Imphal West, Manipur, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Back to Top */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
          <p className="font-sans text-center md:text-left">
            &copy; {new Date().getFullYear()} {orgData.org.legal}. All rights reserved.
          </p>

          <div className="flex items-center gap-4 font-sans">
            <Link href="/privacy" className="hover:text-foreground transition-colors min-h-10 px-2 inline-flex items-center">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors min-h-10 px-2 inline-flex items-center">Terms</Link>
            <Link href="/accessibility" className="hover:text-foreground transition-colors min-h-10 px-2 inline-flex items-center">Accessibility</Link>
            
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="hover:text-foreground transition-colors cursor-pointer inline-flex items-center gap-1 text-muted-foreground min-h-10 px-1"
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
