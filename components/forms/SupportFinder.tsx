"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { programmes } from "@/lib/data/programmes";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/trackEvent";

export function SupportFinder() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");

  const handleCategorySelect = (selected: string) => {
    setCategory(selected);
    trackEvent("help_request_start", { category: selected });
    setStep(2);
  };

  const handleBeneficiarySelect = (selected: string) => {
    trackEvent("help_request_complete", { category, beneficiary: selected });
    setStep(3);
  };

  const matchedProgrammes = programmes.filter(p => p.category === category || category === "Other");

  if (step === 3) {
    return (
      <div className="bg-white p-8 border border-ink/10 rounded-none max-w-2xl mx-auto w-full">
        <h3 className="font-fraunces text-2xl font-light mb-4">Recommended Resources</h3>
        <p className="font-inter text-ink/70 mb-8">
          Based on your selection, here are the most relevant active programmes and resources.
        </p>
        
        {matchedProgrammes.length > 0 ? (
          <div className="space-y-4">
            {matchedProgrammes.map(p => (
              <div key={p.id} className="p-4 bg-mist rounded-none border border-ink/5 flex justify-between items-center">
                <div>
                  <h4 className="font-fraunces font-bold">{p.title}</h4>
                  <p className="text-sm text-ink/70">{p.location}</p>
                </div>
                <Link href={`/programmes/${p.slug}`} className="text-sm font-medium text-forest hover:underline">
                  View details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink/70 italic bg-mist p-4 rounded">No specific programmes match this exactly right now, but please contact us directly so we can assist you.</p>
        )}
        
        <div className="mt-8 pt-8 border-t border-ink/10">
          <h4 className="font-fraunces font-bold mb-2">Need direct assistance?</h4>
          <p className="text-sm mb-4">If this is an emergency, please use our contact form or call our 24/7 hotline.</p>
          <Link href="/contact" className="inline-flex h-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 text-sm font-medium transition-colors">
            Contact Support Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 border border-ink/10 rounded-none max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs uppercase tracking-widest text-ink/40 font-bold">Step {step} of 2</span>
        <button 
          onClick={() => setStep(1)} 
          disabled={step === 1}
          className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink disabled:opacity-30 disabled:hover:text-ink/40"
        >
          Reset
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="font-fraunces text-2xl md:text-3xl font-light">What kind of support are you looking for?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Health", "Education", "Community", "Emergency Response", "Other"].map(cat => (
              <Button 
                key={cat} 
                variant="outline" 
                className="h-auto py-4 justify-start font-inter"
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-fraunces text-2xl md:text-3xl font-light">Who is this support for?</h3>
          <div className="grid grid-cols-1 gap-4">
            {["Myself", "My family", "A community member", "Multiple families / A whole community"].map(ben => (
              <Button 
                key={ben} 
                variant="outline" 
                className="h-auto py-4 justify-start font-inter"
                onClick={() => handleBeneficiarySelect(ben)}
              >
                {ben}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
