import { Metadata } from "next";
import { programmes } from "@/lib/data/programmes";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgrammeFilter } from "@/components/content/ProgrammeFilter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Programmes | One Vision",
  description: "Active and upcoming community initiatives across Manipur — from emergency relief to youth education and mobile health clinics.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      <PageHero 
        badge="Active Initiatives"
        heading={
          <>
            What <br />
            we do.
          </>
        }
        description="Active and upcoming initiatives dedicated to building resilience and expanding opportunities across Manipur. Evidence-based and community-driven."
        imageSrc="/new-illustrations/community-support.webp"
        imageAlt="Community members working together"
      />

      <Section tone="alt" className="py-24 border-b border-border-default">
        <Container>
          <div className="mb-10">
            <Breadcrumbs items={[{ label: "Programmes", href: "/programmes" }]} />
          </div>
          <ProgrammeFilter programmes={programmes} />
        </Container>
      </Section>
      <QuietClose
        label="Join the Network"
        heading="Ready to get involved?"
        description="Whether you can offer time, specialized skills, or resources, every single contribution helps build resilience in Imphal."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/volunteer" className="flex items-center">
                <span>Volunteer with us</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
