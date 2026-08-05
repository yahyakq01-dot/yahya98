import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminSession";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui/ToastProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/login");
  }

  return (
    <ToastProvider>
      <AdminShell user={{ email: "Admin", fullName: "Yahya Khan" }}>
        {children}
      </AdminShell>
    </ToastProvider>
  );
}
