"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "yk_preloader_seen";
const TOTAL_DURATION_MS = 2200;
const FADE_DURATION_S = 0.6;

interface PreloaderClientProps {
  monogram: string;
}

// The intro preloader plays once per browser session. We read that decision
// through `useSyncExternalStore` so the server render ("don't show", via
// `getServerSnapshot`) matches the first client render — avoiding a hydration
// mismatch — while side-stepping React's cascading-render rule that a
// setState-in-effect would trip. sessionStorage is only marked as "seen"
// after the fade completes, so re-reading the snapshot mid-animation never
// yanks the overlay away before it finishes.
const noopSubscribe = () => () => {};

function hasSeenPreloader() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // Storage blocked (private mode, SSR, etc.) — treat as "seen" so we can
    // never get stuck showing a blocking overlay the user can't dismiss.
    return true;
  }
}

export default function PreloaderClient({ monogram }: PreloaderClientProps) {
  const shouldShow = useSyncExternalStore(
    noopSubscribe,
    () => !hasSeenPreloader(), // client: show only on the first visit this session
    () => false // server: never render the blocking overlay
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!shouldShow) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setIsLoading(false), TOTAL_DURATION_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  const markSeen = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — storage unavailable
    }
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={markSeen}>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
        >
          <motion.h1
            className="gradient-text text-7xl md:text-9xl font-black tracking-tighter"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {monogram}
          </motion.h1>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-ink-muted">
            Loading Experience
          </p>
          <div className="mt-8 w-[200px] h-[2px] rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-brand-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
