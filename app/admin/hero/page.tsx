import { createClient } from "@/lib/supabase/server";
import { HeroForm } from "@/components/admin/forms/HeroForm";

export const dynamic = "force-dynamic";

export default async function HeroAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return <HeroForm initial={data} />;
}
