import { createClient } from "@/lib/supabase/server";
import { TestimonialsManager } from "@/components/admin/forms/TestimonialsManager";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  return <TestimonialsManager testimonials={data ?? []} />;
}
