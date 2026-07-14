"use server";

import { revalidatePath } from "next/cache";
import type { ContactInfoRow } from "@/lib/supabase/database.types";
import { requireAdmin } from "./_auth";

type ContactInfoUpdate = Partial<
  Omit<ContactInfoRow, "id" | "created_at" | "updated_at">
>;

export async function updateContactInfo(input: ContactInfoUpdate) {
  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("contact_info")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!existing) throw new Error("No contact_info row found to update.");

  const { data, error } = await supabase
    .from("contact_info")
    .update(input)
    .eq("id", existing.id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/contact");
  return data;
}
