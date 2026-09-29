"use client";

import { supabase } from"@/lib/supabase/client";
import { useState } from"react";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import * as z from"zod";
import { Button } from"@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from"@/components/ui/form";
import { Input } from"@/components/ui/input";
import { ArrowRight, Lock } from"lucide-react";
import { trackEvent } from"@/lib/analytics/trackEvent";
import { cn } from"@/lib/utils";

const donationAmounts = [500, 1000, 2500, 5000];

const formSchema = z.object({
  frequency: z.enum(["one-time","monthly"]),
  amount: z.string().min(1,"Please select or enter an amount."),
  firstName: z.string().min(2,"First name must be at least 2 characters."),
  lastName: z.string().min(2,"Last name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  pan: z.string().optional(),
});

export function DonateForm({
  onSubmitOverride,
  recurringEnabled = false,
  allocationPreference ="general",
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
      frequency:"one-time",
      amount:"",
      firstName:"",
      lastName:"",
      email:"",
      pan:"",
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
            <h2 className="font-serif text-3xl font-light text-foreground">1. Select Contribution</h2>
          </div>
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-2 gap-0 border border-border bg-muted/40 rounded-sm overflow-hidden *:border-r last:*:border-r-0 *:border-border">
                    <button
                      type="button"
                      onClick={() => field.onChange("one-time")}
                      className={cn(
                        "px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors",
                        field.value === "one-time" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-background"
                      )}
                    >
                      One-time Giving
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
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-background",
                        !recurringEnabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                      )}
                    >
                      Monthly Support {!recurringEnabled && <span className="text-[9px] text-muted-foreground ml-1">(Coming Soon)</span>}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border rounded-sm overflow-hidden *:border-b sm:*:border-b-0 *:border-r last:*:border-r-0 *:border-border bg-card">
            {[
              { amount: 500, impact: "Maternal Health Kit" },
              { amount: 1000, impact: "Clinic Medicine Supply" },
              { amount: 2500, impact: "Youth Lab Toolkit" },
              { amount: 5000, impact: "Solar Power Hub Node" },
            ].map((preset) => (
              <button
                key={preset.amount}
                type="button"
                className={cn(
                  "p-5 flex flex-col items-center justify-center text-center transition-all duration-200",
                  selectedPreset === preset.amount 
                    ? "bg-primary text-primary-foreground shadow-xs" 
                    : "text-foreground hover:bg-muted/40"
                )}
                onClick={() => {
                  setSelectedPreset(preset.amount);
                  form.setValue("amount", preset.amount.toString(), { shouldValidate: true });
                  trackEvent("donate_start", { amount: preset.amount, frequency: form.getValues("frequency") });
                }}
              >
                <span className="text-2xl font-serif tracking-tight mb-1">₹{preset.amount.toLocaleString()}</span>
                <span className={cn(
                  "text-[11px] font-sans font-light leading-tight",
                  selectedPreset === preset.amount ? "text-primary-foreground/90" : "text-muted-foreground"
                )}>
                  {preset.impact}
                </span>
              </button>
            ))}
          </div>

          <p className="font-sans text-body-sm text-muted-foreground font-light border-l-2 border-primary pl-4 leading-relaxed">
            100% of your donation is deployed directly into frontline healthcare, youth initiatives, and community relief in Manipur. All transaction costs are absorbed by organizational reserves.
          </p>
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">Or enter a custom donation amount (INR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-medium text-muted-foreground">₹</span>
                    <Input 
                      {...field} 
                      type="number" 
                      min="100" 
                      placeholder="Custom amount" 
                      className="pl-8 rounded-sm border-border focus-visible:ring-primary/20 h-14 font-sans text-lg"
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
                    <Input {...field} placeholder="Jane" autoComplete="given-name" className="rounded-sm border-border focus-visible:ring-primary/20 h-12" />
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
                    <Input {...field} placeholder="Doe" autoComplete="family-name" className="rounded-sm border-border focus-visible:ring-primary/20 h-12" />
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
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">Email Address (for 80G tax receipt) <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="jane@example.com" autoComplete="email" className="rounded-sm border-border focus-visible:ring-primary/20 h-12" />
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
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">PAN Number (Required for 80G Tax Exemption Certificate)</FormLabel>
                <FormControl>
                  <Input {...field} className="uppercase rounded-sm border-border focus-visible:ring-primary/20 h-12" placeholder="ABCDE1234F" />
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Action */}
        <div className="pt-8">
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-300 rounded-sm shadow-xs">
            <span>Proceed to Contribution</span>
            <ArrowRight className="size-4" />
          </button>
          <p className="text-center font-mono text-[10px] text-muted-foreground mt-6 flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
            <Lock className="size-3" /> Secure 256-Bit Encrypted Giving · Official 80G Receipt Issued
          </p>
        </div>
      </form>
    </Form>
  );
}
