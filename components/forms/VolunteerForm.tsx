"use client";

import { supabase } from "@/lib/supabase/client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { useState } from "react";

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
  { id: "health", label: "Health & Medical Assistance" },
  { id: "education", label: "Education & Teaching" },
  { id: "logistics", label: "Logistics & Supply Distribution" },
  { id: "admin", label: "Administrative Support" },
  { id: "counseling", label: "Counseling & Mental Health" },
];

export function VolunteerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    trackEvent("volunteer_submit", { interests: values.interests });
    
    const [firstName, ...lastNameParts] = values.name.split(" ");
    
    const { error } = await supabase.from('volunteer_applications').insert({
      first_name: firstName || "Unknown",
      last_name: lastNameParts.join(" ") || "Unknown",
      email: values.email,
      phone: values.phone || "",
      skills: values.interests,
      message: values.experience || "",
      status: "pending"
    });

    if (error) {
      console.error("Failed to submit volunteer application:", error);
    }
    
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="bg-mist p-8 rounded-none border border-forest/20 text-center space-y-4">
        <h3 className="font-fraunces text-2xl text-forest font-bold">Thank You!</h3>
        <p className="font-inter text-ink/70">
          Your application has been received. Our volunteer coordinator will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-none border border-ink/10">
      <h3 className="font-fraunces text-2xl font-light mb-6">Volunteer Application</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Areas of Interest *</FormLabel>
                  <FormDescription>
                    Select the areas where you would like to contribute.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {areasOfInterest.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Experience (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about any previous volunteering or relevant professional experience..." 
                    className="min-h-25"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto h-12 text-base px-8">Submit Application</Button>
        </form>
      </Form>
    </div>
  );
}
