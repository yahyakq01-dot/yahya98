"use server";

import { revalidatePath } from "next/cache";
import type { StatRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<StatRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createStat(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("stats")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return data;
}

export async function updateStat(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("stats")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return data;
}

export async function deleteStat(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("stats").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true };
}

export async function reorderStats(orders: { id: string; display_order: number }[]) {
  const { supabase } = await requireAdmin();
  for (const { id, display_order } of orders) {
    const { error } = await supabase
      .from("stats")
      .update({ display_order })
      .eq("id", id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true };
}
