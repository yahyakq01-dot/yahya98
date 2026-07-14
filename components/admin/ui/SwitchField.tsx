"use client";

interface SwitchFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SwitchField({
  label,
  description,
  checked,
  onChange,
}: SwitchFieldProps) {
  return (
    <label className="mb-5 flex items-start justify-between gap-4 border border-white/8 rounded-xl px-4 py-3 cursor-pointer">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-primary">{label}</p>
        {description && (
          <p className="text-xs text-ink-muted mt-0.5">{description}</p>
        )}
      </div>
      <div className="relative shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 rounded-full bg-white/10 peer-checked:bg-brand-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
      </div>
    </label>
  );
}
