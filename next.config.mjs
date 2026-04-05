/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during production build (run separately via `npm run lint`)
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Allow loading images from Unsplash (replace with your own CDN in production)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
