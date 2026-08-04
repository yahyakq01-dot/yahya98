import { createPublicClient } from "@/lib/supabase/public";
import type {
  ProfileRow,
  SiteSettingsRow,
  ContactInfoRow,
  StatRow,
  ServiceRow,
  DashboardRow,
  DashboardCapabilityRow,
  CodeProjectRow,
  CodeCapabilityRow,
  TestimonialRow,
  WorkedWithRow,
  SocialLinkRow,
} from "./database.types";

// ── Singletons ──────────────────────────────────────────────

export async function getProfile(): Promise<ProfileRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error("[getProfile]", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[getProfile] threw:", err);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error("[getSiteSettings]", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[getSiteSettings] threw:", err);
    return null;
  }
}

export async function getContactInfo(): Promise<ContactInfoRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error("[getContactInfo]", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[getContactInfo] threw:", err);
    return null;
  }
}

// ── Collections (ordered by display_order) ──────────────────

export async function getStats(): Promise<StatRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getStats]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getStats] threw:", err);
    return [];
  }
}

export async function getServices(): Promise<ServiceRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getServices]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getServices] threw:", err);
    return [];
  }
}

export async function getDashboards(): Promise<DashboardRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("dashboards")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getDashboards]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getDashboards] threw:", err);
    return [];
  }
}

export async function getDashboardCapabilities(): Promise<
  DashboardCapabilityRow[]
> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("dashboard_capabilities")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getDashboardCapabilities]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getDashboardCapabilities] threw:", err);
    return [];
  }
}

export async function getCodeProjects(): Promise<CodeProjectRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("code_projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getCodeProjects]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getCodeProjects] threw:", err);
    return [];
  }
}

export async function getCodeCapabilities(): Promise<CodeCapabilityRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("code_capabilities")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getCodeCapabilities]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getCodeCapabilities] threw:", err);
    return [];
  }
}

export async function getTestimonials(): Promise<TestimonialRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getTestimonials]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getTestimonials] threw:", err);
    return [];
  }
}

export async function getWorkedWith(): Promise<WorkedWithRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("worked_with")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getWorkedWith]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getWorkedWith] threw:", err);
    return [];
  }
}

export async function getSocialLinks(): Promise<SocialLinkRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("[getSocialLinks]", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getSocialLinks] threw:", err);
    return [];
  }
}
