import FooterClient from "./FooterClient";
import {
  getProfile,
  getSiteSettings,
  getSocialLinks,
  getContactInfo,
} from "@/lib/supabase/queries";

export default async function FooterServer() {
  const [profile, siteSettings, socialLinks, contactInfo] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getSocialLinks(),
    getContactInfo(),
  ]);

  const footerTagline =
    siteSettings?.footer_tagline ??
    "Let's Build The Future of Data Decisions Together.";
  const footerBio =
    siteSettings?.footer_bio ??
    "Yahya Khan — Financial Analyst & BI Developer · Available Worldwide · yahyaqureshi012@gmail.com";
  const monogram = siteSettings?.monogram ?? "YK";
  const fiverrUrl =
    contactInfo?.fiverr_url ??
    profile?.fiverr_url ??
    "https://www.fiverr.com/yahya_qureshii";
  const whatsapp = contactInfo?.whatsapp ?? "+923331234567";

  return (
    <FooterClient
      footerTagline={footerTagline}
      footerBio={footerBio}
      monogram={monogram}
      fiverrUrl={fiverrUrl}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
    />
  );
}
