import { Metadata } from "next";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ } from "@/components/composition/FAQ";
import Image from "next/image";
import { siteSettings } from "@/lib/data/site-settings";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Volunteer | One Vision",
  description:
    "Join our network of volunteers and make a tangible impact in your community.",
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      {/* 1. Header / Intro */}
      <PageHero
        badge="Make an Impact"
        heading={
          <>
            Become a <br />
            Volunteer.
          </>
        }
        description="Our work is driven by the strength and dedication of local volunteers. Join us to make a tangible impact in Imphal and surrounding areas."
        imageSrc="/new-illustrations/volunteer-scene.webp"
        imageAlt="Volunteers working together"
      />

      {/* 2 & 3. The Core Need & Safety Matrix (Merged Dark Canvas) */}
      <Section tone="inverted" className="relative overflow-hidden">
        <Container className="relative z-10 pt-6 pb-0 [&_a]:text-paper/60 [&_a:hover]:text-paper [&_li]:text-paper/40 [&_span[aria-hidden]]:text-paper/30">
          <Breadcrumbs items={[{ label: "Volunteer", href: "/volunteer" }]} />
        </Container>
        <Container className="relative z-10 pb-24 border-b border-paper/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col justify-center pt-8">
              <span className="text-caption tracking-widest uppercase text-paper/60 font-semibold mb-4 block">
                The Core Need
              </span>
              <h2 className="text-heading-xl font-medium mb-6 tracking-tight text-paper">
                Your Time Matters
              </h2>
              <p className="text-body-lg text-paper/70 font-light leading-relaxed mb-12">
                Whether you have specialized skills in healthcare and education,
                or simply the time and willingness to help distribute supplies,
                there is a vital place for you here.
              </p>

              <div className="p-8 bg-paper/5 border border-paper/10 rounded-md relative backdrop-blur-md">
                <p className="text-body-lg font-serif font-light italic leading-relaxed text-paper mb-8 relative z-10">
                  &quot;Volunteering here isn&apos;t just about giving time;
                  it&apos;s about rebuilding our own community with
                  dignity.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-action-primary/10 border border-action-primary/20 rounded-full flex items-center justify-center text-action-primary font-serif text-sm">
                    SS
                  </div>
                  <div>
                    <div className="font-medium text-paper text-body-sm">
                      S. Singh
                    </div>
                    <div className="text-caption tracking-widest uppercase text-paper/60 mt-0.5">
                      Core Volunteer
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative aspect-4/3 lg:aspect-auto lg:h-175 w-full overflow-hidden border border-paper/10 rounded-md bg-ink-900/50">
              <Image
                src="/new-illustrations/volunteer-scene.webp"
                alt="Volunteers organizing supplies"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-base ease-in-out"
              />
            </div>
          </div>
        </Container>

        <Container className="relative z-10 pt-24 pb-12">
          <div className="mb-16">
            <span className="text-caption tracking-widest uppercase text-paper/70 font-semibold mb-4 block">
              Safety First
            </span>
            <h2 className="text-heading-xl font-medium tracking-tight text-paper">
              Our Commitment to You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 p-8 border border-paper/10 bg-paper/5 backdrop-blur-sm rounded-md hover:bg-paper/10 transition-colors">
              <h3 className="font-medium text-heading-md text-paper mb-2">
                01. Guided Deployments
              </h3>
              <p className="text-body-sm text-paper/70 font-light leading-relaxed">
                Volunteers are never sent into the field alone or without a
                clear mandate. Every team is led by a trained coordinator.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-8 border border-paper/10 bg-paper/5 backdrop-blur-sm rounded-md hover:bg-paper/10 transition-colors">
              <h3 className="font-medium text-heading-md text-paper mb-2">
                02. Verified Needs
              </h3>
              <p className="text-body-sm text-paper/70 font-light leading-relaxed">
                We only operate in areas where we have confirmed requests from
                local leadership and can guarantee safe passage.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-8 border border-paper/10 bg-paper/5 backdrop-blur-sm rounded-md hover:bg-paper/10 transition-colors">
              <h3 className="font-medium text-heading-md text-paper mb-2">
                03. Zero Liability
              </h3>
              <p className="text-body-sm text-paper/70 font-light leading-relaxed">
                You are not financially responsible for supplies. Your
                contribution is your time, expertise, and compassion.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Volunteer Form */}
      {/* 4. Volunteer Form (Document Shell Layout) */}
      <section className="w-full px-4 py-12 md:py-20 bg-paper">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border-default bg-surface shadow-xl shadow-black/5">
          <div className="bg-clay-500/5 px-8 py-10 md:px-12 md:py-12 border-b border-border-default">
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-clay-500 animate-pulse" />
              <span className="text-caption tracking-widest uppercase text-clay-500 font-semibold">
                Registration
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-ink-900 mb-4 tracking-tight">
              Volunteer Application
            </h2>
            <p className="text-body-lg text-ink-500 font-light leading-relaxed max-w-2xl">
              Fill out the form below. Our volunteer coordinator will review
              your profile and contact you with upcoming opportunities that
              match your interests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Form */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:border-r border-border-default">
              <VolunteerForm />
            </div>

            {/* Trust / Contact Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-10 p-8 md:p-12 bg-section-alt">
              <div>
                <h3 className="font-sans text-heading-md font-medium text-ink-900 mb-8 tracking-wide">
                  Get in Touch
                </h3>

                <div className="space-y-8 border-l-2 border-border-default ml-4 relative">
                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 rounded-full bg-surface border border-border-default flex items-center justify-center font-serif text-ink-900 font-medium text-xs">
                      @
                    </span>
                    <h4 className="font-medium text-ink-900 mb-1 mt-1 uppercase tracking-widest text-caption">
                      Coordinator Email
                    </h4>
                    <Link
                      href={`mailto:${siteSettings.contactEmail}`}
                      className="text-body-sm text-ink-500 hover:text-action-primary transition-colors block"
                    >
                      {siteSettings.contactEmail}
                    </Link>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 rounded-full bg-surface border border-border-default flex items-center justify-center font-serif text-ink-900 font-medium text-xs">
                      #
                    </span>
                    <h4 className="font-medium text-ink-900 mb-1 mt-1 uppercase tracking-widest text-caption">
                      Coordinator Phone
                    </h4>
                    <Link
                      href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`}
                      className="text-body-sm text-ink-500 hover:text-action-primary transition-colors block"
                    >
                      {siteSettings.contactPhone}
                    </Link>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute -left-3 top-0.5 size-6 rounded-full bg-surface border border-border-default flex items-center justify-center font-serif text-ink-900 font-medium text-xs">
                      *
                    </span>
                    <h4 className="font-medium text-ink-900 mb-1 mt-1 uppercase tracking-widest text-caption">
                      Headquarters
                    </h4>
                    <p className="text-body-sm text-ink-500 max-w-xs leading-relaxed">
                      {siteSettings.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-ink-900 p-8 rounded-2xl flex flex-col items-start gap-4 mt-auto">
                <div>
                  <h4 className="text-heading-md font-medium text-paper mb-2">
                    Community First
                  </h4>
                  <p className="text-body-sm text-paper/70 font-light leading-relaxed">
                    By volunteering with One Vision, you join a network dedicated to long-term resilience and dignity for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <FAQ
        tone="alt"
        heading="Volunteer FAQs"
        items={[
          {
            question: "How much time commitment is required?",
            answer:
              "We offer flexible volunteering. You can commit to a regular schedule (e.g., 4 hours a week) or join specific, one-off events as your time permits.",
          },
          {
            question: "Is training provided?",
            answer:
              "Yes, all volunteers undergo a brief orientation on our code of conduct, safety protocols, and specific task requirements.",
          },
          {
            question: "Are there opportunities for remote volunteering?",
            answer:
              "While many of our needs are on the ground in Imphal, we occasionally need help with digital outreach, coordination, or translation tasks. Let us know your skills in the application.",
          },
        ]}
      />
    </div>
  );
}
