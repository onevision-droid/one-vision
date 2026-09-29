import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team | One Vision",
  description: "Meet the dedicated staff, field workers, and volunteers driving One Vision's community programmes in Manipur.",
};

const departments = [
  {
    name: "Medical Operations",
    description: "Coordinating the mobile health clinics, emergency response protocols, and clinical partnerships.",
    members: [
      { name: "Dr. Bembem Chanu", role: "Clinical Director", bio: "Leads our mobile health strategy and disaster response protocols." },
      { name: "Sushila Devi", role: "Head Nurse", bio: "Manages field triage and pediatric nutrition assessments." },
      { name: "Tomba Singh", role: "Pharmacy Logistics", bio: "Ensures the secure and timely distribution of essential medicines." }
    ]
  },
  {
    name: "Community Outreach & Education",
    description: "Running the youth technology literacy programs, the School Aushadhi Lab, and grassroots organizing.",
    members: [
      { name: "Lin Laishram", role: "Community Operations Lead", bio: "Specializes in youth technology literacy and community resilience networks." },
      { name: "Bikramjit Meitei", role: "Field Educator", bio: "Translates complex environmental topics into accessible local workshops." },
      { name: "Sanatombi Chanu", role: "Volunteer Coordinator", bio: "Onboards, trains, and deploys our network of 500+ local volunteers." }
    ]
  },
  {
    name: "Administration & Logistics",
    description: "The backbone of One Vision, ensuring transparent accounting, fleet management, and operational security.",
    members: [
      { name: "Kiran Kumar", role: "Fleet Manager", bio: "Maintains the mobile clinic vehicles and ensures safe transport in remote areas." },
      { name: "Anita Leima", role: "Accounts Officer", bio: "Oversees financial transparency and statutory grant reporting." }
    ]
  }
];

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full bg-muted pt-20">
      
      {/* Hero Section */}
      <Section tone="default" className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32 border-b border-border">
        <HalftoneBackground />
        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Team", href: "/about/team" }]} />
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="default" className="mb-6 mx-auto">Our People</Badge>
            <h1 className="font-sans text-display-lg md:text-display-lg font-light leading-none tracking-tight text-foreground mb-8">
              The Team Behind <br className="hidden md:block"/> the Vision
            </h1>
            <p className="font-sans text-body-lg text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
              While our <Link href="/about/governance" className="underline underline-offset-4 hover:text-foreground transition-colors">Board of Directors</Link> sets the strategic horizon, it is our dedicated staff, field workers, and volunteers who turn policy into reality on the ground in Manipur.
            </p>
          </div>
        </Container>
      </Section>

      {/* Roster Section */}
      <Section tone="default" className="pt-24 pb-24">
        <Container className="max-w-5xl">
          <div className="space-y-24">
            {departments.map((dept, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                
                <div className="md:col-span-4">
                  <div className="sticky top-28">
                    <h2 className="font-sans text-heading-xl font-medium text-foreground mb-4">{dept.name}</h2>
                    <p className="font-sans text-body-sm max-w-prose text-muted-foreground leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {dept.members.map((member, mIdx) => (
                      <Card key={mIdx} className="flex flex-col h-full border-border hover:border-text-primary transition-colors">
                        <CardContent className="flex flex-col p-6 h-full gap-2">
                          <h3 className="font-sans font-medium text-heading-md text-foreground">{member.name}</h3>
                          <p className="font-sans text-caption font-semibold uppercase tracking-wider text-muted-foreground">{member.role}</p>
                          <div className="mt-2 text-body-sm text-muted-foreground leading-relaxed">{member.bio}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Secure Contact CTA */}
      <Section tone="alt" className="pt-24 pb-24 border-t border-border">
        <Container className="max-w-3xl text-center">
          <h2 className="font-sans text-heading-xl font-light tracking-tight text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed mb-8">
            To protect our staff from spam and ensure your inquiry is routed to the correct department immediately, please use our secure central contact form.
          </p>
          <Button
            nativeButton={false}
            variant="primary"
            size="lg"
            className="px-8 gap-2"
            render={
              <Link href="/contact" className="inline-flex items-center justify-center">
                Contact the Team <ArrowRight aria-hidden="true" />
              </Link>
            }
          />
        </Container>
      </Section>

    </div>
  );
}
