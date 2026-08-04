/**
 * The canonical public URL of the site, with NO trailing slash.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL (set this in Vercel / .env.local)
 *   2. Vercel's built-in production URL (so previews/prod still work if the
 *      var above is forgotten)
 *   3. http://localhost:3000 (local dev)
 *
 * A value provided without a scheme (e.g. "example.com") is normalized to
 * https:// so `new URL(SITE_URL)` in metadata can never throw at build time.
 */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    "http://localhost:3000";

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();
