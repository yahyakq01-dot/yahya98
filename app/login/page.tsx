"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [isLoading, setIsLoading] = useState(false);

  const errorInfo = errorParam
    ? errorParam === "unauthorized"
      ? {
          title: "Access Denied",
          body: "Your Google account isn't authorized to access this admin. Please contact the site owner.",
        }
      : {
          title: "Sign-in failed",
          body: "Something went wrong while signing you in. Please try again.",
        }
    : null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      console.error("OAuth error:", error);
      setIsLoading(false);
    }
  };

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
          Sign in with your Google account to manage your portfolio content.
        </p>

        {errorInfo && (
          <div
            role="alert"
            className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-start gap-3"
          >
            <AlertCircle
              size={16}
              className="text-red-400 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-red-400">{errorInfo.title}</p>
              <p className="text-xs text-red-300/80 leading-relaxed mt-1">
                {errorInfo.body}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`mt-8 w-full bg-white text-background-base rounded-xl px-6 py-3.5 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-ink-secondary transition-all duration-300 shadow-lg ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <GoogleLogo />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-8 my-2 flex items-center gap-4">
          <span className="flex-1 h-px bg-white/8" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink-muted">
            Or
          </span>
          <span className="flex-1 h-px bg-white/8" />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink-secondary transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to portfolio</span>
          </Link>
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-ink-muted/70">
          🔒 Secured by Google OAuth · Admin access only
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
