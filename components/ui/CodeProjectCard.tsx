"use client";

import { motion } from "framer-motion";
import { CodeProject } from "@/lib/data";

interface CodeProjectCardProps {
  project: CodeProject;
  index: number;
}

function SqlSnippet() {
  return (
    <div className="font-mono text-xs lg:text-sm leading-relaxed text-ink-secondary min-h-[280px]">
      <div>
        <span className="text-ink-muted italic">{"-- Customer Segmentation Analysis"}</span>
      </div>
      <div>
        <span className="text-brand-light">{"WITH"}</span>
        {" customer_spending "}
        <span className="text-brand-light">{"AS"}</span>
        {" ("}
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"SELECT"}</span>
      </div>
      <div className="pl-8">{"customer_id,"}</div>
      <div className="pl-8">
        <span className="text-brand-light">{"SUM"}</span>
        {"(total_sales) "}
        <span className="text-brand-light">{"AS"}</span>
        {" lifetime_value,"}
      </div>
      <div className="pl-8">
        <span className="text-brand-light">{"COUNT"}</span>
        {"("}
        <span className="text-brand-light">{"DISTINCT"}</span>
        {" order_id) "}
        <span className="text-brand-light">{"AS"}</span>
        {" orders,"}
      </div>
      <div className="pl-8">
        <span className="text-brand-light">{"AVG"}</span>
        {"(profit_margin) "}
        <span className="text-brand-light">{"AS"}</span>
        {" avg_margin"}
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"FROM"}</span>
        {" bike_sales"}
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"GROUP BY"}</span>
        {" customer_id"}
      </div>
      <div>{")"}</div>
      <div className="mt-2">
        <span className="text-brand-light">{"SELECT"}</span>
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"CASE"}</span>
      </div>
      <div className="pl-8">
        <span className="text-brand-light">{"WHEN"}</span>
        {" lifetime_value > "}
        <span className="text-orange-300/80">{"5000"}</span>
        {" "}
        <span className="text-brand-light">{"THEN"}</span>
        {" "}
        <span className="text-yellow-300/80">{"'VIP'"}</span>
      </div>
      <div className="pl-8">
        <span className="text-brand-light">{"WHEN"}</span>
        {" lifetime_value > "}
        <span className="text-orange-300/80">{"1000"}</span>
        {" "}
        <span className="text-brand-light">{"THEN"}</span>
        {" "}
        <span className="text-yellow-300/80">{"'Regular'"}</span>
      </div>
      <div className="pl-8">
        <span className="text-brand-light">{"ELSE"}</span>
        {" "}
        <span className="text-yellow-300/80">{"'New'"}</span>
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"END AS"}</span>
        {" segment,"}
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"COUNT"}</span>
        {"(*) "}
        <span className="text-brand-light">{"AS"}</span>
        {" customers,"}
      </div>
      <div className="pl-4">
        <span className="text-brand-light">{"AVG"}</span>
        {"(orders) "}
        <span className="text-brand-light">{"AS"}</span>
        {" avg_orders"}
      </div>
      <div>
        <span className="text-brand-light">{"FROM"}</span>
        {" customer_spending"}
      </div>
      <div>
        <span className="text-brand-light">{"GROUP BY"}</span>
        {" segment"}
      </div>
      <div>
        <span className="text-brand-light">{"ORDER BY"}</span>
        {" customers "}
        <span className="text-brand-light">{"DESC"}</span>
        {";"}
      </div>
    </div>
  );
}

function PythonSnippet() {
  return (
    <div className="font-mono text-xs lg:text-sm leading-relaxed text-ink-secondary min-h-[280px]">
      <div>
        <span className="text-ink-muted italic">{"# Cohort Retention Analysis - RDX Sports"}</span>
      </div>
      <div>
        <span className="text-brand-light">{"import"}</span>
        {" pandas "}
        <span className="text-brand-light">{"as"}</span>
        {" pd"}
      </div>
      <div>
        <span className="text-brand-light">{"import"}</span>
        {" matplotlib.pyplot "}
        <span className="text-brand-light">{"as"}</span>
        {" plt"}
      </div>
      <div className="mt-2">
        {"df = pd."}
        <span className="text-ink-primary">{"read_csv"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'sales_b2b.csv'"}</span>
        {")"}
      </div>
      <div>
        {"df["}
        <span className="text-yellow-300/80">{"'order_period'"}</span>
        {"] = df["}
        <span className="text-yellow-300/80">{"'date'"}</span>
        {"].dt."}
        <span className="text-ink-primary">{"to_period"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'M'"}</span>
        {")"}
      </div>
      <div>
        {"df["}
        <span className="text-yellow-300/80">{"'cohort'"}</span>
        {"] = df."}
        <span className="text-ink-primary">{"groupby"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'client_id'"}</span>
        {")["}
        <span className="text-yellow-300/80">{"'date'"}</span>
        {"] \\"}
      </div>
      <div className="pl-4">
        {"."}
        <span className="text-ink-primary">{"transform"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'min'"}</span>
        {").dt."}
        <span className="text-ink-primary">{"to_period"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'M'"}</span>
        {")"}
      </div>
      <div className="mt-2">
        {"cohort_size = df."}
        <span className="text-ink-primary">{"groupby"}</span>
        {"("}
        <span className="text-yellow-300/80">{"'cohort'"}</span>
        {")["}
        <span className="text-yellow-300/80">{"'client_id'"}</span>
        {"] \\"}
      </div>
      <div className="pl-4">
        {"."}
        <span className="text-ink-primary">{"nunique"}</span>
        {"()."}
        <span className="text-ink-primary">{"reset_index"}</span>
        {"()"}
      </div>
      <div className="mt-2">
        {"retention = df."}
        <span className="text-ink-primary">{"pivot_table"}</span>
        {"("}
      </div>
      <div className="pl-4">
        {"index="}
        <span className="text-yellow-300/80">{"'cohort'"}</span>
        {","}
      </div>
      <div className="pl-4">
        {"columns="}
        <span className="text-yellow-300/80">{"'order_period'"}</span>
        {","}
      </div>
      <div className="pl-4">
        {"values="}
        <span className="text-yellow-300/80">{"'client_id'"}</span>
        {","}
      </div>
      <div className="pl-4">
        {"aggfunc="}
        <span className="text-yellow-300/80">{"'nunique'"}</span>
      </div>
      <div>{")"}</div>
      <div className="mt-2">
        {"retention_pct = retention."}
        <span className="text-ink-primary">{"divide"}</span>
        {"("}
      </div>
      <div className="pl-4">
        {"cohort_size["}
        <span className="text-yellow-300/80">{"'client_id'"}</span>
        {"].values, axis="}
        <span className="text-orange-300/80">{"0"}</span>
      </div>
      <div>
        {") * "}
        <span className="text-orange-300/80">{"100"}</span>
      </div>
    </div>
  );
}

export default function CodeProjectCard({ project, index }: CodeProjectCardProps) {
  const filename = index === 0 ? "customer_segmentation.sql" : "retention_analysis.py";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative bg-background-surface border border-white/8 rounded-3xl p-8 lg:p-10 overflow-hidden hover:border-brand-primary/40 transition-all duration-500"
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Number + category row */}
          <div className="flex items-center gap-3">
            <span className="text-7xl font-black gradient-text leading-none">
              {`0${index + 1}`}
            </span>
            <span className="w-px h-12 bg-white/15 flex-shrink-0" />
            <span className="text-xs font-semibold text-brand-light">{project.category}</span>
          </div>

          {/* Title block */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-ink-primary tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-brand-light mt-1">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Features 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {project.features.map((feature) => (
              <div
                key={feature.label}
                className="bg-background-elevated border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-xl flex-shrink-0">{feature.icon}</span>
                <span className="text-xs font-semibold text-ink-primary">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted">
              BUILT WITH
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-brand-primary/10 text-brand-light border border-brand-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          {(project.github || project.livePreview) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-violet-500 transition"
                >
                  View Code on GitHub →
                </a>
              )}
              {project.livePreview && (
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 bg-white/5 rounded-full px-6 py-3 font-semibold text-sm text-ink-primary hover:bg-white/10 transition"
                >
                  Live Preview ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right column — code window */}
        <div className="bg-background-base rounded-2xl border border-white/8 overflow-hidden shadow-2xl relative">
          {/* Window chrome */}
          <div className="bg-background-elevated px-4 py-3 border-b border-white/8 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-ink-muted ml-3">{filename}</span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              live
            </span>
          </div>

          {/* Code area */}
          <div className="p-5 lg:p-6 overflow-x-auto">
            {index === 0 ? <SqlSnippet /> : <PythonSnippet />}
          </div>

          {/* Stats strip */}
          <div className="bg-background-elevated border-t border-white/8 px-5 py-4 grid grid-cols-3 gap-4">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-black gradient-text">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-widest text-ink-muted mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
