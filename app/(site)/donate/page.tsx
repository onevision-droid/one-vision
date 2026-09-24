import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ShieldCheck, FileText, Lock, ArrowRight } from "lucide-react";
import { DonateForm } from "@/components/forms/DonateForm";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionBadge } from "@/components/composition/SectionBadge";

export const metadata: Metadata = {
  title: "Donate | One Vision",
  description: "Support community resilience in Manipur. Transparent, direct, and accountable allocation of resources.",
};

export default function DonatePage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen pt-24 md:pt-32 pb-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10"></div>
      <div className="mx-auto max-w-6xl px-6 md:px-8 w-full relative z-10">
        
        <div className="mb-8">
          <Breadcrumbs 
            items={[
              { label: "Donate", href: "/donate" }
            ]} 
          />
        </div>

        <div className="max-w-2xl mb-12 md:mb-16">
          <SectionBadge>
            Make a Contribution
          </SectionBadge>
          <h1 className="font-fraunces text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight mb-6">
            Fund Community Resilience
          </h1>
          <p className="text-muted-foreground text-xl font-light leading-relaxed">
            Your contribution directly funds rapid disaster relief, mobile health clinics, and educational resources. No unnecessary red tape, just direct impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          
          {/* Main Donation Form */}
          <div className="space-y-8">
            <Card className="p-8 md:p-10 border-border shadow-sm bg-background rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-3xl rounded-full -z-10"></div>
              <DonateForm />
            </Card>
          </div>

          {/* Trust & Governance Panel */}
          <div className="space-y-6">
            <Card className="p-8 border-border shadow-sm bg-muted/10 rounded-2xl">
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-6">Commitment to Transparency</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <ShieldCheck className="size-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Registered NGO</h4>
                    <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed">
                      One Vision is fully registered under the Manipur Societies Registration Act. Reg No: MN/1234/2020.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <FileText className="size-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">80G Tax Exemption</h4>
                    <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed">
                      All donations from Indian taxpayers are eligible for a 50% tax deduction under Section 80G of the IT Act.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <Lock className="size-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Data Privacy</h4>
                    <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed">
                      We never sell or share your contact details. You will not be automatically subscribed to newsletters without consent.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-border">
                <Link href="/reports" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                  View our financial audits <ArrowRight className="size-3" />
                </Link>
              </div>
            </Card>

            <div className="p-6 bg-background border border-border shadow-sm rounded-2xl">
              <h4 className="font-medium text-foreground mb-2">Prefer to donate supplies?</h4>
              <p className="text-sm text-muted-foreground font-light mb-4">
                We accept non-perishable food, medical supplies, and educational materials at our Imphal center.
              </p>
              <Link href="/contact" className="text-primary text-sm font-medium hover:underline">
                View drop-off locations
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
