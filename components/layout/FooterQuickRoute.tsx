"use client";

import React, { useState, useTransition, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  HeartHandshake, 
  Heart, 
  HelpCircle, 
  PhoneCall, 
  FileText, 
  Search, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { siteSettings } from "@/lib/data/site-settings";

export interface CommunityResourceCandidate {
  id: string;
  category: "health" | "relief" | "transparency" | "volunteer" | "programmes" | "governance";
  label: string;
  destination: string;
  actionText: string;
  description: string;
  keywords: string[];
}

export interface JevCommunityJudgment {
  candidate: CommunityResourceCandidate;
  choiceConfidence: number; // 0.0 - 1.0
  alternativeCandidate?: CommunityResourceCandidate;
  alternativeConfidence?: number;
  isUrgentNoul: number; // 0.0 - 1.0
  isDonorNoul: number; // 0.0 - 1.0
  specificityScore: 1 | 2 | 3 | 4 | 5;
}

const RESOURCE_CANDIDATES: CommunityResourceCandidate[] = [
  {
    id: "health-centres",
    category: "health",
    label: "Community Health Connect & Local Clinics",
    destination: "/programmes/community-health-connect",
    actionText: "View Health Centres & Services",
    description: "Connects residents to 18 local healthcare hubs, maternal care, primary consultations, and preventative medicine in Manipur.",
    keywords: ["health", "clinic", "doctor", "medicine", "nurse", "checkup", "patient", "wellness", "immunization", "hubs", "subcenter", "telemedicine", "hospital", "sick", "prescription"]
  },
  {
    id: "emergency-relief",
    category: "relief",
    label: "Emergency Assistance & Crisis Relief",
    destination: "/get-help",
    actionText: "Request Community Assistance",
    description: "Direct frontline assistance for families facing displacement, medical distress, severe flooding, or critical supply shortages.",
    keywords: ["emergency", "relief", "crisis", "flood", "disaster", "supplies", "shelter", "food", "ambulance", "urgent", "help", "danger", "cut off", "immediate", "injured"]
  },
  {
    id: "transparency-audit",
    category: "transparency",
    label: "Open Ledger & Audited Financial Reports",
    destination: "/open-ledger",
    actionText: "Inspect Audited Accounts",
    description: "Every rupee received and spent is transparently recorded. Download audit statements, 80G tax exemptions, and hourly project allocations.",
    keywords: ["ledger", "money", "funds", "audit", "accounts", "expenditure", "rupee", "spending", "finance", "donation tracking", "transparency", "balance", "receipts", "inr", "tax exemption", "80g"]
  },
  {
    id: "volunteer-deployment",
    category: "volunteer",
    label: "Volunteer With Our Grassroots Network",
    destination: "/volunteer",
    actionText: "Join Volunteer Network",
    description: "Contribute your time, teaching skills, technical engineering, or medical training to support community initiatives across Manipur.",
    keywords: ["volunteer", "join", "help out", "skills", "teach", "fellowship", "fieldwork", "contribute time", "youth mentor", "apply"]
  },
  {
    id: "solar-livelihoods",
    category: "programmes",
    label: "Local Enterprise & Clean Solar Power",
    destination: "/programmes/local-enterprise-lab",
    actionText: "Explore Clean Energy & Livelihoods",
    description: "Decentralized solar microgrids providing uninterrupted power to community health clinics, artisans, and rural enterprises.",
    keywords: ["solar", "energy", "power", "grid", "microgrid", "electricity", "battery", "cold chain", "artisan", "cooperative", "enterprise", "livelihoods", "farmers"]
  },
  {
    id: "green-ecology",
    category: "programmes",
    label: "Green Manipur Lab & Ecological Conservation",
    destination: "/programmes/green-manipur-lab",
    actionText: "Explore Environmental Action",
    description: "Community tree restoration, indigenous heirloom seed conservation, watershed preservation, and neighbourhood recycling.",
    keywords: ["green", "ecology", "environment", "seeds", "trees", "forest", "nature", "conservation", "water", "soil", "organic", "biodiversity"]
  },
  {
    id: "youth-futureworks",
    category: "programmes",
    label: "FutureWorks Youth Mentorship & Digital Skills",
    destination: "/programmes/futureworks",
    actionText: "Explore Youth Programmes",
    description: "Hands-on project mentorship, digital education, and portfolio-building for Manipur's next generation of community leaders.",
    keywords: ["youth", "futureworks", "skills", "education", "training", "jobs", "students", "portfolio", "computer", "digital", "vocational"]
  },
  {
    id: "governance-leadership",
    category: "governance",
    label: "Governance, Board of Trustees & 1988 Charter",
    destination: "/about/governance",
    actionText: "View Governance & Bylaws",
    description: "Registered under the Manipur Societies Registration Act (1989). Independent board oversight, bylaws, and conflict-of-interest policies.",
    keywords: ["governance", "board", "trustees", "bylaws", "legal", "registration", "fcra", "ngo", "charter", "society", "trust", "leadership"]
  },
  {
    id: "donate-grassroots",
    category: "transparency",
    label: "Donate to Community Resilience (80G Tax-Exempt)",
    destination: "/donate",
    actionText: "Make a Contribution",
    description: "Directly fund grassroots medical kits, school supplies, clean water, and solar installations. All Indian donations qualify for 50% tax deduction under Section 80G.",
    keywords: ["donate", "give", "contribution", "support", "fund", "upi", "bank transfer", "80g", "tax deduction", "sponsor"]
  }
];

function evaluateJevCommunityIntent(rawQuery: string): JevCommunityJudgment | null {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return null;

  // 1. Primitive: Noul (Urgent Need Assessment)
  const urgentKeywords = ["emergency", "urgent", "crisis", "sos", "ambulance", "hospital", "medicine", "danger", "cut off", "flood", "injured", "distress", "immediate", "bleeding", "food shortage"];
  let urgentHits = 0;
  for (const uk of urgentKeywords) {
    if (query.includes(uk)) urgentHits += 1;
  }
  const isUrgentNoul = urgentHits > 0 ? Math.min(0.96, 0.65 + urgentHits * 0.12) : 0.05;

  // 2. Primitive: Noul (Donor / Tax Intent)
  const donorKeywords = ["donate", "tax", "80g", "receipt", "contribution", "give", "support", "exemption", "upi"];
  let donorHits = 0;
  for (const dk of donorKeywords) {
    if (query.includes(dk)) donorHits += 1;
  }
  const isDonorNoul = donorHits > 0 ? Math.min(0.95, 0.60 + donorHits * 0.12) : 0.08;

  // 3. Primitive: Score (Query Specificity)
  const words = query.split(/\s+/).filter(Boolean);
  let specificityScore: 1 | 2 | 3 | 4 | 5 = 1;
  if (words.length >= 7 || /imphal|churachandpur|80g|seed|clinic|solar|futureworks/i.test(query)) {
    specificityScore = 5;
  } else if (words.length >= 4) {
    specificityScore = 4;
  } else if (words.length >= 3) {
    specificityScore = 3;
  } else if (words.length >= 2) {
    specificityScore = 2;
  }

  // 4. Primitive: Choice (Candidate Ranking)
  const scoredCandidates = RESOURCE_CANDIDATES.map((candidate) => {
    let score = 0;
    for (const kw of candidate.keywords) {
      if (query === kw) {
        score += 8;
      } else if (query.includes(kw)) {
        score += 4;
      } else {
        for (const w of words) {
          if (w.length >= 3 && kw.includes(w)) {
            score += 1.5;
          }
        }
      }
    }

    if (candidate.category === "relief" && isUrgentNoul > 0.6) score += 6;
    if (candidate.id === "donate-grassroots" && isDonorNoul > 0.6) score += 5;

    return { candidate, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);
  const best = scoredCandidates[0];
  const second = scoredCandidates[1];

  if (!best || best.score <= 1) {
    return {
      candidate: {
        id: "general-overview",
        category: "programmes",
        label: "About One Vision & Our Community Mission",
        destination: "/about",
        actionText: "Read About Our Work",
        description: "Learn about our history serving Manipur since 1988 and our 5 core initiatives across health, youth, and ecology.",
        keywords: []
      },
      choiceConfidence: 0.65,
      isUrgentNoul,
      isDonorNoul,
      specificityScore
    };
  }

  const choiceConfidence = Math.min(0.98, Math.max(0.70, 0.72 + best.score * 0.04));
  let alternativeCandidate: CommunityResourceCandidate | undefined;
  let alternativeConfidence: number | undefined;

  if (second && second.score >= best.score * 0.45 && second.candidate.id !== best.candidate.id) {
    alternativeCandidate = second.candidate;
    alternativeConfidence = Math.min(0.85, 0.52 + second.score * 0.03);
  }

  return {
    candidate: best.candidate,
    choiceConfidence,
    alternativeCandidate,
    alternativeConfidence,
    isUrgentNoul,
    isDonorNoul,
    specificityScore
  };
}

export function FooterQuickRoute() {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [judgment, setJudgment] = useState<JevCommunityJudgment | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (val: string) => {
    setQuery(val);
    startTransition(() => {
      setJudgment(evaluateJevCommunityIntent(val));
    });
  };

  const handleSelectChip = (sampleText: string) => {
    setQuery(sampleText);
    startTransition(() => {
      setJudgment(evaluateJevCommunityIntent(sampleText));
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
      aria-labelledby="community-guide-heading"
      className="w-full bg-muted/20 border border-border p-6 lg:p-8 mb-12 relative transition-all duration-300 rounded-[2px]"
    >
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="size-2 rounded-full bg-primary" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
              Community Resource Guide
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="font-sans text-xs text-muted-foreground">
              Intelligent Community Matching
            </span>
          </div>
          <h2 id="community-guide-heading" className="font-serif text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            How can we help you or your community?
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
            Search for local health centres, relief assistance, volunteer pathways, or download verified 80G audit statements.
          </p>
        </div>

        {/* Friendly Suggestion Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-sans text-xs text-muted-foreground mr-1">
            Common questions:
          </span>
          {[
            { label: "Find a Health Centre", q: "Where can I find a community clinic in Imphal or nearby districts?" },
            { label: "Urgent Relief Help", q: "Emergency food or medicine assistance for families in need" },
            { label: "Donate (80G Tax Receipt)", q: "How to donate and receive 80G tax exemption certificate" },
            { label: "Volunteer in Manipur", q: "How can I join fieldwork and volunteer my skills?" }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectChip(item.q)}
              className="font-sans text-xs px-3 py-1.5 bg-background hover:bg-muted border border-border hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer rounded-[2px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            What community support or resource do you need?
          </label>
          <div className="absolute left-4 pointer-events-none text-muted-foreground">
            <Search className="size-4" />
          </div>
          <input
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question (e.g., 'Where is the nearest medical clinic?' or 'How do I get an 80G tax receipt?')..."
            className="w-full bg-background border border-border pl-11 pr-24 py-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-colors rounded-[2px]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setJudgment(null);
              }}
              className="absolute right-3 font-sans text-xs text-muted-foreground hover:text-foreground px-2 py-1 cursor-pointer transition-colors"
            >
              Clear
            </button>
          ) : (
            <span className="absolute right-3 font-sans text-xs text-muted-foreground/60 pointer-events-none hidden sm:inline">
              Press [Enter ↵]
            </span>
          )}
        </div>

        {/* Dynamic Matched Community Guidance Card */}
        {judgment && query.trim().length > 1 && (
          <div 
            aria-live="polite"
            className="mt-4 p-5 sm:p-6 bg-card border border-border flex flex-col gap-4 animate-in fade-in-50 duration-200 rounded-[2px]"
          >
            {/* Urgent Community Banner (if emergency is detected) */}
            {judgment.isUrgentNoul > 0.6 && (
              <div className="p-3.5 bg-destructive/10 border border-destructive/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-destructive rounded-[2px]">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="size-4 shrink-0" />
                  <span className="font-sans text-xs font-semibold">
                    Urgent Need Detected: For emergency medical relief or crisis response, please call our direct hotline immediately.
                  </span>
                </div>
                <a
                  href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground font-sans text-xs font-semibold rounded-[2px] shrink-0"
                >
                  <PhoneCall className="size-3.5" />
                  <span>Call {siteSettings.contactPhone}</span>
                </a>
              </div>
            )}

            {/* Matched Community Resource */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span className="font-sans text-xs font-semibold text-primary">
                    Recommended Community Resource
                  </span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {(judgment.choiceConfidence * 100).toFixed(0)}% Match
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground tracking-tight">
                  {judgment.candidate.label}
                </h3>
                <p className="font-sans text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  {judgment.candidate.description}
                </p>

                {/* Alternative suggestion if relevant */}
                {judgment.alternativeCandidate && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-muted-foreground">Also relevant:</span>
                    <Link
                      href={judgment.alternativeCandidate.destination}
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>{judgment.alternativeCandidate.label}</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="shrink-0">
                <Link
                  href={judgment.candidate.destination}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs sm:text-[13px] font-semibold transition-colors duration-200 rounded-[2px]"
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
