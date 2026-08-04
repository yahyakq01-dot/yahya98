import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui/ToastProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  // Verify admin status
  const { data: adminCheck } = await supabase
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
