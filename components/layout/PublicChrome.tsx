"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const HIDE_CHROME_PATHS = ["/login", "/admin"];

export function PublicChrome({
  children,
  preloader,
  navbar,
  footer,
}: {
  children: ReactNode;
  preloader: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const shouldHide = HIDE_CHROME_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHide) {
    return <>{children}</>;
  }

  return (
    <>
      {preloader}
      {navbar}
      {children}
      {footer}
    </>
  );
}
