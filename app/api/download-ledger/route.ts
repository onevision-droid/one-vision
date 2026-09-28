import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// Cache this route for 1 hour to prevent DB hammering
export const revalidate = 3600;

export async function GET() {
  // Hard limit to 5000 rows to prevent unbounded queries (DoS vector)
  const { data: ledgerEntries, error } = await supabase
    .from("fund_allocations")
    .select("*")
    .order("date", { ascending: false })
    .limit(5000);

  if (error || !ledgerEntries) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  const header = "Date,Description,Location,Amount (INR),Status\n";
  const rows = ledgerEntries
    .map((e: { date: string; title: string; location: string; amount: string; status: string }) => {
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
