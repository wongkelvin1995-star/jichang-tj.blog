import { findPublishedArticle } from '@/data/articleLinks';
import { articleHref } from '@/data/categories';
import type { ArticleBrief } from '@/types';

/**
 * 首页的新手入口和“热门教程”清单。
 * - “热门教程”是编辑按新手遇到问题的先后顺序排的，不是访问量统计（本站没有访问数据，页面上也这么写）。
 * - 清单里写了但还没发布的文章会被自动跳过，不会出现死链接。
 */
export interface StartPath {
  id: 'before' | 'after' | 'trouble';
  title: string;
  text: string;
  /** 按顺序列出的文章 slug 和工具地址 */
  links: { label?: string; slug?: string; href?: string }[];
  cta: { label: string; href: string };
}

export const START_PATHS: StartPath[] = [
  {
    id: 'before',
    title: '我还没买，怎么选？',
    text: '先定预算和用量，再核对设备数、倍率和退款，第一次只买月付。',
    links: [
      { slug: 'what-is-an-airport' },
      { slug: 'how-to-choose' },
      { slug: 'how-much-traffic-per-month' },
      { label: '套餐匹配器：按用量和预算筛档位', href: '/tools/plan-finder/' }
    ],
    cta: { label: '查看机场选购', href: '/guides/category/buying/' }
  },
  {
    id: 'after',
    title: '我买了，怎么连上？',
    text: '确认连接方式、从官网下载官方客户端、用账号登录、选个节点测一测，几步就能连上。',
    links: [
      { slug: 'first-time-setup' },
      { label: 'Windows、Mac、安卓、iPhone：按系统看客户端教程', href: '/guides/category/clients/' },
      { slug: 'global-rule-direct-mode' }
    ],
    cta: { label: '查看新手教程', href: '/guides/category/beginner/' }
  },
  {
    id: 'trouble',
    title: '连不上或很慢怎么办？',
    text: '按固定顺序排查：本地网络、系统时间、节点列表刷新、客户端版本，最后才怀疑节点。',
    links: [
      { slug: 'all-nodes-timeout' },
      { slug: 'subscription-update-failed' },
      { slug: 'connected-but-slow-or-blocked' },
      { slug: 'mobile-keeps-disconnecting' }
    ],
    cta: { label: '查看故障排查', href: '/guides/category/troubleshooting/' }
  }
];

/** 热门教程：新手最常问的问题，按先后顺序（先弄懂、再选购、再连接、再排错、再读线路词） */
export const POPULAR_GUIDE_SLUGS = [
  'what-is-an-airport',
  'how-to-choose',
  'first-time-setup',
  'all-nodes-timeout',
  'connected-but-slow-or-blocked',
  'coupon-not-working',
  'iplc-vs-iepl',
  'how-much-traffic-per-month',
  'refund-and-purchase-checklist',
  'windows-client-guide'
];

export function popularGuides(limit: number): ArticleBrief[] {
  const out: ArticleBrief[] = [];
  for (const slug of POPULAR_GUIDE_SLUGS) {
    const a = findPublishedArticle(slug);
    if (a) out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}

/** 入口里的链接：文章没发布就跳过 */
export function resolveStartLinks(path: StartPath): { label: string; href: string }[] {
  return path.links.flatMap((l) => {
    if (l.slug) {
      const a = findPublishedArticle(l.slug);
      return a ? [{ label: a.title, href: articleHref(a.slug) }] : [];
    }
    return l.href && l.label ? [{ label: l.label, href: l.href }] : [];
  });
}
