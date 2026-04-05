/** @type {import('next').NextConfig} */
const nextConfig = {
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
