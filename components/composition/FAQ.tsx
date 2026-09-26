import { Section, Container } from "@/components/layout/Shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  heading?: string;
  description?: string;
  items: FAQItem[];
  tone?: "default" | "alt" | "inverted";
}

export function FAQ({
  heading = "Frequently Asked Questions",
  description,
  items,
  tone = "default",
}: FAQProps) {
  return (
    <Section tone={tone} className="border-t border-border-default">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4 flex flex-col">
            <h2 className="font-sans text-heading-xl font-medium text-ink-900 mb-6">
              {heading}
            </h2>
            {description && (
              <p className="text-body-lg text-ink-500 font-light leading-relaxed mb-8">
                {description}
              </p>
            )}
            <div className="mt-auto hidden md:block pb-4">
              <p className="text-body-sm text-ink-500 font-light">
                Have a different question?{" "}
                <Link
                  href="/contact"
                  className="text-ink-900 font-medium hover:text-action-primary underline underline-offset-4 transition-colors"
                >
                  Contact us
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="md:col-span-8">
            <Accordion className="w-full">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="md:hidden pt-8 border-t border-border-default mt-4">
            <p className="text-body-sm text-ink-500 font-light">
              Have a different question?{" "}
              <Link
                href="/contact"
                className="text-ink-900 font-medium hover:text-action-primary underline underline-offset-4 transition-colors"
              >
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
