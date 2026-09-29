"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-surface border border-border-default p-6 md:p-8 relative h-full flex flex-col justify-between">
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-ink-900 mb-2">Send a Message</h3>
        <p className="text-role-body text-ink-500 max-w-sm">
          For partnerships, general inquiries, or non-sensitive operations. 
          <span className="block mt-1 text-safety-orange font-semibold">Do not submit critical field data here.</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-ink-900">Name</label>
            <input 
              id="name" 
              type="text" 
              required
              className="w-full bg-background border border-border-default px-4 py-3 text-sm focus:outline-none focus:border-safety-orange focus:ring-1 focus:ring-safety-orange transition-colors rounded-none"
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-ink-900">Email</label>
            <input 
              id="email" 
              type="email" 
              required
              className="w-full bg-background border border-border-default px-4 py-3 text-sm focus:outline-none focus:border-safety-orange focus:ring-1 focus:ring-safety-orange transition-colors rounded-none"
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-ink-900">Subject</label>
          <div className="relative">
            <select 
              id="subject"
              className="w-full bg-background border border-border-default px-4 py-3 text-sm focus:outline-none focus:border-safety-orange focus:ring-1 focus:ring-safety-orange transition-colors appearance-none rounded-none"
            >
              <option>General Enquiry</option>
              <option>Partnership Proposal</option>
              <option>Media & Press</option>
              <option>Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-ink-900">Message</label>
          <textarea 
            id="message" 
            rows={4}
            required
            className="w-full flex-1 bg-background border border-border-default px-4 py-3 text-sm focus:outline-none focus:border-safety-orange focus:ring-1 focus:ring-safety-orange transition-colors resize-none rounded-none min-h-30"
            placeholder="How can we help?"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || isSuccess}
          className="w-full h-12 bg-safety-orange hover:bg-ink-900 text-paper font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center justify-center gap-2 rounded-none mt-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-3 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              Sending...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Message Sent
            </span>
          ) : (
            <>
              Send Message
              <ArrowRight className="size-3.5" />
            </>
          )}
        </Button>
      </form>

      {/* Brutalist structural accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-border-default bg-background" />
    </div>
  );
}
