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
          <Link href="/volunteer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium transition-colors rounded-sm">
            <span>Volunteer</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />
    </div>
  );
}
