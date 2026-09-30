import { Metadata } from"next";
import Link from"next/link";
import { WifiOff, Lock, Phone } from"lucide-react";
import { siteSettings } from"@/lib/data/site-settings";

export const metadata: Metadata = {
  title:"Offline | One Vision",
  description:"You are currently offline. Critical contact information is available on this page.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto mb-8 flex size-10 items-center justify-center bg-muted border border-border">
          <WifiOff className="size-8 text-muted-foreground" strokeWidth={1.5} />
        </div>

        <h1 className="font-sans text-heading-xl font-medium text-foreground mb-4 tracking-tight">
          You are offline
        </h1>

        <p className="font-sans text-body max-w-prose text-muted-foreground font-light leading-relaxed mb-8">
          Your device has lost network connectivity. This can happen during
          blockades, power outages, or in areas with limited infrastructure.
          Critical contact information is available below.
        </p>

        <div className="bg-card text-background p-8 mb-8 text-left space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="size-4 text-destructive" />
            <span className="font-sans text-label uppercase tracking-widest text-destructive font-semibold">
              Emergency Contacts
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="size-5 text-background/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-body-sm max-w-prose font-semibold text-background">Field Phone</p>
                <p className="font-mono text-body max-w-prose text-background tracking-widest my-1 select-all">{siteSettings.contactPhone}</p>
                <p className="font-sans text-body-sm max-w-prose text-background/60">Contact frontline office directly</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-caption text-muted mb-6">
          Previously visited pages may still be available from cache.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-body-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          ← Try returning home
        </Link>
      </div>
    </div>
  );
}
