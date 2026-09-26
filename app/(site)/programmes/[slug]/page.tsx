import { notFound } from "next/navigation";
import { programmes } from "@/lib/data/programmes";
import { Section, Container } from "@/components/layout/Shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

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
    alternates: {
      canonical: `/programmes/${programme.slug}`,
    },
    openGraph: {
      title: `${programme.title} | Programmes | One Vision`,
      description: programme.description,
      images: [
        {
          url: programme.image,
          alt: programme.title,
        },
      ],
    },
  };
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  
  if (!programme) {
    return notFound();
  }

  const otherProgrammes = programmes
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-paper pt-20 pb-12">
      <Container className="pt-8 pb-4">
        <Breadcrumbs
          items={[
            { label: "Programmes", href: "/programmes" },
            { label: programme.title },
          ]}
        />
      </Container>

      {/* ── Document Shell Layout ── */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border-default bg-surface shadow-xl shadow-black/5">
          
          {/* Cinematic Header */}
          <div className="relative h-64 w-full md:h-96">
            <Image src={programme.image} alt={programme.title} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-ink-900/60 via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-paper/90 px-4 py-2 text-sm font-medium text-ink-900 backdrop-blur-md border border-border-default shadow-sm">
              <span className="size-2 rounded-full bg-clay-500 animate-pulse" />
              {programme.category}
            </div>
          </div>

          <div className="space-y-12 px-6 py-10 md:px-12 md:py-16">
            {/* Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", programme.status === "Active" ? "bg-ok" : "bg-warm")} />
                  <span className="font-medium text-ink-700">{programme.status}</span>
                </div>
                <span className="text-border-strong">•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  {programme.location}
                </div>
              </div>
              <h1 className="text-3xl font-serif text-ink-900 md:text-5xl lg:text-display-md font-light tracking-tight">
                {programme.title}
              </h1>
              <p className="max-w-3xl text-body-lg leading-relaxed text-ink-500 font-light">
                {programme.description}
              </p>
            </header>

            {/* Split Content */}
            <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <article className="space-y-6 text-body leading-relaxed text-ink-700 font-light">
                <p>
                  This initiative is actively running in <strong>{programme.location}</strong>. 
                  Our focus remains on measurable outcomes and direct community support, ensuring dignity and long-term resilience.
                </p>
                <p>
                  We treat every programme as a direct intervention: identifying exact community needs and deploying resources where they create the most impact. By keeping our processes transparent and community-led, we ensure that aid isn&apos;t just delivered, but effectively utilized to build capacity.
                </p>
                
                {/* Embedded Callout Box */}
                <div className="space-y-4 rounded-2xl border-l-4 border-clay-500 bg-clay-500/5 p-6 mt-8">
                  <p className="font-medium text-ink-900 text-body">
                    We are currently looking for partners and volunteers to help expand this programme&apos;s reach.
                  </p>
                </div>

                {programme.sections && programme.sections.length > 0 && (
                  <div className="mt-12 space-y-12">
                    {programme.sections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                        <h2 className="text-2xl font-serif text-ink-900 font-light">{section.title}</h2>
                        <p className="text-body leading-relaxed text-ink-700 font-light">
                          {section.content}
                        </p>
                      </section>
                    ))}
                  </div>
                )}
              </article>

              <aside className="space-y-8">
                {/* Sticky Metadata Card */}
                <div className="rounded-2xl border border-border-default bg-paper p-6 space-y-6 sticky top-24">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500">
                    Programme Impact
                  </h3>
                  <div className="space-y-4">
                    {programme.metrics?.map((metric, i) => (
                      <div key={i} className="flex flex-col gap-1 border-b border-border-default pb-4 last:border-0 last:pb-0">
                        <span className="font-serif text-display-sm text-ink-900">{metric.value}</span>
                        <span className="text-body-sm font-medium uppercase tracking-widest text-ink-500">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button variant="primary" className="w-full rounded-full gap-2 font-medium" nativeButton={false} render={<Link href="/volunteer" />}>
                      Volunteer here
                    </Button>
                    <Button variant="secondary" className="w-full rounded-full font-medium" nativeButton={false} render={<Link href="/donate" />}>
                      Support this programme
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programmes Section */}
      <Section tone="default">
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="font-sans text-heading-xl font-medium text-ink-900">Other programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProgrammes.map((p) => (
                <Card key={p.slug} className="group flex flex-col h-full border-border-default hover:border-ink-900 transition-colors bg-surface rounded-md overflow-hidden">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                  </div>
                  <CardContent className="flex flex-col p-6 gap-4">
                    <div className="font-sans tracking-widest uppercase text-label text-ink-500">{p.category}</div>
                    <h3 className="font-sans text-heading-md font-medium text-ink-900">{p.title}</h3>
                    <div className="mt-auto pt-4">
                      <Button variant="link" nativeButton={false} render={<Link href={`/programmes/${p.slug}`} />}>
                        Read more
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
