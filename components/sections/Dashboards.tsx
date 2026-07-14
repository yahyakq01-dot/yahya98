"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import CapabilityCard from "@/components/ui/CapabilityCard";
import DashboardCard from "@/components/ui/DashboardCard";
import { DASHBOARDS, DASHBOARD_CAPABILITIES, DATA_STACK } from "@/lib/data";

export default function Dashboards() {
  return (
    <section id="dashboards" className="py-32 px-6 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] top-1/4 right-0 translate-x-1/3 bg-[radial-gradient(circle,_rgba(124,58,237,0.1)_0%,_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute w-[400px] h-[400px] bottom-1/4 left-0 -translate-x-1/3 bg-[radial-gradient(circle,_rgba(167,139,250,0.08)_0%,_transparent_60%)] blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <SectionHeading
          eyebrow="DASHBOARDS & ANALYTICS"
          title={
            <>
              Dashboards That <span className="gradient-text italic">Decide</span> For You
            </>
          }
          subtitle="Real Power BI projects — each one a complete analytics story. Click any dashboard to open the live, interactive preview."
        />

        {/* Capabilities grid */}
        <div className="mt-16 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DASHBOARD_CAPABILITIES.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
            />
          ))}
        </div>

        {/* Tech stack strip */}
        <div className="mt-16 mb-16 text-center">
          <SectionLabel>DATA STACK</SectionLabel>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {DATA_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background-surface border border-white/[0.08] text-ink-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboards grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-ink-primary mb-2">
            Featured Dashboards
          </h3>
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-10">
            9 projects · Tap any card to open the live preview
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DASHBOARDS.map((dashboard, index) => (
              <DashboardCard
                key={dashboard.slug}
                dashboard={dashboard}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 flex flex-col items-center text-center"
        >
          <p className="text-base md:text-lg text-ink-secondary mb-5">
            Have a dataset that needs to talk? Let&apos;s give it a voice.
          </p>
          <a
            href="#contact"
            className="bg-brand-primary text-white rounded-full px-7 py-3.5 font-semibold text-sm hover:bg-violet-500 transition"
          >
            Start a Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
