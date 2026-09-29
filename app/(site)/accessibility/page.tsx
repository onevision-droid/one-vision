import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Accessibility Statement | One Vision",
  description: "One Vision's commitment to digital accessibility for all users.",
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Section tone="default" className="pt-16 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Accessibility", href: "/accessibility" }]} />
            
            <div>
              <Badge className="mb-6">Legal</Badge>
              <h1 className="font-sans text-display-md font-light tracking-tight text-foreground leading-[1.1] mb-6">
                Accessibility Statement
              </h1>
              <p className="text-body-lg max-w-prose  text-muted-foreground font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-sans prose-headings:font-light prose-p:text-ink-700 prose-p:font-light prose-p:leading-relaxed">
              <p>
                One Vision is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>

              <h2>Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p>
                The One Vision website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
              </p>

              <h2>Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of the One Vision website. Please let us know if you encounter accessibility barriers:
              </p>
              <ul>
                <li><strong>Email:</strong> accessibility@onevision.org</li>
                <li><strong>Phone:</strong> +91 (123) 456-7890</li>
                <li><strong>Postal Address:</strong> Imphal, Manipur, India</li>
              </ul>
              <p>
                We try to respond to feedback within 5 business days.
              </p>

              <h2>Technical Specifications</h2>
              <p>
                Accessibility of the One Vision website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul>
                <li>HTML</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
              <p>
                These technologies are relied upon for conformance with the accessibility standards used.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
