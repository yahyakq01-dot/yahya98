"use server";

import { revalidatePath } from "next/cache";
import type { CodeCapabilityRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<CodeCapabilityRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createCodeCapability(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("code_capabilities")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return data;
}

export async function updateCodeCapability(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("code_capabilities")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return data;
}

export async function deleteCodeCapability(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("code_capabilities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return { success: true };
}
