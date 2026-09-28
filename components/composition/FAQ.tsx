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
      <Container className="px-0 md:px-0">
        <div className="flex flex-col lg:flex-row border-x border-border-default bg-surface">
          <div className="w-full lg:w-5/12 flex flex-col p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border-default">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 mb-4 sm:mb-6 leading-tight">
              {heading}
            </h2>
            {description && (
              <p className="font-sans text-role-body-lg text-ink-500 font-light leading-relaxed mb-6 sm:mb-8 max-w-prose">
                {description}
              </p>
            )}
            <div className="mt-auto pb-4">
              <p className="font-sans text-role-body-sm text-ink-500 font-light">
                Have a different question?{" "}
                <Link
                  href="/contact"
                  className="font-bold text-ink-900 hover:text-safety-orange underline underline-offset-4 transition-colors"
                >
                  Contact us
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 p-6 md:p-8 lg:p-10 bg-paper">
            <Accordion className="w-full gap-0 divide-y divide-border-default">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0 bg-transparent rounded-none">
                  <AccordionTrigger className="font-serif text-xl sm:text-2xl font-light text-ink-900 hover:bg-transparent hover:text-safety-orange transition-colors px-0 py-4 sm:py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-role-body text-ink-500 leading-relaxed px-0 pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
