import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // endpoints internos no para crawlers
          "/_next/", // assets internos de Next
        ],
      },
    ],
    sitemap: "https://newebd.com/sitemap.xml",
    host: "https://newebd.com",
  };
}
