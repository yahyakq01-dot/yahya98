import crypto from "node:crypto";

// ─────────────────────────────────────────────────────────────
// Simple, self-contained admin auth: a password checkpoint.
//
// The password lives in the ADMIN_PASSWORD env var and is only ever compared
// on the server. A successful login sets a signed, httpOnly cookie whose value
// is an HMAC (keyed by ADMIN_SESSION_SECRET) — it can't be read or forged by
// browser JavaScript. Every admin route/action just verifies that signature.
//
// No Supabase Auth, no OAuth, no RLS/JWT timing to fight. Admin database writes
// run with the service-role client (see lib/supabase/admin.ts), gated by this
// cookie check.
// ─────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** Create a signed session token carrying an issued-at timestamp (for expiry). */
export function createSessionToken(): string {
  const payload = Buffer.from(JSON.stringify({ iat: Date.now() })).toString(
    "base64url"
  );
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token's signature and that it hasn't expired. Fails closed. */
export function verifySessionToken(token: string | undefined | null): boolean {
  try {
    if (!token) return false;
    const dot = token.indexOf(".");
    if (dot <= 0) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

    const { iat } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return (
      typeof iat === "number" && Date.now() - iat <= ADMIN_COOKIE_MAX_AGE * 1000
    );
  } catch {
    return false;
  }
}

/** Constant-time comparison of a submitted password against ADMIN_PASSWORD. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
