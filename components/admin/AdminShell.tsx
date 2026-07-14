"use client";

import { type ReactNode, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Code2,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Building2,
  Layers,
  User,
  Settings,
  Mail,
  Link2,
  Menu,
  X,
  ExternalLink,
  RefreshCw,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import { refreshLiveSite } from "@/app/admin/_actions/refresh";
import { useToast } from "./ui/ToastProvider";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Code2,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Building2,
  Layers,
  User,
  Settings,
  Mail,
  Link2,
};

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/admin", icon: "LayoutDashboard" }],
  },
  {
    label: "CONTENT",
    items: [
      { label: "Hero", href: "/admin/hero", icon: "Sparkles" },
      { label: "Dashboards", href: "/admin/dashboards", icon: "BarChart3" },
      { label: "Code Projects", href: "/admin/code-projects", icon: "Code2" },
      { label: "Services", href: "/admin/services", icon: "Briefcase" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "MessageSquare" },
      { label: "Stats", href: "/admin/stats", icon: "TrendingUp" },
      { label: "Worked With", href: "/admin/worked-with", icon: "Building2" },
      { label: "Capabilities", href: "/admin/capabilities", icon: "Layers" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { label: "Profile", href: "/admin/profile", icon: "User" },
      { label: "Site Settings", href: "/admin/site-settings", icon: "Settings" },
      { label: "Contact Info", href: "/admin/contact", icon: "Mail" },
      { label: "Social Links", href: "/admin/social", icon: "Link2" },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/hero": "Edit Hero Section",
  "/admin/dashboards": "Manage Dashboards",
  "/admin/code-projects": "Manage Code Projects",
  "/admin/services": "Manage Services",
  "/admin/testimonials": "Manage Testimonials",
  "/admin/stats": "Manage Stats",
  "/admin/worked-with": "Manage Worked With",
  "/admin/capabilities": "Manage Capabilities",
  "/admin/profile": "Edit Profile",
  "/admin/site-settings": "Site Settings",
  "/admin/contact": "Contact Info",
  "/admin/social": "Social Links",
};

function getPageTitle(pathname: string): string {
  return PAGE_TITLES[pathname] ?? "Admin";
}

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({
  pathname,
  user,
  onNavigate,
}: {
  pathname: string;
  user: { email: string; fullName: string | null };
  onNavigate?: () => void;
}) {
  const avatarLetter = (user.email[0] ?? "A").toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Brand block */}
      <div className="px-6 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary/30 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center">
            <span className="text-sm font-black gradient-text">YK</span>
          </div>
          <div>
            <p className="text-base font-bold text-ink-primary leading-none">
              Yahya<span className="text-brand-primary">.</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink-muted mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label} className={gi === 0 ? "" : "mt-6"}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink-muted px-3 mb-2">
              {group.label}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
                const active = isItemActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`block rounded-xl px-3 py-2.5 transition-all duration-200 group ${
                        active
                          ? "bg-brand-primary/15 border border-brand-primary/30 text-brand-light shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)]"
                          : "border border-transparent text-ink-secondary hover:text-ink-primary hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={16} className="shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="px-4 py-4 border-t border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center shrink-0">
            <span className="text-sm font-black text-brand-light">
              {avatarLetter}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-ink-primary truncate">
              {user.fullName ?? "Admin"}
            </p>
            <p className="text-[10px] text-ink-muted truncate">{user.email}</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View site"
            className="text-ink-muted hover:text-ink-primary transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

interface AdminShellProps {
  user: { email: string; fullName: string | null };
  children: ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const toast = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refreshing, startRefresh] = useTransition();

  const handleRefresh = () => {
    startRefresh(async () => {
      try {
        await refreshLiveSite();
        toast.success("Live site refreshed.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Refresh failed.");
      }
    });
  };

  return (
    <div className="flex h-screen bg-background-base text-ink-primary overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-background-surface border-r border-white/8">
        <SidebarContent pathname={pathname} user={user} />
      </aside>

      {/* Mobile slide-over sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-background-surface border-r border-white/8"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-5 right-4 z-10 text-ink-muted hover:text-ink-primary transition-colors"
              >
                <X size={20} />
              </button>
              <SidebarContent
                pathname={pathname}
                user={user}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background-base/80 backdrop-blur-md border-b border-white/8 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-ink-primary p-1 -ml-1"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-sm font-semibold text-ink-primary truncate">
              {getPageTitle(pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 text-ink-secondary hover:text-ink-primary hover:bg-white/5 transition disabled:opacity-60"
            >
              {refreshing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              Force refresh
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 text-ink-secondary hover:text-ink-primary hover:bg-white/5 transition"
            >
              <ExternalLink size={14} />
              View Live Site
            </a>
            <LogoutButton />
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
