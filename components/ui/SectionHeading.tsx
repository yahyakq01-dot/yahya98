import { ReactNode } from "react";
import SectionLabel from "./SectionLabel";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl mx-auto mb-16 text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center mt-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-ink-secondary text-center mt-5 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
