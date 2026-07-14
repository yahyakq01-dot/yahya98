"use server";

import { revalidatePath } from "next/cache";
import type { ProfileRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type ProfileUpdate = Partial<
  Omit<ProfileRow, "id" | "created_at" | "updated_at">
>;

export async function updateProfile(input: ProfileUpdate) {
  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("profile")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!existing) throw new Error("No profile row found to update.");

  const { data, error } = await supabase
    .from("profile")
    .update(input)
    .eq("id", existing.id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/profile");
  return data;
}
