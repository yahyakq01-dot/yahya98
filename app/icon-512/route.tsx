import { ImageResponse } from "next/og";

// Static PWA icon (512×512) referenced by the web manifest — also used as the
// maskable icon (the monogram sits well inside the safe zone).
export const dynamic = "force-static";
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 256,
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
    { width: 512, height: 512 }
  );
}
