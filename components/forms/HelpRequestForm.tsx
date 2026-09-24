"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contact: z.string().min(10, "Please provide a valid phone number or email."),
  location: z.string().min(2, "Please specify your location/district."),
  details: z.string().min(10, "Please provide some details about the help you need."),
});

export function HelpRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      location: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here we would typically submit to our backend/Supabase
    trackEvent("help_request_submit", { location: values.location });
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="bg-mist p-8 rounded-none border border-forest/20 text-center space-y-4">
        <h3 className="font-fraunces text-2xl text-forest font-bold">Request Received</h3>
        <p className="font-inter text-ink/70">
          Thank you for reaching out. Our team will review your request and get back to you through the contact details provided as soon as possible.
        </p>
        <Button variant="outline" onClick={() => {
          form.reset();
          setIsSubmitted(false);
        }} className="mt-4">
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-none border border-ink/10">
      <h3 className="font-fraunces text-2xl font-light mb-6">Request Direct Assistance</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number or email address" {...field} />
                </FormControl>
                <FormDescription>We will use this to reach you.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Imphal West, Relief Camp Name" {...field} />
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
                <FormLabel>What kind of help do you need?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please provide details about the specific assistance required..." 
                    className="min-h-30"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 text-base">Submit Request</Button>
          <p className="text-xs text-ink/50 text-center mt-4">
            Your information is kept secure and will only be used to provide assistance.
          </p>
        </form>
      </Form>
    </div>
  );
}
