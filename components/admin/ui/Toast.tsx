"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

export interface ToastData {
  id: number;
  type: ToastType;
  message: string;
}

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: number) => void;
}) {
  const success = toast.type === "success";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-start gap-3 rounded-xl px-4 py-3 border shadow-lg backdrop-blur-md max-w-sm ${
        success
          ? "bg-success/10 border-success/30"
          : "bg-red-500/10 border-red-500/30"
      }`}
    >
      {success ? (
        <CheckCircle size={16} className="text-success mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
      )}
      <p className="text-sm text-ink-primary flex-1 leading-snug">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="text-ink-muted hover:text-ink-primary transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
