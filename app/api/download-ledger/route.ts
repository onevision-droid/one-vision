import { NextResponse } from "next/server";

const ledgerEntries = [
  { date: "Oct 15, 2026", title: "Medical Supplies Distribution", location: "Imphal East", amount: "4,50,000", status: "Completed" },
  { date: "Oct 10, 2026", title: "Winter Relief Kits", location: "Kangpokpi", amount: "2,25,000", status: "In Progress" },
  { date: "Sep 28, 2026", title: "Community Kitchen Support", location: "Churachandpur", amount: "1,80,000", status: "Completed" },
  { date: "Sep 15, 2026", title: "Educational Materials", location: "Bishnupur", amount: "3,10,000", status: "Completed" },
  { date: "Aug 22, 2026", title: "Emergency Medical Relief", location: "Tengnoupal", amount: "5,00,000", status: "Completed" },
  { date: "Aug 05, 2026", title: "Solar Lamps for Relief Camps", location: "Kakching", amount: "1,50,000", status: "Completed" },
];

export async function GET() {
  const header = "Date,Description,Location,Amount (INR),Status\n";
  const rows = ledgerEntries
    .map((e) => `"${e.date}","${e.title}","${e.location}","${e.amount}","${e.status}"`)
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
