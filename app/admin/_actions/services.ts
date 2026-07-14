"use server";

import { revalidatePath } from "next/cache";
import type { ServiceRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<ServiceRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createService(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("services")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return data;
}

export async function updateService(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("services")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return data;
}

export async function deleteService(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}
