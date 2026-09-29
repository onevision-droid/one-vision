import { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { Section, Container } from "@/components/layout/Shell";
import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events & Community Assemblies | One Vision",
  description:
    "Upcoming townhalls, volunteer orientations, and community workshops organised by One Vision in Imphal and surrounding districts.",
};

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");

  // Generate Event JSON-LD structured data for upcoming events
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": upcomingEvents.map((evt) => ({
      "@type": "Event",
      name: evt.title,
      description: evt.description,
      startDate: evt.date,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: evt.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Imphal",
          addressRegion: "Manipur",
          addressCountry: "IN",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "One Vision",
        url: "https://onevision.org",
      },
    })),
  };

  return (
    <div className="flex flex-col w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        badge="Community Assemblies"
        heading={
          <>
            Gathering for <br />
            Collective Action.
          </>
        }
        description="We convene regularly with ward representatives, local youth, healthcare workers, and community members to plan transparent aid distribution and resilience programs."
      />

      {/* Upcoming Events */}
      <Section tone="default" className="py-16 border-b border-border">
        <Container>
          <div className="mb-12">
            <Breadcrumbs items={[{ label: "Events", href: "/events" }]} />
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <span className="text-caption tracking-widest uppercase text-muted-foreground font-semibold mb-2 block">
                Public Schedule
              </span>
              <h2 className="font-sans text-heading-xl font-medium text-foreground">
                Upcoming Assemblies & Workshops
              </h2>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((evt) => (
                <article
                  key={evt.id}
                  id={evt.slug}
                  className="bg-muted border border-border hover:border-action-primary transition-colors p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start justify-between scroll-mt-24"
                >
                  <div className="space-y-4 max-w-xl">
                    <div className="flex flex-wrap items-center gap-3 text-caption font-semibold uppercase tracking-wider text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 text-action-primary">
                        <Calendar className="size-3.5" />
                        <time dateTime={evt.date}>{evt.displayDate}</time>
                      </span>
                      {evt.time && (
                        <>
                          <span className="size-1 bg-ink-300" />
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {evt.time}
                          </span>
                        </>
                      )}
                      <span className="size-1 bg-ink-300" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {evt.location}
                      </span>
                    </div>

                    <h3 className="font-sans text-heading-lg font-light text-foreground leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-body-sm max-w-prose text-muted-foreground font-light leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="shrink-0 pt-2 md:pt-0">
                    <Button
                      variant="primary"
                      className="w-full md:w-auto"
                      nativeButton={false}
                      render={
                        <Link href={evt.registrationUrl || "/contact"}>
                          Register to Attend <ArrowRight className="size-4 ml-1.5" />
                        </Link>
                      }
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Past Events & Documented Outcomes */}
      <Section tone="alt" className="py-16 border-b border-border">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <span className="text-caption tracking-widest uppercase text-muted-foreground font-semibold mb-2 block">
                Accountability Archive
              </span>
              <h2 className="font-sans text-heading-xl font-medium text-foreground">
                Past Assemblies & Documented Outcomes
              </h2>
              <p className="text-body text-muted-foreground font-light mt-2 max-w-2xl">
                Every event we conduct must yield measurable community value. Here is the public record of past assemblies and their delivered outcomes.
              </p>
            </div>

            <div className="space-y-6">
              {pastEvents.map((evt) => (
                <article
                  key={evt.id}
                  id={evt.slug}
                  className="bg-muted border border-border p-6 md:p-8 space-y-4 scroll-mt-24"
                >
                  <div className="flex flex-wrap items-center gap-3 text-caption font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      <time dateTime={evt.date}>{evt.displayDate}</time>
                    </span>
                    <span className="size-1 bg-ink-300" />
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {evt.location}
                    </span>
                    <span className="size-1 bg-ink-300" />
                    <span className="text-caption uppercase px-2 py-0.5 bg-muted-alt border border-border">
                      Completed
                    </span>
                  </div>

                  <h3 className="font-sans text-heading-lg font-light text-foreground">
                    {evt.title}
                  </h3>

                  <p className="text-body-sm max-w-prose text-muted-foreground font-light leading-relaxed">
                    {evt.description}
                  </p>

                  {evt.outcome && (
                    <div className="bg-muted-alt border border-border p-4 flex items-start gap-3 mt-4">
                      <CheckCircle2 className="size-5 text-action-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-caption uppercase tracking-wider text-foreground font-semibold block mb-0.5">
                          Verified Outcome
                        </span>
                        <p className="text-body-sm max-w-prose text-ink-700 font-light leading-relaxed">
                          {evt.outcome}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <QuietClose
        label="Host an Assembly"
        heading="Need an assembly in your ward?"
        description="If your community or relief center requires coordination, medical triage orientation, or aid planning, reach out to our team."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/contact" className="flex items-center">
                Contact Coordination Team <ArrowRight className="size-4 ml-1.5" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
