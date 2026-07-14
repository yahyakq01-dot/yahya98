"use client";

import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import MobileMenu from "./MobileMenu";

interface NavbarClientProps {
  siteName: string;
}

export default function NavbarClient({ siteName }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 50);
      raf = 0;
    };
    const onScroll = () => {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, []);

  const nameHasPeriod = siteName.endsWith(".");
  const nameBase = nameHasPeriod ? siteName.slice(0, -1) : siteName;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "bg-background-base/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-ink-primary"
          >
            {nameBase}
            {nameHasPeriod && <span className="text-brand-primary">.</span>}
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-ink-primary"
                        : "text-ink-secondary hover:text-ink-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center bg-white text-background-base font-medium rounded-full px-5 py-2.5 text-sm hover:bg-ink-secondary transition-colors"
          >
            Book a Consultation
            <ArrowRight size={14} className="ml-1.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-ink-primary p-1"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
