import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_META, TITLE_TEMPLATE } from "@/data/site";
import { IS_INDEXABLE } from "@/lib/env";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8FAFC",
};

// 这里只放全站共用的内容：基础地址、标题模板、索引开关。
// canonical、openGraph、twitter 由每个页面用 buildMetadata（src/lib/metadata.ts）生成；Next.js 的元数据是浅合并，
// 在这里写 openGraph 或 alternates，没有自己元数据的页面就会继承首页的。不设 keywords：没有证据说明它对 Bing 排名有帮助。
// 索引开关见 src/lib/env.ts：正式构建（`next build`）默认可收录，只有显式设 NEXT_PUBLIC_APP_ENV=preview 或本地 `next dev` 才 noindex。
export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: TITLE_TEMPLATE
  },
  description: SITE_META.description,
  robots: {
    index: IS_INDEXABLE,
    follow: IS_INDEXABLE,
    googleBot: {
      index: IS_INDEXABLE,
      follow: IS_INDEXABLE,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data: WebSite & Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_META.url}/#website`,
        "url": SITE_META.url,
        "name": SITE_META.name,
        "description": SITE_META.description,
        "inLanguage": "zh-CN",
        "publisher": {
          "@id": `${SITE_META.url}/#organization`
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_META.url}/#organization`,
        "name": SITE_META.name,
        "url": SITE_META.url,
        "description": "围绕订阅价格、付款周期、流量发放与使用门槛整理的客观选购博客。"
      }
    ]
  };

  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#17233A] antialiased selection:bg-[#6378EA]/20 selection:text-[#17233A]">
        {/* 预览横幅：只在不允许收录的构建（预览站、本地 next dev）里显示，正式构建不会出现 */}
        {!IS_INDEXABLE && (
          <div className="bg-[#F0F5F9] border-b border-[#E2E8F0] text-[11px] text-[#475569] py-1.5 px-4 text-center">
            <span>
              预览环境，未开放搜索引擎收录 · 正式域名：<code className="text-[#6378EA] font-semibold">{SITE_META.url}/</code>
            </span>
          </div>
        )}

        <Header />
        
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
