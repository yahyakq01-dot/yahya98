"use client";

import { Loader2, Trash2 } from "lucide-react";

interface FormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  isDeleting?: boolean;
  mode: "create" | "edit";
}

export function FormActions({
  onSave,
  onCancel,
  onDelete,
  isSaving,
  isDeleting = false,
  mode,
}: FormActionsProps) {
  const busy = isSaving || isDeleting;

  return (
    <div className="flex items-center justify-between gap-3 pt-6 border-t border-white/8 mt-8">
      <div>
        {mode === "edit" && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Trash2 size={15} />
            )}
            Delete
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-ink-secondary hover:text-ink-primary hover:bg-white/5 transition disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={busy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-violet-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving && <Loader2 size={15} className="animate-spin" />}
          {mode === "create" ? "Create" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
