import { ARTICLES } from '@/data/articles';
import type { ArticleBrief, ArticleCategoryId } from '@/types';

/**
 * 文章分类（2026-11-06 站长要求建立六个分类）。
 * - 分类页地址：测速实验室是 /speed-lab/（有自己的记录和方法说明），其余是 /guides/category/<slug>/。
 * - 每个分类的导读（intro）各写各的，不共用句子；只有已发布文章的分类才生成分类页。
 * - readingOrder 是推荐阅读顺序（文章 slug）；写了顺序但还没发布的文章会被跳过，没写进顺序的文章排在最后。
 * 本文件会被客户端组件引用，只放数据和纯函数。
 */
export interface ArticleCategory {
  id: ArticleCategoryId;
  name: string;
  /** 地址里的片段 */
  slug: string;
  /** 分类页（或入口页）地址，以 / 开头、以 / 结尾 */
  href: string;
  /** 一句话：这一类解决什么问题（卡片用） */
  tagline: string;
  /** 分类页的 <title> 和 H1（不含站名） */
  metaTitle: string;
  /** 分类页的 meta description */
  metaDescription: string;
  /** 分类页导读 */
  intro: string;
  /** 适合谁读 */
  audience: string;
  /** 推荐阅读顺序（文章 slug） */
  readingOrder: string[];
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: 'beginner',
    name: '新手教程',
    slug: 'beginner',
    href: '/guides/category/beginner/',
    tagline: '刚接触机场：它是什么、怎么用、名词怎么读',
    metaTitle: "机场新手教程：它是什么、怎么用、名词怎么读",
    metaDescription: "刚接触机场先读这里：机场是什么、第一次怎么买怎么连、常用名词和三种代理模式，每篇只回答一个问题，不涉及品牌排名。",
    intro:
      '第一次接触机场的读者，卡点常常不在操作，而在概念：订阅、节点、倍率、规则这些词到底指什么，买完以后先做哪一步。这一类教程从“它是什么”讲到“第一次怎么连上”，再讲常用名词和三种代理模式，每篇只回答一个问题，读完就能自己判断下一步。',
    audience: '还没买过，或者刚买完不知道怎么开始的人',
    readingOrder: ['what-is-an-airport', 'first-time-setup', 'airport-glossary', 'global-rule-direct-mode']
  },
  {
    id: 'clients',
    name: '客户端教程',
    slug: 'clients',
    href: '/guides/category/clients/',
    tagline: 'Windows、Mac、Android、iPhone：官方客户端怎么下载、登录和排错',
    metaTitle: "机场客户端教程：Windows、Mac、安卓和苹果手机",
    metaDescription: "按设备平台说明机场官方客户端怎么找、怎么安全下载和登录、哪些设置最容易出错，以及服务商提供订阅链接时怎么处理；不提供安装包。",
    intro:
      '真正把流量送出去的是你设备上的客户端。站长提供的机场资料里，各家的使用方式都是官方客户端、账号登录，所以这里按设备平台分别说明官方客户端怎么找、怎么安全下载、怎么登录、哪些设置最容易出错，服务商提供订阅链接时怎么处理放在最后。界面和功能会随版本变化，本站没有逐个测试，也不提供安装包，一切以服务商官网和各项目的官方说明为准。',
    audience: '已经买了机场，正在找客户端、下载安装或登录的人',
    readingOrder: ['subscription-and-client', 'windows-client-guide', 'macos-client-guide', 'android-client-guide', 'ios-client-guide']
  },
  {
    id: 'troubleshooting',
    name: '网络故障排查',
    slug: 'troubleshooting',
    href: '/guides/category/troubleshooting/',
    tagline: '连不上、很慢、总断线：按固定顺序排查',
    metaTitle: "机场连不上怎么办：网络故障排查教程",
    metaDescription: "节点全部超时、订阅更新失败、能连上却打不开、手机总断线：按固定顺序排查，给出判断依据、操作步骤和该联系服务商的情形。",
    intro:
      '代理出问题时，最浪费时间的做法是同时改好几个设置。这一类文章把常见故障拆成固定的排查顺序：先确认本地网络和系统时间，再看订阅有没有更新、客户端内核是否过旧，最后才怀疑节点和线路。每篇给出判断依据、操作步骤，以及什么情况下该去联系服务商。',
    audience: '遇到连不上、拉不到订阅、网页打不开或手机总断线的人',
    readingOrder: ['all-nodes-timeout', 'subscription-update-failed', 'connected-but-slow-or-blocked', 'mobile-keeps-disconnecting']
  },
  {
    id: 'routes',
    name: '线路知识',
    slug: 'routes',
    href: '/guides/category/routes/',
    tagline: 'IPLC、IEPL、BGP、入口与出口：宣传词怎么读',
    metaTitle: "机场线路知识：IPLC、IEPL、BGP 和入口出口",
    metaDescription: "读懂机场线路宣传：IPLC 与 IEPL 的区别、BGP 与 CN2 GIA、入口与出口、节点地区怎么选，说明每个词能证明什么、不能证明什么。",
    intro:
      '机场的宣传页常用一串线路术语：IPLC、IEPL、BGP、CN2 GIA、中转、落地。它们描述的是网络怎么连接，不是速度保证。这一类文章解释每个词的含义、能说明什么、不能说明什么，并给出读线路标注时要追问的问题。站内品牌页里的线路只是资料标注，本站没有测试过任何线路。',
    audience: '想看懂线路宣传、判断节点地区的人',
    readingOrder: ['iplc-vs-iepl', 'bgp-cn2-9929-explained', 'entry-and-exit-nodes', 'choose-node-region']
  },
  {
    id: 'speed-lab',
    name: '测速实验室',
    slug: 'speed-lab',
    href: '/speed-lab/',
    tagline: '怎么测、怎么记录、怎么读结果；只收有原始依据的记录',
    metaTitle: "机场测速实验室：测试方法与真实记录",
    metaDescription: "记录每次测试的时间、工具和版本、线路地区、测试环境和结果限制；只收有原始依据的记录，没有原始数据的写“待更新”。",
    intro:
      '测速实验室只记录有原始依据的测试：什么时候测、用什么工具和版本、测哪些线路和地区、在什么网络环境里测、结果有什么限制。没有原始数据时，页面写“待更新”，不会用模拟数字代替。',
    audience: '想自己测速，或想看懂别人的测试记录的人',
    readingOrder: ['speed-lab-method', 'reading-speed-tests', 'test-airport-yourself', 'peak-hour-test-design', 'read-unlock-test-results']
  },
  {
    id: 'buying',
    name: '机场选购',
    slug: 'buying',
    href: '/guides/category/buying/',
    tagline: '预算、周期、设备数、优惠码：付款前把账算清楚',
    metaTitle: "机场选购指南：预算、周期、设备数和优惠码",
    metaDescription: "用本站价格表现算的选购文章：怎么选、付款周期与流量规则、每 GB 成本、低预算和低频使用、退款与购买前核对清单，没有排名。",
    intro:
      '选购类文章用本站价格表现算：先定预算和用量，再看设备数、倍率、重置和售后，最后比每 GB 单价。这里没有排名，只有可以自己复核的算法和清单，数字都来自本站价格表和站长提供的机场资料。',
    audience: '准备买、正在比价，或者想换机场的人',
    readingOrder: [
      'how-to-choose',
      'refund-and-purchase-checklist',
      'billing-and-traffic-rules',
      'cost-per-gb',
      'value-for-money',
      'low-budget-plans',
      'occasional-use',
      'ai-users',
      'multi-device-plans',
      'coupon-not-working',
      'how-much-traffic-per-month',
      'switch-airport-checklist'
    ]
  }
];

export function getCategory(id: ArticleCategoryId): ArticleCategory {
  const category = ARTICLE_CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`未知的文章分类：${id}`);
  return category;
}

export function getCategoryBySlug(slug: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug);
}

/** 已发布的文章（有发布日期）。没有正文的草稿不要登记进 ARTICLES。 */
export function publishedArticles(): ArticleBrief[] {
  return ARTICLES.filter((a) => a.published_at !== null);
}

export const articleHref = (slug: string) => `/guides/${slug}/`;

/** 文章最近一次实质更新的日期（没有就取发布日期） */
export const articleUpdatedAt = (a: ArticleBrief) => a.substantive_updated_at ?? a.published_at ?? '';

/** 一个分类里的已发布文章，按推荐阅读顺序排，没写进顺序的排最后（按发布日期） */
export function getArticlesByCategory(id: ArticleCategoryId): ArticleBrief[] {
  const order = getCategory(id).readingOrder;
  const rank = (slug: string) => {
    const i = order.indexOf(slug);
    return i < 0 ? order.length : i;
  };
  return publishedArticles()
    .filter((a) => a.category === id)
    .sort((a, b) => rank(a.slug) - rank(b.slug) || (a.published_at ?? '').localeCompare(b.published_at ?? ''));
}

/** 有已发布文章的分类才生成分类页 */
export function categoriesWithArticles(): ArticleCategory[] {
  return ARTICLE_CATEGORIES.filter((c) => getArticlesByCategory(c.id).length > 0);
}

/** 最近更新的文章：按实质更新日从新到旧，同一天按分类内的推荐顺序 */
export function latestUpdatedArticles(limit: number): ArticleBrief[] {
  const order = (a: ArticleBrief) => {
    const list = getCategory(a.category).readingOrder;
    const i = list.indexOf(a.slug);
    return i < 0 ? list.length : i;
  };
  return publishedArticles()
    .slice()
    .sort((a, b) => articleUpdatedAt(b).localeCompare(articleUpdatedAt(a)) || order(a) - order(b))
    .slice(0, limit);
}
