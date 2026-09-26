export interface Report {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  size: string;
  type: "Annual Report" | "Assessment" | "Progress Report" | "Financial Summary";
  description: string;
  downloadUrl: string;
}

export const reports: Report[] = [
  {
    id: "rep-1",
    title: "Annual Impact Report 2025",
    date: "2026-01-15",
    displayDate: "Jan 2026",
    size: "4.2 MB",
    type: "Annual Report",
    description: "Comprehensive overview of our relief efforts, community support metrics, and financial breakdown for the previous year.",
    downloadUrl: "/reports/one-vision-annual-impact-2025.pdf",
  },
  {
    id: "rep-2",
    title: "Winter Relief Operations Summary",
    date: "2025-12-10",
    displayDate: "Dec 2025",
    size: "1.8 MB",
    type: "Progress Report",
    description: "Detailed operational report on the delivery of winter supplies to high-altitude camps across Kangpokpi and Churachandpur.",
    downloadUrl: "/reports/one-vision-winter-relief-2025.pdf",
  },
  {
    id: "rep-3",
    title: "Education Initiative Q3 Update",
    date: "2025-10-05",
    displayDate: "Oct 2025",
    size: "2.1 MB",
    type: "Progress Report",
    description: "Progress report on the Youth Tech Literacy programme across 12 partner schools in Imphal City.",
    downloadUrl: "/reports/one-vision-education-q3-2025.pdf",
  },
  {
    id: "rep-4",
    title: "Flood Relief Assessment 2025",
    date: "2025-07-20",
    displayDate: "Jul 2025",
    size: "3.5 MB",
    type: "Assessment",
    description: "Field assessment covering the emergency relief operations following the Imphal Valley floods — scope, deployment, and outcome metrics.",
    downloadUrl: "/reports/one-vision-flood-relief-assessment-2025.pdf",
  },
  {
    id: "rep-5",
    title: "Financial Summary FY 2024–25",
    date: "2025-04-30",
    displayDate: "Apr 2025",
    size: "0.9 MB",
    type: "Financial Summary",
    description: "Audited financial statements and fund utilisation breakdown for the fiscal year 2024–25, including programme-wise expenditure.",
    downloadUrl: "/reports/one-vision-financial-summary-2024-25.pdf",
  },
];
