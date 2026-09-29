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
      <div className="bg-muted p-8 border border-border text-center space-y-4">
        <h3 className="font-sans text-heading-lg font-semibold text-foreground">Proceeding to Gateway...</h3>
        <p className="font-sans text-muted-foreground">
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 relative z-10">
        
        {/* Section 1: Amount Selection */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-serif text-3xl font-light text-foreground">1. Select Amount</h2>
          </div>
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-2 gap-0 border border-border bg-muted *:border-r last:*:border-r-0 *:border-border">
                    <button
                      type="button"
                      onClick={() => field.onChange("one-time")}
                      className={cn(
                        "px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors",
                        field.value === "one-time" ? "bg-destructive text-foreground" : "text-muted-foreground hover:bg-background"
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
                        "px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors",
                        field.value === "monthly"
                          ? "bg-destructive text-foreground"
                          : "text-muted-foreground hover:bg-background",
                        !recurringEnabled && "opacity-50 cursor-not-allowed hover:bg-muted"
                      )}
                    >
                      Monthly {!recurringEnabled && <span className="text-[9px] text-ink-400 ml-1">(Soon)</span>}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border *:border-r *:border-b md:*:border-b-0 last:*:border-r-0 *:border-border bg-muted">
            {donationAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={cn(
                  "py-6 text-2xl font-serif transition-colors",
                  selectedPreset === amt 
                    ? "bg-foreground text-background" 
                    : "text-foreground hover:bg-background"
                )}
                onClick={() => {
                  setSelectedPreset(amt);
                  form.setValue("amount", amt.toString(), { shouldValidate: true });
                  trackEvent("donate_start", { amount: amt, frequency: form.getValues("frequency") });
                }}
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <p className="font-sans text-base-sm text-muted-foreground font-light border-l-2 border-safety-orange pl-4">
            Fee transparency: 100% of your donation is allocated to community relief. Processing fees (~2%) are absorbed by foundation reserves.
          </p>
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">Or enter a custom amount (INR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-medium text-muted-foreground">₹</span>
                    <Input 
                      {...field} 
                      type="number" 
                      min="100" 
                      placeholder="0" 
                      className="pl-8 rounded-none border-border focus-visible:ring-safety-orange h-14 font-sans text-lg"
                      onChange={(e) => {
                        setSelectedPreset(null);
                        field.onChange(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Personal Details */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-serif text-3xl font-light text-foreground">2. Your Details</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">First Name <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Jane" autoComplete="given-name" className="rounded-none border-border focus-visible:ring-safety-orange h-12" />
                  </FormControl>
                  <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">Last Name <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" autoComplete="family-name" className="rounded-none border-border focus-visible:ring-safety-orange h-12" />
                  </FormControl>
                  <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">Email Address (for tax receipt) <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="jane@example.com" autoComplete="email" className="rounded-none border-border focus-visible:ring-safety-orange h-12" />
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">PAN Number (Required for 80G Exemption)</FormLabel>
                <FormControl>
                  <Input {...field} className="uppercase rounded-none border-border focus-visible:ring-safety-orange h-12" placeholder="ABCDE1234F" />
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Action */}
        <div className="pt-8">
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-foreground text-background font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-destructive hover:text-foreground">
            <span>Proceed to Payment</span>
            <ArrowRight className="size-4" />
          </button>
          <p className="text-center font-mono text-[10px] text-muted-foreground mt-6 flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
            <Lock className="size-3" /> Payments are securely processed via certified gateway.
          </p>
        </div>
      </form>
    </Form>
  );
}
