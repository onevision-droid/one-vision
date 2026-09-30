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

export const revalidate = 3600;

export default async function OpenLedgerPage() {
  const { data: dataEntries, error } = await supabase
    .from("fund_allocations")
    .select("*")
    .order("date", { ascending: false })
    .limit(100);

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
    <div className="flex flex-col w-full bg-background">
      <Section tone="default" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            <Breadcrumbs items={[{ label: "Reports", href: "/reports" }, { label: "Open Ledger", href: "/open-ledger" }]} />
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4">Financial Transparency</Badge>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight mb-4">
                  Open Ledger
                </h1>
                <p className="font-sans text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                  We believe in radical transparency. Every rupee we receive is accounted for. Here is our verified ledger of fund allocations across communities, reconciled and updated hourly.
                </p>
              </div>
              
              <Button variant="secondary" className="gap-2 shrink-0 font-sans text-xs" nativeButton={false} render={<a href="/api/download-ledger" />}>
                <Download className="size-3.5" />
                Export CSV
              </Button>
            </div>
            
            <div className="mt-8 sm:mt-10">
              <Ledger heading="Fund Allocations" headingId="allocations-ledger">
                {ledgerEntries?.map((entry: Tables<"fund_allocations">) => (
                  <LedgerRow
                    key={entry.id}
                    title={entry.title}
                    meta={`${formatDate(entry.date)} · ${entry.location}`}
                    action={
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span className="font-medium text-foreground">{entry.amount}</span>
                        <span className="text-caption text-muted-foreground">{entry.status}</span>
                      </div>
                    }
                  />
                ))}
                {(!ledgerEntries || ledgerEntries.length === 0) && (
                  <div className="py-8 text-center text-muted-foreground text-body-sm font-light">
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
