import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Timeline, type TimelineItem } from "@/components/content/Timeline";

const leaders = [
  {
    name: "Oinam Thoiba Singh",
    role: "President, One Vision Manipur",
    bio: "Guiding the strategic vision and institutional partnerships of One Vision since its establishment in 1988.",
  },
  {
    name: "Thaibal Singh",
    role: "General Secretary",
    bio: "Overseeing daily operations, community outreach, and administrative governance for the organization.",
  },
  {
    name: "Sapam Chital Singh",
    role: "Project Investigator",
    bio: "Leading scientific research and ecological integration. Alumnus of D.M. College of Science.",
  },
  {
    name: "Lamnganbi Ngangom",
    role: "Project Coordinator",
    bio: "Managing fieldwork, educational integration, and pedagogical outcomes. Alumnus of G.P. Women's College, Imphal.",
  }
];

const policies = [
  {
    title: "Financial Transparency",
    description: "Annual audited financial statements are published publicly. We enforce strict caps on administrative overhead to ensure funds reach programs directly."
  },
  {
    title: "Safeguarding",
    description: "Zero-tolerance policy for abuse or exploitation. Strict safeguarding protocols apply to all staff, volunteers, and partners interacting with vulnerable groups."
  },
  {
    title: "Conflict of Interest",
    description: "Board members and executives must declare all potential conflicts annually. Recusal is mandatory for any decisions involving affiliated entities."
  }
];

const milestones: TimelineItem[] = [
  {
    year: "1988",
    tag: "Founding",
    title: "Origins as Community Mutual Aid",
    description: "Established by local educators and community elders in Imphal to coordinate informal education, youth mentorship, and emergency relief during seasonal flash floods.",
    status: "completed",
  },
  {
    year: "1997",
    tag: "Incorporation",
    title: "Legal Registration under Societies Act",
    description: "Formally incorporated under the Manipur Societies Registration Act (Reg No: 1883/SR/1997) with a community-elected board and an open governance charter.",
    status: "completed",
  },
  {
    year: "2015",
    tag: "Scale",
    title: "Decentralized Youth & Field Volunteers",
    description: "Expanded outreach into rural valley districts, training over 250 youth coordinators in rapid emergency response and digital inventory tracking.",
    status: "completed",
  },
  {
    year: "2023",
    tag: "Crisis Response",
    title: "Emergency Relief & Mobile Clinics",
    description: "Mobilized continuous humanitarian aid, distributing emergency food rations, medicine, and establishing makeshift learning classrooms across relief centers.",
    status: "completed",
  },
  {
    year: "2026",
    tag: "Current",
    title: "Open Platform & Verified Dispatches",
    description: "Launched our open financial ledger, transparent field dispatch tracking, and direct grassroots help-request infrastructure.",
    status: "active",
  },
  {
    year: "2027",
    tag: "Roadmap",
    title: "Permanent Women-Led Wellness Hubs",
    description: "Transitioning temporary relief facilities into 12 self-sustaining community clinics and skill-building centers across Manipur.",
    status: "upcoming",
  },
];

export const metadata: Metadata = {
  title: "Governance & Leadership | One Vision",
  description: "Meet the board and executive team guiding One Vision. Committed to transparency, accountability, and community-led decision making.",
};

export default function GovernancePage() {
  return (
    <div className="flex flex-col w-full bg-surface pt-20">
      {/* Intro Section */}
      <Section tone="default" className="relative overflow-hidden py-16 md:py-20 border-b border-border-default">
        <HalftoneBackground />
        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Governance", href: "/about/governance" }]} />
          </div>
          <div className="max-w-4xl">
            <Badge className="mb-6">
              Governance & Leadership
            </Badge>
            <h1 className="font-sans text-display-lg md:text-display-lg font-light leading-none tracking-tight text-ink-900 mb-8">
              Accountable.<br/> Community-led.
            </h1>
            <p className="font-sans text-body-lg text-ink-500 leading-relaxed font-light max-w-2xl">
              Committed to transparency, accountability, and making decisions that are rooted in the lived realities of the communities we serve in Manipur.
            </p>
          </div>
        </Container>
      </Section>

      {/* Leadership Grid */}
      <Section tone="default" className="py-16 border-b border-border-default">
        <Container>
          <div className="mb-16 max-w-2xl">
            <h2 className="font-sans text-display-md font-light tracking-tight mb-6 text-ink-900">
              Our Leadership
            </h2>
            <p className="font-sans text-body-lg max-w-prose  text-ink-500 leading-relaxed">
              Our board and executive team bring decades of experience in healthcare, education, and community resilience within Manipur and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {leaders.map((leader, i) => (
              <Card key={i} className="flex flex-col h-full border-border-default hover:border-text-primary transition-colors">
                <CardContent className="flex flex-col p-8 h-full gap-2">
                  <h3 className="font-sans text-heading-lg font-medium text-ink-900">{leader.name}</h3>
                  <p className="font-sans text-caption font-semibold tracking-wide uppercase text-ink-500">{leader.role}</p>
                  <p className="font-sans text-body-lg max-w-prose  text-ink-500 leading-relaxed mt-2">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Institutional Timeline */}
      <Section tone="default" className="py-16 border-b border-border-default">
        <Container>
          <Timeline
            heading="Institutional Journey & Milestones"
            subheading="From informal mutual aid in 1988 to a verifiable civic infrastructure supporting communities across Manipur today."
            items={milestones}
          />
        </Container>
      </Section>

      {/* Policies */}
      <Section tone="alt" id="safeguarding" className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <h2 className="font-sans text-heading-xl font-medium tracking-tight mb-6 text-ink-900">
                Key Policies
              </h2>
              <p className="font-sans text-body-lg max-w-prose  text-ink-500 leading-relaxed mb-8">
                Our governance framework ensures that One Vision operates ethically, safely, and in alignment with our core mission.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {policies.map((policy, i) => (
                <div key={i} className="flex flex-col">
                  <h3 className="font-sans text-heading-md font-medium text-ink-900 mb-3">{policy.title}</h3>
                  <p className="font-sans text-body-sm max-w-prose text-ink-500 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
