import { SiteMeta } from '@/types';

export const SITE_META: SiteMeta = {
  name: "机场推荐",
  url: "https://jichang-tj.blog",
  title: "2026机场推荐｜高性价比套餐对比与新手选购指南",
  description: "2026机场推荐与选购指南，整理多家机场的套餐价格、流量额度、线路说明和设备限制，结合低预算、大流量、多设备及AI与流媒体使用需求，帮助你比较不同方案，并了解购买前需要核对的事项。",
  canonical: "https://jichang-tj.blog",
  prepared_on: "2026-11-03",
  featured_brand_id: "lingdongyun",
  brand_count: 34,
  fixed_editorial_positions: 14,
  ranking_disclosure: "本站目录展示为编辑推荐展示顺序，含商业推广合作，不代表独立测速、销量排名或全网用户投票结果。",
  editorial_author: "机场推荐独立编辑部",
  correction_contact: "feedback@jichang-tj.blog（纠错与资料提报渠道）"
};

/** 页面标题模板：根布局的 title.template 和 buildMetadata（src/lib/metadata.ts）共用，保证 <title> 与 og:title 一字不差 */
export const TITLE_TEMPLATE = `%s ｜ ${SITE_META.name}`;

/** 顶栏社交入口：站长填写完整地址（如 https://t.me/xxx、https://github.com/xxx），留空则图标显示为灰色不可点击 */
export const SOCIAL_LINKS: { telegram: string; github: string } = {
  telegram: "https://t.me/+okYm1IFBKu8xZWI1",
  github: ""
};

/** 顶栏“个人中心”图标的目标：本地版个人中心（收藏、对比、阅读记录，仅保存在当前浏览器） */
export const ACCOUNT_LINK: { href: string; label: string } = {
  href: "/account/",
  label: "个人中心"
};

export const NAV_LINKS = [
  { label: "首页推荐", href: "/" },
  { label: "34家完整目录", href: "/airports/" },
  { label: "套餐价格对比", href: "/#plans" },
  { label: "核验优惠", href: "/deals/" },
  { label: "选购指南", href: "/#guides" },
  { label: "编辑准则", href: "/editorial-policy/" },
  { label: "推广说明", href: "/disclosure/" },
  { label: "关于本站", href: "/about/" }
];
