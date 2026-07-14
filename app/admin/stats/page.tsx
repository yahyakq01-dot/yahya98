import { createClient } from "@/lib/supabase/server";
import { StatsManager } from "@/components/admin/forms/StatsManager";

export const dynamic = "force-dynamic";

export default async function StatsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stats")
    .select("*")
    .order("display_order", { ascending: true });

  return <StatsManager stats={data ?? []} />;
}
