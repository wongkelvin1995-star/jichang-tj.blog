import { Coupon } from '@/types';
import { BRANDS } from '@/data/brands';
import { COUPON_MD } from '@/data/couponData';
import { VERIFICATION } from '@/data/verification';

/**
 * 机场优惠码数据
 * 规范守则：
 * 1. 严格禁止把推广链接里的邀请参数（如 ?code=HHoxxHGa）当作优惠码！
 * 2. 真正优惠码必须独立记录：适用品牌、适用方案、折扣方式、开始与截止时间、时区。
 * 3. 缺乏一手核实记录时标 unconfirmed，绝不虚构折扣幅度或“限时倒计时”。
 *
 * 2026-11-06：优惠码、折扣幅度、适用与不适用的套餐、使用限制全部取自站长的机场 MD（couponData.ts，由 scripts/import_md.mjs 生成），
 * 每家写法不同，不再统一写“8 折”；MD 没写折扣的就写“折扣幅度 MD 未写”，不替它补。站长同日确认已在各家结算页核验（见 verification.ts）。
 */
export const COUPONS_PROVIDED_ON = VERIFICATION.verified_on;

const BY_BRAND = new Map(COUPON_MD.map((c) => [c.brand_id, c]));

// 顺序跟随 BRANDS（编辑展示顺序）
export const COUPONS: Coupon[] = BRANDS.flatMap((brand) => {
  const md = BY_BRAND.get(brand.id);
  if (!md) return [];
  const discount = md.discount;
  return [{
    id: `cp-${brand.id}`,
    brand_id: brand.id,
    coupon_code: md.code,
    eligible_plan_ids: [],
    eligible_payment_periods: [],
    new_customer_only: null,
    renewal_eligible: null,
    discount_type: discount && /折/.test(discount) ? 'percentage' : 'unknown',
    discount_value: discount,
    condition_notes: md.condition_notes,
    minimum_order_amount: null,
    start_at: null,
    end_at: null,
    timezone: 'Asia/Shanghai',
    stacking_rule: null,
    status: 'verified',
    verification_note: `${VERIFICATION.label}：优惠码 ${md.code}${discount ? `，折扣 ${discount}` : '，资料没写折扣幅度'}；以结算页实际抵扣为准。`,
    source_url: null,
    verified_at: VERIFICATION.verified_on
  }];
});

export function getCouponsByBrandId(brandId: string): Coupon[] {
  return COUPONS.filter(c => c.brand_id === brandId);
}

/** 各家折扣写法归类，用在页面概述里，例如“8 折 16 家、9 折 5 家，另有 10 家没写折扣幅度”。 */
export function discountSummary(): string {
  const counts = new Map<string, number>();
  let unknown = 0;
  COUPONS.forEach((c) => {
    const m = typeof c.discount_value === 'string' ? c.discount_value.match(/(\d+(?:\.\d+)?)\s*折/) : null;
    if (m) counts.set(`${m[1]} 折`, (counts.get(`${m[1]} 折`) ?? 0) + 1);
    else unknown += 1;
  });
  const parts = [...counts].sort((a, b) => b[1] - a[1]).map(([label, n]) => `${label} ${n} 家`);
  return `${parts.join('、')}${unknown > 0 ? `，另有 ${unknown} 家没写折扣幅度` : ''}`;
}
