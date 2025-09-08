/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vaultre.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vaultre.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.realestateview.com.au',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;