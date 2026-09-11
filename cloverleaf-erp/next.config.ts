import type { NextConfig } from "next";

/**
 * Admin de CloverLeaf: export estático servido por Apache. La sección Website
 * habla con la API en /api del mismo dominio (Apache la pasa al servicio
 * NestJS). En desarrollo, Next hace ese mismo proxy hacia la API local.
 */
const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = dev
  ? {
      trailingSlash: true,
      images: { unoptimized: true },
      async rewrites() {
        return [{ source: "/api/:path*", destination: `${process.env.API_DEV_URL ?? "http://127.0.0.1:3099"}/api/:path*` }];
      },
    }
  : {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    };

export default nextConfig;
