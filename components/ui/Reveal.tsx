"use client";

import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in CSS custom property form. Applied as transition-delay. */
  delay?: number;
}

/**
 * CSS-only scroll-triggered reveal. Uses IntersectionObserver via useInView.
 * Respects prefers-reduced-motion — content renders immediately without animation.
 * Replaces framer-motion's AnimatePresence with ~0 bytes of JS overhead.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", isInView && "in-view", className)}
      style={delay > 0 ? { transitionDelay: `${delay * 1000}ms` } : undefined}
    >
      {children}
    </div>
  );
}
