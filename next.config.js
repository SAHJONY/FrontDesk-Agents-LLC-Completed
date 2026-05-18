/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
  // Ensure static export for Vercel if needed, but we use SSR for real-time
  output: 'standalone',
}

module.exports = nextConfig
