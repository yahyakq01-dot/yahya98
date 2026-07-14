import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/admin";
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
      const { data: adminCheck } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", user.email)
        .maybeSingle();

      if (adminCheck) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }

      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/login?error=unauthorized`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
