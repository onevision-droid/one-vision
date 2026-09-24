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
    locale: "en_IN",
    siteName: "One Vision",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, fraunces.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink">
        <SkipLink />
        <TooltipProvider>
          <main id="main">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
