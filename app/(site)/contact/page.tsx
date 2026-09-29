import { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";

import { siteSettings } from "@/lib/data/site-settings";
import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowRight } from "lucide-react";


export const metadata: Metadata = {
 title: "Contact Us | One Vision",
 description: "Get in touch with One Vision for partnerships, press inquiries, or general questions.",
};

export default function ContactPage() {
 return (
 <div className="flex flex-col w-full bg-background">
 <PageHero 
 badge="Contact Us"
 heading={
 <>
 Let&apos;s build <br />
 together.
 </>
 }
 description="Whether you're looking to partner on an initiative, have press inquiries, or simply want to learn more about our work, we're here to help."
 />

 {/* Contact Form (Document Shell Layout) */}
 <section className="w-full px-4 py-12 md:py-20 bg-background">
 <div className="mx-auto max-w-6xl overflow-hidden border border-border bg-muted shadow-xl shadow-black/5">
        <div className="bg-destructive/5 px-8 py-10 md:px-12 md:py-12 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 bg-destructive animate-pulse" />
            <span className="text-caption tracking-widest uppercase text-destructive font-semibold">
 General Inquiries
 </span>
 </div>
 <h2 className="text-3xl md:text-4xl font-sans text-foreground mb-4 tracking-tight">
 Contact Us
 </h2>
 <p className="text-body-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
 For immediate assistance or specific queries, you can reach out to our team directly.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
 {/* Form */}
 <div className="lg:col-span-7 p-8 md:p-12 lg:border-r border-border">
 <ContactForm />
 </div>

 {/* Sidebar Details */}
 <div className="lg:col-span-5 flex flex-col gap-10 p-8 md:p-12 bg-section-alt">
 <div>
 <h3 className="font-sans text-heading-md font-medium text-foreground mb-8 tracking-wide">
 Direct Contact
 </h3>

 <div className="space-y-8 border-l-2 border-border ml-4 relative">
 <div className="relative pl-8">
 <span className="absolute -left-3 top-0.5 size-6 bg-muted border border-border flex items-center justify-center font-sans text-foreground font-medium text-xs">
 #
 </span>
 <h4 className="font-medium text-foreground mb-1 mt-1 uppercase tracking-widest text-caption">
 Helpline
 </h4>
 <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} className="text-body-sm text-muted-foreground hover:text-action-primary transition-colors block">
 {siteSettings.contactPhone}
 </a>
 </div>

 <div className="relative pl-8">
 <span className="absolute -left-3 top-0.5 size-6 bg-muted border border-border flex items-center justify-center font-sans text-foreground font-medium text-xs">
 @
 </span>
 <h4 className="font-medium text-foreground mb-1 mt-1 uppercase tracking-widest text-caption">
 Email
 </h4>
 <a href={`mailto:${siteSettings.contactEmail}`} className="text-body-sm text-muted-foreground hover:text-action-primary transition-colors block">
 {siteSettings.contactEmail}
 </a>
 </div>

 <div className="relative pl-8">
 <span className="absolute -left-3 top-0.5 size-6 bg-muted border border-border flex items-center justify-center font-sans text-foreground font-medium text-xs">
 *
 </span>
 <h4 className="font-medium text-foreground mb-1 mt-1 uppercase tracking-widest text-caption">
 Office
 </h4>
 <p className="text-body-sm text-muted-foreground max-w-xs leading-relaxed">
 Imphal, Manipur, India
 </p>
 </div>
 </div>
 </div>

 <div className="bg-foreground p-8 flex flex-col items-start gap-4 mt-auto">
 <div>
 <h4 className="text-heading-md font-medium text-background mb-2">
 Need Help?
 </h4>
 <p className="text-body-sm max-w-prose text-background/70 font-light leading-relaxed mb-6">
 If you are looking for support or need to request immediate assistance, please use our dedicated Help Portal.
 </p>
 <a 
 href="/get-help"
 className="group inline-flex items-center justify-center gap-2 bg-background text-foreground text-body-sm font-medium px-6 py-2.5 transition-colors duration-base"
 >
 <span>Go to Help Portal</span>
 <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-fast" />
 </a>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}
