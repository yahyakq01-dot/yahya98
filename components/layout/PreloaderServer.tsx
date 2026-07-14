import PreloaderClient from "./PreloaderClient";
import { getSiteSettings } from "@/lib/supabase/queries";

export default async function PreloaderServer() {
  const siteSettings = await getSiteSettings();
  const monogram = siteSettings?.monogram ?? "YK";

  return <PreloaderClient monogram={monogram} />;
}
