import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="block w-8 h-px bg-brand-light/40" />
      <span className="text-xs uppercase tracking-[0.3em] font-medium text-brand-light">
        {children}
      </span>
      <span className="block w-8 h-px bg-brand-light/40" />
    </div>
  );
}
