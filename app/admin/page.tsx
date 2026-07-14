import { createClient } from "@/lib/supabase/server";
import { AdminOverview } from "@/components/admin/AdminOverview";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts for each content type
  const [
    { count: dashboardsCount },
    { count: testimonialsCount },
    { count: servicesCount },
    { count: codeProjectsCount },
    { count: workedWithCount },
    { count: socialLinksCount },
  ] = await Promise.all([
    supabase.from("dashboards").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("code_projects").select("*", { count: "exact", head: true }),
    supabase.from("worked_with").select("*", { count: "exact", head: true }),
    supabase.from("social_links").select("*", { count: "exact", head: true }),
  ]);

  // Fetch the most recently updated rows for "Recent Activity"
  const { data: recentDashboards } = await supabase
    .from("dashboards")
    .select("title, updated_at")
    .order("updated_at", { ascending: false })
    .limit(3);

  const { data: recentTestimonials } = await supabase
    .from("testimonials")
    .select("name, updated_at")
    .order("updated_at", { ascending: false })
    .limit(3);

  return (
    <AdminOverview
      counts={{
        dashboards: dashboardsCount ?? 0,
        testimonials: testimonialsCount ?? 0,
        services: servicesCount ?? 0,
        codeProjects: codeProjectsCount ?? 0,
        workedWith: workedWithCount ?? 0,
        socialLinks: socialLinksCount ?? 0,
      }}
      recentDashboards={recentDashboards ?? []}
      recentTestimonials={recentTestimonials ?? []}
    />
  );
}
