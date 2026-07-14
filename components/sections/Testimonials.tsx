"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { TESTIMONIAL_STATS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { TestimonialRow } from "@/lib/supabase/database.types";

interface TestimonialsProps {
  testimonials: TestimonialRow[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="py-32 px-6 md:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,_rgba(124,58,237,0.08)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="CLIENT TESTIMONIALS"
          title={
            <>
              Real Clients.{" "}
              <span className="gradient-text italic">Real Results.</span>
            </>
          }
          subtitle="Every project ends with a 5-star review. Here's what real Fiverr clients say about working with me — verified purchases, every one."
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {TESTIMONIAL_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-ink-muted mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col items-center"
        >
          <a
            href="https://www.fiverr.com/yahya_qureshii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1DBF73] hover:bg-[#16A65E] text-white rounded-full px-7 py-3.5 font-semibold text-sm transition-all duration-300"
          >
            See All Reviews on Fiverr
            <ExternalLink size={16} />
          </a>
          <p className="mt-3 text-xs text-ink-muted">
            Verified purchases only — every review is real.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
