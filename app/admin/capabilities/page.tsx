import { createClient } from "@/lib/supabase/server";
import { CapabilitiesManager } from "@/components/admin/forms/CapabilitiesManager";

export const dynamic = "force-dynamic";

export default async function CapabilitiesAdminPage() {
  const supabase = await createClient();
  const [{ data: dashboardCaps }, { data: codeCaps }] = await Promise.all([
    supabase
      .from("dashboard_capabilities")
      .select("*")
      .order("display_order", { ascending: true }),
    supabase
      .from("code_capabilities")
      .select("*")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <CapabilitiesManager
      dashboardCaps={dashboardCaps ?? []}
      codeCaps={codeCaps ?? []}
    />
  );
}
