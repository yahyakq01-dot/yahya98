import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import { PublicChrome } from "@/components/layout/PublicChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const description =
  "Yahya Khan — Financial Analyst & BI Developer building Power BI dashboards, financial models, and data systems that drive smarter business decisions.";

export const metadata: Metadata = {
  title: SITE.title,
  description,
  keywords: [
    "financial analyst",
    "BI developer",
    "Power BI",
    "data analyst",
    "SQL",
    "Python",
    "Excel",
    "financial modeling",
    "Pakistan",
  ],
  authors: [{ name: "Yahya Khan" }],
  robots: "index, follow",
  openGraph: {
    title: SITE.title,
    description,
    type: "website",
    siteName: "Yahya Khan Portfolio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-background-base text-ink-primary antialiased">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
