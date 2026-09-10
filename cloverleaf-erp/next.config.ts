import type { NextConfig } from "next";

/**
 * Demo del ERP de CloverLeaf: datos de muestra, sin backend.
 * Export estático — se sirve desde un subdominio cPanel sin proceso Node
 * detrás, así que no hay nada que se pueda caer.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
