"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,_rgba(124,58,237,0.08)_0%,_transparent_60%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-20">
          <SectionHeading
            eyebrow="WHAT I OFFER"
            title={
              <>
                Everything Your Business Needs to{" "}
                <span className="gradient-text italic">Decide Smarter</span>
              </>
            }
            subtitle="Full-spectrum data services — from raw exports to executive-ready dashboards — crafted to grow your business and replace gut feel with evidence."
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
