/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
            {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub
      },
      // ▼ ADD THIS NEW OBJECT FOR CLOUDINARY ▼
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
         port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
         port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
        ],
      },
    ];
  },
  // Optional: Rewrites to proxy API requests (alternative solution)
  async rewrites() {
    return [
      {
        source: '/fakestore-api/:path*',
        destination: 'https://fakestoreapi.com/:path*',
      },
    ];
  }
};

export default nextConfig;