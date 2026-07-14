"use client";

import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  FOOTER_TAGLINE,
  FOOTER_BIO,
  type SocialLink,
} from "@/lib/data";

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = `w-[14px] h-[14px] ${className ?? ""}`;
  if (icon === "Linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  if (icon === "Github")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  if (icon === "Instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  if (icon === "fiverr")
    return (
      <span className={`font-black text-[10px] leading-none ${className ?? ""}`}>fi</span>
    );
  return null;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {
    if (!email) return;
    console.log("Newsletter signup:", email);
    setSubscribed(true);
    setEmail("");
  }

  const waUrl = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="relative pt-24 pb-8 px-6 md:px-8 border-t border-white/[0.08] bg-background-base overflow-hidden">
      {/* background radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse,_rgba(124,58,237,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-20">

          {/* ── LEFT: Brand block ── */}
          <div className="flex flex-col gap-7">
            {/* Monogram + name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center">
                <span className="text-xl font-black gradient-text">YK</span>
              </div>
              <div>
                <p className="text-xl font-bold text-ink-primary">
                  Yahya<span className="text-brand-primary">.</span>
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                  Financial Analyst · BI Developer
                </p>
              </div>
            </div>

            {/* Big tagline */}
            <h3 className="text-3xl md:text-4xl font-black text-ink-primary leading-tight tracking-tight">
              {FOOTER_TAGLINE.split("Future of Data Decisions").map((part, i) =>
                i === 0 ? (
                  <span key={i}>
                    {part}
                    <span className="gradient-text">Future of Data Decisions</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h3>

            {/* Bio */}
            <p className="text-sm text-ink-secondary leading-relaxed max-w-md">{FOOTER_BIO}</p>

            {/* Newsletter */}
            <div className="mt-2 max-w-md bg-background-surface border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-light">
                Stay Updated
              </p>
              <h4 className="mt-3 text-sm font-bold text-ink-primary">
                New projects, dashboards, and insights — straight to your inbox.
              </h4>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="your@email.com"
                  className="flex-1 bg-background-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-primary/50 focus:outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-brand-primary hover:bg-violet-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition flex items-center justify-center"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-[color:var(--success)]">
                  Thanks! I&apos;ll be in touch.
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT: Link columns ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

            {/* Menu */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-ink-muted mb-5">
                Menu
              </p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-ink-muted mb-5">
                Resources
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="/cv.pdf"
                    download
                    className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    Resume / CV
                  </a>
                </li>
                <li>
                  <a
                    href="#dashboards"
                    className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    Live Dashboards
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_INFO.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    Hire on Fiverr
                  </a>
                </li>
                <li>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-ink-muted mb-5">
                Socials
              </p>
              <ul className="flex flex-col gap-4">
                {SOCIAL_LINKS.map((social: SocialLink) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-background-surface border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-brand-primary/30 transition-colors">
                        <SocialIcon
                          icon={social.icon}
                          className="text-ink-secondary group-hover:text-brand-light transition-colors"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink-primary group-hover:text-brand-light transition-colors leading-none">
                          {social.label}
                        </p>
                        <p className="text-[10px] text-ink-muted mt-0.5">{social.username}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div className="mt-20 pt-7 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">© 2026 Yahya Khan. All Rights Reserved.</p>

          <div className="flex items-center gap-5 flex-wrap">
            <a href="#" className="text-xs text-ink-muted hover:text-ink-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-ink-muted hover:text-ink-secondary transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-ink-muted hover:text-ink-secondary transition-colors">
              Sitemap
            </a>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              Designed &amp; Built with{" "}
              <Heart size={11} className="text-red-400 inline" /> by Yahya Khan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
