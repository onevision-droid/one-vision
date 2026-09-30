import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Accessibility Statement | One Vision",
  description: "One Vision's commitment to digital accessibility for all users.",
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Section tone="default" className="pt-12 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Accessibility", href: "/accessibility" }]} />
            
            <div>
              <Badge className="mb-4">Compliance</Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight mb-4">
                Accessibility Statement
              </h1>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed">
              <p>
                One Vision is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p>
                The One Vision website conforms with WCAG 2.1 level AA guidelines across semantic structure, keyboard navigation, color contrast, and screen reader announcements.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">Feedback & Contact</h2>
              <p>
                We welcome your feedback on the accessibility of the One Vision website. Please let us know if you encounter accessibility barriers:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Email:</strong> {siteSettings.contactEmail}</li>
                <li><strong>Phone:</strong> {siteSettings.contactPhone}</li>
                <li><strong>Postal Address:</strong> {siteSettings.address}</li>
              </ul>
              <p>
                We aim to respond to accessibility inquiries within 2 business days.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">Technical Specifications</h2>
              <p>
                Accessibility of the One Vision website relies on the following technologies to work with assistive devices:
              </p>
              <ul className="text-muted-foreground space-y-1">
                <li>HTML5 semantic landmarks</li>
                <li>WAI-ARIA roles and attributes</li>
                <li>Clean, token-driven CSS styling</li>
                <li>Next.js client/server component boundaries</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
