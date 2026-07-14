import { createClient } from "@/lib/supabase/server";
import { ServicesManager } from "@/components/admin/forms/ServicesManager";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  return <ServicesManager services={data ?? []} />;
}
