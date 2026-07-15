import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yahya Khan — Financial Analyst & BI Developer",
    short_name: "Yahya Khan",
    description: "Financial Analyst & BI Developer portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0613",
    theme_color: "#7C3AED",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
