import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep chromium package external so its bin files are available at runtime.
  serverExternalPackages: ["@sparticuz/chromium"],
};

export default nextConfig;
