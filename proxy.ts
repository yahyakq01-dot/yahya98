import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminSession";

// Gate /admin and /login on the signed admin-session cookie. No Supabase, no
// network call — just a fast, local signature check.
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authed = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  if (pathname.startsWith("/admin") && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|manifest.webmanifest|sitemap.xml|robots.txt|api/og|api/health|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
