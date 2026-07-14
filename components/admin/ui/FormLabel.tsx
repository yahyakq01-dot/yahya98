"use client";

import type { ReactNode } from "react";

interface FormLabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}

export function FormLabel({ htmlFor, children, required, hint }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-bold uppercase tracking-[0.18em] text-ink-secondary mb-2 flex items-center gap-2"
    >
      <span>
        {children}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      {hint && (
        <span className="text-[10px] text-ink-muted lowercase tracking-normal font-medium">
          {hint}
        </span>
      )}
    </label>
  );
}
