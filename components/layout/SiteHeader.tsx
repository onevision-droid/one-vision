"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { MegaMenu } from "@/components/layout/MegaMenu";
import {
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  MessageSquare,
} from "lucide-react";
import { siteSettings } from "@/lib/data/site-settings";

const navLinks = [
  { href: "/programmes", label: "Programmes", hasMegaMenu: true },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

const mobileProgrammeCategories = [
  { label: "All Programmes", href: "/programmes" },
  { label: "Healthy Communities", href: "/programmes?category=Healthy+Communities" },
  { label: "Climate & Environment", href: "/programmes?category=Climate+%26+Environment" },
  { label: "Youth & Future Skills", href: "/programmes?category=Youth+%26+Future+Skills" },
  { label: "Livelihoods & Enterprise", href: "/programmes?category=Livelihoods+%26+Enterprise" },
  { label: "Innovation & Evidence", href: "/programmes?category=Innovation+%26+Evidence" },
];

interface SiteHeaderProps {
  transparent?: boolean;
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"main" | "programmes">("main");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile nav and mega menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMobileView("main");
    setIsMegaMenuOpen(false);
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

  // Global Cmd+K / Ctrl+K shortcut for Search Dialog & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
        setIsMegaMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handlers for MegaMenu hover with delay
  const handleMouseEnterNav = (href: string, hasMegaMenu?: boolean) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setHoveredPath(href);
    if (hasMegaMenu) {
      setIsMegaMenuOpen(true);
    } else {
      setIsMegaMenuOpen(false);
    }
  };

  const handleMouseLeaveNav = () => {
    setHoveredPath(null);
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const isTransparentActive = transparent && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 will-change-transform ${
          isTransparentActive
            ? "bg-transparent border-b border-white/10 text-white"
            : isScrolled
              ? "bg-background border-b border-border shadow-xs text-foreground"
              : "bg-background/98 border-b border-border text-foreground"
        }`}
      >
        <div className="w-full max-w-container px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between h-16 relative">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center shrink-0 mr-6 sm:mr-8 group focus-visible:outline-2 focus-visible:outline-ring min-h-11"
            aria-label="One Vision home"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation — Nordic Lagom States */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 relative h-full"
            aria-label="Main Navigation"
            onMouseLeave={handleMouseLeaveNav}
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              const isHovered = hoveredPath === link.href;

              return (
                <div
                  key={link.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnterNav(link.href, link.hasMegaMenu)}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.hasMegaMenu) {
                        if (!isMegaMenuOpen) {
                          e.preventDefault();
                          setIsMegaMenuOpen(true);
                        } else {
                          // When menu is open, allow link to navigate and close menu
                          setIsMegaMenuOpen(false);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!link.hasMegaMenu) return;
                      if (e.key === " ") {
                        // Space does not activate a native link, so toggle the menu and block page scroll.
                        e.preventDefault();
                        setIsMegaMenuOpen((prev) => !prev);
                      } else if (e.key === "Escape") {
                        e.preventDefault();
                        setIsMegaMenuOpen(false);
                      }
                    }}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={link.hasMegaMenu ? "true" : undefined}
                    aria-expanded={link.hasMegaMenu ? isMegaMenuOpen : undefined}
                    aria-controls={link.hasMegaMenu ? "programmes-mega-menu" : undefined}
                    className={`relative px-3 py-2 font-sans text-xs sm:text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                      isActive
                        ? isTransparentActive
                          ? "text-white font-semibold"
                          : "text-foreground font-semibold"
                        : isHovered
                          ? "text-primary"
                          : isTransparentActive
                            ? "text-white/80 hover:text-white"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>

                    {/* Section 04: Active Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-none z-20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Section 03: Hover Dot Indicator (when not active) */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="hoverNavDot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-none bg-primary z-20"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </div>
              );
            })}

            {/* Section 06: Programmes Mega Menu Dropdown */}
            <div onMouseEnter={handleMegaMenuMouseEnter} onMouseLeave={handleMouseLeaveNav}>
              <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
            </div>
          </nav>

          {/* Header Right Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger with Keyboard Shortcut */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search site (Press Ctrl+K or Cmd+K)"
              className={`flex items-center gap-2 px-3 py-1.5 h-9 border rounded-none transition-colors cursor-pointer shadow-2xs ${
                isTransparentActive
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="size-3.5" aria-hidden="true" />
              <span className="font-sans text-xs">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-mono text-[9px] font-bold text-foreground/85 bg-muted border border-border rounded-none ml-1">
                ⌘K
              </kbd>
            </motion.button>

            {/* Donate CTA (Desktop) */}
            <div className="hidden sm:block">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-1.5 px-4 h-9 bg-primary hover:bg-primary-hover text-white font-sans text-xs sm:text-sm font-medium tracking-normal transition-colors rounded-none shadow-xs"
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
              className={`lg:hidden flex items-center justify-center size-9 border rounded-none transition-colors cursor-pointer ${
                isTransparentActive
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
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

      {/* ═══ Section 07: Mobile Multi-Level Navigation Drawer ═══ */}
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
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background border-b border-border lg:hidden flex flex-col justify-between p-6 overflow-y-auto scroll-fade-y will-change-transform"
          >
            {/* Screen 1: Main Menu View */}
            {mobileView === "main" && (
              <motion.div
                key="main-menu"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-4"
              >
                <nav className="flex flex-col divide-y divide-border" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                    if (link.hasMegaMenu) {
                      return (
                        <button
                          key={link.href}
                          type="button"
                          onClick={() => setMobileView("programmes")}
                          className={`flex items-center justify-between py-4 text-left transition-colors cursor-pointer ${
                            isActive
                              ? "text-primary font-semibold"
                              : "text-foreground hover:text-primary font-normal"
                          }`}
                        >
                          <span className="font-serif text-2xl font-light tracking-tight">
                            {link.label}
                          </span>
                          <ChevronRight className="size-5 text-muted-foreground" />
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between py-4 text-left transition-colors ${
                          isActive
                            ? "text-primary font-semibold"
                            : "text-foreground hover:text-primary font-normal"
                        }`}
                      >
                        <span className="font-serif text-2xl font-light tracking-tight">
                          {link.label}
                        </span>
                        <ChevronRight className="size-5 text-muted-foreground opacity-50" />
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>
            )}

            {/* Screen 2: Programmes Sub-Menu Drilldown */}
            {mobileView === "programmes" && (
              <motion.div
                key="programmes-submenu"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-4"
              >
                {/* Back to main menu header */}
                <button
                  type="button"
                  onClick={() => setMobileView("main")}
                  className="flex items-center gap-2 py-2 text-primary font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer hover:underline"
                >
                  <ArrowLeft className="size-4" />
                  <span>Back to Main Menu</span>
                </button>

                <h3 className="font-serif text-2xl font-light text-foreground border-b border-border pb-3">
                  Programmes
                </h3>

                <div className="flex flex-col divide-y divide-border/60">
                  {mobileProgrammeCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-foreground hover:text-primary transition-colors text-sm font-sans"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>

                {/* Submenu Spotlight Thumbnail Card */}
                <div className="p-4 bg-card border border-border rounded-none shadow-xs mt-2">
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-none bg-muted mb-2">
                    <Image
                      src="/home-hero-2026.jpg"
                      alt="Community solutions in Manipur"
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-serif text-sm text-foreground font-normal leading-snug">
                    Community-led solutions for a stronger Manipur.
                  </h4>
                  <Link
                    href="/programmes"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover mt-2"
                  >
                    <span>View all programmes</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Mobile Bottom Actions (Always Accessible) */}
            <div className="pt-6 mt-6 border-t border-border space-y-3">
              {/* Full-width Donate CTA Button */}
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-hover text-white font-sans text-sm font-medium tracking-normal transition-colors rounded-none shadow-xs"
              >
                <span>Donate</span>
                <ArrowRight className="size-4" />
              </Link>

              {/* Inline Search Input Trigger */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 bg-card border border-border hover:border-primary/50 text-muted-foreground text-xs font-sans rounded-none transition-colors cursor-pointer"
              >
                <Search className="size-3.5 text-muted-foreground" />
                <span>Search stories, programmes...</span>
              </button>

              {/* Helpline & Direct Contact */}
              <div className="grid grid-cols-2 gap-2 font-sans text-xs text-foreground pt-1">
                <a
                  href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-1.5 p-2.5 border border-border bg-card hover:border-primary/50 transition-colors rounded-none"
                >
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">24/7 Helpline</span>
                </a>
                <Link
                  href="/get-help"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 p-2.5 border border-border bg-card hover:border-primary/50 transition-colors rounded-none"
                >
                  <MessageSquare className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">Get Help</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
