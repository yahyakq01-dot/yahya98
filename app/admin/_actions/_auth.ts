import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminSession";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Verifies the request carries a valid admin session cookie; redirects to
 * /login otherwise. Returns the service-role Supabase client so admin writes
 * bypass RLS (they are already gated by this check).
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/login");
  }
  const supabase = createAdminClient();
  return { supabase };
}
