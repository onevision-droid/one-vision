"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Section, Container } from "@/components/layout/Shell";

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
    <Section
      ref={containerRef}
      tone="alt"
      className="relative w-full pt-24 pb-6 md:pb-8 flex items-center overflow-hidden"
    >
      {/* Background Watermark Wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_60%_60%_at_0%_0%,rgba(27,58,91,0.06),transparent)]" />
        <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(184,92,51,0.04),transparent)]" />
        
        <motion.div
          style={{ rotate: watermarkRotate }}
          className="absolute inset-0 flex items-center justify-center opacity-[0.04]"
        >
          <span
            aria-hidden="true"
            className="font-serif text-[40vw] md:text-[300px] lg:text-[380px] font-light leading-none text-ink-900 select-none outline-text"
          >
            V
          </span>
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-14 items-center">
          {/* ── Left Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Link
                href="/stories"
                className="group inline-flex items-center border border-border-default bg-surface/50 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-widest font-semibold text-ink-500 transition-colors hover:bg-section-alt"
              >
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-safety-orange"></span>
                </span>
                Q3 Field Report
                <ArrowRight className="ml-2 size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Headline */}
            <h1 className="font-sans text-display-lg md:text-display-xl font-bold uppercase tracking-tighter leading-[1.05] text-ink-900 mb-5">
              <span className="overflow-hidden block py-1">
                <motion.span variants={itemVariants} className="block">
                  Vanguard
                </motion.span>
              </span>
              <span className="overflow-hidden block py-1 -mt-3">
                <motion.span variants={itemVariants} className="block text-safety-orange">
                  Action.
                </motion.span>
              </span>
            </h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="max-w-md text-ink-500 text-body-lg font-sans leading-relaxed font-light mb-8"
            >
              12,400+ people reached. 18 decentralised health nodes active. 240kW solar deployed. One vanguard operating across the Manipur polycrisis zone.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileTap={{ scale: 0.96 }} className="w-fit relative group">
                <Link
                  href="/donate"
                  className="relative inline-flex items-center gap-2 bg-safety-orange text-paper px-6 py-3 font-sans font-medium text-body-sm tracking-wide hover:bg-safety-orange-dim transition-colors"
                >
                  Deploy Support
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.96 }} className="w-fit">
                <Button
                  variant="link"
                  nativeButton={false}
                  render={<Link href="/get-help" className="h-btn-lg px-4" />}
                >
                  Secure Contact
                  <ArrowUpRight className="size-4 ml-1" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right — Editorial Image Frame ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block"
          >
            {/* Outer border frame — offset for depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-border-default translate-x-4 translate-y-4 z-0 pointer-events-none"
            />

            {/* Image container */}
            <motion.div
              style={{ y: parallax1 }}
              className="relative aspect-square lg:aspect-4/3 max-h-128 w-full overflow-hidden z-10"
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
                className="absolute inset-0 bg-linear-to-t from-bg-inverted/20 via-transparent to-transparent pointer-events-none"
              />

              {/* Caption badge */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                <div className="bg-paper/90 backdrop-blur-sm px-4 py-2.5 max-w-[80%]">
                  <p className="font-sans text-caption tracking-widest uppercase text-ink-500 mb-0.5">
                    Imphal, Manipur
                  </p>
                  <p className="font-sans text-body font-light text-ink-900 leading-snug">
                    Polycrisis zone — field operations active
                  </p>
                </div>
                <span className="font-sans text-label tracking-widest uppercase text-paper/60 mb-2 mr-1">
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
            sizes="90vw"
            className="object-cover object-top"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-bg-section-alt/60 via-transparent to-transparent"
          />
        </motion.div>
      </Container>
    </Section>
  );
}
