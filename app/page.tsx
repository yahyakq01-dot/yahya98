import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkedWith from "@/components/sections/WorkedWith";
import Services from "@/components/sections/Services";
import Dashboards from "@/components/sections/Dashboards";
import CodeAnalysis from "@/components/sections/CodeAnalysis";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import {
  getProfile,
  getSiteSettings,
  getContactInfo,
  getStats,
  getServices,
  getDashboards,
  getDashboardCapabilities,
  getCodeProjects,
  getCodeCapabilities,
  getTestimonials,
  getWorkedWith,
} from "@/lib/supabase/queries";

// Revalidate every 60s — content updates show up within a minute.
export const revalidate = 60;

export default async function Home() {
  // Fetch all portfolio data in parallel.
  const [
    profile,
    siteSettings,
    contactInfo,
    stats,
    services,
    dashboards,
    dashboardCapabilities,
    codeProjects,
    codeCapabilities,
    testimonials,
    workedWith,
  ] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getContactInfo(),
    getStats(),
    getServices(),
    getDashboards(),
    getDashboardCapabilities(),
    getCodeProjects(),
    getCodeCapabilities(),
    getTestimonials(),
    getWorkedWith(),
  ]);

  return (
    <main>
      <Hero profile={profile} siteSettings={siteSettings} />
      <About profile={profile} stats={stats} />
      <WorkedWith items={workedWith} />
      <Services services={services} />
      <Dashboards dashboards={dashboards} capabilities={dashboardCapabilities} />
      <CodeAnalysis projects={codeProjects} capabilities={codeCapabilities} />
      <Testimonials testimonials={testimonials} />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}
