"use server";

import { revalidatePath } from "next/cache";
import type { WorkedWithRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<WorkedWithRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createWorkedWith(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("worked_with")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/worked-with");
  return data;
}

export async function updateWorkedWith(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("worked_with")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/worked-with");
  return data;
}

export async function deleteWorkedWith(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("worked_with").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/worked-with");
  return { success: true };
}
