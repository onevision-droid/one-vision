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

export function DonateForm({ onSubmitOverride }: { onSubmitOverride?: (values: z.infer<typeof formSchema>) => void } = {}) {
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

    trackEvent("donate_intent", { amount: values.amount, frequency: values.frequency });
    
    // Insert intent into Supabase
    const { error } = await supabase.from('donations').insert({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      amount: parseFloat(values.amount),
      currency: 'INR',
      is_recurring: values.frequency === 'monthly',
      pan_number: values.pan || null,
      allocation_preference: 'general',
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
      <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 text-center space-y-4">
        <h3 className="font-fraunces text-2xl font-medium">Proceeding to Gateway...</h3>
        <p className="text-muted-foreground">
          In a live environment, you would be redirected to a secure payment provider.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
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
            <h2 className="text-xl font-medium text-foreground">1. Select Amount</h2>
          </div>
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex p-1 bg-muted/20 rounded-lg border border-border w-fit">
                    <button
                      type="button"
                      onClick={() => field.onChange("one-time")}
                      className={cn(
                        "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                        field.value === "one-time" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("monthly")}
                      className={cn(
                        "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                        field.value === "monthly" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Monthly
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
                variant={selectedPreset === amt ? "default" : "outline"}
                className={cn(
                  "py-4 h-auto rounded-xl border font-medium text-lg shadow-sm transition-all",
                  selectedPreset === amt 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border bg-background hover:border-primary/50 hover:bg-primary/5 text-foreground"
                )}
                onClick={() => {
                  setSelectedPreset(amt);
                  form.setValue("amount", amt.toString(), { shouldValidate: true });
                }}
              >
                ₹{amt.toLocaleString()}
              </Button>
            ))}
          </div>
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-light text-sm block">Or enter a custom amount (INR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input 
                      {...field} 
                      type="number" 
                      min="100" 
                      placeholder="0.00" 
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

        <div className="h-px bg-border w-full" />

        {/* Section 2: Personal Details */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-foreground">2. Your Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Jane" />
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
                    <Input {...field} placeholder="Doe" />
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
                  <Input {...field} type="email" placeholder="jane@example.com" />
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
          <Button type="submit" className="w-full text-lg py-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90" variant="default">
            Proceed to Payment <ArrowRight className="size-5" />
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
            <Lock className="size-3" /> Payments are securely processed via certified gateway.
          </p>
        </div>
      </form>
    </Form>
  );
}
