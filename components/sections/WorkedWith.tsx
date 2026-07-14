"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Marquee from "@/components/ui/Marquee";
import LogoTile from "@/components/ui/LogoTile";
import { WORKED_WITH } from "@/lib/data";

export default function WorkedWith() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="py-20 relative"
    >
      <div className="mb-10">
        <SectionLabel>TRUSTED BY & WORKED WITH</SectionLabel>
      </div>

      <Marquee speed={40} direction="left" fadeEdges>
        {WORKED_WITH.map((entry) => (
          <LogoTile
            key={entry.name}
            name={entry.name}
            monogram={entry.monogram}
            category={entry.category}
          />
        ))}
      </Marquee>

      <p className="mt-6 text-xs text-ink-muted text-center italic">
        8+ organizations, products, and partners in the data journey.
      </p>
    </motion.section>
  );
}
