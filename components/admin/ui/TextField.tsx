"use client";

import { FormLabel } from "./FormLabel";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  mono?: boolean;
}

export function TextField({
  label,
  value,
  onChange,
  id,
  name,
  type = "text",
  placeholder,
  required,
  error,
  hint,
  multiline,
  rows = 3,
  disabled,
  mono,
}: TextFieldProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");
  const base = `bg-background-base border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 w-full transition ${
    error ? "border-red-400/50" : "border-white/10"
  } ${mono ? "font-mono" : ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  return (
    <div className="mb-5">
      <FormLabel htmlFor={fieldId} required={required} hint={hint}>
        {label}
      </FormLabel>
      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
