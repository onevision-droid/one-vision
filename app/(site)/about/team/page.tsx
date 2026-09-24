import { SectionBadge } from "@/components/composition/SectionBadge";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
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
    <div className="flex flex-col w-full bg-background pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
        <HalftoneBackground />
        <div className="container mx-auto px-4 md:px-12 max-w-4xl relative z-10 text-center">
          <SectionBadge className="mb-6 mx-auto">Our People</SectionBadge>
          <h1 className="font-fraunces text-5xl md:text-7xl font-light leading-none tracking-tight text-foreground mb-8">
            The Team Behind <br className="hidden md:block"/> the Vision
          </h1>
          <p className="font-inter text-lg text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            While our <Link href="/about/governance" className="underline underline-offset-4 hover:text-foreground transition-colors">Board of Directors</Link> sets the strategic horizon, it is our dedicated staff, field workers, and volunteers who turn policy into reality on the ground in Manipur.
          </p>
        </div>
      </section>

      {/* Roster Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">
          
          <div className="space-y-24">
            {departments.map((dept, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                
                <div className="md:col-span-4">
                  <div className="sticky top-28">
                    <h2 className="font-fraunces text-3xl font-light text-foreground mb-4">{dept.name}</h2>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {dept.members.map((member, mIdx) => (
                      <div key={mIdx} className="flex flex-col border-l-2 border-primary/20 pl-6 py-1 hover:border-primary transition-colors">
                        <h3 className="font-inter font-medium text-lg text-foreground mb-1">{member.name}</h3>
                        <p className="font-inter text-xs font-semibold uppercase tracking-wider text-primary mb-3">{member.role}</p>
                        <p className="font-inter text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Secure Contact CTA */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-3xl text-center">
          <h2 className="font-fraunces text-3xl font-light tracking-tight text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="font-inter text-muted-foreground leading-relaxed mb-8">
            To protect our staff from spam and ensure your inquiry is routed to the correct department immediately, please use our secure central contact form.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-none bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2"
          >
            Contact the Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
