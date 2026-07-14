"use client";

import {
  Database,
  Users,
  Layers,
  Wand2,
  Sigma,
  GitCompare,
  ChartLine,
  BarChart3,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Database,
  Users,
  Layers,
  Wand2,
  Sigma,
  GitCompare,
  ChartLine,
  BarChart3,
};

interface CapabilityPillProps {
  icon: string;
  title: string;
}

export default function CapabilityPill({ icon, title }: CapabilityPillProps) {
  const Icon = ICON_MAP[icon] ?? Database;

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-background-surface border border-white/8 hover:border-brand-primary/40 transition-colors">
      <div className="w-7 h-7 rounded-lg bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-brand-light" />
      </div>
      <span className="text-xs font-semibold text-ink-primary whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
