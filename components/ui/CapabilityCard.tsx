"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  DollarSign,
  Zap,
  GitMerge,
  Globe,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import type { DashboardCapabilityRow } from "@/lib/supabase/database.types";

const ICON_MAP: Record<string, LucideIcon> = {
  Gauge,
  DollarSign,
  Zap,
  GitMerge,
  Globe,
  TrendingUp,
};

interface CapabilityCardProps {
  capability: DashboardCapabilityRow;
  index: number;
}

export default function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const Icon = ICON_MAP[capability.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="
        bg-background-surface border border-white/[0.08] rounded-2xl p-5
        hover:border-brand-primary/30 transition-colors
        flex items-start gap-4
      "
    >
      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
        {Icon && <Icon size={18} className="text-brand-light" />}
      </div>
      <div>
        <h3 className="text-sm font-bold text-ink-primary">{capability.title}</h3>
        <p className="text-xs text-ink-secondary leading-relaxed mt-1">
          {capability.description}
        </p>
      </div>
    </motion.div>
  );
}
