import { Metadata } from "next";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { TrustPanel } from "@/components/content/TrustPanel";
import { SectionBadge } from "@/components/composition/SectionBadge";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Volunteer | One Vision",
  description: "Join our network of volunteers and make a tangible impact in your community.",
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      
      {/* 1. Header / Intro */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] -z-10"></div>
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10 flex flex-col items-center text-center">
          <SectionBadge>
            Make an Impact
          </SectionBadge>
          <h1 className="text-balance font-fraunces text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6 max-w-4xl">
            Become a Volunteer
          </h1>
          <p className="text-balance font-sans text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            Our work is driven by the strength and dedication of local volunteers. Join us to make a tangible impact in Imphal and surrounding areas.
          </p>
        </div>
      </section>

      {/* 2. Why Volunteer / Value Proposition */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-square w-full overflow-hidden rounded-3xl ring-1 ring-border shadow-xl">
              <Image src="/new-illustrations/volunteer-scene.webp" alt="Volunteers organizing supplies" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-fraunces font-light mb-6 tracking-tight text-foreground">Your Time Matters</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Whether you have specialized skills in healthcare and education, or simply the time and willingness to help distribute supplies, there is a place for you here.
              </p>
              <div className="p-8 rounded-2xl bg-background border border-border shadow-sm relative">
                <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">&quot;</div>
                <p className="text-xl font-fraunces font-light italic leading-relaxed text-foreground mb-6 relative z-10">
                  Volunteering here isn&apos;t just about giving time; it&apos;s about rebuilding our own community with dignity.
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">SS</div>
                  <div>
                    <div className="font-medium text-foreground text-sm">S. Singh</div>
                    <div className="text-xs text-muted-foreground">Core Volunteer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety & Trust */}
      <section className="py-24 bg-foreground text-background">
         <div className="container mx-auto px-4 md:px-12 max-w-6xl">
           <div className="text-center mb-16">
              <span className="text-primary font-medium tracking-wider text-sm uppercase block mb-4">Safety First</span>
              <h2 className="text-4xl md:text-5xl font-fraunces font-light tracking-tight">Our Commitment to You</h2>
           </div>
           <div className="max-w-4xl mx-auto">
             <TrustPanel variant="compact" />
           </div>
         </div>
      </section>

      {/* 4. Volunteer Form */}
      <section className="py-24 bg-background">
         <div className="container mx-auto px-4 md:px-12 max-w-6xl">
            <div className="max-w-3xl mx-auto mb-12 text-center">
               <h2 className="font-fraunces text-3xl md:text-5xl font-light tracking-tight text-foreground mb-6">
                 Volunteer Application
               </h2>
               <p className="text-lg text-muted-foreground">
                 Fill out the form below and our volunteer coordinator will contact you with upcoming opportunities that match your interests.
               </p>
            </div>
            <div className="max-w-3xl mx-auto p-8 md:p-12 bg-muted/20 rounded-3xl border border-border shadow-sm">
              <VolunteerForm />
            </div>
         </div>
      </section>

    </div>
  );
}
