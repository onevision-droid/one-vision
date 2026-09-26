import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { TrendingUp, ShieldCheck, Activity } from "lucide-react";

type Partner = {
  name: string;
  focus: string;
  status: string;
  icon: React.ElementType;
  logoClass: string;
};

const partners: Partner[] = [
  {
    name: "Local Health Initiative",
    focus: "Medical & Camps",
    status: "Active Response",
    icon: Activity,
    logoClass: "bg-clay-600",
  },
  {
    name: "Manipur Relief Fund",
    focus: "Resource Routing",
    status: "Verified Partner",
    icon: ShieldCheck,
    logoClass: "bg-ink-800",
  },
  {
    name: "Imphal Valley Assoc.",
    focus: "Shelter & Water",
    status: "Scaling Up",
    icon: TrendingUp,
    logoClass: "bg-ok",
  },
  {
    name: "Community Care Trust",
    focus: "Trauma Care",
    status: "Active Response",
    icon: Activity,
    logoClass: "bg-warm",
  },
  {
    name: "Education First NGO",
    focus: "Student Support",
    status: "Verified Partner",
    icon: ShieldCheck,
    logoClass: "bg-clay-500",
  },
  {
    name: "Rural Dev Corp",
    focus: "Livelihood Recovery",
    status: "Scaling Up",
    icon: TrendingUp,
    logoClass: "bg-ink-600",
  },
];

const PartnerTickerItem = ({ name, focus, status, icon: Icon, logoClass }: Partner) => {
  return (
    <div className="flex items-center gap-4 px-8">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-none text-xs font-serif text-white",
          logoClass
        )}
      >
        {name.charAt(0)}
      </div>
      <p className="text-sm font-medium text-ink-900">{name}</p>
      <p className="text-sm text-ink-500 font-light">{focus}</p>
      <p className="flex items-center gap-1.5 text-xs font-medium text-ok">
        <Icon className="size-3.5" aria-hidden="true" />
        {status}
      </p>
      <span className="ml-4 text-border-strong font-serif">✦</span>
    </div>
  );
};

export function PartnerLogoRow() {
  return (
    <div className="relative py-12 border-y border-border-default bg-surface overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <BlurFade delay={0.1} offset={12} inView direction="up">
          <p className="font-sans text-xs uppercase tracking-widest text-ink-500 font-medium">
            Working alongside trusted organizations across Manipur
          </p>
        </BlurFade>
      </div>
      
      <BlurFade delay={0.3} offset={12} inView direction="up" className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover duration={120}>
          {partners.map((partner, index) => (
            <PartnerTickerItem key={`${partner.name}-${index}`} {...partner} />
          ))}
        </Marquee>
        
        {/* Edge Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-surface to-transparent" />
      </BlurFade>
    </div>
  );
}
