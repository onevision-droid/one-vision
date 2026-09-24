import { CampaignCard } from "@/components/content/CampaignCard";
import { SectionBadge } from "@/components/composition/SectionBadge";
import { programmes } from "@/lib/data/programmes";

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10">
          <SectionBadge>
            <span className="flex size-1.5 rounded-full bg-primary mr-2"></span>
            Active Initiatives
          </SectionBadge>
          <h1 className="text-balance font-fraunces text-5xl md:text-7xl font-light tracking-tight text-foreground mb-8">
            What we do.
          </h1>
          <p className="text-balance font-sans text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
            Active and upcoming initiatives dedicated to building resilience and expanding opportunities across Manipur. Evidence-based and community-driven.
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {programmes.map((p) => (
              <CampaignCard 
                key={p.id}
                title={p.title}
                summary={p.description}
                status={p.status}
                image={p.image}
                href={`/programmes/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
