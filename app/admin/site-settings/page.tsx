import { createClient } from "@/lib/supabase/server";
import { SiteSettingsForm } from "@/components/admin/forms/SiteSettingsForm";

export const dynamic = "force-dynamic";

export default async function SiteSettingsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return <SiteSettingsForm initial={data} />;
}
