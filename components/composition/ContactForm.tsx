"use client";

import { useState } from"react";
import { supabase } from"@/lib/supabase/client";
import { Button } from"@/components/ui/button";
import { ArrowRight, CheckCircle2 } from"lucide-react";
import { trackEvent } from"@/lib/analytics/trackEvent";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: (formData.get("name") as string)?.split("")[0] ||"",
      lastName: (formData.get("name") as string)?.split("").slice(1).join("") ||"",
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    setIsSubmitting(true);
    trackEvent("contact_submit", { subject: data.subject });

    const { error } = await supabase.from('contact_messages').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status:"unread"
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Failed to submit contact message:", error);
      alert("Failed to send message. Please try again.");
      return;
    }
    
    setIsSuccess(true);
    e.currentTarget.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-card border border-border p-6 md:p-8 relative h-full flex flex-col justify-between rounded-md">
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-foreground mb-2">Send a Message</h3>
        <p className="text-base text-muted-foreground max-w-sm font-light leading-relaxed">
          Whether you need healthcare guidance, want to volunteer, or wish to explore a community partnership, our coordinators are here.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex-1 flex flex-col">
        <input
          type="text"
          name="ov_system_field"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-foreground font-mono">Name</label>
            <input 
              id="name" 
              type="text" 
              name="name"
              required
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors rounded-sm"
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-foreground font-mono">Email</label>
            <input 
              id="email" 
              type="email" 
              name="email"
              required
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors rounded-sm"
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-foreground font-mono">Subject</label>
          <div className="relative">
            <select 
              id="subject" 
              name="subject"
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors appearance-none rounded-sm"
            >
              <option>Community Support & Healthcare Guidance</option>
              <option>Volunteer & Skills Contribution</option>
              <option>Donation & 80G Tax Exemption</option>
              <option>Community Project & CSR Partnership</option>
              <option>General Question / Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-foreground font-mono">Message</label>
          <textarea 
            id="message" 
            name="message"
            rows={4}
            required
            className="w-full flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none rounded-sm min-h-30"
            placeholder="How can our community team support you?"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || isSuccess}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium transition-colors flex items-center justify-center gap-2 rounded-sm mt-auto shadow-xs"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-3 border-2 border-border border-t-primary rounded-full animate-spin" />
              Sending...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Sent
            </span>
          ) : (
            <>
              Send
              <ArrowRight className="size-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
