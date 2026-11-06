import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Cloudflare Pages 的构建会自带 CF_PAGES 变量：这时把站点导出成纯静态文件（out/），交给静态托管。
// 本地开发、next start 和别的托管平台不设这个变量，行为不变。
// 导出模式用不了这里的 redirects()，旧地址的 301 改放在 public/_redirects（Cloudflare Pages 的格式）。
const isStaticExport = Boolean(process.env.CF_PAGES);

// 本机的 node_modules 是指向隔壁项目的目录链接，Turbopack 必须把上一级目录也算进根目录才能解析；
// 正常安装（npm ci，node_modules 在项目里）不需要，也不要设，让 Next.js 自己判断。
const nodeModulesPath = path.join(__dirname, "node_modules");
const nodeModulesIsLink = fs.existsSync(nodeModulesPath) && fs.lstatSync(nodeModulesPath).isSymbolicLink();

// 规划阶段曾用过的旧路径：同一问题只保留一个首选 URL，旧地址 301 到首选页面。
// 现有的 10 篇指南（见 src/content/guides/index.ts）各自独立，不要再往这里加它们的 slug。
// 改这里时，同步改 public/_redirects。
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
  turbopack: {
    ...(nodeModulesIsLink ? { root: path.resolve(__dirname, "..") } : {}),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

if (isStaticExport) {
  nextConfig.output = "export";
  nextConfig.images = { unoptimized: true }; // 静态导出没有图片优化服务；检测截图撤下后站内暂时没有图片，设置保留，等新图上传时用
} else {
  nextConfig.redirects = async () =>
    Object.entries(LEGACY_GUIDE_REDIRECTS).map(([slug, destination]) => ({
      source: `/guides/${slug}/`,
      destination,
      statusCode: 301,
    }));
}

export default nextConfig;
