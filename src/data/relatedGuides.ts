import { findPublishedArticle } from '@/data/articleLinks';
import { getBrandMd, type MdPair } from '@/data/brandMd';
import { getBrandTerms } from '@/data/brandTerms';
import { getBrandTests } from '@/data/brandTests';
import { getBrandById } from '@/data/brands';
import { articleHref } from '@/data/categories';
import { getCouponsByBrandId } from '@/data/coupons';
import { getDeviceCaps, getPriceFacts } from '@/data/priceFacts';

/**
 * 品牌页的“相关教程”：按这家品牌自己的资料挑 2–3 篇，每篇带一句和这家品牌有关的短理由，不为凑数硬插。
 * 规则按优先级（越靠前越是“这家品牌特有的事”，越靠后越通用），挑出前 3 篇：
 * iOS 写法 → 设备数上限或共用流量 → 优惠码有限制 → 写了试用 → 写了退款 → 支持路由器 → 线路标 BGP → 有检测记录 →
 * 地区比常见五个多 → 线路标 IPLC/IEPL → 资料待核对 → 没有测速记录 → 通用入门。
 * 理由句都写得很短，不带品牌名，也不会在 34 页里拼成大段雷同的文字。文章没发布就跳过，新文章上线前后都不会出现死链接。
 */
export interface RelatedGuide {
  slug: string;
  title: string;
  href: string;
  reason: string;
}

const EXTRA_REGIONS = ['韩国', '英国', '德国', '法国', '马来西亚', '泰国', '土耳其', '印度', '菲律宾', '越南', '阿根廷', '巴西'];

const hasRow = (rows: MdPair[], label: string) => rows.some(([l, v]) => l === label && v.trim() !== '');

export function getRelatedGuidesForBrand(brandId: string, max = 3): RelatedGuide[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  const md = getBrandMd(brandId);
  const facts = getPriceFacts(brandId);
  const terms = getBrandTerms(brandId);
  const out: RelatedGuide[] = [];
  const push = (slug: string, reason: string) => {
    const article = findPublishedArticle(slug);
    if (!article || out.length >= max || out.some((g) => g.slug === slug)) return;
    out.push({ slug, title: article.title, href: articleHref(slug), reason });
  };

  const systems = md.devices_clients.find(([label]) => label === '支持系统')?.[1] ?? '';
  const line = brand.protocol_architecture;
  const coupon = getCouponsByBrandId(brandId)[0];
  const caps = getDeviceCaps(facts);

  if (/Nextin/i.test(systems)) push('ios-client-guide', 'iOS 一栏写的是“通过 Nextin”。');

  if (caps.length > 0 || (terms.devices && /共享|共用/.test(terms.devices))) {
    push('multi-device-plans', `设备数资料：${terms.devices ?? '以套餐标注为准'}。`);
  }

  if (coupon && (coupon.condition_notes ?? []).some((n) => /新用户|新客|不适用|限制/.test(n))) {
    push('coupon-not-working', '优惠码写了适用范围或限制。');
  }

  if (hasRow(md.service, '试用')) push('test-airport-yourself', '资料写了试用说明。');
  if (hasRow(md.service, '退款')) push('refund-and-purchase-checklist', '资料写了退款说明。');
  if (/路由器|软路由/.test(systems)) push('multi-device-plans', '资料写了支持路由器。');
  if (line && /BGP/i.test(line)) push('bgp-cn2-9929-explained', '线路标注里有 BGP。');
  if (getBrandTests(brandId).length > 0) push('read-unlock-test-results', '站长提供了一份检测记录。');

  const regions = md.nodes.regions ?? '';
  if (EXTRA_REGIONS.filter((r) => regions.includes(r)).length >= 3) push('choose-node-region', '资料列了更多节点地区。');

  if (line && /IPLC|IEPL/i.test(line)) push('iplc-vs-iepl', `线路写的是“${line}”。`);
  if (md.needs_check) push('refund-and-purchase-checklist', '资料标了“待核对”。');
  if (getBrandTests(brandId).length === 0) push('test-airport-yourself', '本站没有这家的测速记录。');

  // 通用入门：只放链接，不写每页相同的理由句
  push('how-much-traffic-per-month', '');
  push('first-time-setup', '');
  push('how-to-choose', '');
  return out;
}
