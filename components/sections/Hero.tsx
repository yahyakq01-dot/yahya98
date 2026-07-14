"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: 0.5, ease: "easeOut" },
  },
};

const bottomBarVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 1.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-32 pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/4 -translate-y-1/4 bg-[radial-gradient(circle,_rgba(124,58,237,0.15)_0%,_transparent_70%)] blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
      >
        <div className="flex-1 lg:basis-3/5 flex flex-col gap-6 order-2 lg:order-1">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-surface/60 backdrop-blur-md border border-white/10 self-start"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-secondary">
              Available For Projects
            </span>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black tracking-tight leading-[1.05] text-ink-primary">
            <motion.span variants={itemVariants} className="block">
              Turning
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              <span className="gradient-text">Complex Data</span>
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              Into Clear Decisions<span className="text-brand-primary">.</span>
            </motion.span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-ink-secondary max-w-xl leading-relaxed"
          >
            Your partner in transforming raw numbers into actionable insights —
            building Power BI dashboards, financial models, and data systems
            that drive smarter business decisions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mt-2"
          >
            <a
              href="#dashboards"
              className="bg-brand-primary text-white rounded-full px-7 py-3.5 font-medium text-sm transition-all duration-200 hover:bg-violet-500 hover:scale-[1.02]"
            >
              View My Work →
            </a>
            <a
              href="#contact"
              className="border border-white/20 bg-white/5 backdrop-blur-sm text-ink-primary rounded-full px-7 py-3.5 font-medium text-sm transition-colors duration-200 hover:bg-white/10 hover:border-white/30"
            >
              Let&apos;s Talk ↗
            </a>
            <a
              href="/cv.pdf"
              download
              className="text-ink-secondary hover:text-ink-primary text-sm font-medium ml-2 underline-offset-4 hover:underline transition-colors"
            >
              Download CV ⬇
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={photoVariants}
          className="flex-1 lg:basis-2/5 order-1 lg:order-2 w-full"
        >
          <motion.div
            className="relative max-w-xs lg:max-w-md mx-auto"
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 scale-110 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.25)_0%,_transparent_70%)] blur-3xl"
            />
            <Image
              src="/profile.png"
              alt="Yahya Khan — Financial Analyst"
              width={600}
              height={800}
              priority
              className="w-full h-auto object-contain relative z-10"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={bottomBarVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 inset-x-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-end">
          <div className="hidden lg:flex flex-col items-center gap-3">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
            <ChevronDown
              size={16}
              className="text-ink-muted animate-bounce"
            />
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              Scroll To Explore
            </span>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-ink-muted ml-auto">
            Decoding Data Into Decisions ↗
          </span>
        </div>
      </motion.div>
    </section>
  );
}
