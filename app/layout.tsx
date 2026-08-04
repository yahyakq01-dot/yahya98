import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PublicChrome } from "@/components/layout/PublicChrome";
import PreloaderServer from "@/components/layout/PreloaderServer";
import NavbarServer from "@/components/layout/NavbarServer";
import FooterServer from "@/components/layout/FooterServer";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yahya Khan — Financial Analyst & BI Developer",
    template: "%s · Yahya Khan",
  },
  description:
    "Yahya Khan turns complex data into clear decisions — Power BI dashboards, financial models, SQL & Python analytics. Building data systems that drive smarter business decisions.",
  keywords: [
    "Financial Analyst",
    "BI Developer",
    "Power BI Developer",
    "Data Analyst Pakistan",
    "Power BI Dashboards",
    "SQL Data Analysis",
    "Python Data Cleaning",
    "Financial Modeling",
    "Yahya Khan",
    "Fiverr Data Analyst",
  ],
  authors: [{ name: "Yahya Khan" }],
  creator: "Yahya Khan",
  publisher: "Yahya Khan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Yahya Khan Portfolio",
    title: "Yahya Khan — Financial Analyst & BI Developer",
    description:
      "Turning complex data into clear decisions. Power BI dashboards, financial models, and data systems that drive smarter business decisions.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Yahya Khan — Financial Analyst & BI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yahya Khan — Financial Analyst & BI Developer",
    description: "Turning complex data into clear decisions.",
    images: ["/api/og"],
    creator: "@yahyaqureshi",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7C3AED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-background-base text-ink-primary antialiased">
        <PublicChrome
          preloader={<PreloaderServer />}
          navbar={<NavbarServer />}
          footer={<FooterServer />}
        >
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
