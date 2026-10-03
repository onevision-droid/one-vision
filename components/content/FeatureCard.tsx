import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  eyebrow?: string;
  title: string;
  buttonText?: string;
  buttonHref?: string;
  image?: string;
  className?: string;
}

export function FeatureCard({
  eyebrow = "JOIN OUR WORK",
  title = "Support Communities in Manipur.",
  buttonText = "Donate Now",
  buttonHref = "/donate",
  image = "/home-hero-2026.jpg",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-none overflow-hidden p-5 sm:p-8 flex flex-col justify-between min-h-80 shadow-sm",
        className
      )}
    >
      {/* Background Image with Dark Vignette */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center transition-opacity duration-500 ease-out group-hover:opacity-95"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40"
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="size-2 rounded-none bg-emerald-400 animate-pulse" aria-hidden="true" />
        <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-white/90">
          {eyebrow}
        </span>
      </div>

      {/* Content + CTA Button */}
      <div className="relative z-10 mt-auto pt-8">
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug mb-6 max-w-sm">
          {title}
        </h3>

        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-white text-slate-900 font-sans text-sm font-medium transition-all duration-200 hover:bg-white/90 hover:gap-2.5 shadow-xs min-h-11 sm:min-h-10"
        >
          <span>{buttonText}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
