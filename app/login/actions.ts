"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  checkPassword,
  createSessionToken,
} from "@/lib/adminSession";

export type LoginState = { error?: string };

function safePath(value: FormDataEntryValue | null): string {
  const p = typeof value === "string" ? value : "";
  return p.startsWith("/") && !p.startsWith("//") ? p : "/admin";
}

export async function login(
  _prev: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const redirectTo = safePath(formData.get("redirectTo"));

  if (!checkPassword(password)) {
    return { error: "Incorrect password. Please try again." };
  }

  let token: string;
  try {
    token = createSessionToken();
  } catch {
    return {
      error: "Admin login isn't configured (missing ADMIN_SESSION_SECRET).",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  redirect(redirectTo);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/login");
}
