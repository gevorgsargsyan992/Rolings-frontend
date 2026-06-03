/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_APP_AUTH_URL: process.env.APP_AUTH_URL,
  },
};

export default nextConfig;
