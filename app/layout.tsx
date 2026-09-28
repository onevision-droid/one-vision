import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Libre_Baskerville, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SkipLink } from "@/components/ui/SkipLink";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
  weight: ["400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500"],
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#171717",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={cn("h-full antialiased overflow-x-hidden", inter.variable, jetbrainsMono.variable, libreBaskerville.variable, oswald.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-text-primary overflow-x-hidden">
        <SkipLink />
        <TooltipProvider>
          <main id="main-content">
            {children}
          </main>
        </TooltipProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`
          }}
        />
      </body>
    </html>
  );
}
