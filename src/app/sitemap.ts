import { MetadataRoute } from 'next';
import { BRANDS } from '@/data/brands';
import { ARTICLES } from '@/data/articles';
import { SITE_META } from '@/data/site';

// 静态导出（Cloudflare Pages）要求这类路由声明为静态；普通构建里它本来就是静态的，不受影响
export const dynamic = 'force-static';

/**
 * 只列入已发布、可索引的页面；草稿指南（published_at 为 null）不进 sitemap，页面本身另设 noindex。
 * lastmod 写页面正文的真实修改日期，不用构建时间：改了正文就手动更新下面的日期。
 * changefreq 与 priority 不影响 Bing 抓取和排名，这里不写。
 */
const PAGE_CONTENT_UPDATED: Record<string, string> = {
  '/': '2026-11-04',
  '/airports/': '2026-11-03',
  '/deals/': '2026-11-03',
  '/compare/lingdongyun-vs-twilight/': '2026-11-04',
  '/tools/cost-per-gb/': '2026-11-03',
  '/tools/plan-finder/': '2026-11-04',
  '/editorial-policy/': '2026-11-03',
  '/disclosure/': '2026-11-04',
  '/about/': '2026-11-04',
};

/** 品牌页模板的最近实质修改日期；每家品牌页取它与该家价格资料日中较晚的一个。 */
const BRAND_PAGE_UPDATED = '2026-11-04';

function later(a: string, b: string | null | undefined): string {
  return b && b > a ? b : a;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_META.url;

  const staticRoutes: MetadataRoute.Sitemap = Object.entries(PAGE_CONTENT_UPDATED).map(([path, updated]) => ({
    url: `${baseUrl}${path}`,
    lastModified: updated,
  }));

  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((brand) => ({
    url: `${baseUrl}/airports/${brand.id}/`,
    lastModified: later(BRAND_PAGE_UPDATED, brand.data_date),
  }));

  const guideRoutes: MetadataRoute.Sitemap = ARTICLES
    .filter((article) => article.published_at !== null)
    .map((article) => ({
      url: `${baseUrl}/guides/${article.slug}/`,
      lastModified: article.substantive_updated_at ?? article.published_at ?? undefined,
    }));

  return [...staticRoutes, ...brandRoutes, ...guideRoutes];
}
