"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      // Network hiccup, etc. — don't leave the button stuck spinning.
      console.error("[logout] sign-out failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background-surface border border-white/10 text-sm font-medium text-ink-secondary hover:text-ink-primary hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut size={14} aria-hidden="true" />
      )}
      <span>Sign out</span>
    </button>
  );
}
