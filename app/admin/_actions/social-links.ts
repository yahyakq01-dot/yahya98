"use server";

import { revalidatePath } from "next/cache";
import type { SocialLinkRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<SocialLinkRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createSocialLink(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("social_links")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/social");
  return data;
}

export async function updateSocialLink(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("social_links")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/social");
  return data;
}

export async function deleteSocialLink(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/social");
  return { success: true };
}
