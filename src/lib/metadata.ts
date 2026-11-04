import type { Metadata } from 'next';
import { SITE_META, TITLE_TEMPLATE } from '@/data/site';

/**
 * 每个页面的元数据统一从这里生成：canonical、Open Graph、Twitter 都指向页面自己。
 *
 * Next.js 对各层元数据是“浅合并”：子页面没写 openGraph，就会整段继承根布局的（标题、网址都是首页的）。
 * 所以根布局不再放 openGraph、alternates、keywords，每个页面都必须调用 buildMetadata，
 * scripts/audit_site.mjs 会逐页核对 og:url 等于 canonical、og:title 等于 <title>。
 */
export const DEFAULT_OG_IMAGE = {
  // public/og-default.png，1200×630；相对地址由根布局的 metadataBase 补成绝对地址
  url: '/og-default.png',
  width: 1200,
  height: 630,
  alt: `${SITE_META.name}：套餐价格、付款周期与流量规则整理`
};

export interface BuildMetadataInput {
  /** 页面标题，不含站名；根布局的 title.template 会追加“ ｜ 机场推荐” */
  title: string;
  description: string;
  /** 以 / 开头、以 / 结尾，例如 /guides/how-to-choose/；首页写 / */
  path: string;
  /** 首页的标题不加站名后缀 */
  absoluteTitle?: boolean;
  /** 文章页：发布日期与最近一次实质修改日期（YYYY-MM-DD） */
  article?: { publishedTime: string; modifiedTime?: string | null };
}

export function buildMetadata({ title, description, path, absoluteTitle = false, article }: BuildMetadataInput): Metadata {
  const url = `${SITE_META.url}${path}`;
  const fullTitle = absoluteTitle ? title : TITLE_TEMPLATE.replace('%s', title);
  const shared = {
    title: fullTitle,
    description,
    url,
    siteName: SITE_META.name,
    locale: 'zh_CN',
    images: [DEFAULT_OG_IMAGE]
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: article
      ? {
          ...shared,
          type: 'article',
          publishedTime: article.publishedTime,
          ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {})
        }
      : { ...shared, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url]
    }
  };
}
