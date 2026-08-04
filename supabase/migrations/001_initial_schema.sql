-- ============================================
-- YAHYA KHAN PORTFOLIO — INITIAL SCHEMA
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- HELPER: Auto-update updated_at trigger
-- ============================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 1. PROFILE (singleton)
-- ============================================

CREATE TABLE public.profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Yahya Khan',
  role TEXT NOT NULL DEFAULT 'Financial Analyst & BI Developer',
  short_bio TEXT,
  long_bio TEXT,
  photo_url TEXT,
  cv_url TEXT,
  available_for_work BOOLEAN NOT NULL DEFAULT true,
  fiverr_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_profile_updated_at
  BEFORE UPDATE ON public.profile
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 2. SITE SETTINGS (singleton)
-- ============================================

CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'Yahya.',
  monogram TEXT NOT NULL DEFAULT 'YK',
  hero_eyebrow TEXT NOT NULL DEFAULT 'AVAILABLE FOR PROJECTS',
  hero_line_1 TEXT NOT NULL DEFAULT 'Turning',
  hero_line_2 TEXT NOT NULL DEFAULT 'Complex Data',
  hero_line_3 TEXT NOT NULL DEFAULT 'Into Clear Decisions.',
  hero_subheadline TEXT,
  hero_ticker TEXT DEFAULT 'Decoding Data Into Decisions ↗',
  footer_tagline TEXT,
  footer_bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 3. CONTACT INFO (singleton)
-- ============================================

CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  whatsapp TEXT,
  whatsapp_display TEXT,
  fiverr_url TEXT,
  fiverr_display TEXT,
  response_time TEXT DEFAULT 'Within 24 hours',
  location TEXT DEFAULT 'Pakistan 🇵🇰 · Available Worldwide',
  availability TEXT DEFAULT 'Open to remote engagements',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 4. STATS (multiple)
-- ============================================

CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_stats_updated_at
  BEFORE UPDATE ON public.stats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 5. SERVICES
-- ============================================

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL,
  highlight BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 6. DASHBOARDS
-- ============================================

CREATE TABLE public.dashboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  live_preview_url TEXT,
  highlight BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_dashboards_updated_at
  BEFORE UPDATE ON public.dashboards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 7. DASHBOARD CAPABILITIES (the 6 pills above dashboard grid)
-- ============================================

CREATE TABLE public.dashboard_capabilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_dashboard_capabilities_updated_at
  BEFORE UPDATE ON public.dashboard_capabilities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 8. CODE PROJECTS (SQL & Python)
-- ============================================

CREATE TABLE public.code_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  stack TEXT[] NOT NULL DEFAULT '{}',
  stats JSONB NOT NULL DEFAULT '[]',
  github_url TEXT,
  live_preview_url TEXT,
  code_snippet TEXT,
  code_filename TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_code_projects_updated_at
  BEFORE UPDATE ON public.code_projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 9. CODE CAPABILITIES (SQL & Python pills)
-- ============================================

CREATE TABLE public.code_capabilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_code_capabilities_updated_at
  BEFORE UPDATE ON public.code_capabilities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 10. TESTIMONIALS
-- ============================================

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  country TEXT NOT NULL,
  flag TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('Fiverr', 'Web Client')),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  service TEXT NOT NULL,
  is_repeat_client BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 11. WORKED WITH
-- ============================================

CREATE TABLE public.worked_with (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  monogram TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_worked_with_updated_at
  BEFORE UPDATE ON public.worked_with
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 12. SOCIAL LINKS
-- ============================================

CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  username TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- 13. ADMIN USERS (whitelist for who can edit)
--
-- IMPORTANT: at least one row MUST exist here or NOBODY can access /admin
-- (is_admin() returns false for everyone). The seed (002) inserts the owner.
-- To add/change an admin later, use the Supabase SQL editor (service role):
--   INSERT INTO public.admin_users (email, full_name)
--   VALUES ('someone@example.com', 'Their Name') ON CONFLICT (email) DO NOTHING;
-- ============================================

CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worked_with ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES: Public read on all content tables (so the portfolio is visible)
-- ============================================

CREATE POLICY "Public read profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read contact_info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read dashboards" ON public.dashboards FOR SELECT USING (true);
CREATE POLICY "Public read dashboard_capabilities" ON public.dashboard_capabilities FOR SELECT USING (true);
CREATE POLICY "Public read code_projects" ON public.code_projects FOR SELECT USING (true);
CREATE POLICY "Public read code_capabilities" ON public.code_capabilities FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read worked_with" ON public.worked_with FOR SELECT USING (true);
CREATE POLICY "Public read social_links" ON public.social_links FOR SELECT USING (true);

-- ============================================
-- POLICIES: Only admin users (whitelist) can INSERT/UPDATE/DELETE
-- ============================================

-- Helper function to check if current authenticated user is an admin
-- SECURITY DEFINER + pinned empty search_path: prevents search_path-hijack
-- attacks (Supabase linter: function_search_path_mutable). All object
-- references below are fully schema-qualified so this still resolves.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = auth.jwt() ->> 'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Apply admin-only write policies
CREATE POLICY "Admin write profile" ON public.profile FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write contact_info" ON public.contact_info FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write stats" ON public.stats FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write services" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write dashboards" ON public.dashboards FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write dashboard_capabilities" ON public.dashboard_capabilities FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write code_projects" ON public.code_projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write code_capabilities" ON public.code_capabilities FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write worked_with" ON public.worked_with FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin write social_links" ON public.social_links FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Admin users table is read-only for everyone except via service_role
CREATE POLICY "Admin read admin_users" ON public.admin_users FOR SELECT USING (public.is_admin());

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket for portfolio images (profile photo, dashboard screenshots, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access on portfolio-images
CREATE POLICY "Public read portfolio-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Admin write access on portfolio-images
CREATE POLICY "Admin upload portfolio-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

CREATE POLICY "Admin update portfolio-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

CREATE POLICY "Admin delete portfolio-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND public.is_admin());

-- Bucket for documents (CV, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-documents', 'portfolio-documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read portfolio-documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-documents');

CREATE POLICY "Admin upload portfolio-documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-documents' AND public.is_admin());

CREATE POLICY "Admin update portfolio-documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-documents' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-documents' AND public.is_admin());

CREATE POLICY "Admin delete portfolio-documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-documents' AND public.is_admin());

-- ============================================
-- INDEXES for performance
-- ============================================

CREATE INDEX idx_dashboards_display_order ON public.dashboards (display_order);
CREATE INDEX idx_services_display_order ON public.services (display_order);
CREATE INDEX idx_code_projects_display_order ON public.code_projects (display_order);
CREATE INDEX idx_testimonials_display_order ON public.testimonials (display_order);
CREATE INDEX idx_worked_with_display_order ON public.worked_with (display_order);
CREATE INDEX idx_social_links_display_order ON public.social_links (display_order);
CREATE INDEX idx_stats_display_order ON public.stats (display_order);

-- ============================================
-- END OF MIGRATION
-- ============================================
