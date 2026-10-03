"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";
import { ArrowUp, ArrowRight, CheckCircle2 } from "lucide-react";

// Social Icons SVGs (clean, accessible, brand-compliant)
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0c0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

const FooterNewsletterForm = React.memo(function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribeStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribeStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || "Subscription service is currently unavailable.");
        setSubscribeStatus("idle");
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
      setSubscribeStatus("idle");
    }
  };

  if (subscribeStatus === "success") {
    return (
      <div className="p-3 bg-primary-light border border-primary/20 rounded-none text-primary text-xs font-sans flex items-center gap-2">
        <CheckCircle2 className="size-4 shrink-0" />
        <span>Thank you for subscribing! You will receive our monthly dispatch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-2">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address for newsletter
      </label>
      <div className="flex items-center">
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          className="w-full bg-background border border-border border-r-0 rounded-none px-3.5 py-2 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          disabled={subscribeStatus === "submitting"}
          className="bg-primary hover:bg-primary-hover text-white px-3.5 py-2 rounded-none transition-colors cursor-pointer shrink-0 min-h-8.5 flex items-center justify-center"
        >
          <ArrowRight className="size-3.5" />
        </button>
      </div>
      {errorMessage && (
        <p className="text-[11px] font-sans text-destructive leading-normal">
          {errorMessage}
        </p>
      )}
      <p className="text-[11px] font-sans text-muted-foreground leading-normal">
        By subscribing, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-foreground transition-colors py-2 -my-2 inline-block">
          Privacy Policy
        </Link>.
      </p>
    </form>
  );
});

export const Footer = React.memo(function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <footer className="bg-card text-foreground pt-14 pb-8 md:pt-16 md:pb-10 border-t border-border mt-auto contain-[layout_style_paint] [content-visibility:auto] [contain-intrinsic-size:600px] transform-gpu">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* ═══ 5-Column Navigation Grid ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-border/80">
          
          {/* Column 1: Organisation Identity & Credentials (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start pr-0 lg:pr-4">
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

            <p className="text-sm font-sans text-muted-foreground font-light leading-relaxed mb-5 max-w-sm">
              A community-led organisation working for a healthier, greener and more resilient Manipur.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 text-muted-foreground mb-6">
              <a
                href={orgData.social?.facebook || "https://facebook.com/onevisionmanipur"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="One Vision on Facebook"
                className="size-8 rounded-none border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors"
              >
                <FacebookIcon className="size-3.5" />
              </a>
              <a
                href={orgData.social?.instagram || "https://instagram.com/onevisionmanipur"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="One Vision on Instagram"
                className="size-8 rounded-none border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors"
              >
                <InstagramIcon className="size-3.5" />
              </a>
              <a
                href={orgData.social?.x || "https://x.com/onevisionmanipur"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="One Vision on X"
                className="size-8 rounded-none border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors"
              >
                <XIcon className="size-3.5" />
              </a>
              <a
                href={orgData.social?.youtube || "https://youtube.com/@onevisionmanipur"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="One Vision on YouTube"
                className="size-8 rounded-none border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors"
              >
                <YoutubeIcon className="size-3.5" />
              </a>
              <a
                href={orgData.social?.linkedin || "https://linkedin.com/company/onevisionmanipur"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="One Vision on LinkedIn"
                className="size-8 rounded-none border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors"
              >
                <LinkedinIcon className="size-3.5" />
              </a>
            </div>

            {/* Non-profit credentials */}
            <div className="font-sans text-xs text-muted-foreground space-y-1.5 font-light">
              <p className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✦</span>
                <span>Reg. No. <span className="font-mono text-foreground font-medium">{siteSettings.registrationNumber}</span></span>
              </p>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-none bg-emerald-500 shrink-0" />
                <span className="text-foreground/90 font-medium">12A & 80G Certified</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground">Tax-Deductible</span>
              </div>
            </div>
          </div>

          {/* Column 2: EXPLORE (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Explore
            </h3>
            <div className="flex flex-col space-y-1">
              <Link href="/programmes" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Programmes
              </Link>
              <Link href="/stories" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Stories
              </Link>
              <Link href="/open-ledger" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Open Ledger
              </Link>
              <Link href="/reports" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Reports
              </Link>
              <Link href="/about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                About
              </Link>
              <Link href="/volunteer" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Volunteer
              </Link>
            </div>
          </div>

          {/* Column 3: GET INVOLVED (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Get Involved
            </h3>
            <div className="flex flex-col space-y-1">
              <Link href="/volunteer" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Volunteer
              </Link>
              <Link href="/contact" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Partner with Us
              </Link>
              <Link href="/donate" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Donate
              </Link>
              <Link href="/contact" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Share a Story
              </Link>
              <Link href="/about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Community Guide
              </Link>
              <Link href="/contact" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Contact
              </Link>
            </div>
          </div>

          {/* Column 4: OUR WORK (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Our Work
            </h3>
            <div className="flex flex-col space-y-1">
              <Link href="/programmes?category=Healthy+Communities" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Healthy Communities
              </Link>
              <Link href="/programmes?category=Climate+%26+Environment" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Climate & Environment
              </Link>
              <Link href="/programmes?category=Youth+%26+Future+Skills" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Youth & Future Skills
              </Link>
              <Link href="/programmes?category=Livelihoods+%26+Enterprise" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Livelihoods & Enterprise
              </Link>
              <Link href="/programmes?category=Innovation+%26+Evidence" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block">
                Innovation & Evidence
              </Link>
            </div>
          </div>

          {/* Column 5: STAY INFORMED (Newsletter) (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Stay Informed
            </h3>
            <p className="text-sm font-sans text-muted-foreground font-light leading-relaxed mb-4">
              Get updates on our work, stories and opportunities in Manipur.
            </p>

            <FooterNewsletterForm />
          </div>
        </div>

        {/* ═══ Legal & Back to Top Bottom Bar ═══ */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
          <p className="font-sans text-center md:text-left">
            &copy; {new Date().getFullYear()} {orgData.org.legal}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans">
            <Link href="/privacy" className="hover:text-foreground transition-colors py-2 inline-flex items-center min-h-9">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors py-2 inline-flex items-center min-h-9">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-foreground transition-colors py-2 inline-flex items-center min-h-9">
              Accessibility
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors py-2 inline-flex items-center min-h-9">
              Sitemap
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="hover:text-primary hover:border-primary transition-colors cursor-pointer inline-flex items-center gap-1.5 text-muted-foreground border border-border rounded-none px-3 py-1.5 min-h-9 text-xs"
            >
              <ArrowUp className="size-3" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});
