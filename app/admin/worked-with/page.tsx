import { createClient } from "@/lib/supabase/server";
import { WorkedWithManager } from "@/components/admin/forms/WorkedWithManager";

export const dynamic = "force-dynamic";

export default async function WorkedWithAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("worked_with")
    .select("*")
    .order("display_order", { ascending: true });

  return <WorkedWithManager items={data ?? []} />;
}
