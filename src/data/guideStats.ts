import { BRANDS } from '@/data/brands';
import type { CycleCode } from '@/data/planPrices';
import { CYCLE_MONTHS, getDeviceCaps, getPriceFacts, type BrandPriceFacts, type PriceRef } from '@/data/priceFacts';

/**
 * 跨品牌的价格统计（纯计算），指南正文和品牌页的位次都从这里取。
 * 位次用“第 N 低”：N = 1 + 比它严格更低的品牌数，所以并列的品牌位次相同。
 */
export interface BrandRef {
  id: string;
  name: string;
  rank: number;
}

export interface BrandRow extends PriceRef {
  brand: BrandRef;
}

function brandRef(id: string): BrandRef {
  const brand = BRANDS.find((b) => b.id === id)!;
  return { id, name: brand.name, rank: brand.display_rank };
}

const byPriceThenPerGB = (a: PriceRef, b: PriceRef) => a.price - b.price || a.perGB - b.perGB;
const byPerGB = (a: PriceRef, b: PriceRef) => a.perGB - b.perGB;

export const BRAND_COUNT = BRANDS.length;
export const ALL_FACTS: BrandPriceFacts[] = BRANDS.map((b) => getPriceFacts(b.id));

/** 每家的入门月付（实付最低的月付档），按价格从低到高 */
export const ENTRY_MONTHLY: BrandRow[] = ALL_FACTS
  .map((f) => ({ ...f.entryMonthly!, brand: brandRef(f.brandId) }))
  .sort(byPriceThenPerGB);

/** 每家的最低年付，按价格从低到高（没有年付的品牌不在内） */
export const CHEAPEST_YEARLY: BrandRow[] = ALL_FACTS
  .filter((f) => f.cheapestYearly)
  .map((f) => ({ ...f.cheapestYearly!, brand: brandRef(f.brandId) }))
  .sort(byPriceThenPerGB);

/** 每家最便宜的一次性流量包，按价格从低到高（没有流量包的品牌不在内） */
export const CHEAPEST_PACK: BrandRow[] = ALL_FACTS
  .filter((f) => f.packs.length > 0)
  .map((f) => ({ ...f.packs[0], brand: brandRef(f.brandId) }))
  .sort(byPriceThenPerGB);

/** 全部价格选项（含品牌） */
export const ALL_ROWS: BrandRow[] = ALL_FACTS.flatMap((f) => f.rows.map((r) => ({ ...r, brand: brandRef(f.brandId) })));

/** 提供某付款周期的品牌数 */
export const CYCLE_COVERAGE: Record<CycleCode, number> = (['m', 'q', 'h', 'y', 'b', 't', 'o'] as CycleCode[]).reduce(
  (acc, cycle) => ({ ...acc, [cycle]: ALL_FACTS.filter((f) => f.cycles.includes(cycle)).length }),
  {} as Record<CycleCode, number>
);

/** 第 N 低（并列同位） */
export function rankBy(list: BrandRow[], brandId: string, key: (r: PriceRef) => number): number | null {
  const mine = list.find((r) => r.brand.id === brandId);
  if (!mine) return null;
  return 1 + list.filter((r) => key(r) < key(mine) - 1e-9).length;
}

export const sortedByPerGB = (list: BrandRow[]) => [...list].sort(byPerGB);

/** 月付行里实付不超过 limit 的（含入门以外的档位），按价格从低到高 */
export function monthlyRowsUnder(limit: number): BrandRow[] {
  return ALL_ROWS.filter((r) => r.cycle === 'm' && r.price <= limit).sort(byPriceThenPerGB);
}

export function yearlyRowsUnder(limit: number): BrandRow[] {
  return ALL_ROWS.filter((r) => r.cycle === 'y' && r.price <= limit).sort(byPriceThenPerGB);
}

export function packRowsUnder(limit: number): BrandRow[] {
  return ALL_ROWS.filter((r) => r.cycle === 'o' && r.price <= limit).sort(byPriceThenPerGB);
}

/** 备注里写明了刷新 / 重置 / 不结转规则的价格行 */
export const ROWS_WITH_RESET_NOTE: BrandRow[] = ALL_ROWS.filter((r) => r.cycle !== 'o' && /刷新|重置|结转/.test(r.note ?? ''));

/** 上面这些价格行涉及的品牌数 */
export const RESET_NOTE_BRAND_COUNT = new Set(ROWS_WITH_RESET_NOTE.map((r) => r.brand.id)).size;

/** 中位数（偶数个时取中间两个的平均） */
export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export interface DiscountStats {
  cycle: CycleCode;
  /** 参与计算的套餐数（同品牌、同套餐名、同时有月付和该周期） */
  count: number;
  brandCount: number;
  min: number;
  median: number;
  max: number;
}

/**
 * 某付款周期相对“连付月付”的折扣：实付 ÷（月付 × 月数）。
 * 只算同一品牌同一套餐名下同时有月付和该周期的价格，不含月付 500 元以上的独享定制线路；一次性流量包没有可比的月付，不在内。
 */
export function discountStats(cycle: Exclude<CycleCode, 'm' | 'o'>): DiscountStats | null {
  const ratios: number[] = [];
  const brands = new Set<string>();
  ALL_FACTS.forEach((f) => {
    f.mainMonthly.forEach((tier) => {
      const row = f.rows.find((r) => r.name === tier.name && r.cycle === cycle);
      if (row) {
        ratios.push(row.price / (tier.price * CYCLE_MONTHS[cycle]));
        brands.add(f.brandId);
      }
    });
  });
  if (ratios.length === 0) return null;
  return {
    cycle,
    count: ratios.length,
    brandCount: brands.size,
    min: Math.min(...ratios),
    median: median(ratios),
    max: Math.max(...ratios)
  };
}

/** 季付比连付 3 个月月付还贵的套餐数（折扣大于 1 的情况） */
export const QUARTERLY_ABOVE_MONTHLY_COUNT = ALL_FACTS.reduce(
  (sum, f) =>
    sum +
    f.mainMonthly.filter((tier) => {
      const row = f.rows.find((r) => r.name === tier.name && r.cycle === 'q');
      return row ? row.price > tier.price * 3 + 1e-9 : false;
    }).length,
  0
);

/** 一次性流量包每 GB 的全站区间 */
export const PACK_PER_GB_RANGE = (() => {
  const values = ALL_ROWS.filter((r) => r.cycle === 'o').map((r) => r.perGB);
  return { min: Math.min(...values), max: Math.max(...values) };
})();

/** 标了设备数上限的套餐：与站长“不限设备”统一口径不一致的例外 */
export const DEVICE_CAPPED_PLANS = ALL_FACTS.flatMap((f) => getDeviceCaps(f).map((c) => ({ ...c, brand: brandRef(f.brandId) })));

/** 各处写“不限设备”口径时附带的例外说明；价格表里没有这类套餐时为 null */
export const DEVICE_CAP_EXCEPTION: string | null = (() => {
  if (DEVICE_CAPPED_PLANS.length === 0) return null;
  const names = [...new Set(DEVICE_CAPPED_PLANS.map((p) => p.brand.name))].join('、');
  const maxes = DEVICE_CAPPED_PLANS.map((p) => p.max);
  const lo = Math.min(...maxes);
  const hi = Math.max(...maxes);
  return `例外：${names}有 ${DEVICE_CAPPED_PLANS.length} 个套餐在套餐详情里标了设备数上限，${lo === hi ? `${lo} 台` : `${lo} 到 ${hi} 台`}，以品牌页的套餐表为准`;
})();

/** 月付到年付里每 GB 最低的几行（不含两年付、三年付和一次性包） */
export const LOWEST_PER_GB_REGULAR: BrandRow[] = [...ALL_ROWS]
  .filter((r) => ['m', 'q', 'h', 'y'].includes(r.cycle))
  .sort(byPerGB);

/** 月付价达到这个数的档位视为独享或定制线路，不参与性价比比较 */
const DEDICATED_MONTHLY_PRICE = 500;

/** 每月额度不低于 minGB 的月付或年付档，按每 GB 从低到高（不含独享定制线路） */
export function bestPerGBForUsage(minGB: number, cycle: 'm' | 'y', limit = 5, maxGB = Infinity): BrandRow[] {
  return ALL_ROWS
    .filter((r) => r.cycle === cycle && (r.monthlyGB ?? 0) >= minGB && (r.monthlyGB ?? 0) <= maxGB)
    .filter((r) => !(r.cycle === 'm' && r.price >= DEDICATED_MONTHLY_PRICE))
    .sort(byPerGB)
    .slice(0, limit);
}

/** 每月额度不低于 usageGB 的月付或年付档里实付最低的几档（不含独享定制线路），同价取每 GB 更低的 */
export function cheapestCovering(cycle: 'm' | 'y', usageGB: number, limit = 1): BrandRow[] {
  return ALL_ROWS
    .filter((r) => r.cycle === cycle && r.price < DEDICATED_MONTHLY_PRICE * (cycle === 'y' ? 12 : 1) && (r.monthlyGB ?? 0) >= usageGB)
    .sort(byPriceThenPerGB)
    .slice(0, limit);
}

export const cheapestMonthlyCovering = (usageGB: number, limit = 1): BrandRow[] => cheapestCovering('m', usageGB, limit);

/** 线路说明里标注了 IEPL 或 IPLC 的品牌数（都是资料标注，本站没有验证；写着“未注明”“未标注”的不算） */
export const DEDICATED_LINE_LABEL_COUNT = ALL_FACTS.filter((f) => /IEPL|IPLC/.test(f.lineNote) && !/未注明|未标注/.test(f.lineNote)).length;

/** 实付不超过 maxPrice 的月付或年付档，按每 GB 从低到高 */
export function bestPerGBForBudget(maxPrice: number, cycle: 'm' | 'y', limit = 5): BrandRow[] {
  return ALL_ROWS
    .filter((r) => r.cycle === cycle && r.price <= maxPrice)
    .sort(byPerGB)
    .slice(0, limit);
}

export function describeRank(rank: number | null, total: number, what: string): string {
  if (rank === null) return `${what}：无`;
  return `${what}在 ${total} 家中第 ${rank} 低`;
}
