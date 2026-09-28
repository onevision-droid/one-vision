import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// Cache this route for 1 hour to prevent DB hammering
export const revalidate = 3600;

export async function GET() {
  // Paged retrieval to fetch all ledger records without truncation
  type LedgerRecord = { date: string; title: string; location: string; amount: string; status: string };
  const allEntries: LedgerRecord[] = [];
  const pageSize = 1000;
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from("fund_allocations")
      .select("*")
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }

    if (data && data.length > 0) {
      allEntries.push(...(data as LedgerRecord[]));
      if (data.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    } else {
      hasMore = false;
    }
  }

  const header = "Date,Description,Location,Amount (INR),Status\n";
  const rows = allEntries
    .map((e) => {
      const d = new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return `"${d}","${e.title}","${e.location}","${e.amount}","${e.status}"`;
    })
    .join("\n");
  const csv = header + rows;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="one-vision-open-ledger-2026.csv"`,
    },
  });
}
