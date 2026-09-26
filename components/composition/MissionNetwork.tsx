"use client";

import { Section, Container } from "@/components/layout/Shell";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Package,
  HeartHandshake,
  Tent,
  Shield,
  Users,
  ArrowRight,
  LineChart,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MissionNetwork() {
  return (
    <Section tone="default" className="relative overflow-hidden">
      <Container>
        <NetworkIllustration />

        <div className="mx-auto mt-16 max-w-xl text-balance text-center relative z-10">
          <h2 className="font-sans text-heading-xl md:text-display-md font-medium text-ink tracking-tight">
            Our Mission
          </h2>
          <p className="text-ink/60 mb-8 mt-4 text-body-lg font-light leading-relaxed">
            We measure our success not by claims, but by transparent, documented
            outcomes in the communities we serve. Everything connects back to
            impact.
          </p>
          <Button
            nativeButton={false}
            variant="secondary"
            render={
              <Link href="/about" className="flex items-center gap-2">
                <span>Read our manifesto</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </Section>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  },
};

const boxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0, x: "-100%" },
  visible: { 
    opacity: [0, 0.3, 0],
    x: ["-100%", "100%"],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "linear",
      repeatDelay: 1
    } 
  },
};

const NetworkIllustration = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-hidden="true"
      className="mx-auto flex h-56 max-w-xl flex-col justify-between relative z-0"
    >
      {/* Top row */}
      <div className="relative flex h-12 items-center justify-between px-6 sm:px-12">
        <motion.div variants={lineVariants} className="bg-ink-700/10 absolute inset-0 my-auto h-px origin-center"></motion.div>

        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: -3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <Package className="size-5" />
        </motion.div>
        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: 3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <Tent className="size-5" />
        </motion.div>
      </div>

      {/* Middle row (Main flow) */}
      <div className="relative flex h-16 items-center justify-between sm:px-8">
        <motion.div variants={lineVariants} className="bg-ink-700/10 absolute inset-0 my-auto h-px origin-center"></motion.div>

        {/* Active connection glowing lines (Animated pulse moving across) */}
        <div className="absolute inset-0 my-auto h-0.5 w-full overflow-hidden">
          <motion.div 
            variants={glowVariants}
            className="h-full w-1/2 bg-linear-to-r from-transparent via-ink-900 to-transparent blur-[1px]"
          />
        </div>

        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: -3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <HeartHandshake className="size-5" />
        </motion.div>

        {/* Center Node */}
        <motion.div variants={boxVariants} className="border-ink-700/20 border border-dashed p-3 bg-paper z-10 relative">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white border border-ink-700/20 relative flex h-14 px-6 items-center justify-center shadow-sm">
            <Logo className="h-5" />
          </motion.div>
        </motion.div>

        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: 3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <Shield className="size-5" />
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="relative flex h-12 items-center justify-between px-12 sm:px-24">
        <motion.div variants={lineVariants} className="bg-ink-700/10 absolute inset-0 my-auto h-px origin-center"></motion.div>

        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: -3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <Users className="size-5" />
        </motion.div>
        <motion.div variants={boxVariants} whileHover={{ scale: 1.1, rotate: 3 }} className="bg-white border border-ink-700/10 relative flex h-12 w-12 items-center justify-center shadow-sm text-ink-700 hover:text-ink-900 transition-colors">
          <LineChart className="size-5" />
        </motion.div>
      </div>

      {/* Subtle Vertical connections to unify the grid visually */}
      <motion.div 
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="absolute inset-0 mx-auto w-px bg-ink-700/10 -z-10 mask-[linear-gradient(to_bottom,transparent_10%,white_40%,white_60%,transparent_90%)] origin-top"
      ></motion.div>
    </motion.div>
  );
};
