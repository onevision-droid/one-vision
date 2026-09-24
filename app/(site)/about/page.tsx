import { SectionBadge } from "@/components/composition/SectionBadge";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      {/* Intro Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
         <HalftoneBackground />
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10">
          <div className="max-w-4xl">
            <SectionBadge>
              Our Ethos
            </SectionBadge>
            <h1 className="font-fraunces text-6xl md:text-8xl font-light leading-none tracking-tight text-foreground mb-8">
              Grounded.<br/> Human.<br/> Forward.
            </h1>
            <p className="font-inter text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              One Vision is a civic studio rooted in Imphal: calm enough to listen, clear enough to act, and human enough to remember the people behind every programme.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Panel */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight mb-8 text-foreground">Transparency<br/>& Trust</h2>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed max-w-md">
                We believe in evidence over claims. Our outcomes are documented, and our processes are open. We do not use poverty, illness, or grief as visual decoration.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
              <div className="border-l border-primary/20 pl-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-inter text-sm font-medium text-foreground mb-4">Registration</h3>
                <p className="font-inter text-sm text-muted-foreground mb-1">NGO Registration #123456</p>
                <p className="font-inter text-sm text-muted-foreground">Imphal, Manipur, India</p>
              </div>
              <div className="border-l border-primary/20 pl-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-inter text-sm font-medium text-foreground mb-4">Contact</h3>
                <p className="font-inter text-sm text-muted-foreground mb-1">contact@onevision.org</p>
                <p className="font-inter text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Structure & People */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="mb-16">
            <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight text-foreground">
              The People
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="/about/governance" className="group block p-8 border border-border/50 bg-muted/10 hover:border-primary/30 hover:bg-muted/30 transition-all">
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">Governance & Leadership</h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Meet the Board of Directors shaping our strategic vision and maintaining institutional integrity.
              </p>
            </a>
            <a href="/about/team" className="group block p-8 border border-border/50 bg-muted/10 hover:border-primary/30 hover:bg-muted/30 transition-all">
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">Operational Team</h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Discover the dedicated staff, field workers, and volunteers executing our mission across Manipur.
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
