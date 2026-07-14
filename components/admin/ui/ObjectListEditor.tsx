"use client";

import { Plus, X } from "lucide-react";
import { FormLabel } from "./FormLabel";

interface FieldDef<T> {
  key: keyof T & string;
  placeholder: string;
}

interface ObjectListEditorProps<T extends Record<string, string>> {
  label: string;
  value: T[];
  onChange: (next: T[]) => void;
  fields: FieldDef<T>[];
  addLabel: string;
  hint?: string;
}

export function ObjectListEditor<T extends Record<string, string>>({
  label,
  value,
  onChange,
  fields,
  addLabel,
  hint,
}: ObjectListEditorProps<T>) {
  const makeEmpty = (): T =>
    Object.fromEntries(fields.map((f) => [f.key, ""])) as T;

  const updateRow = (index: number, key: keyof T & string, val: string) => {
    onChange(value.map((row, i) => (i === index ? { ...row, [key]: val } : row)));
  };

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <FormLabel hint={hint}>{label}</FormLabel>
      <div className="flex flex-col gap-2">
        {value.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            {fields.map((f) => (
              <input
                key={f.key}
                value={row[f.key] ?? ""}
                placeholder={f.placeholder}
                onChange={(e) => updateRow(i, f.key, e.target.value)}
                className="flex-1 min-w-0 bg-background-base border border-white/10 rounded-lg px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition"
              />
            ))}
            <button
              type="button"
              onClick={() => removeRow(i)}
              aria-label="Remove row"
              className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-ink-muted hover:bg-red-500/10 hover:text-red-400 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...value, makeEmpty()])}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-light hover:text-brand-primary transition"
      >
        <Plus size={13} />
        {addLabel}
      </button>
    </div>
  );
}
