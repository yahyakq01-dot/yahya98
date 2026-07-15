import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-base px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(124,58,237,0.15)_0%,_transparent_60%)] blur-3xl"
      />

      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <h1 className="gradient-text text-[160px] md:text-[200px] font-black tracking-tighter leading-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-ink-primary">
          Page Not Found
        </h2>
        <p className="text-sm text-ink-secondary mt-4 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-brand-primary text-white rounded-full px-7 py-3 text-sm font-semibold hover:bg-violet-500 transition"
          >
            Back to Portfolio →
          </Link>
          <Link
            href="/#contact"
            className="border border-white/15 text-ink-primary rounded-full px-7 py-3 text-sm font-semibold hover:bg-white/5 transition"
          >
            Get in Touch ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
