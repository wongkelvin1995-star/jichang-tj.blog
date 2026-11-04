import type { NextConfig } from "next";
import path from "path";

// 规划阶段曾用过的旧路径：同一问题只保留一个首选 URL，旧地址 301 到首选页面。
// 现有的 10 篇指南（见 src/content/guides/index.ts）各自独立，不要再往这里加它们的 slug。
const LEGACY_GUIDE_REDIRECTS: Record<string, string> = {
  "lingdongyun-plans-and-rules": "/airports/lingdongyun/",
  "twilight-plans-and-rules": "/airports/twilight/",
  "breezenet-plans-and-rules": "/airports/breezenet/",
  "verified-coupons-guide": "/deals/",
  "lingdongyun-vs-twilight": "/compare/lingdongyun-vs-twilight/",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true, // 确保与 canonical URL 和 sitemap 保持完全一致的 200 返回，避免多余 308 跳转
  async redirects() {
    return Object.entries(LEGACY_GUIDE_REDIRECTS).map(([slug, destination]) => ({
      source: `/guides/${slug}/`,
      destination,
      statusCode: 301,
    }));
  },
  turbopack: {
    root: path.resolve(__dirname, ".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
