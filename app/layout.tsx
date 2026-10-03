import type { Metadata } from"next";
import { Inter, JetBrains_Mono, DM_Serif_Display, Plus_Jakarta_Sans, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SkipLink } from "@/components/ui/SkipLink";
import { DevTooling } from "@/components/providers/DevTooling";

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

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:"One Vision — Community Organisation · Imphal, Manipur",
    template:"%s | One Vision",
  },
  description:
   "One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ||"https://onevision.org"),
  openGraph: {
    type:"website",
    locale:"en_GB",
    siteName:"One Vision",
    title:"One Vision — Community Organisation · Imphal, Manipur",
    description:"One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
    images: [
      {
        url:"/og-image.jpg",
        width: 1200,
        height: 630,
        alt:"One Vision community organisation in Imphal, Manipur",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"One Vision — Community Organisation · Imphal, Manipur",
    description:"One Vision is a community-focused NGO connecting resources, programmes, and volunteers to build resilience across Imphal and Manipur.",
    images: ["/og-image.jpg"],
  },
  manifest:"/manifest.json",
  other: {
   "theme-color":"hsl(var(--background))",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={cn(
        "h-full antialiased overflow-x-hidden",
        inter.variable,
        jetbrainsMono.variable,
        dmSerifDisplay.variable,
        plusJakartaSans.variable,
        dmSans.variable,
        spaceGrotesk.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-text-primary overflow-x-hidden">
        <SkipLink />
        {children}
        <DevTooling />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`
          }}
        />
      </body>
    </html>
  );
}
