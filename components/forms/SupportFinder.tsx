"use client";

import { useState } from"react";
import { Button } from"@/components/ui/button";
import { programmes } from"@/lib/data/programmes";
import Link from"next/link";
import { trackEvent } from"@/lib/analytics/trackEvent";
import { ArrowRight, ChevronRight, RefreshCcw } from"lucide-react";

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

 const matchedProgrammes = programmes.filter(
 (p) => p.category === category || category ==="Other",
 );

 if (step === 3) {
 return (
 <div className="bg-muted p-8 md:p-12 border border-border w-full">
 <h3 className="font-sans text-heading-xl font-semibold text-foreground mb-4">
 Recommended Resources
 </h3>
 <p className="text-body-lg max-w-prose text-muted-foreground font-light mb-10 leading-relaxed">
 Based on your selection, here are the most relevant active programmes
 and resources available in your area.
 </p>

 {matchedProgrammes.length > 0 ? (
 <div className="grid grid-cols-1 gap-4 mb-12">
 {matchedProgrammes.map((p) => (
 <Link
 key={p.id}
 href={`/programmes/${p.slug}`}
 className="group p-6 bg-muted border border-transparent hover:border-primary hover:bg-background transition-all flex justify-between items-center"
 >
 <div>
 <h4 className="font-sans text-heading-md font-medium text-foreground group-hover:text-primary transition-colors mb-2">
 {p.title}
 </h4>
 <p className="text-body-sm max-w-prose text-muted-foreground">{p.location}</p>
 </div>
 <div className="size-10 flex items-center justify-center shrink-0 border border-border group-hover:border-primary transition-colors">
 <ArrowRight className="size-4 text-foreground group-hover:text-primary transition-colors" />
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="p-8 bg-muted border border-dashed border-border text-center mb-12">
 <p className="text-body max-w-prose text-muted-foreground font-light">
 No specific programmes match this exactly right now, but please
 contact us directly so we can assist you.
 </p>
 </div>
 )}

 <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div>
 <h4 className="font-sans text-heading-md font-medium text-foreground mb-2">
 Need direct assistance?
 </h4>
 <p className="text-body-sm max-w-prose text-muted-foreground font-light">
 If this is an emergency, contact our support team directly.
 </p>
 </div>
 <Button
 nativeButton={false}
 className="shrink-0"
 render={<Link href="/contact" />}
 >
 Contact Us
 </Button>
 </div>
 </div>
 );
 }

 return (
 <div className="bg-muted p-8 md:p-12 border border-border w-full">
 <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
 <span className="text-caption tracking-widest uppercase text-foreground font-semibold">
 Step {step} of 2
 </span>
 <button
 onClick={() => setStep(1)}
 disabled={step === 1}
 className="flex items-center gap-2 text-caption tracking-widest uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors font-medium"
 >
 <RefreshCcw className="size-3" />
 Reset
 </button>
 </div>

 {step === 1 && (
 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
 <h3 className="font-sans text-heading-lg font-semibold text-foreground leading-tight mb-8">
 What kind of support are you looking for?
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
"Health",
"Education",
"Community",
"Emergency Response",
"Relief Supply",
"Other",
 ].map((cat) => (
 <button
 key={cat}
 className="group flex items-center justify-between p-6 border border-border hover:border-primary hover:bg-muted/80 transition-colors bg-muted text-left"
 onClick={() => handleCategorySelect(cat)}
 >
 <span className="font-sans text-body font-medium text-foreground group-hover:text-primary transition-colors">
 {cat}
 </span>
 <ChevronRight className="size-4 text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
 </button>
 ))}
 </div>
 </div>
 )}

 {step === 2 && (
 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
 <h3 className="font-sans text-heading-lg font-semibold text-foreground leading-tight mb-8">
 Who is this support for?
 </h3>
 <div className="grid grid-cols-1 gap-4">
 {[
"Myself",
"My family",
"A community member",
"Multiple families / A whole community",
 ].map((ben) => (
 <button
 key={ben}
 className="group flex items-center justify-between p-6 border border-border hover:border-primary hover:bg-muted/80 transition-colors bg-muted text-left"
 onClick={() => handleBeneficiarySelect(ben)}
 >
 <span className="font-sans text-body font-medium text-foreground group-hover:text-primary transition-colors">
 {ben}
 </span>
 <ChevronRight className="size-4 text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 );
}
