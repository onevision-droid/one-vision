"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import MiniSearch from "minisearch";

import { programmes } from "@/lib/data/programmes";
import { campaigns } from "@/lib/data/campaigns";
import { stories } from "@/lib/data/stories";
import { reports } from "@/lib/data/reports";
import { events } from "@/lib/data/events";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize MiniSearch once
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch({
      fields: ["title", "description", "category", "location", "excerpt", "content", "author", "type"],
      storeFields: ["_type", "_original", "_sectionId"],
      idField: "_uid",
      searchOptions: {
        prefix: true,
        fuzzy: 0.2,
      },
    });

    const allDocs: Record<string, unknown>[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addWithSections = (items: any[], type: string, prefix: string) => {
      items.forEach((item) => {
        allDocs.push({ ...item, _type: type, _uid: `${prefix}_${item.id}`, _original: item });
        if (item.sections && Array.isArray(item.sections)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          item.sections.forEach((sec: any) => {
            allDocs.push({
              _uid: `${prefix}_${item.id}_sec_${sec.id}`,
              _type: type,
              _original: item,
              _sectionId: sec.id,
              title: `${item.title} — ${sec.title}`,
              content: sec.content,
            });
          });
        }
      });
    };

    addWithSections(programmes, "programme", "prog");
    addWithSections(campaigns, "campaign", "camp");
    addWithSections(stories, "story", "story");
    addWithSections(reports, "report", "rep");
    addWithSections(events, "event", "evt");

    ms.addAll(allDocs);
    return ms;
  }, []);

  const rawResults = query ? miniSearch.search(query) : [];
  // Limit results to keep UI dense and fast
  const results = rawResults.slice(0, 15);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Clear state after exit animation to prevent content flashing
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getResultUrl = (result: any) => {
    const type = result._type;
    const item = result._original;
    const hash = result._sectionId ? `#${result._sectionId}` : "";
    
    switch (type) {
      case "programme": return `/programmes/${item.slug}${hash}`;
      case "campaign": return `/campaigns/${item.slug}${hash}`;
      case "story": return `/stories/${item.slug}${hash}`;
      case "report": return item.downloadUrl || "/reports";
      case "event": return `/events#${result._sectionId || item.slug}`;
      default: return "/";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectResult = (result: any) => {
    const url = getResultUrl(result);
    const isPdf = result._type === "report" && url.endsWith(".pdf");
    
    onClose();
    if (isPdf) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh] px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper border-2 border-ink-900 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden rounded-none"
            role="dialog"
            aria-modal="true"
          >
            {/* Input Header */}
            <div className="flex items-center border-b-2 border-ink-900 px-4 py-4 bg-surface">
              <Search className="size-5 text-ink-900 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search operations, reports, or field stories..."
                className="flex-1 bg-transparent border-none outline-none text-heading-sm font-sans text-ink-900 placeholder:text-ink-400 placeholder:font-light"
              />
              <button
                onClick={onClose}
                className="p-1 ml-2 text-ink-500 hover:text-ink-900 transition-colors shrink-0"
                aria-label="Close search"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Results Body */}
            <div ref={scrollRef} className="overflow-y-auto flex-1">
              {!query ? (
                <div className="p-10 text-center flex flex-col items-center justify-center">
                  <span className="text-caption uppercase tracking-widest text-ink-400 font-semibold mb-2">
                    Global Search
                  </span>
                  <p className="text-body-sm text-ink-500 font-light max-w-sm">
                    Enter a keyword to locate field data, resource requests, or official documentation.
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center justify-center">
                  <span className="text-caption uppercase tracking-widest text-safety-orange font-semibold mb-2">
                    0 Matches
                  </span>
                  <p className="text-body-sm text-ink-500 font-light">
                    No records found for &quot;{query}&quot;. Try broader terms.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col">
                  {results.map((result, index) => {
                    const isSelected = index === selectedIndex;
                    const item = result._original;
                    const url = getResultUrl(result);
                    const isPdf = result._type === "report" && url.endsWith(".pdf");
                    
                    return (
                      <li key={result.id}>
                        <Link
                          href={url}
                          target={isPdf ? "_blank" : undefined}
                          onMouseEnter={() => setSelectedIndex(index)}
                          onClick={onClose}
                          className={`w-full text-left px-5 py-4 flex items-start gap-4 border-b border-border-default transition-colors ${
                            isSelected ? "bg-ink-900 text-paper" : "bg-transparent text-ink-900 hover:bg-surface-alt"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 border ${
                                  isSelected
                                    ? "border-paper/40 text-paper/80"
                                    : "border-ink-900/20 text-ink-500"
                                } rounded-none`}
                              >
                                {result._type}
                              </span>
                              {result._type === "programme" && (
                                <span className={`text-caption font-semibold truncate ${isSelected ? "text-paper/60" : "text-ink-400"}`}>
                                  {item.location}
                                </span>
                              )}
                            </div>
                            <h4 className={`font-sans text-body-sm font-semibold truncate ${isSelected ? "text-paper" : "text-ink-900"}`}>
                              {item.title}
                            </h4>
                          </div>
                          {isSelected && (
                            <div className="shrink-0 flex items-center text-paper/60 mt-2">
                              <CornerDownLeft className="size-4" />
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border-default bg-surface px-4 py-3 flex items-center justify-between text-[11px] font-mono text-ink-500 uppercase tracking-widest">
              <span>{results.length} results</span>
              <div className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 border border-border-default bg-paper rounded-none">↑</kbd>
                  <kbd className="px-1.5 py-0.5 border border-border-default bg-paper rounded-none">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 border border-border-default bg-paper rounded-none">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 border border-border-default bg-paper rounded-none">ESC</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
