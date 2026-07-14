"use server";

import { revalidatePath } from "next/cache";
import type { TestimonialRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type Insert = Omit<TestimonialRow, "id" | "created_at" | "updated_at">;
type Update = Partial<Insert>;

export async function createTestimonial(input: Insert) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("testimonials")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return data;
}

export async function updateTestimonial(id: string, input: Update) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return data;
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
