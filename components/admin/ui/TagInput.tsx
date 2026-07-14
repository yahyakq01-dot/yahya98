"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { FormLabel } from "./FormLabel";

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}

export function TagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
  hint,
  required,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="mb-5">
      <FormLabel required={required} hint={hint}>
        {label}
      </FormLabel>
      <div className="flex flex-wrap gap-2 bg-background-base border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-brand-primary/50 focus-within:ring-1 focus-within:ring-brand-primary/30 transition">
        {value.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-light border border-brand-primary/20 inline-flex items-center gap-1.5"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="text-brand-light/70 hover:text-brand-light transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none py-1"
        />
      </div>
    </div>
  );
}
