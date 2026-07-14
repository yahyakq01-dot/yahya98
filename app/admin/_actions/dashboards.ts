"use server";

import { revalidatePath } from "next/cache";
import type { DashboardRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<DashboardRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createDashboard(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("dashboards")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/dashboards");
  return data;
}

export async function updateDashboard(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("dashboards")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/dashboards");
  return data;
}

export async function deleteDashboard(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("dashboards").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/dashboards");
  return { success: true };
}
