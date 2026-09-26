"use client";

import { motion, Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Shell";

import orgData from "@/content/org.json";

const stats = orgData.stats.slice(0, 3).map((s) => ({
  value: `${s.value.toLocaleString()}${s.suffix || ""}`,
  label: s.label,
}));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

export function HeroStats() {
  return (
    <Section tone="default" className="w-full border-b border-border-default">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border-default"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col gap-0.5 py-6 sm:py-8 flex-1 items-center justify-center text-center"
            >
              <span className="font-serif text-heading-lg font-light text-ink-900 tabular-nums">
                {stat.value}
              </span>
              <span className="font-sans text-caption tracking-wider uppercase text-ink-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
