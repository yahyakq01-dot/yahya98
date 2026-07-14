import NavbarClient from "./NavbarClient";
import { getSiteSettings } from "@/lib/supabase/queries";

export default async function NavbarServer() {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.site_name ?? "Yahya.";

  return <NavbarClient siteName={siteName} />;
}
