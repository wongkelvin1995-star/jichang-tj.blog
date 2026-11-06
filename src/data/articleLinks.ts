import { ARTICLES } from '@/data/articles';
import { articleHref, getArticlesByCategory, publishedArticles } from '@/data/categories';
import type { ArticleBrief } from '@/types';

/**
 * 文章之间的双向内链：一篇文章在 internal_links 里写了另一篇，另一篇的“相关教程”里也会自动出现它，
 * 所以不用手工维护两头；只写真正相关的链接，不为凑数硬插。
 */
const guideSlugOf = (href: string): string | null => {
  const m = href.match(/^\/guides\/([^/]+)\/$/);
  return m ? m[1] : null;
};

/** 这篇文章主动链到的其他文章 */
export function outgoingArticles(article: ArticleBrief): ArticleBrief[] {
  const published = publishedArticles();
  return article.internal_links
    .map((l) => guideSlugOf(l.href))
    .filter((slug): slug is string => slug !== null && slug !== article.slug)
    .map((slug) => published.find((a) => a.slug === slug))
    .filter((a): a is ArticleBrief => Boolean(a));
}

/** 其他文章里链到这篇的 */
export function incomingArticles(slug: string): ArticleBrief[] {
  return publishedArticles().filter((a) => a.slug !== slug && a.internal_links.some((l) => guideSlugOf(l.href) === slug));
}

/** 相关教程：主动链出的 + 反向链入的，去重；不够 4 篇时用同分类的文章补足，最多 max 篇 */
export function getRelatedArticles(article: ArticleBrief, max = 6): ArticleBrief[] {
  const seen = new Set<string>([article.slug]);
  const out: ArticleBrief[] = [];
  const push = (a: ArticleBrief) => {
    if (!seen.has(a.slug) && out.length < max) {
      seen.add(a.slug);
      out.push(a);
    }
  };
  outgoingArticles(article).forEach(push);
  incomingArticles(article.slug).forEach(push);
  if (out.length < 4) getArticlesByCategory(article.category).forEach(push);
  return out;
}

/** 给指定品牌页挑教程用：按 slug 找文章（没发布的返回 undefined） */
export function findPublishedArticle(slug: string): ArticleBrief | undefined {
  return ARTICLES.find((a) => a.slug === slug && a.published_at !== null);
}

export { articleHref };
