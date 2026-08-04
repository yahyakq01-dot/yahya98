import { createPublicClient } from "@/lib/supabase/public";
import { NextResponse } from "next/server";

// Lightweight deployment health check: actually round-trips to Supabase
// (a public read) so it verifies connectivity, not just local cookies.
// Error details are logged server-side only — never returned to the caller.
export async function GET() {
  try {
    const supabase = createPublicClient();
    const { error } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1);

    if (error) {
      console.error("[health] Supabase query failed:", error.message);
      return NextResponse.json(
        { status: "error", message: "Supabase connection failed" },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: "ok",
      message: "Supabase connected successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[health] Unexpected error:", err);
    return NextResponse.json(
      { status: "error", message: "Health check failed" },
      { status: 500 }
    );
  }
}
