"use client";

import * as React from"react";
import { useState, useEffect, useRef } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { Sparkles } from "lucide-react";
import { AgentChat } from "@/components/ai/agent-chat";
import { cn } from "@/lib/utils";

const AGENT_CHAT_OPEN_EVENT = "open-agent-chat";

/**
 * Programmatically open the floating AI assistant dialog from any component.
 * @public
 */
export function openAgentChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AGENT_CHAT_OPEN_EVENT));
  }
}

export function FloatingAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Listen for global open triggers
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(AGENT_CHAT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(AGENT_CHAT_OPEN_EVENT, handleOpen);
  }, []);

  // Listen for Escape key to close dialog and handle Focus Trapping
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      // Focus the textarea when opened
      const timer = setTimeout(() => {
        const input = dialogRef.current?.querySelector('textarea') as HTMLTextAreaElement;
        if (input) input.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        } else if (e.key === "Tab" && dialogRef.current) {
          const focusableElements = dialogRef.current.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
        if (prevFocusRef.current) {
          prevFocusRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Beacon Button - hidden when dialog is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden"
          >
            <motion.button
              ref={triggerRef}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open Community Guide Assistant"
              title="Open Community Guide Assistant"
              aria-expanded={false}
              className="group relative flex items-center justify-center size-10 sm:size-11 bg-card text-foreground border border-border hover:border-primary/60 shadow-md hover:shadow-lg rounded-none transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
            >
              <Sparkles className="size-4.5 sm:size-5 text-primary group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              <span className="sr-only">Open Community Guide Assistant</span>
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-none bg-emerald-500 animate-pulse" aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dialog Type UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing on click-outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/20 z-40"
              aria-hidden="true"
            />

            {/* Anchored Dialog Container */}
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label="One Vision AI Assistant"
              className={cn(
                "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
                "w-[calc(100vw-2rem)] sm:w-105 md:w-110",
                "h-125 sm:h-135 max-h-[calc(100dvh-3rem)]",
                "border border-border/80 bg-background shadow-2xl rounded-none",
                "flex flex-col overflow-hidden dark:border-border dark:bg-foreground/95"
              )}
            >
              <AgentChat isDialog={true} onClose={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
