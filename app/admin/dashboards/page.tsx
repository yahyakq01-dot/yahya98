import { createClient } from "@/lib/supabase/server";
import { DashboardsManager } from "@/components/admin/forms/DashboardsManager";

export const dynamic = "force-dynamic";

export default async function DashboardsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("dashboards")
    .select("*")
    .order("display_order", { ascending: true });

  return <DashboardsManager dashboards={data ?? []} />;
}
