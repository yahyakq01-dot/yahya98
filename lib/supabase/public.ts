import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Cookieless, read-only Supabase client for PUBLIC portfolio content.
 *
 * The public site only reads data that RLS marks as publicly readable, so
 * it does not need the visitor's auth session. Crucially, NOT reading
 * cookies keeps the read queries free of Next.js dynamic APIs, which lets
 * the public homepage be statically prerendered and revalidated on a
 * schedule (ISR via `export const revalidate`). The old cookie-based
 * server client forced every request to be dynamically rendered, which
 * defeated caching and hit Supabase on every single page view.
 */
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
