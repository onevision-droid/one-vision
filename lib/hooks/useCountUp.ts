"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true });

  useEffect(() => {
    if (!isInView) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setCount(end));
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const fraction = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * easeOutQuart(fraction)));

      if (fraction < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return { count, ref };
}
