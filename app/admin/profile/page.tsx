import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/admin/forms/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfileAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  return <ProfileForm initial={data} />;
}
