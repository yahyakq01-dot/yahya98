"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: "danger" | "default";
  isConfirming?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  variant = "default",
  isConfirming = false,
}: ConfirmDialogProps) {
  const danger = variant === "danger";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={isConfirming ? undefined : onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-md bg-background-surface border border-white/10 rounded-3xl p-7 shadow-2xl"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  danger
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-brand-primary/10 border border-brand-primary/20"
                }`}
              >
                <AlertTriangle
                  size={22}
                  className={danger ? "text-red-400" : "text-brand-light"}
                />
              </div>
              <h2 className="text-lg font-bold text-ink-primary mt-5">{title}</h2>
              <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center justify-end gap-3 mt-7">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isConfirming}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-ink-secondary hover:text-ink-primary hover:bg-white/5 transition disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isConfirming}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed ${
                    danger
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-brand-primary hover:bg-violet-500"
                  }`}
                >
                  {isConfirming && <Loader2 size={15} className="animate-spin" />}
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
