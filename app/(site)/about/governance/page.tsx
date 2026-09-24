import { SectionBadge } from "@/components/composition/SectionBadge";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import Image from "next/image";

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

export const metadata = {
  title: "Governance & Leadership | One Vision",
  description: "Meet the board and executive team guiding One Vision. Committed to transparency, accountability, and community-led decision making.",
};

export default function GovernancePage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      {/* Intro Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
        <HalftoneBackground />
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10">
          <div className="max-w-4xl">
            <SectionBadge>
              Governance & Leadership
            </SectionBadge>
            <h1 className="font-fraunces text-6xl md:text-7xl font-light leading-none tracking-tight text-foreground mb-8">
              Accountable.<br/> Community-led.
            </h1>
            <p className="font-inter text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              Committed to transparency, accountability, and making decisions that are rooted in the lived realities of the communities we serve in Manipur.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight mb-6 text-foreground">
              Our Leadership
            </h2>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              Our board and executive team bring decades of experience in healthcare, education, and community resilience within Manipur and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {leaders.map((leader, i) => (
              <div key={i} className="flex flex-col group">
                <div className="border-l-2 border-primary/20 pl-6 group-hover:border-primary transition-colors duration-500">
                  <h3 className="font-fraunces text-2xl font-light text-foreground mb-1">{leader.name}</h3>
                  <p className="font-inter text-sm font-medium text-primary mb-4 tracking-wide uppercase">{leader.role}</p>
                  <p className="font-inter text-base text-muted-foreground leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <h2 className="font-fraunces text-3xl font-light tracking-tight mb-6 text-foreground">
                Key Policies
              </h2>
              <p className="font-inter text-base text-muted-foreground leading-relaxed mb-8">
                Our governance framework ensures that One Vision operates ethically, safely, and in alignment with our core mission.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {policies.map((policy, i) => (
                <div key={i} className="flex flex-col">
                  <h3 className="font-inter text-lg font-medium text-foreground mb-3">{policy.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
