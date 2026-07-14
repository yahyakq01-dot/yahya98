import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Verifies the current request is from a logged-in admin user.
 * Redirects to /login (or /login?error=unauthorized) otherwise.
 * Returns the authenticated Supabase client + user for use in actions.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", user.email!)
    .maybeSingle();

  if (!data) redirect("/login?error=unauthorized");
  return { supabase, user };
}
