import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
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
        {
          protocol: "https",
          hostname: "ykhbacjdlnooyrblnrxi.supabase.co",
          port: "",
          pathname: "/**",
        },
      ]
      : [],
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
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
