"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-base px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Something went wrong</h1>
        <p className="text-sm text-ink-secondary mt-3 leading-relaxed">
          An unexpected error occurred. Try refreshing the page, or head back
          home.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-ink-muted mt-4 opacity-60">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center mt-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-brand-primary text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-violet-500 transition"
          >
            <RefreshCcw size={14} />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-white/15 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/5 transition"
          >
            <Home size={14} />
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
