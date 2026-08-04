// ─────────────────────────────────────────────────────────────
// Structural + display-only configuration.
//
// Editable CONTENT (services, dashboards, testimonials, profile,
// contact info, etc.) now lives in Supabase and is fetched via
// `lib/supabase/queries.ts`. The values kept here are either
// structural (NAV_LINKS) and presentation-only display config
// (DATA_STACK, CODE_STACK, TESTIMONIAL_STATS). Interfaces are
// retained for typing.
// ─────────────────────────────────────────────────────────────

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  tools: string[];
  icon: string;
  highlight?: boolean;
}

export interface Dashboard {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tools: string[];
  livePreview?: string;
  highlight?: boolean;
}

export interface DashboardCapability {
  title: string;
  description: string;
  icon: string;
}

export interface SqlProject {
  title: string;
  description: string;
  language: "SQL" | "Python";
  href?: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  country: string;
  flag: string;
  source: "Fiverr" | "Web Client";
  rating: number;
  quote: string;
  service: string;
  repeat?: boolean;
}

export interface TestimonialStat {
  value: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface WorkedWith {
  name: string;
  monogram: string;
  category: string;
  accent?: string;
}

export interface CodeProject {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: { icon: string; label: string }[];
  stack: string[];
  stats: { value: string; label: string }[];
  github?: string;
  livePreview?: string;
}

export interface CodeCapability {
  title: string;
  icon: string;
}

export interface SocialLink {
  label: string;
  href: string;
  username: string;
  icon: string;
}

// ── Structural navigation (not editable content) ──
export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "dashboards", label: "Dashboards", href: "#dashboards" },
  { id: "sql-python", label: "SQL & Python", href: "#sql-python" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
] as const satisfies readonly NavLink[];

// ── Presentation-only display config ──
export const DATA_STACK: string[] = [
  "Power BI",
  "DAX",
  "Power Query",
  "M Language",
  "SQL",
  "Python",
  "Pandas",
  "Excel",
  "Tableau",
  "MySQL",
  "MS SQL Server",
  "Figma",
];

export const CODE_STACK: string[] = [
  "Python",
  "SQL",
  "Pandas",
  "Matplotlib",
  "MS SQL Server",
  "MySQL",
  "Excel",
  "Window Functions",
  "Cohort Analysis",
  "Data Cleaning",
];

export const TESTIMONIAL_STATS: TestimonialStat[] = [
  { value: "5.0", label: "Avg Rating" },
  { value: "4", label: "5-Star Reviews" },
  { value: "100%", label: "Satisfaction" },
  { value: "1", label: "Repeat Client" },
];
