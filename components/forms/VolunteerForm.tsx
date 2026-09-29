"use client";

import { supabase } from"@/lib/supabase/client";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import * as z from"zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from"@/components/ui/form";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { Checkbox } from"@/components/ui/checkbox";
import { trackEvent } from"@/lib/analytics/trackEvent";
import { useState } from"react";
import { ArrowRight, CheckCircle2 } from"lucide-react";

const formSchema = z.object({
  name: z.string().min(2,"Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().optional(),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message:"You have to select at least one area of interest.",
  }),
  experience: z.string().optional(),
});

const areasOfInterest = [
  { id:"health", label:"Health & Medical" },
  { id:"education", label:"Education & Teaching" },
  { id:"logistics", label:"Logistics & Supply" },
  { id:"admin", label:"Administrative Support" },
  { id:"counseling", label:"Counseling & Mental Health" },
  { id:"community", label:"Community Organizing" },
];

export function VolunteerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email:"",
      phone:"",
      interests: [],
      experience:"",
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

    const [firstName, ...lastNameParts] = values.name.split("");

    const { error } = await supabase.from("volunteer_applications").insert({
      first_name: firstName ||"Unknown",
      last_name: lastNameParts.join("") ||"Unknown",
      email: values.email,
      phone: values.phone ||"",
      skills: values.interests,
      message: values.experience ||"",
      status:"pending",
    });

    if (error) {
      console.error("Failed to submit volunteer application:", error);
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-status-active/10">
          <CheckCircle2 className="w-6 h-6 text-status-active" />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-heading-md font-semibold text-foreground">
            Application Received
          </h3>
          <p className="text-body-sm text-muted-foreground max-w-xs">
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
        className="space-y-8"
      >
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

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">
                  Full Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" autoComplete="name" className="rounded-none border-border focus-visible:ring-safety-orange" {...field} />
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="jane@example.com" type="email" autoComplete="email" className="rounded-none border-border focus-visible:ring-safety-orange" {...field} />
                </FormControl>
                <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" autoComplete="tel" className="rounded-none border-border focus-visible:ring-safety-orange" {...field} />
              </FormControl>
              <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
            </FormItem>
          )}
        />

        {/* Row 3: Areas of Interest */}
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">
                  Areas of Interest <span className="text-destructive">*</span>
                </FormLabel>
                <p className="font-sans text-base-sm text-muted-foreground mt-1">
                  Select all that apply.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border *:border-b *:border-r *:border-border bg-muted">
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
                            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors font-sans text-base-sm font-normal ${
                              isChecked
                                ?"bg-destructive text-foreground"
                                :"text-ink-700 hover:bg-background"
                            }`}
                          >
                            <FormControl>
                              <Checkbox
                                checked={isChecked}
                                className="rounded-none border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-destructive"
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
              <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
            </FormItem>
          )}
        />

        {/* Row 4: Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-mono text-[10px] font-bold text-foreground uppercase tracking-widest block">
                Relevant Experience
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about any previous volunteering or relevant professional experience..."
                  className="min-h-32 rounded-none border-border focus-visible:ring-safety-orange"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-mono text-[10px] text-destructive uppercase" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-destructive hover:text-foreground"
          >
            <span>Submit Application</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </Form>
  );
}
