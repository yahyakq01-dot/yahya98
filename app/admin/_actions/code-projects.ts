"use server";

import { revalidatePath } from "next/cache";
import type { CodeProjectRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<CodeProjectRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createCodeProject(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("code_projects")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/code-projects");
  return data;
}

export async function updateCodeProject(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("code_projects")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/code-projects");
  return data;
}

export async function deleteCodeProject(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("code_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/code-projects");
  return { success: true };
}
