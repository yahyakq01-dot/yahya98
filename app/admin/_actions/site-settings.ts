"use server";

import { revalidatePath } from "next/cache";
import type { SiteSettingsRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type SiteSettingsUpdate = Partial<
  Omit<SiteSettingsRow, "id" | "created_at" | "updated_at">
>;

export async function updateSiteSettings(input: SiteSettingsUpdate) {
  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!existing) throw new Error("No site_settings row found to update.");

  const { data, error } = await supabase
    .from("site_settings")
    .update(input)
    .eq("id", existing.id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/hero");
  revalidatePath("/admin/site-settings");
  return data;
}
