"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const stats = [
  { value: "4,500+", label: "People reached" },
  { value: "45", label: "Communities" },
  { value: "320", label: "Youth enrolled" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center pt-28 pb-16 bg-mist overflow-hidden"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ rotate: watermarkRotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]"
      >
        <span
          aria-hidden="true"
          className="font-display text-[40vw] font-light leading-none text-ink select-none outline-text"
        >
          V
        </span>
      </motion.div>

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl w-full">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-20 items-center lg:items-start">

          {/* ── Left Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="eyebrow text-ink/40 mb-8 tracking-[0.18em]"
            >
              Imphal · Manipur · India
            </motion.p>

            {/* Headline */}
            <h1 className="font-display text-(length:--text-display-l) font-light tracking-tight leading-[1.05] text-ink mb-8">
              <span className="overflow-hidden block py-1">
                <motion.span variants={itemVariants} className="block">
                  Strong
                </motion.span>
              </span>
              <span className="overflow-hidden block py-1 -mt-3">
                <motion.span variants={itemVariants} className="block">
                  communities begin
                </motion.span>
              </span>
              <span className="overflow-hidden block py-1 -mt-3">
                <motion.span variants={itemVariants} className="block">
                  with people.
                </motion.span>
              </span>
            </h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="max-w-sm text-ink/60 text-lg font-inter leading-relaxed font-light mb-10"
            >
              Connecting resources, programmes, and volunteers to build
              resilience across Imphal and Manipur.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col min-[400px]:flex-row gap-4 mb-14"
            >
              <motion.div whileTap={{ scale: 0.96 }} className="w-fit">
                <Button
                  size="lg"
                  className="button-primary h-13 px-8 rounded-none flex items-center gap-3"
                  nativeButton={false}
                  render={<Link href="/volunteer" />}
                >
                  Get Involved
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.96 }} className="w-fit">
                <Link
                  href="/programmes"
                  className="inline-flex items-center gap-2 h-13 px-2 font-inter text-eyebrow tracking-widest uppercase text-ink/50 hover:text-ink transition-colors duration-200 border-b border-ink/10 hover:border-ink/40"
                >
                  What we do
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-6 border-t border-ink/8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-2xl font-light text-ink tabular-nums">
                    {stat.value}
                  </span>
                  <span className="font-inter text-[0.75rem] tracking-wider uppercase text-ink/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — Editorial Image Frame ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block lg:mt-10"
          >
            {/* Outer border frame — offset for depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-ink/8 translate-x-4 translate-y-4 z-0 pointer-events-none"
            />

            {/* Image container */}
            <motion.div
              style={{ y: parallax1 }}
              className="relative aspect-square max-h-[72vh] w-full overflow-hidden z-10"
            >
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0 w-full h-full origin-center"
              >
                <Image
                  alt="Community members working together in Imphal"
                  className="object-cover w-full h-full"
                  src="/new-illustrations/hero.webp"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Gradient vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink/20 via-transparent to-transparent pointer-events-none"
              />

              {/* Editorial caption badge */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                <div className="bg-paper/90 backdrop-blur-sm px-4 py-2.5 max-w-[80%]">
                  <p className="font-inter text-[0.6875rem] tracking-widest uppercase text-ink/50 mb-0.5">
                    Imphal, Manipur
                  </p>
                  <p className="font-display text-sm font-light text-ink leading-snug">
                    Community resilience in action
                  </p>
                </div>
                <span className="font-inter text-[0.625rem] tracking-widest uppercase text-paper/60 mb-2 mr-1">
                  2026
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Mobile illustration strip (visible only below md) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden mt-10 relative aspect-video w-full overflow-hidden"
        >
          <Image
            alt="Community members working together in Imphal"
            src="/new-illustrations/hero.webp"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-mist/60 via-transparent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
