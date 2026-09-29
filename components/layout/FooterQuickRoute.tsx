"use client";

import React, { useState, useTransition, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  CornerDownLeft, 
  ShieldAlert, 
  Activity, 
  Compass, 
  Sparkles, 
  Check, 
  Flame, 
  Layers, 
  FileText, 
  PhoneCall, 
  ExternalLink 
} from "lucide-react";
import { siteSettings } from "@/lib/data/site-settings";

export interface RouteCandidate {
  id: string;
  category: "emergency" | "transparency" | "programmes" | "volunteer" | "governance" | "funding";
  label: string;
  destination: string;
  actionText: string;
  rationale: string;
  keywords: string[];
}

export interface JevJudgment {
  // Choice primitive: chosen destination from discrete set
  candidate: RouteCandidate;
  choiceConfidence: number; // 0.0 to 1.0 calibrated confidence

  // Distribution runner-up (if competitive)
  alternativeCandidate?: RouteCandidate;
  alternativeConfidence?: number;

  // Noul primitive 1: Urgent distress probability
  isUrgentNoul: number; // 0.0 to 1.0

  // Noul primitive 2: Transparency / audit verification need
  isAuditNoul: number; // 0.0 to 1.0

  // Score primitive: Specificity level (1 = broad/exploratory, 5 = exact entity)
  specificityScore: 1 | 2 | 3 | 4 | 5;
}

const CANDIDATE_ROUTES: RouteCandidate[] = [
  {
    id: "emergency-triage",
    category: "emergency",
    label: "Emergency Medical & Relief Triage",
    destination: "/get-help",
    actionText: "Open Frontline Assistance Node",
    rationale: "Matches acute humanitarian needs, patient distress, emergency medicine, cold-chain transport, or crisis relief.",
    keywords: ["emergency", "help", "crisis", "medicine", "doctor", "triage", "ambulance", "food", "shelter", "supplies", "urgent", "relief", "hospital", "clinic", "injured", "distress", "immediate"]
  },
  {
    id: "open-ledger",
    category: "transparency",
    label: "Open Ledger & Rupee Accounting",
    destination: "/open-ledger",
    actionText: "Inspect Hourly Expenditure",
    rationale: "Matches financial transparency, live rupee expenditure audits, fund tracking, or donor oversight requests.",
    keywords: ["ledger", "money", "funds", "audit", "accounts", "expenditure", "rupee", "spending", "finance", "donation tracking", "transparency", "balance", "receipts", "inr", "bookkeeping", "expenses"]
  },
  {
    id: "volunteer-action",
    category: "volunteer",
    label: "Fieldwork Deployment & Volunteer Network",
    destination: "/volunteer",
    actionText: "Access Volunteer Deployment",
    rationale: "Matches skills contribution, technical engineering volunteering, community mentorship, or grassroots field deployment.",
    keywords: ["volunteer", "join", "help out", "skills", "teach", "technician", "solar volunteer", "fieldwork", "deploy", "contribute time", "internship", "fellowship", "apply"]
  },
  {
    id: "solar-energy",
    category: "programmes",
    label: "240kW Microgrid Infrastructure",
    destination: "/programmes/local-enterprise-lab",
    actionText: "View Decentralized Power Ops",
    rationale: "Matches rural energy independence, off-grid battery installations, photovoltaic arrays, or power reliability.",
    keywords: ["solar", "energy", "power", "grid", "microgrid", "electricity", "battery", "cold chain", "generator", "watts", "kw", "pv", "blackout", "inverter"]
  },
  {
    id: "health-nodes",
    category: "programmes",
    label: "18 Decentralized Health Nodes",
    destination: "/programmes/community-health-connect",
    actionText: "Review Primary Health Network",
    rationale: "Matches primary healthcare hubs, sub-district clinic nodes, maternal care, or telemedicine field stations.",
    keywords: ["health", "clinic", "node", "telemedicine", "nurse", "checkup", "patient", "wellness", "immunization", "hubs", "subcenter", "diagnostic", "telehealth"]
  },
  {
    id: "field-reports",
    category: "governance",
    label: "Verified Operational Audits & Dispatches",
    destination: "/stories",
    actionText: "Browse Field Dispatches",
    rationale: "Matches verified ground reports, beneficiary testimonials, operational case studies, or archival field dispatches.",
    keywords: ["stories", "reports", "audit", "field report", "dispatch", "evidence", "case study", "documentation", "impact", "testimonials", "ground truth", "history"]
  },
  {
    id: "governance-bylaws",
    category: "governance",
    label: "Board & Conflict of Interest Policies",
    destination: "/about/governance",
    actionText: "Review NGO Governance",
    rationale: "Matches FCRA compliance, board of trustees, legal registration, conflict of interest safeguards, or bylaws.",
    keywords: ["board", "governance", "bylaws", "trustees", "legal", "registration", "conflict of interest", "fcra", "ngo", "charter", "officers", "trust", "policy"]
  },
  {
    id: "community-data",
    category: "programmes",
    label: "Community Data Lab & Public Metrics",
    destination: "/programmes/community-data-lab",
    actionText: "Explore Data Lab Assets",
    rationale: "Matches community surveys, baseline indicators, open data telemetry, or regional health research.",
    keywords: ["data", "metrics", "telemetry", "census", "survey", "open source", "sensors", "monitoring", "statistics", "dataset", "api"]
  },
  {
    id: "donation-direct",
    category: "funding",
    label: "Direct Grassroots Support & UPI Giving",
    destination: "/donate",
    actionText: "Support Operational Costs",
    rationale: "Matches direct giving, tax-exempt 80G donations, programmatic sponsorship, or infrastructure funding.",
    keywords: ["donate", "give", "contribution", "support", "fund", "upi", "bank transfer", "tax exemption", "80g", "sponsor", "contribute money"]
  }
];

// Jev-style typed scoring function: Evaluates Choice, Noul, and Score primitives
function evaluateJevJudgment(rawQuery: string): JevJudgment | null {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return null;

  // 1. Primitive: Noul (Urgent Distress Indicator)
  const urgentKeywords = ["emergency", "urgent", "crisis", "sos", "ambulance", "hospital", "medicine", "danger", "cut off", "flood", "injured", "distress", "immediate", "bleeding", "starving"];
  let urgentHits = 0;
  for (const uk of urgentKeywords) {
    if (query.includes(uk)) urgentHits += 1;
  }
  const isUrgentNoul = urgentHits > 0 ? Math.min(0.96, 0.65 + urgentHits * 0.12) : 0.05;

  // 2. Primitive: Noul (Audit / Transparency Indicator)
  const auditKeywords = ["ledger", "audit", "accounts", "funds", "receipts", "expenditure", "rupee", "fraud", "corruption", "bylaws", "fcra", "spending", "balance"];
  let auditHits = 0;
  for (const ak of auditKeywords) {
    if (query.includes(ak)) auditHits += 1;
  }
  const isAuditNoul = auditHits > 0 ? Math.min(0.95, 0.60 + auditHits * 0.12) : 0.08;

  // 3. Primitive: Score (Specificity level: 1 to 5)
  const words = query.split(/\s+/).filter(Boolean);
  let specificityScore: 1 | 2 | 3 | 4 | 5 = 1;
  if (words.length >= 8 || /node \d+|240kw|fcra|80g|imphal|churachandpur/i.test(query)) {
    specificityScore = 5;
  } else if (words.length >= 5) {
    specificityScore = 4;
  } else if (words.length >= 3) {
    specificityScore = 3;
  } else if (words.length >= 2) {
    specificityScore = 2;
  }

  // 4. Primitive: Choice (Candidate Ranking & Probability Distribution)
  const scoredCandidates = CANDIDATE_ROUTES.map((candidate) => {
    let score = 0;
    for (const kw of candidate.keywords) {
      if (query === kw) {
        score += 8; // Exact keyword match
      } else if (query.includes(kw)) {
        score += 4; // Substring match
      } else {
        // Partial word match
        for (const w of words) {
          if (w.length >= 3 && kw.includes(w)) {
            score += 1.5;
          }
        }
      }
    }

    // Boost emergency candidate if urgent Noul is high
    if (candidate.category === "emergency" && isUrgentNoul > 0.6) {
      score += 6;
    }
    // Boost open ledger if audit Noul is high
    if (candidate.category === "transparency" && isAuditNoul > 0.6) {
      score += 5;
    }

    return { candidate, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  const best = scoredCandidates[0];
  const second = scoredCandidates[1];

  // If no good match, provide calm general overview fallback
  if (!best || best.score <= 1) {
    return {
      candidate: {
        id: "general-inquiry",
        category: "programmes",
        label: "Grassroots Operations & Founding Charter",
        destination: "/about",
        actionText: "Explore Operational Mandate",
        rationale: "Exploratory query mapped to the foundational charter, history, and community programmes overview.",
        keywords: []
      },
      choiceConfidence: 0.62,
      isUrgentNoul,
      isAuditNoul,
      specificityScore
    };
  }

  // Calibrate confidence distribution
  const choiceConfidence = Math.min(0.98, Math.max(0.68, 0.70 + best.score * 0.04));
  let alternativeCandidate: RouteCandidate | undefined;
  let alternativeConfidence: number | undefined;

  if (second && second.score >= best.score * 0.45 && second.candidate.id !== best.candidate.id) {
    alternativeCandidate = second.candidate;
    alternativeConfidence = Math.min(0.85, 0.50 + second.score * 0.03);
  }

  return {
    candidate: best.candidate,
    choiceConfidence,
    alternativeCandidate,
    alternativeConfidence,
    isUrgentNoul,
    isAuditNoul,
    specificityScore
  };
}

export function FooterQuickRoute() {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [judgment, setJudgment] = useState<JevJudgment | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (val: string) => {
    setQuery(val);
    startTransition(() => {
      setJudgment(evaluateJevJudgment(val));
    });
  };

  const handleSelectChip = (sampleText: string) => {
    setQuery(sampleText);
    startTransition(() => {
      setJudgment(evaluateJevJudgment(sampleText));
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && judgment) {
      e.preventDefault();
      router.push(judgment.candidate.destination);
    } else if (e.key === "Escape") {
      setQuery("");
      setJudgment(null);
    }
  };

  return (
    <section 
      aria-labelledby="quick-route-heading"
      className="w-full bg-muted/20 border border-border p-6 lg:p-8 mb-14 relative group transition-all duration-300"
    >
      {/* Header & Meta Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
            <Compass className="size-3.5" aria-hidden="true" />
            <span>Fast Operational Dispatch</span>
            <span className="size-1 bg-border rounded-full" />
            <span className="text-muted-foreground font-normal">TypeSafe Jev System One</span>
          </div>
          <h2 id="quick-route-heading" className="font-serif text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            Direct Intent Navigator
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
            State your frontline requirement, verification inquiry, or resource query. Jev returns a calibrated typed routing judgment.
          </p>
        </div>

        {/* Quick Sample Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
            Intent Prompts:
          </span>
          {[
            { label: "Crisis Triage", q: "Emergency clinic and medical relief near Imphal" },
            { label: "Hourly Ledger", q: "Show me live rupee expenditure and audits" },
            { label: "Solar Grid", q: "240kW microgrid battery telemetry and solar ops" },
            { label: "Volunteer Deploy", q: "How can I join fieldwork and deploy skills?" }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectChip(item.q)}
              className="font-mono text-[11px] px-2.5 py-1 bg-background hover:bg-muted border border-border hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field Section */}
      <div className="pt-6">
        <div className="relative flex items-center w-full">
          <label htmlFor={inputId} className="sr-only">
            What operational resource or assistance do you need?
          </label>
          <input
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your inquiry (e.g. 'Emergency clinic near Imphal West' or 'Download audited balance sheet')..."
            className="w-full bg-background border border-border px-4 py-3.5 pr-20 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setJudgment(null);
              }}
              className="absolute right-3 font-mono text-xs text-muted-foreground hover:text-foreground px-2 py-1 cursor-pointer transition-colors"
            >
              Clear [Esc]
            </button>
          ) : (
            <span className="absolute right-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 pointer-events-none hidden sm:inline">
              Press [Enter ↵]
            </span>
          )}
        </div>

        {/* Dynamic Typed Jev System One Judgement View */}
        {judgment && query.trim().length > 1 && (
          <div 
            aria-live="polite"
            className="mt-4 p-5 sm:p-6 bg-card border border-border flex flex-col gap-4 animate-in fade-in-50 duration-200"
          >
            {/* Jev System One Telemetry Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border text-[10px] font-mono">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-primary">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  Choice: [{judgment.candidate.category.toUpperCase()}]
                </span>
                <span className="text-border">|</span>
                <span className="text-muted-foreground">
                  Confidence: <span className="text-foreground font-semibold">{(judgment.choiceConfidence * 100).toFixed(0)}%</span>
                </span>
                <span className="text-border">|</span>
                <span className="text-muted-foreground">
                  Specificity: <span className="text-foreground font-semibold">{judgment.specificityScore}/5</span>
                </span>
                {judgment.isAuditNoul > 0.5 && (
                  <>
                    <span className="text-border">|</span>
                    <span className="text-primary font-semibold">
                      Audit Intent: {(judgment.isAuditNoul * 100).toFixed(0)}%
                    </span>
                  </>
                )}
              </div>

              {judgment.isUrgentNoul > 0.6 && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-destructive/10 border border-destructive/30 text-destructive font-bold uppercase tracking-wider">
                  <Flame className="size-3" />
                  <span>High Urgency Detected ({Math.round(judgment.isUrgentNoul * 100)}%)</span>
                </div>
              )}
            </div>

            {/* Main Destination Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground tracking-tight">
                  {judgment.candidate.label}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  {judgment.candidate.rationale}
                </p>

                {/* Alternative suggestion if competitive */}
                {judgment.alternativeCandidate && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80">Also Relevant:</span>
                    <Link
                      href={judgment.alternativeCandidate.destination}
                      className="text-primary hover:underline font-sans text-xs inline-flex items-center gap-1"
                    >
                      <span>{judgment.alternativeCandidate.label}</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                {judgment.isUrgentNoul > 0.6 && (
                  <a
                    href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 text-destructive font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-200"
                  >
                    <PhoneCall className="size-3.5" />
                    <span>Direct Call Helpline</span>
                  </a>
                )}
                
                <Link
                  href={judgment.candidate.destination}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-200"
                >
                  <span>{judgment.candidate.actionText}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
