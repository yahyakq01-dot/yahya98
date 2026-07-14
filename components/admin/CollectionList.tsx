"use client";

import type { ReactNode } from "react";
import { Plus } from "lucide-react";

interface CollectionListProps {
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
  children: ReactNode;
}

export function CollectionList({
  title,
  description,
  addLabel,
  onAdd,
  children,
}: CollectionListProps) {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-3xl font-black tracking-tight">{title}</h1>
          <p className="text-sm text-ink-secondary mt-2 max-w-2xl">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 shrink-0 bg-brand-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-violet-500 transition"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
