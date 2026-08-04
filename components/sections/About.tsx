"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion, Transition } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProfileRow, StatRow } from "@/lib/supabase/database.types";

const SKILL_CHIPS = ["Power BI", "Excel", "SQL", "Python", "Finance"];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay } as Transition,
});

interface AboutProps {
  profile: ProfileRow | null;
  stats: StatRow[];
}

export default function About({ profile, stats }: AboutProps) {
  const photoUrl = profile?.photo_url ?? "/profile.png";
  const name = profile?.name ?? "Yahya Khan";
  const role = profile?.role ?? "Financial Analyst & BI Developer";
  const bio =
    profile?.short_bio ??
    "I build dashboards, financial models & SQL/Python solutions — turning messy data into decisions that grow your business.";

  return (
    <section id="about" className="min-h-screen py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="ABOUT ME"
          title={
            <>
              The Story Behind <span className="gradient-text">The Data</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* LEFT — Profile Card */}
          <motion.div
            {...fadeUp(0)}
            className="bg-background-surface border border-white/8 rounded-3xl p-8 hover:border-brand-primary/30 transition-colors duration-500 flex flex-col items-center"
          >
            {/* Photo */}
            <div className="relative mx-auto w-32 h-32">
              <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-brand-primary/30">
                <Image
                  src={photoUrl}
                  alt={name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap bg-success/15 border border-success/40 shadow-[0_4px_12px_rgba(34,197,94,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-success">
                  OPEN TO WORK
                </span>
              </div>
            </div>

            {/* Name & role */}
            <div className="mt-6 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-ink-primary">{name}</h3>
              <p className="text-sm font-medium text-brand-light mt-1">
                {role}
              </p>
            </div>

            {/* Bio */}
            <p className="mt-4 text-sm text-ink-secondary leading-relaxed text-center">
              {bio}
            </p>

            {/* Skill chips */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              {SKILL_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-light border border-brand-primary/20"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 w-full">
              <a
                href={profile?.fiverr_url ?? "https://www.fiverr.com/yahya_qureshii"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-violet-500 transition text-center"
              >
                🟢 Fiverr Profile
              </a>
              <a
                href="#contact"
                className="border border-white/15 bg-white/[0.02] text-ink-primary rounded-xl py-3 text-sm font-semibold hover:bg-white/5 transition text-center"
              >
                Hire Me →
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Three stacked cards */}
          <div className="flex flex-col gap-6">
            {/* Card 1 — Fiverr Platform */}
            <motion.div
              {...fadeUp(0.15)}
              className="bg-background-surface border border-white/8 rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1DBF73] flex items-center justify-center text-white font-black text-xl">
                    fi
                  </div>
                  <div>
                    <p className="text-lg font-bold text-ink-primary">Fiverr</p>
                    <p className="text-xs text-ink-muted">fiverr.com/yahya_qureshii</p>
                  </div>
                </div>
                <span className="bg-success/15 text-success border border-success/30 rounded-full px-3 py-1.5 text-xs font-semibold">
                  ⭐ Top Rated Newcomer
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-4xl font-black text-ink-primary">5.0</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-xs text-ink-muted">Based on 4+ reviews</span>
              </div>
            </motion.div>

            {/* Card 2 — Stats */}
            <motion.div
              {...fadeUp(0.3)}
              className="bg-background-surface border border-white/8 rounded-3xl p-7"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col items-center text-center">
                    <span className="text-3xl md:text-4xl font-black text-ink-primary gradient-text">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-ink-muted mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 3 — Statement */}
            <motion.div
              {...fadeUp(0.45)}
              className="bg-background-surface border border-white/8 rounded-3xl p-7"
            >
              <div className="border-l-2 border-brand-primary pl-6">
                <p className="text-base md:text-lg text-ink-secondary italic leading-relaxed">
                  I don&apos;t just build dashboards — I deliver{" "}
                  <strong className="text-brand-light not-italic font-semibold">clarity</strong>
                  . From your first data export to a live, decision-ready report — one analyst,
                  zero hand-offs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
