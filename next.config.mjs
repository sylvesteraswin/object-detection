import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose environment variables to the client
  env: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
    ASSET_PREFIX: process.env.ASSET_PREFIX,
  },

  // Use absolute URLs for assets when deployed
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? process.env.ASSET_PREFIX ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : process.env.VERCEL_BRANCH_URL
          ? `https://${process.env.VERCEL_BRANCH_URL}`
          : undefined)
      : undefined,
};

export default nextConfig;
