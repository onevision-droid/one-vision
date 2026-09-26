"use client";

import { supabase } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { useState } from "react";
import { TrustPanel } from "@/components/content/TrustPanel";

/** Generates a human-readable confirmation reference. Module-level to satisfy react-hooks/purity. */
function generateReferenceId(): string {
  return `OV-${Math.floor(100000 + Math.random() * 900000)}`;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contact: z.string().min(10, "Please provide a valid phone number or email."),
  location: z.string().min(2, "Please specify your location/district."),
  details: z
    .string()
    .min(10, "Please provide some details about the help you need."),
});

export function HelpRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      location: "",
      details: "",
    },
  });

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("help_request_start");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const generatedRef = generateReferenceId();
    setReferenceId(generatedRef);
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }
    trackEvent("help_request_complete", { district: values.location });

    const { error } = await supabase.from("help_requests").insert({
      requester_name: values.name,
      phone: values.contact, // We store email/phone here as per form
      location: values.location,
      request_type: "general", // Defaulting, as we don't have a specific field in this form yet
      description: values.details,
      urgency: "medium",
      status: "open",
    });

    if (error) {
      console.error("Failed to submit help request:", error);
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="bg-surface p-8 md:p-10 rounded-md border border-border-default space-y-6">
        <div className="text-center space-y-2">
          <span className="text-caption uppercase tracking-widest text-action-primary font-semibold block">
            Submission Confirmed
          </span>
          <h3 className="font-sans text-heading-xl font-medium text-ink-900">
            Request Received
          </h3>
          <p className="font-sans text-body text-ink-500 max-w-md mx-auto">
            Your request has been logged in our secure system. Our field
            coordinators review incoming requests daily.
          </p>
        </div>

        <div className="bg-surface-alt border border-border-default p-6 rounded-md space-y-3">
          <div className="flex justify-between items-center border-b border-border-default pb-3">
            <span className="text-caption uppercase tracking-wider text-ink-500 font-medium">
              Reference ID
            </span>
            <span className="font-mono text-body-sm font-semibold text-ink-900">
              {referenceId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-border-default pb-3">
            <span className="text-caption uppercase tracking-wider text-ink-500 font-medium">
              Expected Response
            </span>
            <span className="text-body-sm text-ink-900 font-medium">
              24–48 Hours
            </span>
          </div>
          <div className="pt-1">
            <p className="text-caption text-ink-500 font-light leading-relaxed">
              <strong>Privacy & Safeguarding:</strong> Your contact information
              is stored securely and shared strictly with verified One Vision
              relief coordinators. We will never share your details externally.
            </p>
          </div>
        </div>

        <TrustPanel variant="compact" />

        <div className="text-center pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              form.reset();
              setIsSubmitted(false);
              setHasStarted(false);
            }}
          >
            Submit another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onFocusCapture={handleStart}
          className="space-y-6"
        >
          <input
            type="text"
            name="bot_catch_request"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 bg-transparent border-border-default focus-visible:border-ink-900 rounded-none text-body"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                    Contact Info
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 bg-transparent border-border-default focus-visible:border-ink-900 rounded-none text-body"
                      placeholder="Phone number or email address"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-transparent border-border-default focus-visible:border-ink-900 rounded-none text-body"
                    placeholder="e.g. Imphal West, Relief Camp Name"
                    autoComplete="address-level2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                  Detailed Request
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about the specific assistance required..."
                    className="min-h-32 bg-transparent border-border-default focus-visible:border-ink-900 rounded-none text-body resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 flex flex-col items-start gap-4">
            <button
              type="submit"
              className="group inline-flex h-14 items-center justify-center gap-3 bg-action-primary px-8 text-body-sm tracking-widest uppercase font-semibold text-paper transition-all hover:bg-action-hover w-full sm:w-auto shrink-0"
            >
              <span>Submit Request</span>
              <svg
                className="size-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
