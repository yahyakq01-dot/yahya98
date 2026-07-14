"use client";

import { ReactNode } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export type ContactAccent = "violet" | "green" | "fiverr-green";

interface ContactMethodCardProps {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  meta?: string;
  external?: boolean;
  accentColor?: ContactAccent;
}

const LABEL_COLOR: Record<ContactAccent, string> = {
  violet: "text-brand-light",
  green: "text-success",
  "fiverr-green": "text-[#1DBF73]",
};

const ICON_BOX: Record<ContactAccent, string> = {
  violet:
    "bg-gradient-to-br from-brand-primary/25 to-brand-primary/5 border-brand-primary/30 text-brand-light",
  green:
    "bg-gradient-to-br from-success/25 to-success/5 border-success/30 text-success",
  "fiverr-green":
    "bg-gradient-to-br from-[#1DBF73]/25 to-[#1DBF73]/5 border-[#1DBF73]/30 text-[#1DBF73]",
};

const BUTTON: Record<ContactAccent, string> = {
  violet: "bg-brand-primary hover:bg-violet-500 text-white",
  green: "bg-success hover:bg-emerald-500 text-white",
  "fiverr-green": "bg-[#1DBF73] hover:bg-[#16A65E] text-white",
};

export default function ContactMethodCard({
  icon,
  label,
  title,
  description,
  cta,
  href,
  meta,
  external = false,
  accentColor = "violet",
}: ContactMethodCardProps) {
  const ArrowIcon = external ? ExternalLink : ArrowUpRight;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="relative bg-background-surface border border-white/[0.08] rounded-3xl p-7 lg:p-8 h-full flex flex-col transition-all duration-[400ms] hover:border-brand-primary/40 hover:-translate-y-1">
      <span
        className={`text-[10px] uppercase tracking-[0.25em] font-bold ${LABEL_COLOR[accentColor]}`}
      >
        {label}
      </span>

      <div
        className={`mt-3 mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border ${ICON_BOX[accentColor]}`}
      >
        {icon}
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-2">
        {title}
      </h3>

      {meta && (
        <p className="text-xs font-mono text-ink-muted mb-3">{meta}</p>
      )}

      <p className="text-sm text-ink-secondary leading-relaxed mb-7 flex-1">
        {description}
      </p>

      <a
        href={href}
        {...externalProps}
        className={`mt-auto rounded-full inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm transition-all duration-300 w-full ${BUTTON[accentColor]}`}
      >
        {cta}
        <ArrowIcon size={14} />
      </a>
    </div>
  );
}
