"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
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
import { ArrowRight, Lock } from "lucide-react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { cn } from "@/lib/utils";

const donationAmounts = [500, 1000, 2500, 5000];

const formSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z.string().min(1, "Please select or enter an amount."),
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  pan: z.string().optional(),
});

export function DonateForm({
  onSubmitOverride,
  recurringEnabled = false,
  allocationPreference = "general",
}: {
  onSubmitOverride?: (values: z.infer<typeof formSchema>) => void;
  recurringEnabled?: boolean;
  allocationPreference?: string;
} = {}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: "one-time",
      amount: "",
      firstName: "",
      lastName: "",
      email: "",
      pan: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmitOverride) {
      onSubmitOverride(values);
      setIsSubmitted(true);
      return;
    }

    trackEvent("donate_complete", {
      amount: parseFloat(values.amount),
      frequency: values.frequency,
    });
    
    // Insert intent into Supabase
    const { error } = await supabase.from('donations').insert({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      amount: parseFloat(values.amount),
      currency: 'INR',
      is_recurring: values.frequency === 'monthly',
      pan_number: values.pan || null,
      allocation_preference: allocationPreference,
      status: 'pending'
    });

    if (error) {
      console.error("Failed to insert donation intent:", error);
      // In a real app, show a toast. For now, continue to gateway.
    }
    
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="bg-surface p-8 rounded-md border border-border-default text-center space-y-4">
        <h3 className="font-sans text-heading-lg font-semibold text-ink-900">Proceeding to Gateway...</h3>
        <p className="font-sans text-ink-500">
          In a live environment, you would be redirected to a secure payment provider.
        </p>
        <Button variant="secondary" onClick={() => setIsSubmitted(false)} className="mt-4">
          Go back
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 relative z-10">
        
        {/* Section 1: Amount Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-heading-md font-semibold text-ink-900">1. Select Amount</h2>
          </div>
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex p-1 bg-surface-alt rounded-sm border border-border-default w-fit">
                    <button
                      type="button"
                      onClick={() => field.onChange("one-time")}
                      className={cn(
                        "px-6 py-2 rounded-sm text-body-sm font-medium transition-colors border",
                        field.value === "one-time" ? "bg-action-primary shadow-sm text-paper border-action-primary" : "border-transparent text-ink-500 hover:text-ink-900"
                      )}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (recurringEnabled) {
                          field.onChange("monthly");
                        }
                      }}
                      disabled={!recurringEnabled}
                      title={!recurringEnabled ? "Monthly recurring giving is coming soon" : undefined}
                      className={cn(
                        "px-6 py-2 rounded-sm text-body-sm font-medium transition-colors border",
                        field.value === "monthly"
                          ? "bg-action-primary shadow-sm text-paper border-action-primary"
                          : "border-transparent text-ink-500 hover:text-ink-900",
                        !recurringEnabled && "opacity-50 cursor-not-allowed hover:text-ink-500"
                      )}
                    >
                      Monthly {!recurringEnabled && <span className="text-[10px] uppercase tracking-wider text-ink-400 ml-1">(Soon)</span>}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {donationAmounts.map((amt) => (
              <Button
                key={amt}
                type="button"
                variant={selectedPreset === amt ? "primary" : "secondary"}
                className={cn(
                  "py-4 h-auto text-heading-md font-sans transition-all w-full",
                  selectedPreset === amt 
                    ? "border-text-primary" 
                    : ""
                )}
                onClick={() => {
                  setSelectedPreset(amt);
                  form.setValue("amount", amt.toString(), { shouldValidate: true });
                  trackEvent("donate_start", { amount: amt, frequency: form.getValues("frequency") });
                }}
              >
                ₹{amt.toLocaleString()}
              </Button>
            ))}
          </div>

          <p className="text-caption text-ink-500 font-light">
            Fee transparency: 100% of your donation is allocated to community relief. Processing fees (~2%) are absorbed by foundation reserves.
          </p>
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ink-500 font-light text-body-sm block">Or enter a custom amount (INR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500">₹</span>
                    <Input 
                      {...field} 
                      type="number" 
                      min="100" 
                      placeholder="0" 
                      className="pl-8"
                      onChange={(e) => {
                        setSelectedPreset(null);
                        field.onChange(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="h-px bg-border-default w-full" />

        {/* Section 2: Personal Details */}
        <div className="space-y-6">
          <h2 className="font-sans text-heading-md font-semibold text-ink-900">2. Your Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Jane" autoComplete="given-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" autoComplete="family-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address (for tax receipt)</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="jane@example.com" autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number (Required for 80G Exemption)</FormLabel>
                <FormControl>
                  <Input {...field} className="uppercase" placeholder="ABCDE1234F" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4">
          <Button type="submit" className="w-full h-14 text-body-lg gap-2" variant="primary">
            Proceed to Payment <ArrowRight className="size-5" />
          </Button>
          <p className="text-center text-caption text-ink-500 mt-4 flex items-center justify-center gap-1.5 uppercase tracking-widest font-semibold">
            <Lock className="size-3" /> Payments are securely processed via certified gateway.
          </p>
        </div>
      </form>
    </Form>
  );
}
