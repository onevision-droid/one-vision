"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { Search, ArrowRight, Menu, X, Phone, MessageSquare } from "lucide-react";
import { siteSettings } from "@/lib/data/site-settings";

const navLinks = [
  { href: "/programmes", label: "Our Programmes" },
  { href: "/stories", label: "Field Reports" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/open-ledger", label: "Open Ledger" },
  { href: "/get-help", label: "Contact" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile nav on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Prevent background page scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Focus management: move focus into drawer on open, restore on close
  useEffect(() => {
    if (mobileOpen) {
      const drawer = drawerRef.current;
      if (drawer) {
        const focusable = drawer.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0]?.focus();
        }
      }
    } else if (menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [mobileOpen]);

  const handleDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab" && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
  };

  // Scroll detection for Nordic Lagom elevated state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for Search Dialog & Escape for Mobile Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xs"
            : "bg-background/85 backdrop-blur-sm border-b border-border"
        }`}
      >
        <div className="w-full max-w-container px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center shrink-0 mr-6 sm:mr-8 group focus-visible:outline-2 focus-visible:outline-safety-orange"
            aria-label="One Vision home"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation — Nordic Lagom with Motion Indicator */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 relative h-full"
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              const isHovered = hoveredPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Active Motion Pill (Brutalist razor-sharp bottom notch) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-destructive z-20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverNavIndicator"
                      className="absolute inset-0 bg-muted/60 z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search Trigger with Keyboard Shortcut */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search site (Press Ctrl+K or Cmd+K)"
              className="flex items-center gap-2 px-2.5 py-1.5 border border-border bg-muted/60 hover:bg-muted hover:border-foreground transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Search className="size-3.5" aria-hidden="true" />
              <span className="hidden xl:inline font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Search
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-mono text-[9px] font-bold text-ink-400 bg-background border border-border">
                ⌘K
              </kbd>
            </motion.button>

            {/* Donate CTA (Desktop) */}
            <div className="hidden sm:block">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-foreground hover:bg-destructive text-background hover:text-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                >
                  <span>Donate</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <motion.button
              ref={menuButtonRef}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex items-center justify-center size-9 border border-border bg-muted text-foreground hover:border-foreground transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            onKeyDown={handleDrawerKeyDown}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background/98 backdrop-blur-xl border-b border-border md:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <nav className="flex flex-col divide-y divide-border-default" aria-label="Mobile Navigation">
              {navLinks.map((link, idx) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-4 text-left transition-colors ${
                        isActive
                          ? "text-destructive font-bold"
                          : "text-foreground hover:text-destructive font-medium"
                      }`}
                    >
                      <span className="font-serif text-2xl font-light tracking-tight">
                        {link.label}
                      </span>
                      <ArrowRight className="size-4 opacity-50" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Bottom Quick Actions */}
            <div className="pt-6 mt-6 border-t border-border space-y-4">
              <div className="grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-wider text-ink-600">
                <a
                  href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 p-3 border border-border bg-muted hover:border-foreground transition-colors"
                >
                  <Phone className="size-3.5 text-destructive" />
                  <span>Field Office</span>
                </a>
                <Link
                  href="/get-help"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-3 border border-border bg-muted hover:border-foreground transition-colors"
                >
                  <MessageSquare className="size-3.5 text-destructive" />
                  <span>Direct Help</span>
                </Link>
              </div>

              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-foreground hover:bg-destructive text-background hover:text-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
              >
                <span>Donate to Resilience Fund</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
