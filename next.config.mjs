/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure App Router is enabled
  },
  devIndicators: {
    buildActivity: false, // Disable build activity indicator
  },
};

export default nextConfig; // ✅ Correct ESM export
