"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Code2,
  Briefcase,
  MessageSquare,
  Building2,
  Link2,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

interface Counts {
  dashboards: number;
  testimonials: number;
  services: number;
  codeProjects: number;
  workedWith: number;
  socialLinks: number;
}

interface RecentDashboard {
  title: string;
  updated_at: string;
}

interface RecentTestimonial {
  name: string;
  updated_at: string;
}

interface AdminOverviewProps {
  counts: Counts;
  recentDashboards: RecentDashboard[];
  recentTestimonials: RecentTestimonial[];
}

interface StatCard {
  key: string;
  label: string;
  count: number;
  icon: LucideIcon;
  href: string;
}

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${Math.floor(diffMonth / 12)}y ago`;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Add New Dashboard",
    description: "Publish a new Power BI project to your portfolio.",
    href: "/admin/dashboards",
    icon: PlusCircle,
  },
  {
    label: "Add Testimonial",
    description: "Showcase fresh client feedback and reviews.",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    label: "Update Hero",
    description: "Tweak the headline and intro on your homepage.",
    href: "/admin/hero",
    icon: Sparkles,
  },
  {
    label: "Edit Profile",
    description: "Refresh your bio, photo, and links.",
    href: "/admin/profile",
    icon: User,
  },
];

export function AdminOverview({
  counts,
  recentDashboards,
  recentTestimonials,
}: AdminOverviewProps) {
  const router = useRouter();

  const stats: StatCard[] = [
    { key: "dashboards", label: "Dashboards", count: counts.dashboards, icon: BarChart3, href: "/admin/dashboards" },
    { key: "code-projects", label: "Code Projects", count: counts.codeProjects, icon: Code2, href: "/admin/code-projects" },
    { key: "services", label: "Services", count: counts.services, icon: Briefcase, href: "/admin/services" },
    { key: "testimonials", label: "Testimonials", count: counts.testimonials, icon: MessageSquare, href: "/admin/testimonials" },
    { key: "worked-with", label: "Worked With", count: counts.workedWith, icon: Building2, href: "/admin/worked-with" },
    { key: "social-links", label: "Social Links", count: counts.socialLinks, icon: Link2, href: "/admin/social" },
  ];

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-light">
          OVERVIEW
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          Welcome back 👋
        </h1>
        <p className="text-sm text-ink-secondary mt-2">
          Here&apos;s a snapshot of your portfolio content.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.key}
              type="button"
              onClick={() => router.push(stat.href)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="group text-left bg-background-surface border border-white/8 rounded-2xl p-5 hover:border-brand-primary/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center">
                    <Icon size={18} className="text-brand-light" />
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-ink-muted group-hover:text-ink-primary transition-colors"
                  />
                </div>
                <span className="text-3xl font-black gradient-text">
                  {stat.count}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                  {stat.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group bg-background-surface border border-white/8 rounded-2xl p-5 hover:border-brand-primary/40 hover:bg-background-elevated hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-light" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-primary group-hover:text-brand-light transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-ink-secondary leading-relaxed mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-surface border border-white/8 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-ink-primary mb-4">
            Recently Edited Dashboards
          </h3>
          {recentDashboards.length === 0 ? (
            <p className="text-xs text-ink-muted">No dashboards yet.</p>
          ) : (
            <ul>
              {recentDashboards.map((d, i) => (
                <li
                  key={`${d.title}-${i}`}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-ink-secondary truncate pr-4">
                    {d.title}
                  </span>
                  <span className="text-[10px] text-ink-muted whitespace-nowrap">
                    {formatRelativeTime(d.updated_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-background-surface border border-white/8 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-ink-primary mb-4">
            Recent Testimonials
          </h3>
          {recentTestimonials.length === 0 ? (
            <p className="text-xs text-ink-muted">No testimonials yet.</p>
          ) : (
            <ul>
              {recentTestimonials.map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-ink-secondary truncate pr-4">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-ink-muted whitespace-nowrap">
                    {formatRelativeTime(t.updated_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
