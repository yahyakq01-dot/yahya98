"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Sheet, Database, TrendingUp, Code2, LucideIcon } from "lucide-react";
import type { ServiceRow } from "@/lib/supabase/database.types";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Sheet,
  Database,
  TrendingUp,
  Code2,
};

interface ServiceCardProps {
  service: ServiceRow;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="relative group h-full"
    >
      <div
        className={`
          bg-background-surface border border-white/[0.08] rounded-3xl p-7 lg:p-8
          h-full flex flex-col
          transition-all duration-[400ms] ease-out
          hover:border-brand-primary/40 hover:bg-background-elevated hover:-translate-y-1
          ${service.highlight ? "hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.4)]" : ""}
        `}
      >
        {/* Top row */}
        <div className="flex justify-between items-start mb-7">
          <span className="text-xs font-mono text-ink-muted tracking-widest">
            / {service.number}
          </span>
          {service.highlight && (
            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-brand-primary/15 text-brand-light border border-brand-primary/30">
              FEATURED
            </span>
          )}
        </div>

        {/* Icon box */}
        <div className="w-12 h-12 mb-6 bg-gradient-to-br from-brand-primary/25 to-brand-primary/5 border border-brand-primary/20 rounded-xl flex items-center justify-center">
          {Icon && <Icon size={22} className="text-brand-light" />}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-ink-secondary leading-relaxed mb-6 flex-1">
          {service.description}
        </p>

        {/* Tool tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-white/[0.03] border border-white/[0.08] text-ink-secondary group-hover:border-brand-primary/20 transition-colors duration-[400ms]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
