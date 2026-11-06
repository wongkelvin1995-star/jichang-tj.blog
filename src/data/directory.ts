import { BRANDS } from '@/data/brands';
import { COUPONS } from '@/data/coupons';
import { NEEDS_CHECK_IDS } from '@/data/needsCheckIds';

/**
 * 目录和优惠码速查用的精简数据：只带卡片上要显示的字段，不把整份品牌资料塞进客户端组件。
 * 线路标签（IEPL / IPLC / BGP）只是从线路标注文字里读出来的筛选用关键词，是资料标注，本站没有测试。
 */
export type LineTag = 'IEPL' | 'IPLC' | 'BGP';

export interface DirectoryBrand {
  id: string;
  name: string;
  aliases: string[];
  rank: number;
  fixed: boolean;
  featured: boolean;
  /** 资料里的线路标注原文，没有就是 null */
  line: string | null;
  lineTags: LineTag[];
  entryPrice: number | null;
  entryPlan: string | null;
  couponCode: string | null;
  discount: string | null;
  needsCheck: boolean;
  affiliateUrl: string;
}

const lineTagsOf = (line: string | null): LineTag[] => {
  if (!line) return [];
  const tags: LineTag[] = [];
  if (/IEPL/i.test(line)) tags.push('IEPL');
  if (/IPLC/i.test(line)) tags.push('IPLC');
  if (/BGP/i.test(line)) tags.push('BGP');
  return tags;
};

export function buildDirectoryBrands(): DirectoryBrand[] {
  return BRANDS.map((brand) => {
    const coupon = COUPONS.find((c) => c.brand_id === brand.id);
    const line = brand.protocol_architecture || null;
    return {
      id: brand.id,
      name: brand.name,
      aliases: brand.aliases,
      rank: brand.display_rank,
      fixed: brand.fixed_position,
      featured: Boolean(brand.featured),
      line,
      lineTags: lineTagsOf(line),
      entryPrice: brand.starting_price?.amount ?? null,
      entryPlan: brand.starting_price?.note ?? null,
      couponCode: coupon?.coupon_code ?? null,
      discount: typeof coupon?.discount_value === 'string' ? coupon.discount_value : null,
      needsCheck: NEEDS_CHECK_IDS.includes(brand.id),
      affiliateUrl: brand.affiliate_url
    };
  });
}

export interface CouponQuickItem {
  brandId: string;
  brandName: string;
  /** 英文名、简称等别名，只给搜索用 */
  aliases: string[];
  rank: number;
  code: string;
  discount: string | null;
}

/** 优惠码速查：按品牌编辑顺序排列 */
export function buildCouponQuickItems(): CouponQuickItem[] {
  return COUPONS.flatMap((coupon) => {
    const brand = BRANDS.find((b) => b.id === coupon.brand_id);
    if (!brand || !coupon.coupon_code) return [];
    return [{
      brandId: brand.id,
      brandName: brand.name,
      aliases: brand.aliases,
      rank: brand.display_rank,
      code: coupon.coupon_code,
      discount: typeof coupon.discount_value === 'string' ? coupon.discount_value : null
    }];
  }).sort((a, b) => a.rank - b.rank);
}
