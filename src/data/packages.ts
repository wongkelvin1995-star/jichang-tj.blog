import { PaymentPeriodType, Plan, PlanComparisonRow } from '@/types';
import { BRANDS } from '@/data/brands';
import { getBrandTerms } from '@/data/brandTerms';
import { PRICE_SHEETS, type BrandPriceSheet, type CycleCode, type PriceRow } from '@/data/planPrices';
import { CYCLE_LABELS, CYCLE_MONTHS, getPriceFacts, type PriceRef } from '@/data/priceFacts';
import { VERIFICATION } from '@/data/verification';

/**
 * 机场套餐数据仓库：全部由价格表（planPrices.ts）转换，这里不手写任何价格。
 * 遵循 06-ui-and-data-contract 与 08 模板口径：
 * 1. 倍率、设备数、限速、退款都照站长机场 MD 里这一家自己的写法（brandTerms.ts），MD 没写的是 null，页面显示“未标注”；
 *    不再有“全站统一 1 倍率、不限设备、不限速”的口径（站长 2026-11-06：资料都必须跟着 MD）。
 * 2. 严格区分实付总金额（payment_amount）与折算月均单价（calculated_monthly_amount）。
 * 3. 价格由站长在结算页核验（见 verification.ts），status 为 verified，verified_at 为核验日期。
 */

const PERIOD_TYPES: Record<CycleCode, PaymentPeriodType> = {
  m: 'monthly',
  q: 'quarterly',
  h: 'semi_annual',
  y: 'annual',
  b: 'biennial',
  t: 'triennial',
  o: 'onetime_traffic_pack'
};

/** 价格表备注里写了“限 N 台设备”的档位，按该档位的标注显示（比品牌整体的写法更具体）；否则用 MD 里这一家的设备数写法 */
function pickDeviceLimit(notes: string[], brandDevices: string | null): string | null {
  for (const note of notes) {
    const cap = note.match(/(?:最多|限)\s*(\d+)\s*台/);
    if (cap) return `最多 ${cap[1]} 台（资料标注）`;
  }
  return brandDevices;
}

function pickResetRule(notes: string[], isOneTime: boolean): string | null {
  if (isOneTime) return notes[0] ?? null;
  const parts = notes.flatMap((n) => n.split(/[；;，,]/)).map((p) => p.trim());
  return parts.find((p) => /刷新|重置/.test(p)) ?? null;
}

function buildPlan(sheet: BrandPriceSheet, planName: string, rows: PriceRow[], index: number): Plan {
  const planId = `plan-${sheet.brandId}-${index + 1}`;
  const isOneTime = rows[0][1] === 'o';
  const notes = [...new Set(rows.flatMap((row) => (row[5] ? [row[5]] : [])))];
  const terms = getBrandTerms(sheet.brandId);

  return {
    id: planId,
    brand_id: sheet.brandId,
    plan_name: planName,
    advertised_traffic_gb: rows[0][3] ?? rows[0][4],
    traffic_grant_period: isOneTime ? 'onetime' : 'monthly',
    reset_rule: pickResetRule(notes, isOneTime),
    rollover_rule: notes.some((n) => n.includes('不结转')) ? '未用完不结转（资料标注）' : null,
    multiplier_rule: terms.multiplier,
    client_requirements: null,
    device_limit: pickDeviceLimit(notes, terms.devices),
    speed_limit: terms.speed,
    refund_rule: terms.refund,
    verified_at: VERIFICATION.verified_on,
    data_date: sheet.dataDate,
    price_is_historical: sheet.historical === true,
    status: 'verified',
    source_note: notes.join('；') || undefined,
    price_options: rows.map(([, cycle, price, , totalGB, note]) => ({
      id: `${planId}-${cycle}`,
      period_type: PERIOD_TYPES[cycle],
      period_label: CYCLE_LABELS[cycle],
      period_months: cycle === 'o' ? null : CYCLE_MONTHS[cycle],
      payment_amount: price,
      currency: 'CNY',
      calculated_monthly_amount: cycle === 'o' ? null : price / CYCLE_MONTHS[cycle],
      total_traffic_gb: totalGB,
      is_verified: true,
      notes: note
    }))
  };
}

function buildBrandPlans(sheet: BrandPriceSheet): Plan[] {
  const rowsByName = new Map<string, PriceRow[]>();
  sheet.rows.forEach((row) => {
    rowsByName.set(row[0], [...(rowsByName.get(row[0]) ?? []), row]);
  });
  return [...rowsByName].map(([name, rows], index) => buildPlan(sheet, name, rows, index));
}

export const PLANS: Plan[] = PRICE_SHEETS.flatMap(buildBrandPlans);

export function getPlansByBrandId(brandId: string): Plan[] {
  return PLANS.filter(p => p.brand_id === brandId);
}

export function getPlanTrafficLabel(plan: Plan): string {
  return plan.traffic_grant_period === 'onetime'
    ? `一次性 ${plan.advertised_traffic_gb}GB`
    : `每月 ${plan.advertised_traffic_gb}GB`;
}

/**
 * 首页比较表：每家只列入门月付、最低年付和最低价一次性流量包，避免表格过长。
 * 完整价格选项在品牌页列出。
 */
export function getComparisonRows(): PlanComparisonRow[] {
  return BRANDS.flatMap((brand) => {
    const facts = getPriceFacts(brand.id);
    const picks: (PriceRef | null)[] = [facts.entryMonthly, facts.cheapestYearly, facts.packs[0] ?? null];

    return picks.flatMap((ref) => {
      if (!ref) return [];
      const plan = PLANS.find((p) => p.brand_id === brand.id && p.plan_name === ref.name);
      if (!plan) return [];

      return [{
        rowId: `${plan.id}-${ref.cycle}`,
        brandId: brand.id,
        brandName: brand.name,
        planName: plan.plan_name,
        displayRank: brand.display_rank,
        periodLabel: CYCLE_LABELS[ref.cycle],
        periodType: PERIOD_TYPES[ref.cycle],
        actualAmount: ref.price,
        calculatedMonthly: ref.cycle === 'o' ? null : ref.price / CYCLE_MONTHS[ref.cycle],
        trafficLabel: getPlanTrafficLabel(plan),
        perGB: ref.perGB,
        multiplier: plan.multiplier_rule,
        usageNotes: [plan.device_limit, plan.speed_limit].filter((v): v is string => v !== null),
        note: ref.note ?? null,
        dataDate: plan.data_date,
        isHistorical: plan.price_is_historical === true,
        isVerified: plan.status === 'verified'
      }];
    });
  });
}
