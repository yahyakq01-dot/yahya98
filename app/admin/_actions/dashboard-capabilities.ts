"use server";

import { revalidatePath } from "next/cache";
import type { DashboardCapabilityRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<DashboardCapabilityRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createDashboardCapability(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("dashboard_capabilities")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return data;
}

export async function updateDashboardCapability(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("dashboard_capabilities")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return data;
}

export async function deleteDashboardCapability(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("dashboard_capabilities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/capabilities");
  return { success: true };
}
