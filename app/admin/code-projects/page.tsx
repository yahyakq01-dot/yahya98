import { createClient } from "@/lib/supabase/server";
import { CodeProjectsManager } from "@/components/admin/forms/CodeProjectsManager";

export const dynamic = "force-dynamic";

export default async function CodeProjectsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("code_projects")
    .select("*")
    .order("display_order", { ascending: true });

  return <CodeProjectsManager projects={data ?? []} />;
}
