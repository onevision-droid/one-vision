"use client";

import { Section, Container } from "@/components/layout/Shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ChevronDown,
  FileText,
  HardDriveDownload,
  Package,
  Stethoscope,
  FileBarChart,
} from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ActionDrawer } from "@/components/ui/action-drawer";
import { HelpRequestForm } from "@/components/forms/HelpRequestForm";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CommunityAction() {
  return (
    <Section tone="default" className="border-t border-border-default overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-ink/60 max-w-4xl text-balance text-heading-xl md:text-display-md font-medium font-sans tracking-tight">
            <span className="text-ink">Community Support In Action.</span> <br />{" "}
            Radical transparency, zero red tape.
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-x-4 gap-y-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Card 1: Request Aid (Input) */}
          <motion.div variants={cardVariants} className="row-span-2 grid grid-cols-1 gap-4 group">
            <ActionDrawer 
              title="Request Direct Assistance"
              description="Submit a direct request for aid. We review every submission confidentially."
              trigger={
                <button className="w-full text-left outline-none">
                  <Card className="aspect-4/3 bg-surface relative overflow-hidden flex flex-col justify-end p-0 border-border-default rounded-none group-hover:border-ink-900 transition-colors duration-500 cursor-pointer">
                    <RequestAidIllustration />
                    <Image
                      src="/new-illustrations/community-support.webp"
                      alt="abstract background"
                      width={670}
                      height={670}
                      className="absolute inset-0 size-full object-cover opacity-20 grayscale blend-luminosity transition-opacity duration-700 group-hover:opacity-40"
                    />
                  </Card>
                </button>
              }
            >
              <HelpRequestForm />
            </ActionDrawer>

            <p className="text-ink/60 text-balance font-light">
              <span className="text-ink font-medium">Direct Aid Routing. </span>{" "}
              Real-time request logging connects needs directly to available
              volunteers.
            </p>
          </motion.div>

          {/* Card 2: Transparent Funds (Dynamic Island) */}
          <motion.div variants={cardVariants} className="row-span-2 grid grid-cols-1 gap-4 group">
            <Card className="aspect-4/3 bg-surface-alt relative overflow-hidden flex flex-col p-0 border-border-default rounded-none group-hover:border-ink-900 transition-colors duration-500">
              <FundTrackerIllustration />
            </Card>

            <p className="text-ink/60 text-balance font-light">
              <span className="text-ink font-medium">
                Verified Allocation.{" "}
              </span>{" "}
              Every resource and rupee is tracked and publicly visible on our
              ledger.
            </p>
          </motion.div>

          {/* Card 3: Open Reports (Download) */}
          <motion.div variants={cardVariants} className="row-span-2 grid grid-cols-1 gap-4 group">
            <Card className="aspect-4/3 bg-surface relative overflow-hidden p-0 border-border-default rounded-none flex items-center justify-center group-hover:border-ink-900 transition-colors duration-500">
              <DownloadIllustration />
              <Image
                src="/new-illustrations/youth-learning.webp"
                alt="background"
                width={670}
                height={670}
                className="absolute inset-0 size-full object-cover opacity-10 grayscale transition-opacity duration-700 group-hover:opacity-30"
              />
            </Card>

            <p className="text-ink/60 text-balance font-light">
              <span className="text-ink font-medium">
                Public Accountability.{" "}
              </span>{" "}
              Download our monthly impact audits and detailed field reports
              instantly.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

function DownloadIllustration() {
  return (
    <div className="z-10 absolute inset-0 m-auto size-fit scale-95 md:scale-100 flex flex-col items-center justify-center">
      <Button
        variant="secondary"
        className="bg-surface/80 border border-border-default backdrop-blur rounded-none z-20 relative shadow-sm"
        size="sm"
        nativeButton={false}
        render={
          <div className="flex items-center gap-2 px-2 text-ink-900">
            <HardDriveDownload className="size-4 opacity-75" />
            <span className="border-r border-border-default pr-2 font-medium">
              Download Data
            </span>
            <ChevronDown className="size-4 opacity-50" />
          </div>
        }
      />

      <motion.div 
        initial={{ opacity: 0, y: -20, scaleY: 0.9 }}
        whileInView={{ opacity: 1, y: -1, scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        className="mt-0 min-w-56 rounded-none bg-surface p-1.5 shadow-sm ring-1 ring-black/5 *:cursor-pointer border border-border-default origin-top relative z-10"
      >
        <div className="peer flex gap-3 rounded-none px-3 py-2 hover:bg-section-alt transition-colors">
          <FileText className="size-4 translate-y-0.5 text-navy-600" />
          <div className="space-y-0.5">
            <div className="text-xs font-medium text-ink-900">
              August Field Report
            </div>
            <div className="text-xs text-ink-500">PDF • 2.4 MB</div>
          </div>
        </div>

        <div className="not-peer-hover:bg-section-alt flex gap-3 rounded-none px-3 py-2 transition-colors border-t border-border-default/50 mt-1 pt-2">
          <FileBarChart className="size-4 translate-y-0.5 text-ink-500" />
          <div className="space-y-0.5">
            <div className="text-xs font-medium text-ink-900">
              Q3 Financial Audit
            </div>
            <div className="text-xs text-ink-500">CSV • 142 KB</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RequestAidIllustration() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 25 }}
      className="z-10 absolute inset-x-6 bottom-6 m-auto h-fit scale-95 md:scale-100"
    >
      <div className="bg-surface/90 backdrop-blur-md border border-border-default h-fit rounded-none p-3 shadow-md">
        <div className="text-ink-500 p-2 pb-3 text-sm font-light flex items-center">
          Describe the assistance needed
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="ml-0.5 w-1 h-4 bg-ink-300 inline-block"
          />
        </div>
        <div className="flex justify-between gap-3 pt-2 border-t border-border-default">
          <div className="flex items-center gap-1">
            <div className="hover:bg-section-alt flex size-8 cursor-pointer items-center justify-center rounded-none text-ink-700 transition-colors">
              <Package className="size-4" />
            </div>
            <div className="hover:bg-section-alt flex size-8 cursor-pointer items-center justify-center rounded-none text-ink-700 transition-colors">
              <Stethoscope className="size-4" />
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-navy-600 text-paper flex size-8 cursor-pointer items-center justify-center rounded-none transition-colors hover:bg-navy-800"
          >
            <ArrowUp className="size-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FundTrackerIllustration() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
      className="z-10 bg-surface absolute inset-x-6 bottom-0 mx-auto mt-auto h-[65%] w-[85%] origin-bottom rounded-none border-t border-l border-r border-border-default px-4 pt-4 shadow-lg"
    >
      <div className="relative h-full w-full">
        <div className="shadow-sm relative rounded-none bg-paper p-3 border border-border-default">
          <div className="flex gap-3">
            <div className="size-14 shrink-0 relative overflow-hidden rounded-none border border-border-default bg-surface flex items-center justify-center">
              <Image
                src="/new-illustrations/health-access.webp"
                alt="Relief Camp"
                fill
                sizes="(max-width: 768px) 100vw, 56px"
                className="object-cover"
              />
            </div>
            <div className="py-0.5 pr-2 w-full">
              <div className="text-sm font-medium text-ink-900 flex justify-between items-center w-full">
                <span>Relief Camp Alpha</span>
                <motion.span 
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="size-2 rounded-none bg-clay-500"
                ></motion.span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div>
                  <div className="text-label uppercase tracking-wider text-ink-500 font-medium">
                    Supplies
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-ink-900">
                    3,200 kg
                  </div>
                </div>
                <div className="bg-border-default/50 h-6 w-px" />
                <div>
                  <div className="text-label uppercase tracking-wider text-ink-500 font-medium">
                    Funds Used
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-ink-900">
                    ₹82.5k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
