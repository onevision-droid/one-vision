import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Ledger, LedgerRow } from "@/components/composition/Ledger";
import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/supabase/database.types";
import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Open Ledger | One Vision",
  description: "Transparent view of our fund allocations and impact.",
};

export default async function OpenLedgerPage() {
  const { data: dataEntries, error } = await supabase
    .from("fund_allocations")
    .select("*")
    .order("date", { ascending: false });

  const ledgerEntries = error || !dataEntries ? [] : dataEntries;

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      <Section tone="default" className="pt-16 pb-24 border-b border-border-default">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Reports", href: "/reports" }, { label: "Open Ledger", href: "/open-ledger" }]} />
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <Badge className="mb-6">Financial Transparency</Badge>
                <h1 className="font-serif text-display-md font-light tracking-tight text-ink-900 leading-[1.1] mb-6">
                  Open Ledger
                </h1>
                <p className="text-body-lg text-ink-500 font-light leading-relaxed max-w-2xl">
                  We believe in radical transparency. Every rupee we receive is accounted for. Here is a real-time record of our fund allocations across communities.
                </p>
              </div>
              
              <Button variant="secondary" className="gap-2 shrink-0" nativeButton={false} render={<a href="/api/download-ledger" />}>
                <Download className="size-4" />
                Download CSV
              </Button>
            </div>
            
            <div className="mt-16">
              <Ledger heading="Fund Allocations" headingId="allocations-ledger">
                {ledgerEntries?.map((entry: Tables<"fund_allocations">) => (
                  <LedgerRow
                    key={entry.id}
                    title={entry.title}
                    meta={`${formatDate(entry.date)} · ${entry.location}`}
                    action={
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span className="font-medium text-ink-900">{entry.amount}</span>
                        <span className="text-caption text-ink-500">{entry.status}</span>
                      </div>
                    }
                  />
                ))}
                {(!ledgerEntries || ledgerEntries.length === 0) && (
                  <div className="py-8 text-center text-ink-500 text-body-sm font-light">
                    No allocations recorded yet.
                  </div>
                )}
              </Ledger>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
