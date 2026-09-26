"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics/trackEvent";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  subject: z.string(),
  message: z.string().min(10, "Message is too short."),
});

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }
    trackEvent("contact_submit", { subject: values.subject });

    const { error } = await supabase.from('contact_messages').insert({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      subject: values.subject,
      message: values.message,
      status: "unread"
    });

    if (error) {
      console.error("Failed to submit contact message:", error);
    }
    
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="bg-surface p-8 md:p-10 border border-border-default rounded-md flex flex-col items-center justify-center gap-4 text-center min-h-100">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-section-alt border border-border-default">
          <CheckCircle2 className="w-6 h-6 text-action-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-heading-md font-semibold text-ink-900">
            Message Sent
          </h3>
          <p className="text-body-sm text-ink-500 max-w-sm mx-auto mb-6">
            Thank you for reaching out. We have received your message and will get back to you shortly.
          </p>
        </div>
        <button
          onClick={() => {
            form.reset();
            setIsSubmitted(false);
          }}
          className="text-body-sm font-medium text-action-primary hover:text-action-hover transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 md:p-8 border border-border-default rounded-md">
      <h2 className="font-sans text-heading-md font-medium text-ink-900 mb-6">Send a Message</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            name="company_website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-body-sm font-medium text-ink-900">
                    First Name <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Jane" autoComplete="given-name" {...field} />
                  </FormControl>
                  <FormMessage className="text-caption text-danger" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-body-sm font-medium text-ink-900">
                    Last Name <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" autoComplete="family-name" {...field} />
                  </FormControl>
                  <FormMessage className="text-caption text-danger" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Email Address <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@example.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage className="text-caption text-danger" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Subject <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <select 
                    {...field}
                    className="w-full border border-border-input bg-transparent px-3 py-2 rounded-sm text-body-sm text-ink-900 transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:border-clay-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Press & Media">Press & Media</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </FormControl>
                <FormMessage className="text-caption text-danger" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Message <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={4} className="resize-none" {...field} />
                </FormControl>
                <FormMessage className="text-caption text-danger" />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 w-full bg-action-primary hover:bg-action-hover text-paper text-body-sm font-medium px-6 py-2.5 transition-colors duration-base rounded-sm"
            >
              <span>Send Message</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-fast" />
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
