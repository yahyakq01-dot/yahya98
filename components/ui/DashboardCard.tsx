"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { DashboardRow } from "@/lib/supabase/database.types";

interface DashboardCardProps {
  dashboard: DashboardRow;
  index: number;
}

export default function DashboardCard({ dashboard, index }: DashboardCardProps) {
  const hasLive = Boolean(dashboard.live_preview_url);

  const cardClassName =
    "group relative block rounded-3xl overflow-hidden cursor-pointer aspect-[16/10] bg-background-surface border border-white/[0.08] hover:border-brand-primary/40 transition-all duration-500";

  const cardInner = (
    <>
      {/* Layer 1 — dashboard image (z-0 base) */}
      <Image
        src={dashboard.image_url}
        alt={dashboard.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Bottom gradient — text legibility only, no flat darken */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0613] from-10% via-[#0A0613]/95 via-35% via-[#0A0613]/40 via-55% to-transparent to-70% transition-all duration-500"
      />

      {/* Top-left badges — vertical stack */}
      <div className="absolute top-5 left-5 z-20 flex flex-col items-start gap-2">
        <div className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold bg-[#0A0613]/80 backdrop-blur-md border border-white/15 text-ink-primary">
          {dashboard.category}
        </div>

        {dashboard.highlight && (
          <div className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-brand-primary/20 text-brand-light border border-brand-primary/40">
            Featured
          </div>
        )}
      </div>

      {/* Top-right external link button */}
      {hasLive && (
        <div
          className="
            absolute top-5 right-5 z-20
            w-10 h-10 rounded-full flex items-center justify-center
            bg-[#0A0613]/80 backdrop-blur-md border border-white/15
            text-ink-primary
            transition-colors duration-300
            group-hover:bg-brand-primary group-hover:border-brand-primary
          "
        >
          <ExternalLink size={16} />
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8">
        <h3 className="text-2xl md:text-3xl font-black text-ink-primary tracking-tight transition-transform duration-500 lg:group-hover:-translate-y-1">
          {dashboard.title}
        </h3>

        <div
          className="
            translate-y-0 opacity-100
            lg:translate-y-6 lg:opacity-0
            lg:group-hover:translate-y-0 lg:group-hover:opacity-100
            transition-all duration-500 ease-out
          "
        >
          <p className="mt-3 text-sm text-ink-secondary leading-relaxed line-clamp-3">
            {dashboard.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {dashboard.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/[0.08] text-ink-secondary border border-white/10"
              >
                {tool}
              </span>
            ))}
          </div>

          {hasLive && (
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
              View Live Preview
              <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: "easeOut" }}
    >
      {hasLive && dashboard.live_preview_url ? (
        <a
          href={dashboard.live_preview_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live preview of ${dashboard.title}`}
          className={cardClassName}
        >
          {cardInner}
        </a>
      ) : (
        <div className={cardClassName}>{cardInner}</div>
      )}
    </motion.div>
  );
}
