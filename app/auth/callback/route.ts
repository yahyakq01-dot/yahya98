import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectToParam = requestUrl.searchParams.get("redirectTo") || "/admin";
  // Only allow same-site relative paths — never an absolute/protocol-relative
  // URL — so `?redirectTo=` can't be abused as an open redirect.
  const redirectPath =
    redirectToParam.startsWith("/") && !redirectToParam.startsWith("//")
      ? redirectToParam
      : "/admin";
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[Auth Callback] Code exchange failed:",
          error.message,
          error
        );
      }
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      // Check admin membership with the service-role client (bypasses RLS).
      // The session cookie minted by exchangeCodeForSession isn't readable
      // within this same request, so a user-scoped (RLS-gated) query here
      // would run unauthenticated and always return nothing.
      const admin = createAdminClient();
      const { data: adminCheck } = await admin
        .from("admin_users")
        .select("email")
        .eq("email", user.email)
        .maybeSingle();

      if (adminCheck) {
        return NextResponse.redirect(new URL(redirectPath, origin));
      }

      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/login?error=unauthorized`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
