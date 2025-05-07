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