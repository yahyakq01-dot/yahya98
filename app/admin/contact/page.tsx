import { createClient } from "@/lib/supabase/server";
import { ContactInfoForm } from "@/components/admin/forms/ContactInfoForm";

export const dynamic = "force-dynamic";

export default async function ContactAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_info")
    .select("*")
    .limit(1)
    .maybeSingle();

  return <ContactInfoForm initial={data} />;
}
