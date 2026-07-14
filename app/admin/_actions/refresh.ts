"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./_auth";

export async function refreshLiveSite() {
  await requireAdmin();
  revalidatePath("/", "layout");
  revalidatePath("/");
  return { success: true };
}
