"use client";

import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HIDE_CHROME_PATHS = ["/login", "/admin"];

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHide = HIDE_CHROME_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHide) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
