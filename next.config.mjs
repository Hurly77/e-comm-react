/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["e-comm-images.s3.us-east-1.amazonaws.com", "via.placeholder.com"],
  },
};

export default nextConfig;
