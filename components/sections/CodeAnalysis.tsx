"use client";

import { motion } from "framer-motion";
import { CODE_STACK } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import CapabilityPill from "@/components/ui/CapabilityPill";
import CodeProjectCard from "@/components/ui/CodeProjectCard";
import type {
  CodeProjectRow,
  CodeCapabilityRow,
} from "@/lib/supabase/database.types";

const pillContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const pillItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface CodeAnalysisProps {
  projects: CodeProjectRow[];
  capabilities: CodeCapabilityRow[];
}

export default function CodeAnalysis({ projects, capabilities }: CodeAnalysisProps) {
  return (
    <section
      id="sql-python"
      className="py-32 px-6 md:px-8 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div
        aria-hidden
        className="absolute top-1/3 right-0 translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(124,58,237,0.08)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-0 -translate-x-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(167,139,250,0.07)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <SectionHeading
          eyebrow="SQL & PYTHON ANALYSIS"
          title={
            <>
              Code That{" "}
              <span className="gradient-text italic">Speaks Numbers</span>
            </>
          }
          subtitle="Beyond dashboards — raw analytical work in SQL and Python. Clean queries, reproducible scripts, and analyses that go where Power BI alone can't reach."
        />

        {/* Capability pills */}
        <motion.div
          variants={pillContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {capabilities.map((cap) => (
            <motion.div key={cap.id} variants={pillItem}>
              <CapabilityPill icon={cap.icon} title={cap.title} />
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack strip */}
        <div className="mt-12 text-center">
          <SectionLabel>CODE STACK</SectionLabel>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {CODE_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background-surface border border-white/8 text-ink-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Featured projects header */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-ink-primary mb-2">
            Featured Code Projects
          </h3>
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-10">
            Real production work — code, analysis, and the stories behind the numbers.
          </p>

          {/* Projects stack */}
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <CodeProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <p className="text-base text-ink-secondary mb-5">
            Need a clean dataset or a custom query?
          </p>
          <a
            href="#contact"
            className="inline-block bg-brand-primary text-white rounded-full px-7 py-3.5 font-semibold text-sm hover:bg-violet-500 transition"
          >
            Start a Code Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
