import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep chromium package external so its bin files are available at runtime.
  serverExternalPackages: ["@sparticuz/chromium"],
  // Ensure the brotli files are traced into the serverless bundle.
  outputFileTracingIncludes: {
    "/api/leads/[id]/pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
};

export default nextConfig;
