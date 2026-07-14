"use client";

import { FormLabel } from "./FormLabel";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  id,
  error,
  hint,
  required,
}: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-5">
      <FormLabel htmlFor={fieldId} required={required} hint={hint}>
        {label}
      </FormLabel>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-background-base border rounded-xl px-4 py-3 text-sm text-ink-primary focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 w-full transition ${
          error ? "border-red-400/50" : "border-white/10"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-background-surface">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
