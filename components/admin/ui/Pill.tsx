"use client";

import type { ReactNode } from "react";

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "brand" | "muted";
}) {
  const tones = {
    default: "bg-white/5 border-white/10 text-ink-secondary",
    brand: "bg-brand-primary/10 border-brand-primary/25 text-brand-light",
    muted: "bg-white/[0.03] border-white/8 text-ink-muted",
  } as const;

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
