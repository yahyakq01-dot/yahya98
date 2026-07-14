"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Trash2, GripVertical } from "lucide-react";

interface CollectionRowCardProps {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  imageUrl?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

function isImageUrl(url: string): boolean {
  return /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(url);
}

export function CollectionRowCard({
  title,
  subtitle,
  meta,
  imageUrl,
  onEdit,
  onDelete,
}: CollectionRowCardProps) {
  return (
    <div className="bg-background-surface border border-white/8 rounded-2xl p-5 flex items-center gap-4 hover:border-brand-primary/30 transition">
      {imageUrl && isImageUrl(imageUrl) ? (
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-background-base">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-xl shrink-0 bg-background-base border border-white/8 flex items-center justify-center text-ink-muted">
          <GripVertical size={18} />
        </div>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="flex-1 min-w-0 text-left"
      >
        <p className="text-base font-bold text-ink-primary truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-ink-muted truncate mt-0.5">{subtitle}</p>
        )}
        {meta && <div className="mt-2 flex flex-wrap gap-2">{meta}</div>}
      </button>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ink-secondary hover:text-ink-primary transition"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${title}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
