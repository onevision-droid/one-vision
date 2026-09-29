import { Metadata } from"next";
import { VolunteerForm } from"@/components/forms/VolunteerForm";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { FAQ } from"@/components/composition/FAQ";
import Image from"next/image";
import { siteSettings } from"@/lib/data/site-settings";
import Link from"next/link";

export const metadata: Metadata = {
  title:"Volunteer | One Vision",
  description:
   "Join our network of volunteers and make a tangible impact in your community.",
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero
        badge="JOIN US"
        heading={
          <>
            Local<br/>
            Action.
          </>
        }
        description="The most effective change is driven by the community. Join our network of local leaders, educators, and volunteers."
        image="/volunteer-hero.jpg"
        imageAlt="Volunteers engaged in local community education and outreach in Manipur"
      />

      {/* 2 & 3. The Core Need & Mentorship Matrix */}
      <Section tone="alt" className="relative overflow-hidden bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border bg-card">
            <div className="lg:col-span-5 flex flex-col justify-center p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-primary mb-4 block">
                The Community Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-tight text-foreground leading-[0.98]">
                Your Skills Matter
              </h2>
              <p className="font-sans text-lg max-w-prose text-muted-foreground font-light leading-relaxed mb-8 sm:mb-10">
                Whether you have specialized skills in technology and education,
                or simply the time and willingness to help your neighborhood,
                there is a vital place for you here.
              </p>

              <div className="p-6 border-l-2 border-primary bg-muted/40 rounded-r-xs">
                <p className="font-sans text-lg max-w-prose font-light italic leading-relaxed text-foreground mb-6">
                  &quot;Volunteering here isn&apos;t just about giving time;
                  it&apos;s about building the future of our own community with
                  dignity and shared purpose.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-sm bg-primary flex items-center justify-center font-mono font-bold text-primary-foreground text-sm">
                    SS
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-body-sm">
                      S. Singh
                    </div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary mt-1">
                      FutureWorks Mentor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-96 lg:h-auto w-full overflow-hidden bg-muted">
              <Image
                src="/volunteer-hero.jpg"
                alt="Volunteers organizing community projects"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale mix-blend-luminosity opacity-75 transition-all duration-700 hover:grayscale-0 hover:mix-blend-normal hover:opacity-100"
              />
            </div>
          </div>
        </Container>

        <Container className="mt-8">
          <div className="border border-border bg-card">
            <div className="px-6 py-4 md:px-8 md:py-6 border-b border-border">
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-primary mb-3 block">
                What to Expect
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Our Commitment to You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 *:border-b *:md:border-b-0 *:border-r last:*:border-r-0 border-border *:border-border">
              <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-muted/50 transition-colors">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground">
                  01. Mentorship & Growth
                </h3>
                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
                  Volunteers learn alongside professionals. You gain real-world experience while making a direct impact on your community.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-muted/50 transition-colors">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground">
                  02. Clear Impact
                </h3>
                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
                  We only assign tasks that matter. You will see exactly how your time translates into community resilience and outcomes.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-muted/50 transition-colors">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground">
                  03. Respect for Time
                </h3>
                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
                  We know your time is valuable. We offer flexible scheduling and prioritize efficient, focused community action.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Volunteer Form (Document Shell Layout) */}
      <Section tone="default" className="border-t border-border">
        <Container>
          <div className="border border-border bg-muted">
            <div className="p-6 md:p-10 lg:p-12 border-b border-border bg-background">
              <div className="flex items-center gap-3 mb-4">
                <span className="size-2 bg-primary animate-pulse rounded-full" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  Registration
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground mb-4 tracking-tight leading-tight">
                Volunteer Application
              </h2>
              <p className="font-sans text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                Fill out the form below. Our volunteer coordinator will review
                your profile and contact you with upcoming opportunities that
                match your interests.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Form */}
              <div className="lg:col-span-7 p-6 md:p-8 lg:p-10 lg:border-r border-border">
                <VolunteerForm />
              </div>

              {/* Trust / Contact Sidebar */}
              <div className="lg:col-span-5 flex flex-col p-6 md:p-8 lg:p-10 bg-background">
                <div>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                    Get in Touch
                  </h3>

                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Coordinator Email
                      </h4>
                      <Link
                        href={`mailto:${siteSettings.contactEmail}`}
                        className="font-sans text-base font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {siteSettings.contactEmail}
                      </Link>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Coordinator Phone
                      </h4>
                      <Link
                        href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, "")}`}
                        className="font-sans text-base font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {siteSettings.contactPhone}
                      </Link>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Headquarters
                      </h4>
                      <p className="font-sans text-base font-medium text-foreground max-w-xs leading-relaxed">
                        {siteSettings.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border bg-card p-6 flex flex-col items-start gap-4 mt-8 sm:mt-10 rounded-sm">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-3">
                      Community First
                    </h4>
                    <p className="font-sans text-base text-muted-foreground font-light leading-relaxed">
                      By volunteering with One Vision, you join a network dedicated to long-term resilience and dignity for all in Manipur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. FAQs */}
      <FAQ
        tone="alt"
        heading="Volunteer FAQs"
        items={[
          {
            question:"How much time commitment is required?",
            answer:
             "We offer flexible volunteering. You can commit to a regular schedule (e.g., 4 hours a week) or join specific, one-off events as your time permits.",
          },
          {
            question:"Is training provided?",
            answer:
             "Yes, all volunteers undergo a brief orientation on our code of conduct, safety protocols, and specific task requirements.",
          },
          {
            question:"Are there opportunities for remote volunteering?",
            answer:
             "While many of our needs are on the ground in Imphal, we occasionally need help with digital outreach, coordination, or translation tasks. Let us know your skills in the application.",
          },
        ]}
      />
    </div>
  );
}
