import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0A0613 0%, #13101E 50%, #1A1525 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Subtle violet glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* YK Monogram badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0.05) 100%)",
              border: "1.5px solid rgba(124, 58, 237, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A78BFA",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            YK
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Yahya<span style={{ color: "#7C3AED", display: "flex" }}>.</span>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "76px",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Turning</div>
          <div style={{ display: "flex", color: "#A78BFA" }}>Complex Data</div>
          <div style={{ display: "flex" }}>
            Into Clear Decisions
            <span style={{ color: "#7C3AED", display: "flex" }}>.</span>
          </div>
        </div>

        {/* Subhead */}
        <div
          style={{
            color: "#A1A1AA",
            fontSize: "24px",
            fontWeight: 500,
            marginTop: "30px",
            display: "flex",
          }}
        >
          Financial Analyst & BI Developer · Pakistan
        </div>

        {/* Bottom badge row */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            gap: "12px",
          }}
        >
          {["Power BI", "SQL", "Python", "Financial Modeling"].map((tool) => (
            <div
              key={tool}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background: "rgba(124, 58, 237, 0.12)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                color: "#C4B5FD",
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
