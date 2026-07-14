"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "yk_preloader_seen";
const TOTAL_DURATION_MS = 2200;
const FADE_DURATION_S = 0.6;

export default function Preloader() {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    setShouldRender(true);
    window.sessionStorage.setItem(STORAGE_KEY, "1");

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, TOTAL_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
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
            YK
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
