/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable type checking during build (already done by TypeScript)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Disable ESLint during build (already done by ESLint)
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig

