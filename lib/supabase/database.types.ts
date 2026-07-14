export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ProfileRow {
  id: string;
  name: string;
  role: string;
  short_bio: string | null;
  long_bio: string | null;
  photo_url: string | null;
  cv_url: string | null;
  available_for_work: boolean;
  fiverr_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsRow {
  id: string;
  site_name: string;
  monogram: string;
  hero_eyebrow: string;
  hero_line_1: string;
  hero_line_2: string;
  hero_line_3: string;
  hero_subheadline: string | null;
  hero_ticker: string | null;
  footer_tagline: string | null;
  footer_bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactInfoRow {
  id: string;
  email: string;
  whatsapp: string | null;
  whatsapp_display: string | null;
  fiverr_url: string | null;
  fiverr_display: string | null;
  response_time: string | null;
  location: string | null;
  availability: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatRow {
  id: string;
  value: string;
  label: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRow {
  id: string;
  number: string;
  title: string;
  description: string;
  tools: string[];
  icon: string;
  highlight: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  tools: string[];
  live_preview_url: string | null;
  highlight: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardCapabilityRow {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CodeProjectRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: Json;
  stack: string[];
  stats: Json;
  github_url: string | null;
  live_preview_url: string | null;
  code_snippet: string | null;
  code_filename: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CodeCapabilityRow {
  id: string;
  title: string;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  initials: string;
  country: string;
  flag: string;
  source: "Fiverr" | "Web Client";
  rating: number;
  quote: string;
  service: string;
  is_repeat_client: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface WorkedWithRow {
  id: string;
  name: string;
  monogram: string;
  category: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLinkRow {
  id: string;
  label: string;
  href: string;
  username: string;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "id" | "created_at" | "updated_at">;
        Update: Partial<ProfileRow>;
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Omit<SiteSettingsRow, "id" | "created_at" | "updated_at">;
        Update: Partial<SiteSettingsRow>;
      };
      contact_info: {
        Row: ContactInfoRow;
        Insert: Omit<ContactInfoRow, "id" | "created_at" | "updated_at">;
        Update: Partial<ContactInfoRow>;
      };
      stats: {
        Row: StatRow;
        Insert: Omit<StatRow, "id" | "created_at" | "updated_at">;
        Update: Partial<StatRow>;
      };
      services: {
        Row: ServiceRow;
        Insert: Omit<ServiceRow, "id" | "created_at" | "updated_at">;
        Update: Partial<ServiceRow>;
      };
      dashboards: {
        Row: DashboardRow;
        Insert: Omit<DashboardRow, "id" | "created_at" | "updated_at">;
        Update: Partial<DashboardRow>;
      };
      dashboard_capabilities: {
        Row: DashboardCapabilityRow;
        Insert: Omit<DashboardCapabilityRow, "id" | "created_at" | "updated_at">;
        Update: Partial<DashboardCapabilityRow>;
      };
      code_projects: {
        Row: CodeProjectRow;
        Insert: Omit<CodeProjectRow, "id" | "created_at" | "updated_at">;
        Update: Partial<CodeProjectRow>;
      };
      code_capabilities: {
        Row: CodeCapabilityRow;
        Insert: Omit<CodeCapabilityRow, "id" | "created_at" | "updated_at">;
        Update: Partial<CodeCapabilityRow>;
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: Omit<TestimonialRow, "id" | "created_at" | "updated_at">;
        Update: Partial<TestimonialRow>;
      };
      worked_with: {
        Row: WorkedWithRow;
        Insert: Omit<WorkedWithRow, "id" | "created_at" | "updated_at">;
        Update: Partial<WorkedWithRow>;
      };
      social_links: {
        Row: SocialLinkRow;
        Insert: Omit<SocialLinkRow, "id" | "created_at" | "updated_at">;
        Update: Partial<SocialLinkRow>;
      };
    };
  };
}
