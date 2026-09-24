"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/programmes", label: "What We Do" },
  { href: "/stories", label: "Stories" },
  { href: "/get-help", label: "Get Help" },
  { href: "/volunteer", label: "Get Involved" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  // Pair open state with the pathname it was opened on.
  // When pathname changes, mobileOpen derives as false — no effect needed.
  const [menuState, setMenuState] = useState({ forPathname: pathname, open: false });
  const mobileOpen = menuState.forPathname === pathname && menuState.open;
  const setMobileOpen = (open: boolean) => setMenuState({ forPathname: pathname, open });

  const { scrollY } = useScroll();

  // Interpolate background, border, and blur on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 60],
    ["rgba(245, 247, 246, 0)", "rgba(245, 247, 246, 0.92)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 60],
    ["rgba(28, 35, 33, 0)", "rgba(28, 35, 33, 0.08)"]
  );
  const blurValue = useTransform(scrollY, [0, 60], [0, 14]);
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;
  const headerHeight = useTransform(scrollY, [0, 60], [80, 64]);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuState((prev) => ({ ...prev, open: false }));
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []); // setMenuState is stable — no deps needed

  // Lock scroll when mobile overlay is open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", mobileOpen);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  const activeLink =
    navLinks.find(
      (link) =>
        pathname === link.href || pathname.startsWith(`${link.href}/`)
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
        className="fixed top-0 z-50 w-full border-b"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ height: headerHeight }}
          className="container flex max-w-6xl items-center px-4 md:px-8 mx-auto"
        >
          {/* Logo */}
          <div className="flex-1 flex">
            <Link
              href="/"
              className="flex items-center"
              aria-label="One Vision home"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Logo isHovered={isLogoHovered} />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="flex items-center space-x-8">
            <nav
              className="hidden md:flex items-center space-x-8 text-xs tracking-widest uppercase font-inter text-ink/70 relative"
              onMouseLeave={() => setHoveredPath(null)}
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                const isIndicatorActive = currentIndicator === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    className={`transition-colors py-2 relative ${
                      isActive ? "text-ink" : "hover:text-ink"
                    }`}
                  >
                    {link.label}

                    {isIndicatorActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-ink"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="default"
                  className="hidden md:inline-flex font-inter text-xs tracking-widest uppercase h-10 px-8 rounded-none"
                  nativeButton={false}
                  render={<Link href="/donate" />}
                >
                  Support
                </Button>
              </motion.div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                className="md:hidden relative z-20 p-2 -mr-2 cursor-pointer"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  {/* Top bar */}
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 0, opacity: 1 } : { rotate: 0, y: -4, opacity: 1 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="absolute h-px w-5 bg-ink block origin-center"
                  />
                  {/* Middle bar */}
                  <motion.span
                    animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute h-px w-5 bg-ink block origin-center"
                  />
                  {/* Bottom bar */}
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: 0, opacity: 1 } : { rotate: 0, y: 4, opacity: 1 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="absolute h-px w-5 bg-ink block origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <motion.div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed inset-0 z-40 bg-paper/97 backdrop-blur-md md:hidden flex flex-col"
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-12">
          <nav
            className="flex flex-col gap-1 flex-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, i) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);
              return (
                <motion.div
                  key={link.href}
                  initial={false}
                  animate={
                    mobileOpen
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -12 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: mobileOpen ? i * 0.06 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-4xl font-light leading-tight py-3 border-b border-ink/8 flex items-center justify-between group ${
                      isActive ? "text-ink" : "text-ink/50 hover:text-ink"
                    } transition-colors duration-200`}
                  >
                    {link.label}
                    <span className="text-ink/20 group-hover:text-ink/60 transition-colors text-2xl font-light">
                      →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <motion.div
            initial={false}
            animate={
              mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            transition={{ duration: 0.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <Button
              variant="default"
              className="w-full font-inter text-xs tracking-widest uppercase h-14 rounded-none"
              nativeButton={false}
              render={<Link href="/donate" onClick={() => setMobileOpen(false)} />}
            >
              Support One Vision
            </Button>
            <Button
              variant="outline"
              className="w-full font-inter text-xs tracking-widest uppercase h-12 rounded-none"
              nativeButton={false}
              render={<Link href="/get-help" onClick={() => setMobileOpen(false)} />}
            >
              Get Help
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Soft blur drape below nav — always present */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-24 bg-linear-to-b from-mist/40 to-transparent"
      />
    </>
  );
}
