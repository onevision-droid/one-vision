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

    // 2. Initialize @axe-core/react only when explicitly requested (e.g. ?a11y=true or localStorage flag)
    // Continuous runtime axe scans block the main thread for ~1000ms ("other time: 1017ms" in React Scan)
    const isAxeRequested =
      window.location.search.includes("a11y=true") ||
      (typeof localStorage !== "undefined" && localStorage.getItem("ENABLE_AXE_RUNTIME") === "true");

    if (isAxeRequested) {
      import("@axe-core/react")
        .then((axe) => {
          axe.default(React, ReactDOM, 2000, undefined, {
            exclude: [["#react-scan-root"], ["[data-react-scan]"]],
          });
        })
        .catch((err) => {
          console.warn("[DevTooling] @axe-core/react could not be loaded:", err);
        });
    }

    // 3. Patch react-scan's internal a11y labels without expensive full-DOM subtree observation
    const patchScanRoot = () => {
      const scanRoot = document.getElementById("react-scan-root");
      if (!scanRoot) return false;
      const btn = scanRoot.querySelector("button:not([aria-label])");
      if (btn) btn.setAttribute("aria-label", "Toggle React Scan Settings");
      const checkboxes = scanRoot.querySelectorAll('input[type="checkbox"][title]:not([aria-label])');
      checkboxes.forEach((cb) => {
        cb.setAttribute("aria-label", cb.getAttribute("title") || "Toggle setting");
      });
      return true;
    };

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (patchScanRoot() || attempts > 20) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
}
