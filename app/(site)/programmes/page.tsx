import { Metadata } from"next";
import { programmes } from"@/lib/data/programmes";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { QuietClose } from"@/components/composition/QuietClose";
import Link from"next/link";
import { ArrowRight } from"lucide-react";
import { ProgrammeFilter } from"@/components/content/ProgrammeFilter";

export const metadata: Metadata = {
  title:"Programmes | One Vision",
  description:"Active and upcoming community initiatives across Manipur — from emergency relief to youth education and mobile health clinics.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero 
        badge="OUR PROGRAMMES"
        heading={
          <>
            Five<br/>
            Priorities.
          </>
        }
        description="Expanding opportunities across Manipur through evidence-based interventions. We believe community-driven action is the only sustainable approach."
        image="/programmes-hero.jpg"
        imageAlt="Community initiative participants working together in Manipur"
      />

      <Section tone="alt" className="py-8 lg:py-12 border-b border-border">
        <Container>
          <ProgrammeFilter programmes={programmes} />
        </Container>
      </Section>
      <QuietClose
        label="Join the Network"
        heading="Ready to get involved?"
        description="Whether you can offer time, specialized skills, or resources, every single contribution helps build resilience in Imphal."
        action={
          <Link href="/volunteer" className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-destructive">
            <span>Volunteer with us</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    </div>
  );
}
