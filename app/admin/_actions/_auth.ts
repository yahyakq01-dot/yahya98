import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

/**
 * Verifies the current request is from a logged-in admin user.
 * Redirects to /login (or /login?error=unauthorized) otherwise.
 *
 * Identity comes from the request's session (getUser validates the token),
 * but the admin-membership check AND the returned client use the service-role
 * client. That keeps admin gating and writes independent of the RLS/JWT-in-
 * query timing that breaks right after login and on token refresh. The user
 * is fully authenticated before the privileged client is ever used.
 */
export async function requireAdmin() {
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !user.email) redirect("/login");

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();

  if (!data) redirect("/login?error=unauthorized");
  return { supabase, user };
}
