# Yahya Khan — Portfolio + CMS

A full-stack personal portfolio with a private, self-service admin panel. The
public site showcases Power BI dashboards, SQL/Python projects, services, and
testimonials; the owner edits every piece of content through friendly forms at
`/admin` after signing in with a password.

**Owner's (non-technical) guide:** see [`YAHYA-GUIDE.md`](./YAHYA-GUIDE.md).

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript strict, Turbopack)
- **Tailwind CSS v3** + **Framer Motion**
- **Supabase** — Postgres + Storage, with Row-Level Security
- **Vercel** for hosting

## Prerequisites

- Node.js **20.9+** (Next 16 minimum)
- A Supabase project

## Environment variables

Copy `.env.example` to `.env.local` and set the same variables in Vercel →
Project → Settings → Environment Variables:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Root URL only, e.g. `https://xxxx.supabase.co` — **no** `/rest/v1` suffix |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key — used for the public site's reads |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret**, server-only. Used for **all admin writes and uploads**, so it must be the real key |
| `NEXT_PUBLIC_SITE_URL` | Deployment URL, no trailing slash (SEO/OG/sitemap) |
| `ADMIN_PASSWORD` | The password typed at `/login`. Server-only |
| `ADMIN_SESSION_SECRET` | Long random string that signs the admin session cookie (`openssl rand -base64 32`) |

`NEXT_PUBLIC_SITE_URL` falls back to Vercel's production URL, then
`http://localhost:3000`, and a missing scheme is normalized to `https://` — see
`lib/site.ts`.

## Database setup

Run the SQL migrations in `supabase/migrations/` against your project (Supabase
Dashboard → SQL Editor, or the Supabase CLI):

1. **`001_initial_schema.sql`** — tables, RLS policies, triggers, and Storage buckets.
2. **`002_seed_data.sql`** — seeds all portfolio content. Idempotent (safe to re-run).
3. **`003_review_fixes.sql`** — only needed to retrofit a database created from an
   older `001`/`002`. Idempotent.

> The `admin_users` table and `is_admin()` function still exist but are no longer
> used for login — admin access is a password (below). RLS keeps the content
> tables read-only to the public; all admin writes go through the server with the
> service-role key.

## Admin login (password)

Admin access is a simple, self-contained password checkpoint — no OAuth, no
Supabase Auth. Set two env vars:

- `ADMIN_PASSWORD` — the password you'll type at `/login`.
- `ADMIN_SESSION_SECRET` — a long random string used to sign the session cookie.

On success the server sets a signed, httpOnly cookie; `proxy.ts`, the admin
layout, `requireAdmin()`, and the upload route all verify it. Rotate the password
anytime by changing `ADMIN_PASSWORD` and redeploying (existing sessions keep
working until they expire or `ADMIN_SESSION_SECRET` changes).

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

1. Import the repo and set the env vars above.
2. Deploy. SSL, CDN, and the sitemap/robots/OG image are automatic.
3. Make sure `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and
   `ADMIN_SESSION_SECRET` are set for Production, then log in at `/login`.

## How it fits together

- **Public reads** use a cookie-less Supabase client (`lib/supabase/public.ts`) so
  the homepage is statically prerendered and revalidated on a schedule (ISR,
  `export const revalidate = 60` in `app/page.tsx`). Every admin mutation calls
  `revalidatePath("/")`, so edits show up on the next visit.
- **Admin auth** is a signed httpOnly cookie (`lib/adminSession.ts`), checked by
  `proxy.ts` (Next 16's renamed middleware), the admin layout, and every Server
  Action via `requireAdmin()`.
- **Admin writes & uploads** run with the **service-role client**
  (`lib/supabase/admin.ts`, `server-only`) — gated by the cookie check — so they
  don't depend on any Supabase Auth session. RLS still blocks writes via the
  public anon key.
- **Security headers** (incl. HSTS and a scoped CSP) are set in `next.config.ts`.

## Project layout

```
app/            routes, admin pages, server actions, API routes, SEO files
components/     sections/ + ui/ (public) and admin/ (CMS forms & primitives)
lib/            supabase clients & queries, admin session helper, constants
supabase/       SQL migrations (schema, seed, review fixes)
```
