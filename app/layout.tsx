import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SkipLink } from "@/components/ui/SkipLink";
import { TooltipProvider } from "@/components/ui/tooltip";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "One Vision — Community Organisation · Imphal, Manipur",
    template: "%s | One Vision",
  },
  description:
    "One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://onevision.org"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "One Vision",
    title: "One Vision — Community Organisation · Imphal, Manipur",
    description: "One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
    images: [
      {
        url: "/new-illustrations/hero.webp",
        width: 1200,
        height: 630,
        alt: "One Vision community organisation in Imphal, Manipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Vision — Community Organisation · Imphal, Manipur",
    description: "One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
    images: ["/new-illustrations/hero.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={cn("h-full antialiased overflow-x-hidden", inter.variable, fraunces.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink-900 overflow-x-hidden">
        <SkipLink />
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
