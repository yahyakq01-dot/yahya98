import { createClient } from "@/lib/supabase/server";

// Helper functions for fetching portfolio content from Supabase.
// To be implemented in Phase 14.

export async function getProfile() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  return data;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}
