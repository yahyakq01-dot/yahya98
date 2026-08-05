"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, Lock } from "lucide-react";
import { login, type LoginState } from "./actions";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {}
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-background-base px-6 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(124,58,237,0.1)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md bg-background-surface border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_0_80px_-20px_rgba(124,58,237,0.3)]">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center">
            <span className="text-base font-black gradient-text">YK</span>
          </div>
          <span className="text-lg font-bold text-ink-primary">
            Yahya<span className="text-brand-primary">.</span>
          </span>
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-light">
          Admin Access
        </p>

        <h1 className="mt-3 text-center text-3xl md:text-4xl font-black text-ink-primary tracking-tight">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-sm text-ink-secondary leading-relaxed">
          Enter your admin password to manage your portfolio content.
        </p>

        {state?.error && (
          <div
            role="alert"
            className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-start gap-3"
          >
            <AlertCircle
              size={16}
              className="text-red-400 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-red-400">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="mt-8">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <label htmlFor="password" className="sr-only">
            Admin password
          </label>
          <div className="relative">
            <Lock
              size={16}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="Password"
              className="w-full bg-background-base border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className={`mt-4 w-full bg-brand-primary text-white rounded-xl px-6 py-3.5 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-violet-500 transition-all duration-300 shadow-lg ${
              pending ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {pending ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                <span>Signing in…</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink-secondary transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to portfolio</span>
          </Link>
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-ink-muted/70">
          🔒 Private admin · Authorized access only
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-base" />}>
      <LoginContent />
    </Suspense>
  );
}
