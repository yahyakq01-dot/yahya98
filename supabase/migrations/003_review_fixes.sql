-- ============================================
-- YAHYA KHAN PORTFOLIO — REVIEW FIXES (safe to run on an EXISTING database)
--
-- If your Supabase project was already set up from 001 + 002, run THIS file
-- once (Supabase Dashboard → SQL Editor → paste → Run) to apply the review
-- fixes without recreating anything. It is fully idempotent.
--
-- On a brand-new project, running 001 + 002 already includes all of these —
-- 003 is only needed to retrofit an existing database.
-- ============================================

-- 1) CRITICAL: ensure at least one admin exists, or nobody can log in to /admin.
INSERT INTO public.admin_users (email, full_name)
VALUES ('yahyaqureshi012@gmail.com', 'Yahya Khan')
ON CONFLICT (email) DO NOTHING;

-- 2) Harden functions with a pinned search_path (search_path-hijack defense).
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- 3) Add WITH CHECK to the storage UPDATE policies (re-validate the new row).
DROP POLICY IF EXISTS "Admin update portfolio-images" ON storage.objects;
CREATE POLICY "Admin update portfolio-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin update portfolio-documents" ON storage.objects;
CREATE POLICY "Admin update portfolio-documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-documents' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-documents' AND public.is_admin());

-- 4) Reconcile the "BI Dashboards" stat with the 10 seeded dashboards
--    (only if it hasn't been customized away from the seed value).
UPDATE public.stats
SET value = '10'
WHERE label = 'BI Dashboards' AND value = '9';

-- ============================================
-- END OF REVIEW FIXES
-- ============================================
