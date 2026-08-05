import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminSession";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_BYTES = 5 * 1024 * 1024;
const BUCKETS = ["portfolio-images", "portfolio-documents"] as const;
type Bucket = (typeof BUCKETS)[number];

// Server-side upload endpoint. The admin's browser posts the file here; we
// verify the admin session cookie and upload with the service-role client
// (Storage RLS would otherwise require a Supabase Auth session, which the
// password-based admin doesn't have).
export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const file = form.get("file");
  const bucket = String(form.get("bucket") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!BUCKETS.includes(bucket as Bucket)) {
    return NextResponse.json({ error: "Invalid upload target." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File is too large. Maximum size is 5MB." },
      { status: 400 }
    );
  }
  const typeOk =
    bucket === "portfolio-documents"
      ? file.type === "application/pdf"
      : file.type.startsWith("image/");
  if (file.type && !typeOk) {
    return NextResponse.json(
      {
        error:
          bucket === "portfolio-documents"
            ? "Unsupported file type. Please upload a PDF."
            : "Unsupported file type. Please upload a PNG, JPG, or WEBP image.",
      },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const safeName =
    file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "") || "file";
  const path = `${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    cacheControl: "3600",
    contentType: file.type || undefined,
  });
  if (error) {
    console.error("[upload]", error.message);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
