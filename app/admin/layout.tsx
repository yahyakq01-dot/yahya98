import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui/ToastProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  // Verify admin status with the service-role client so the check never
  // depends on the request's JWT reaching PostgREST (which fails on the
  // post-login redirect and around token refresh).
  const admin = createAdminClient();
  const { data: adminCheck } = await admin
    .from("admin_users")
    .select("email, full_name")
    .eq("email", user.email)
    .maybeSingle();

  if (!adminCheck) {
    redirect("/login?error=unauthorized");
  }

  return (
    <ToastProvider>
      <AdminShell user={{ email: user.email, fullName: adminCheck.full_name }}>
        {children}
      </AdminShell>
    </ToastProvider>
  );
}
