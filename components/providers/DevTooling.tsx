"use client";

import { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";

/**
 * DevTooling Provider (Zero-cost in Production)
 *
 * Automatically mounts:
 * 1. react-scan: Overlays real-time re-render counters and highlights on components
 * 2. @axe-core/react: Continuously audits DOM for WCAG 2.1 AA accessibility violations
 *
 * Gated strictly to development mode and client execution to guarantee zero bundle bloat in production.
 */
export function DevTooling() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof window === "undefined") {
      return;
    }

    // 1. Initialize react-scan
    import("react-scan")
      .then(({ scan }) => {
        scan({
          enabled: true,
          log: false, // Keep browser console noise minimal; react-scan badge handles visuals
        });
      })
      .catch((err) => {
        console.warn("[DevTooling] react-scan could not be loaded:", err);
      });

    // 2. Initialize @axe-core/react
    import("@axe-core/react")
      .then((axe) => {
        axe.default(React, ReactDOM, 1000);
      })
      .catch((err) => {
        console.warn("[DevTooling] @axe-core/react could not be loaded:", err);
      });
  }, []);

  return null;
}
