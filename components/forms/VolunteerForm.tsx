"use client";

import { supabase } from "@/lib/supabase/client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().optional(),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one area of interest.",
  }),
  experience: z.string().optional(),
});

const areasOfInterest = [
  { id: "health", label: "Health & Medical" },
  { id: "education", label: "Education & Teaching" },
  { id: "logistics", label: "Logistics & Supply" },
  { id: "admin", label: "Administrative Support" },
  { id: "counseling", label: "Counseling & Mental Health" },
  { id: "community", label: "Community Organizing" },
];

export function VolunteerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interests: [],
      experience: "",
    },
  });

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("volunteer_start");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }
    trackEvent("volunteer_complete", { interestsCount: values.interests.length });

    const [firstName, ...lastNameParts] = values.name.split(" ");

    const { error } = await supabase.from("volunteer_applications").insert({
      first_name: firstName || "Unknown",
      last_name: lastNameParts.join(" ") || "Unknown",
      email: values.email,
      phone: values.phone || "",
      skills: values.interests,
      message: values.experience || "",
      status: "pending",
    });

    if (error) {
      console.error("Failed to submit volunteer application:", error);
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-moss-400/10">
          <CheckCircle2 className="w-6 h-6 text-moss-400" />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-heading-md font-semibold text-ink-900">
            Application Received
          </h3>
          <p className="text-body-sm text-ink-500 max-w-xs">
            Our volunteer coordinator will review your profile and be in touch
            shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onFocusCapture={handleStart}
        className="space-y-5"
      >
        <input
          type="text"
          name="system_volunteer_code"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Full Name <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage className="text-caption text-danger" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Email <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="jane@example.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage className="text-caption text-danger" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-body-sm font-medium text-ink-900">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage className="text-caption text-danger" />
            </FormItem>
          )}
        />

        {/* Row 3: Areas of Interest */}
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem className="space-y-2">
              <div>
                <FormLabel className="text-body-sm font-medium text-ink-900">
                  Areas of Interest <span className="text-danger">*</span>
                </FormLabel>
                <p className="text-caption text-ink-500 mt-1">
                  Select all that apply.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {areasOfInterest.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      const isChecked = field.value?.includes(item.id);
                      return (
                        <FormItem key={item.id} className="space-y-0">
                          <FormLabel
                            className={`flex items-center gap-3 px-3 py-3 border cursor-pointer transition-colors text-body-sm font-normal rounded-md ${
                              isChecked
                                ? "border-action-primary bg-action-primary/5 text-action-primary"
                                : "border-border-input text-ink-700 hover:border-ink-300 hover:bg-surface"
                            }`}
                          >
                            <FormControl>
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <span className="leading-tight">{item.label}</span>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage className="text-caption text-danger" />
            </FormItem>
          )}
        />

        {/* Row 4: Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-body-sm font-medium text-ink-900">
                Relevant Experience
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about any previous volunteering or relevant professional experience..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-caption text-danger" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <span>Submit Application</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
