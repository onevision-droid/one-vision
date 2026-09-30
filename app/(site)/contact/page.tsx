import { Metadata } from"next";
import { PageHero } from"@/components/composition/PageHero";

import { siteSettings } from "@/lib/data/site-settings";
import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
 title:"Contact Us | One Vision",
 description:"Get in touch with One Vision for partnerships, press inquiries, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero 
        badge="GET IN TOUCH · MANIPUR"
        heading={
          <>
            Partner with Us <br />
            for Change.
          </>
        }
        description="Whether you are a community organization, volunteer, researcher, donor, or partner institution, we welcome your collaboration with our team in Imphal."
      />

      {/* Contact Form (Document Shell Layout) */}
      <section className="w-full px-4 py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-6xl overflow-hidden border border-border bg-card shadow-xs rounded-sm">
          <div className="bg-muted/40 px-8 py-10 md:px-12 md:py-12 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                General & Partner Inquiries
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 tracking-tight font-light">
              Connect with Our Team
            </h2>
            <p className="text-body-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              Reach out to explore local partnerships, CSR projects, research initiatives, or institutional support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Form */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:border-r border-border">
              <ContactForm />
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-5 flex flex-col gap-10 p-8 md:p-12 bg-muted/20">
              <div>
                <h3 className="font-serif text-2xl font-light text-foreground mb-8 tracking-wide">
                  Direct Contact
                </h3>

                <div className="space-y-8 border-l-2 border-primary/30 ml-4 relative">
                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 bg-background border border-border rounded-sm flex items-center justify-center font-mono text-primary font-bold text-xs">
                      #
                    </span>
                    <h4 className="font-mono text-[10px] font-bold text-muted-foreground mb-1 mt-1 uppercase tracking-widest">
                      Field Office Line
                    </h4>
                    <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} className="font-sans text-base font-medium text-foreground hover:text-primary transition-colors min-h-10 flex items-center">
                      {siteSettings.contactPhone}
                    </a>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 bg-background border border-border rounded-sm flex items-center justify-center font-mono text-primary font-bold text-xs">
                      @
                    </span>
                    <h4 className="font-mono text-[10px] font-bold text-muted-foreground mb-1 mt-1 uppercase tracking-widest">
                       Official Email
                    </h4>
                    <a href={`mailto:${siteSettings.contactEmail}`} className="font-sans text-base font-medium text-foreground hover:text-primary transition-colors min-h-10 flex items-center">
                      {siteSettings.contactEmail}
                    </a>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 bg-background border border-border rounded-sm flex items-center justify-center font-mono text-primary font-bold text-xs">
                      *
                    </span>
                    <h4 className="font-mono text-[10px] font-bold text-muted-foreground mb-1 mt-1 uppercase tracking-widest">
                      Registered Office
                    </h4>
                    <p className="font-sans text-sm text-foreground max-w-xs leading-relaxed font-normal">
                      Society for Health & Education Manipur<br />
                      Imphal West, Manipur 795001, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-card p-6 flex flex-col items-start gap-4 mt-auto rounded-sm">
                <div>
                  <h4 className="font-serif text-xl font-light text-foreground mb-2">
                    Need Family Support or Healthcare?
                  </h4>
                  <p className="text-body-sm text-muted-foreground font-light leading-relaxed mb-4">
                    If you are an individual or family seeking direct healthcare navigation, clinic appointments, or emergency assistance, visit our dedicated community care desk.
                  </p>
                  <Link 
                    href="/get-help"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-primary/90 transition-colors shadow-2xs"
                  >
                    <span>Care Desk</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
 );
}
