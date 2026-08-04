# Yahya Khan — Portfolio + CMS

A full-stack personal portfolio with a private, self-service admin panel. The
public site showcases Power BI dashboards, SQL/Python projects, services, and
testimonials; the owner edits every piece of content through friendly forms at
`/admin` after signing in with Google.

**Owner's (non-technical) guide:** see [`YAHYA-GUIDE.md`](./YAHYA-GUIDE.md).

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript strict, Turbopack)
- **Tailwind CSS v3** + **Framer Motion**
- **Supabase** — Postgres + Auth (Google OAuth) + Storage, with Row-Level Security
- **Vercel** for hosting

## Prerequisites

- Node.js **20.9+** (Next 16 minimum)
- A Supabase project
- A Google OAuth client (configured as a provider inside Supabase Auth)

## Environment variables

Copy `.env.example` to `.env.local` and fill in all four (set the same four in
Vercel → Project → Settings → Environment Variables):

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Root URL only, e.g. `https://xxxx.supabase.co` — **no** `/rest/v1` suffix |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (safe in the browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** — server only, never exposed to the client |
| `NEXT_PUBLIC_SITE_URL` | Deployment URL, no trailing slash (used for SEO/OG/sitemap) |

`NEXT_PUBLIC_SITE_URL` falls back to Vercel's production URL, then
`http://localhost:3000`, and a missing scheme is normalized to `https://` — see
`lib/site.ts`.

## Database setup

Run the SQL migrations in `supabase/migrations/` against your project (Supabase
Dashboard → SQL Editor, or the Supabase CLI):

1. **`001_initial_schema.sql`** — tables, RLS policies, the `is_admin()` helper,
   triggers, and Storage buckets.
2. **`002_seed_data.sql`** — seeds all content **and the first admin user**. It is
   idempotent (safe to re-run).
3. **`003_review_fixes.sql`** — only needed to retrofit a database that was already
   created from an older `001`/`002`. Idempotent.

### ⚠️ Bootstrapping the first admin

Access to `/admin` is gated by the `admin_users` table — if it's empty, **nobody
can log in** (`is_admin()` returns false for everyone). `002_seed_data.sql` inserts
the owner automatically. To add or change an admin later, run (SQL Editor / service
role):

```sql
INSERT INTO public.admin_users (email, full_name)
VALUES ('someone@example.com', 'Their Name')
ON CONFLICT (email) DO NOTHING;
```

### Auth configuration

- **Supabase Auth** → enable the **Google** provider; set **Site URL** and add the
  deployment URL (with `/**`) to the redirect allow-list.
- **Google Cloud Console** → add your origins (`http://localhost:3000` and the
  production URL) to *Authorized JavaScript origins*, and the Supabase callback URL
  to *Authorized redirect URIs*.
- The app's OAuth callback lives at `/auth/callback`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config)
npx tsc --noEmit   # type-check
```

## Deploy (Vercel)

1. Import the repo, set the four env vars.
2. Deploy. SSL, CDN, and the sitemap/robots/OG image are automatic.
3. Point Supabase Auth and Google OAuth at the production URL (see above).

## How it fits together

- **Public reads** use a cookie-less Supabase client (`lib/supabase/public.ts`) so
  the homepage is statically prerendered and revalidated on a schedule (ISR,
  `export const revalidate = 60` in `app/page.tsx`). Every admin mutation calls
  `revalidatePath("/")`, so edits show up on the next visit.
- **Auth** is enforced in depth: `proxy.ts` (Next 16's renamed middleware) guards
  `/admin` and `/login`, the admin layout re-checks, every Server Action calls
  `requireAdmin()`, and Postgres RLS is the final backstop.
- **Security headers** (incl. HSTS and a scoped CSP) are set in `next.config.ts`.
- The **service-role client** (`lib/supabase/admin.ts`) is marked `server-only`.

## Project layout

```
app/            routes, admin pages, server actions, API routes, SEO files
components/     sections/ + ui/ (public) and admin/ (CMS forms & primitives)
lib/            supabase clients & queries, helpers, structural constants
supabase/       SQL migrations (schema, seed, review fixes)
```
