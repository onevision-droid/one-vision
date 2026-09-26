"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Search } from "lucide-react";
import { SearchDialog } from "@/components/ui/SearchDialog";

// "Deploy Support" is not in nav — it lives exclusively as the orange CTA button.
// Keeps nav uncluttered (4 items) and CTA visually distinct.
const navLinks = [
  { href: "/stories", label: "Field Reports" },
  { href: "/programmes", label: "The 4 Pillars" },
  { href: "/get-help", label: "Secure Contact" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [menuState, setMenuState] = useState({ forPathname: pathname, open: false });
  const mobileOpen = menuState.forPathname === pathname && menuState.open;
  const setMobileOpen = (open: boolean) => setMenuState({ forPathname: pathname, open });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasMobileOpen = useRef(mobileOpen);

  useEffect(() => {
    if (mobileOpen) {
      wasMobileOpen.current = true;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) focusable[0].focus();
    } else if (wasMobileOpen.current) {
      wasMobileOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const { scrollY } = useScroll();

  // Smoother scroll interpolation — start fading in bg at 20px not 0px
  const headerBackground = useTransform(
    scrollY,
    [20, 80],
    ["rgba(250, 248, 244, 0)", "rgba(250, 248, 244, 0.95)"]
  );
  // Solid blueprint border immediately visible
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(23, 23, 23, 1)", "rgba(23, 23, 23, 1)"]
  );
  const blurValue = useTransform(scrollY, [20, 80], [0, 12]);
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;
  // Height: 64px at top, shrinks to 56px on scroll — tighter, more utilitarian
  const headerHeight = useTransform(scrollY, [0, 80], [64, 56]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuState((prev) => ({ ...prev, open: false }));
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for Search Dialog
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", mobileOpen);
    return () => { document.documentElement.classList.remove("overflow-hidden"); };
  }, [mobileOpen]);

  const activeLink = navLinks.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
  )?.href;
  const currentIndicator = hoveredPath || activeLink;

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBackground,
          borderBottomColor: headerBorder,
          backdropFilter,
        }}
        className="fixed top-0 z-50 w-full border-b border-ink-900"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ height: headerHeight }}
          className="w-full max-w-7xl px-4 xl:px-8 flex items-center justify-between mx-auto"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 mr-8"
            aria-label="One Vision home"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <Logo isHovered={isLogoHovered} />
          </Link>

          {/* Desktop Nav — centered between logo and actions */}
          <nav
            className="hidden md:flex items-center gap-1 text-body-sm font-sans text-ink-700 flex-1"
            onMouseLeave={() => setHoveredPath(null)}
            aria-label="Main navigation"
          >
            {navLinks.map((link, i) => {
              const isIndicatorActive = currentIndicator === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    className={`relative z-10 px-3 py-1.5 flex items-center transition-colors duration-150 text-[13px] tracking-wide ${
                      isIndicatorActive ? "text-paper font-medium" : "text-ink-700 hover:text-ink-900"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {isIndicatorActive && (
                    <motion.div
                      layoutId="active-nav-block"
                      className="absolute inset-0 bg-ink-900 z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </motion.div>
              );
            })}
            {/* Search Nav Item */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + navLinks.length * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-2"
            >
              <button
                onClick={() => setSearchOpen(true)}
                onMouseEnter={() => setHoveredPath("search")}
                className={`relative z-10 px-3 py-1.5 flex items-center transition-colors duration-150 text-[13px] tracking-wide cursor-pointer ${
                  currentIndicator === "search" ? "text-paper font-medium" : "text-ink-700 hover:text-ink-900"
                }`}
              >
                Search <span className="opacity-50 ml-1.5 text-[11px] font-mono mt-px">[Cmd+K]</span>
              </button>

              {currentIndicator === "search" && (
                <motion.div
                  layoutId="active-nav-block"
                  className="absolute inset-0 bg-ink-900 z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </motion.div>
          </nav>

          {/* Actions — right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Deploy Support CTA — perfectly aligned height */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                className="bg-ink-900 text-paper hover:bg-ink-800 uppercase tracking-widest text-[11px] font-semibold h-auto py-1.75 px-4 rounded-none min-h-0!"
                nativeButton={false}
                render={<Link href="/donate" />}
              >
                Deploy Support
              </Button>
            </motion.div>

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search site"
              className="md:hidden p-2 text-ink-500 hover:text-ink-900 transition-colors cursor-pointer"
            >
              <Search className="size-4" />
            </button>

            {/* Mobile hamburger */}
            <button
              ref={triggerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              className="md:hidden relative z-20 p-2 -mr-1 cursor-pointer"
            >
              <div className="relative w-5 h-4 flex items-center justify-center">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute h-px w-5 bg-ink-900 block origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.14 }}
                  className="absolute h-px w-5 bg-ink-900 block origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute h-px w-5 bg-ink-900 block origin-center"
                />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <motion.div
        ref={panelRef}
        id="mobile-nav-panel"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="fixed inset-0 z-40 bg-paper/97 backdrop-blur-md md:hidden flex flex-col"
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-0 flex-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <motion.div
                  key={link.href}
                  initial={false}
                  animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, delay: mobileOpen ? i * 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-sans text-display-md font-medium leading-tight py-4 border-b border-border-default flex items-center justify-between group ${
                      isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
                    } transition-colors duration-150`}
                  >
                    {link.label}
                    <span className="text-ink-300 group-hover:text-ink-700 transition-colors text-heading-lg font-light">
                      →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile CTAs */}
          <motion.div
            initial={false}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 mt-6"
          >
            <Button
              variant="primary"
              className="w-full font-sans text-[11px] tracking-widest uppercase h-11 rounded-none bg-safety-orange hover:bg-safety-orange-dim"
              nativeButton={false}
              render={<Link href="/donate" onClick={() => setMobileOpen(false)} />}
            >
              Deploy Support
            </Button>
            <Button
              variant="secondary"
              className="w-full font-sans text-[11px] tracking-widest uppercase h-10 rounded-none"
              nativeButton={false}
              render={<Link href="/get-help" onClick={() => setMobileOpen(false)} />}
            >
              Secure Contact
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Global Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
