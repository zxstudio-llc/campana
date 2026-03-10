import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    remotePatterns: wordpressHostname
      ? [
        {
          protocol: "https",
          hostname: wordpressHostname,
          port: "",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: wordpressHostname,
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "image.mux.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "stream.mux.com",
          port: "",
          pathname: "/**",
        },
      ]
      : [],
  },
  async redirects() {
    if (!wordpressUrl) {
      return [];
    }
    return [
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;