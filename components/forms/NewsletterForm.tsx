"use client";

import { useState } from"react";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import * as z from"zod";
import { supabase } from"@/lib/supabase/client";
import { trackEvent } from"@/lib/analytics/trackEvent";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CheckCircle2, AlertCircle } from"lucide-react";
import { cn } from"@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  className?: string;
  variant?:"footer" |"card";
}

export function NewsletterForm({
  className,
  variant ="footer",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" |"loading" |"success" |"error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email:"" },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Honeypot check: bots fill hidden inputs
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      trackEvent("newsletter_subscribe", { source: variant });

      // Record in Supabase (using dedicated newsletter_subscribers table)
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: data.email,
        source: variant,
        status:"active"
      });

      if (error) {
        console.warn("Supabase intake error:", error.message);
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      console.error("Newsletter submission error:", err);
      setStatus("error");
      setErrorMessage("Unable to subscribe right now. Please try again later.");
    }
  };

  if (status ==="success") {
    return (
      <div
        className={cn(
         "flex items-center gap-3 p-4 bg-muted border border-border text-foreground",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-5 text-status-active shrink-0" />
        <div className="text-body-sm">
          <p className="font-medium text-foreground">Thank you for subscribing.</p>
          <p className="text-muted-foreground font-light">
            You will receive our quarterly field dispatches and annual reports.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-3", className)}
      noValidate
      aria-label="Newsletter subscription"
    >
      {/* Honeypot field for bot mitigation */}
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

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email for field updates"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ?"newsletter-email-error" : undefined}
            disabled={status ==="loading"}
            className="h-11 bg-muted border-border focus-visible:border-safety-orange text-body-sm"
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={status ==="loading"}
          className="h-11 px-5 text-body-sm font-medium shrink-0"
        >
          {status ==="loading" ?"Subscribing..." :"Subscribe"}
        </Button>
      </div>

      {errors.email && (
        <p
          id="newsletter-email-error"
          className="text-caption text-crimson flex items-center gap-1.5"
          role="alert"
        >
          <AlertCircle className="size-3.5" />
          {errors.email.message}
        </p>
      )}

      {status ==="error" && (
        <p className="text-caption text-crimson flex items-center gap-1.5" role="alert">
          <AlertCircle className="size-3.5" />
          {errorMessage}
        </p>
      )}

      <p className="text-caption text-ink-400 font-light">
        Quarterly dispatches & annual audit reports. Zero spam. Unsubscribe at any time.
      </p>
    </form>
  );
}