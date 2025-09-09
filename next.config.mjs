import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
