"use client";

import { Construction, ExternalLink } from "lucide-react";

interface AdminPagePlaceholderProps {
  title: string;
  description: string;
  section: string;
}

export function AdminPagePlaceholder({
  title,
  description,
  section,
}: AdminPagePlaceholderProps) {
  return (
    <div>
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-light">
          {section}
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          {title}
        </h1>
        <p className="text-sm text-ink-secondary mt-2 max-w-2xl">
          {description}
        </p>
      </div>

      {/* Empty state */}
      <div className="mt-12 bg-background-surface border border-white/8 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto">
          <Construction size={40} className="text-brand-light" />
        </div>
        <h2 className="text-xl font-bold mt-6">Editing form coming soon</h2>
        <p className="text-sm text-ink-secondary mt-3 max-w-md mx-auto">
          This admin section is being built. For now, you can edit content
          directly in Supabase Table Editor.
        </p>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-brand-primary hover:bg-violet-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
        >
          Open Supabase Table Editor
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
