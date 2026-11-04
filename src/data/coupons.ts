import { Coupon } from '@/types';
import { BRANDS } from '@/data/brands';
import { VERIFICATION } from '@/data/verification';

/**
 * 机场优惠码数据
 * 规范守则：
 * 1. 严格禁止把推广链接里的邀请参数（如 ?code=HHoxxHGa）当作优惠码！
 * 2. 真正优惠码必须独立记录：适用品牌、适用方案、折扣方式、开始与截止时间、时区。
 * 3. 缺乏一手核实记录时标 unconfirmed，绝不虚构折扣幅度或“限时倒计时”。
 *
 * 2026-11-03：站长提供 34 家的优惠码清单，确认折扣统一为 8 折，并确认已在各家结算页核验（见 verification.ts），按 verified 收录；
 * 适用套餐、首购或续费条件和有效期未提供，页面写“以结算页为准”。
 * 无忧在清单里写的是“79元mini”（指 MINI 链接 ¥79/年 套餐），站长同日在对话里补充了代码 woyou666。
 */
const OWNER_CODES: Record<string, string> = {
  lingdongyun: 'ld888',
  twilight: 'mm88',
  breezenet: 'weifeng90',
  flycat: 'flycat888',
  dalaoyun: 'dly88',
  invisible: 'yxr888',
  flyv: 'fly20',
  wavenet: 'lw888',
  worryfree: 'woyou666',
  firefly: 'firefly',
  globalcloud: 'qq88',
  v2yun: 'rabbit',
  civet: 'lingmao',
  flashleap: 'shanyue',
  laddercloud: 'tzy888',
  stardream: 'nmw888',
  lightspeed: 'AMM',
  u1s1: 'U1S1',
  jilianyun: 'JLY888',
  guangnianti: 'GN888',
  sogoyun: 'SOGO10000',
  yuzhou: 'YUZHOU553',
  '2mao': 'ermao888',
  '1fly': '1FLYYUN',
  edgenova: 'VA888',
  kosing: 'kxy80',
  sujie: 'sujie888',
  kuaili: 'kuaili996',
  kuajie: 'kuajie',
  liulianyun: 'll88',
  shandianyun: 'sd88',
  huanqiuyun: 'HQ66',
  shenxingyun: 'sx0077',
  yunjieyun: 'yjx888',
};

export const COUPONS_PROVIDED_ON = '2026-11-03';
export const COUPON_DISCOUNT_LABEL = '8 折';

// 顺序跟随 BRANDS（编辑展示顺序）
export const COUPONS: Coupon[] = BRANDS.flatMap((brand) => {
  const code = OWNER_CODES[brand.id];
  if (!code) return [];
  return [{
    id: `cp-${brand.id}`,
    brand_id: brand.id,
    coupon_code: code,
    eligible_plan_ids: [],
    eligible_payment_periods: [],
    new_customer_only: null,
    renewal_eligible: null,
    discount_type: 'percentage',
    discount_value: COUPON_DISCOUNT_LABEL,
    minimum_order_amount: null,
    start_at: null,
    end_at: null,
    timezone: 'Asia/Shanghai',
    stacking_rule: null,
    status: 'verified',
    verification_note: `${VERIFICATION.label}：优惠码可用，折扣 ${COUPON_DISCOUNT_LABEL}；适用套餐、首购或续费条件与有效期以结算页为准。`,
    source_url: null,
    verified_at: VERIFICATION.verified_on
  }];
});

export function getCouponsByBrandId(brandId: string): Coupon[] {
  return COUPONS.filter(c => c.brand_id === brandId);
}
