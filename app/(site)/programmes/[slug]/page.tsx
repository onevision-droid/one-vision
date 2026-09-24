import { notFound } from "next/navigation";
import { programmes } from "@/lib/data/programmes";
import { Shoreline } from "@/components/composition/Shoreline";
import { SplitNarrative } from "@/components/composition/SplitNarrative";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programmes.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return {};
  
  return {
    title: `${programme.title} | Programmes | One Vision`,
    description: programme.description,
  };
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  
  if (!programme) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-paper pt-20 pb-12">
      <Shoreline
        eyebrow={`Programme · ${programme.category}`}
        headline={programme.title}
        description={programme.description}
        surface="paper"
        actions={
          <Link href="/volunteer" className="button-primary">
            Volunteer for this
          </Link>
        }
        media={
          <Image src={programme.image} alt={programme.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-none" />
        }
      />
      
      <SplitNarrative
        className="mt-16"
        surface="mist"
        heading="Impact & Reach"
        content={
          <div className="space-y-6">
            <p>
              This initiative is actively running in <strong>{programme.location}</strong>. 
              Our focus remains on measurable outcomes and direct community support, ensuring dignity and long-term resilience.
            </p>
            <div className="pt-6 border-t border-border-subtle/50">
              <h3 className="font-display text-2xl mb-4">Current Status: <span className="text-terra">{programme.status}</span></h3>
              <p>We are currently looking for partners and volunteers to help expand this programme&apos;s reach.</p>
            </div>
          </div>
        }
        media={
          <div className="w-full h-full bg-paper flex items-center justify-center p-8 md:p-12 border border-border-subtle rounded-none">
            <div className="grid grid-cols-1 gap-6 w-full">
              {programme.metrics?.map((metric, i) => (
                <div key={i} className="bg-mist p-6 rounded-none shadow-sm text-center border border-border-subtle">
                  <div className="font-display text-4xl mb-2 text-forest">{metric.value}</div>
                  <div className="font-sans text-sm uppercase tracking-widest text-ink/70">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}
