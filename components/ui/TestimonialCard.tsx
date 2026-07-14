"use client";

import { Globe, Star } from "lucide-react";
import type { TestimonialRow } from "@/lib/supabase/database.types";

interface TestimonialCardProps {
  testimonial: TestimonialRow;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const {
    name,
    initials,
    country,
    flag,
    source,
    rating,
    quote,
    service,
    is_repeat_client: repeat,
  } = testimonial;

  return (
    <div className="relative bg-background-surface border border-white/8 rounded-3xl p-7 lg:p-8 h-full flex flex-col hover:border-brand-primary/40 transition-all duration-400 hover:-translate-y-1">
      {/* Decorative quote mark */}
      <span
        aria-hidden
        className="absolute top-5 right-6 z-0 text-7xl font-serif text-brand-primary/15 leading-none select-none"
      >
        &ldquo;
      </span>

      {/* Content stack */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top row: source badge + optional repeat pill */}
        <div className="flex items-center justify-between mb-5">
          {source === "Fiverr" ? (
            <span className="inline-flex items-center gap-1.5 bg-[#1DBF73]/15 border border-[#1DBF73]/40 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DBF73]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBF73]">
                Fiverr
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-brand-primary/15 border border-brand-primary/30 px-3 py-1 rounded-full">
              <Globe size={10} className="text-brand-light" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-light">
                Web Client
              </span>
            </span>
          )}

          {repeat && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-gold/15 text-gold border border-gold/30">
              Repeat
            </span>
          )}
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1.5 mb-5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? "text-gold fill-gold" : "text-white/10 fill-white/10"}
            />
          ))}
          <span className="ml-1 text-xs font-bold text-ink-secondary">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Quote */}
        <p className="text-base text-ink-primary leading-relaxed mb-6 flex-1">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Service chip */}
        <div className="mt-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/[0.03] border border-white/10 text-ink-secondary">
            {service}
          </span>
        </div>

        {/* Person row */}
        <div className="mt-5 pt-5 border-t border-white/8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-primary/10 border border-brand-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-black text-brand-light">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-ink-primary truncate">{name}</div>
            <div className="text-xs text-ink-muted mt-0.5">
              {flag} {country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
