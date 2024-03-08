/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized : true,
    domains: ['staging.multiqos.com'], 
    // namascape.me
  },
  async redirects() {
    return [
      {
        source: '/events/',
        destination: '/events/sponsored/',
        permanent: true,
      },
    ];
  },
  distDir: "build",
  trailingSlash: true,
  reactStrictMode:false
};

module.exports = nextConfig
