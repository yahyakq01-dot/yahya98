import { ImageResponse } from "next/og";

// Static PWA icon (192×192) referenced by the web manifest. Never changes,
// so it is safe to fully static-generate and cache.
export const dynamic = "force-static";
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          background: "#0A0613",
          color: "#A78BFA",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.05em",
        }}
      >
        YK
      </div>
    ),
    { width: 192, height: 192 }
  );
}
