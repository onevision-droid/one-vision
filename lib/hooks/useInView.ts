"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** IntersectionObserver threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** Root margin string. Default: "0px 0px -40px 0px" (triggers slightly before fully visible) */
  rootMargin?: string;
  /** If true, stays visible once triggered (no re-hide). Default: true */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook replacing framer-motion.
 * Respects prefers-reduced-motion — returns `true` immediately when
 * the user prefers reduced motion, rendering content in its final state.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Respect reduced motion: show immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      requestAnimationFrame(() => setIsInView(true));
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
