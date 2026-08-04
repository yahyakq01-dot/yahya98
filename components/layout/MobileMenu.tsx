"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  siteName: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  siteName,
}: MobileMenuProps) {
  const nameHasPeriod = siteName.endsWith(".");
  const nameBase = nameHasPeriod ? siteName.slice(0, -1) : siteName;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[60] bg-background-base/95 backdrop-blur-2xl flex flex-col md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
        >
          <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto w-full">
            <a
              href="#home"
              onClick={onClose}
              className="text-xl font-bold tracking-tight text-ink-primary"
            >
              {nameBase}
              {nameHasPeriod && <span className="text-brand-primary">.</span>}
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="text-ink-primary p-1"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={onClose}
                  className={`text-3xl font-bold tracking-tight ${
                    isActive ? "gradient-text" : "text-ink-secondary"
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}

            <motion.a
              href="#contact"
              onClick={onClose}
              className="mt-6 inline-flex items-center bg-white text-background-base font-medium rounded-full px-7 py-3 text-base hover:bg-ink-secondary transition-colors"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + NAV_LINKS.length * 0.05,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              Book a Consultation
              <ArrowRight size={14} className="ml-1.5" />
            </motion.a>
          </div>

          <div className="px-6 pb-8 flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs text-ink-muted">Available Worldwide 🌍</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
