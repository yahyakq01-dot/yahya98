"use client";

import { useTransition } from "react";
import { Loader2, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logout())}
      disabled={pending}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background-surface border border-white/10 text-sm font-medium text-ink-secondary hover:text-ink-primary hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut size={14} aria-hidden="true" />
      )}
      <span>Sign out</span>
    </button>
  );
}
