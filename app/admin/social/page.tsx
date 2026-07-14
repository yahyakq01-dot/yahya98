import { createClient } from "@/lib/supabase/server";
import { SocialLinksManager } from "@/components/admin/forms/SocialLinksManager";

export const dynamic = "force-dynamic";

export default async function SocialAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("display_order", { ascending: true });

  return <SocialLinksManager links={data ?? []} />;
}
