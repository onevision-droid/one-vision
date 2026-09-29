import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ConsentNotice } from "@/components/layout/ConsentNotice";
import { FloatingAgentChat } from "@/components/ai/floating-agent-chat";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ConsentNotice />
      <FloatingAgentChat />
    </div>
  );
}
