import type { CycleCode } from '@/data/planPrices';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { CYCLE_LABELS, CYCLE_MONTHS, getDeviceCaps, getPriceFacts, type BrandPriceFacts } from '@/data/priceFacts';
import {
  BRAND_COUNT,
  CHEAPEST_PACK,
  CHEAPEST_YEARLY,
  ENTRY_MONTHLY,
  LONG_CYCLE_BRAND_COUNT,
  rankBy
} from '@/data/guideStats';

/**
 * 每家品牌页的独有分析：全站位次、折扣阶梯、适合谁、不适合谁、限制。
 * 全部由价格表现算，数字不手写；“不是价格最低”这类不利事实同样写出。
 */
export interface DiscountStep {
  cycle: CycleCode;
  label: string;
  /** 实付 ÷（月付 × 月数），统一折扣时为单值，否则为区间 */
  min: number;
  max: number;
}

export interface BrandAnalysis {
  ranks: string[];
  ladder: DiscountStep[];
  ladderText: string | null;
  fitFor: string[];
  notFitFor: string[];
  limits: string[];
}

const zhe = (ratio: number) => {
  const pct = Math.round(ratio * 100);
  return pct % 10 === 0 ? `${pct / 10} 折` : `${pct} 折`;
};

function buildLadder(facts: BrandPriceFacts): DiscountStep[] {
  const tiers = facts.mainMonthly;
  if (tiers.length === 0) return [];
  const steps: DiscountStep[] = [];
  for (const cycle of ['q', 'h', 'y', 'b', 't'] as CycleCode[]) {
    const ratios = tiers.flatMap((tier) => {
      const row = facts.rows.find((r) => r.name === tier.name && r.cycle === cycle);
      return row ? [row.price / (tier.price * CYCLE_MONTHS[cycle])] : [];
    });
    if (ratios.length === 0) continue;
    steps.push({ cycle, label: CYCLE_LABELS[cycle], min: Math.min(...ratios), max: Math.max(...ratios) });
  }
  return steps;
}

export function buildBrandAnalysis(brandId: string): BrandAnalysis {
  const facts = getPriceFacts(brandId);
  const { entryMonthly, cheapestYearly, packs, mainMonthly, dedicated, cycles } = facts;
  const total = BRAND_COUNT;

  const ranks: string[] = [];
  const entryPriceRank = rankBy(ENTRY_MONTHLY, brandId, (r) => r.price);
  const entryPerGBRank = rankBy(ENTRY_MONTHLY, brandId, (r) => r.perGB);
  if (entryMonthly && entryPriceRank && entryPerGBRank) {
    ranks.push(`入门月付 ${fmtYuan(entryMonthly.price)}（${entryMonthly.name}，每月 ${entryMonthly.totalGB}GB）：价格在 ${total} 家中第 ${entryPriceRank} 低，每 GB ${fmtPerGB(entryMonthly.perGB)} 第 ${entryPerGBRank} 低。`);
  }
  const yearlyPriceRank = rankBy(CHEAPEST_YEARLY, brandId, (r) => r.price);
  const yearlyPerGBRank = rankBy(CHEAPEST_YEARLY, brandId, (r) => r.perGB);
  if (cheapestYearly && yearlyPriceRank && yearlyPerGBRank) {
    ranks.push(`最低年付 ${fmtYuan(cheapestYearly.price)}（${cheapestYearly.name}，每月 ${cheapestYearly.monthlyGB}GB）：在有年付的 ${CHEAPEST_YEARLY.length} 家中价格第 ${yearlyPriceRank} 低，每 GB ${fmtPerGB(cheapestYearly.perGB)} 第 ${yearlyPerGBRank} 低。`);
  } else {
    ranks.push(`价格表没有年付档（${total} 家中有年付的是 ${CHEAPEST_YEARLY.length} 家）。`);
  }
  const packPerGBRank = rankBy(CHEAPEST_PACK, brandId, (r) => r.perGB);
  if (packs.length > 0 && packPerGBRank) {
    ranks.push(`最便宜的一次性流量包 ${packs[0].name} ${fmtYuan(packs[0].price)}/${packs[0].totalGB}GB：每 GB ${fmtPerGB(packs[0].perGB)}，在有流量包的 ${CHEAPEST_PACK.length} 家中第 ${packPerGBRank} 低。`);
  } else {
    ranks.push(`价格表没有一次性流量包（${total} 家中有流量包的是 ${CHEAPEST_PACK.length} 家）。`);
  }

  const ladder = buildLadder(facts);
  const ladderText = ladder.length === 0
    ? null
    : ladder.map((s) => `${s.label} ${s.max - s.min <= 0.01 ? zhe(s.min) : `${zhe(s.min)}–${zhe(s.max)}`}`).join('、');

  const fitFor: string[] = [];
  if (mainMonthly.length >= 2) {
    const [t0, t1] = mainMonthly;
    fitFor.push(`每月 ${t0.totalGB}–${t1.totalGB}GB 的日常用户：${t0.name}（${fmtYuan(t0.price)}/月）或 ${t1.name}（${fmtYuan(t1.price)}/月）。`);
  } else if (mainMonthly.length === 1) {
    fitFor.push(`每月 ${mainMonthly[0].totalGB}GB 左右的用户：${mainMonthly[0].name} ${fmtYuan(mainMonthly[0].price)}/月。`);
  }
  if (mainMonthly.length >= 3) {
    const top = mainMonthly[mainMonthly.length - 1];
    fitFor.push(`每月需要 ${top.totalGB}GB 的重度用户：${top.name} ${fmtYuan(top.price)}/月，约 ${fmtPerGB(top.perGB)}/GB。`);
  }
  if (cheapestYearly) {
    fitFor.push(`偶尔才用的轻度用户：${cheapestYearly.name} 年付 ${fmtYuan(cheapestYearly.price)}，每月 ${cheapestYearly.monthlyGB}GB，折合 ${fmtYuan(Math.round((cheapestYearly.price / 12) * 100) / 100)}/月。`);
  }
  const yearlyStep = ladder.find((s) => s.cycle === 'y');
  if (yearlyStep && yearlyStep.max <= 0.86) {
    fitFor.push(`确定长期使用的人：年付${yearlyStep.max - yearlyStep.min <= 0.01 ? `约 ${zhe(yearlyStep.min)}` : ` ${zhe(yearlyStep.min)}–${zhe(yearlyStep.max)}`}，比连付 12 个月月付省 ${Math.round((1 - yearlyStep.max) * 100)}% 以上。`);
  }
  if (cycles.includes('b') || cycles.includes('t')) {
    const longest = cycles.includes('t') ? 't' : 'b';
    const rows = facts.rows.filter((r) => r.cycle === longest);
    fitFor.push(`愿意预付换单价的人：${CYCLE_LABELS[longest]}最低 ${fmtYuan(Math.min(...rows.map((r) => r.price)))}；${total} 家里提供两年付或三年付的有 ${LONG_CYCLE_BRAND_COUNT} 家。`);
  }
  if (packs.length > 0) {
    fitFor.push(`需要备用流量、不想按月续费的人：${packs[0].name} ${fmtYuan(packs[0].price)}/${packs[0].totalGB}GB，用完为止。`);
  }

  const notFitFor: string[] = [];
  if (entryMonthly && entryPriceRank && entryPriceRank > Math.ceil(total / 2)) {
    notFitFor.push(`只想月付最少钱的人：入门月付 ${fmtYuan(entryMonthly.price)} 在 ${total} 家中第 ${entryPriceRank} 低，排在后半段。`);
  }
  if (entryMonthly && entryPerGBRank && entryPerGBRank > Math.ceil(total / 2)) {
    notFitFor.push(`首要看入门每 GB 单价的人：${fmtPerGB(entryMonthly.perGB)}/GB 在 ${total} 家中第 ${entryPerGBRank} 低。`);
  }
  if (!cheapestYearly) {
    notFitFor.push('想靠年付压低单价的人：价格表里没有年付档。');
  } else if (yearlyPriceRank && yearlyPriceRank > Math.ceil(CHEAPEST_YEARLY.length / 2)) {
    notFitFor.push(`只想花最少的钱买年付小包的人：最低年付 ${fmtYuan(cheapestYearly.price)} 在 ${CHEAPEST_YEARLY.length} 家中第 ${yearlyPriceRank} 低。`);
  }
  if (packs.length === 0) {
    notFitFor.push('想买一次性流量包当备用的人：价格表里没有流量包。');
  }
  // 实测、价格核验、资料引用的口径统一放在品牌页的“资料与披露”块里，这里不再每页重复一遍

  const limits: string[] = [];
  if (packs.length > 0 && entryMonthly) {
    const lo = Math.min(...packs.map((p) => p.perGB));
    const hi = Math.max(...packs.map((p) => p.perGB));
    limits.push(`一次性流量包每 GB ${fmtPerGB(lo)}${hi > lo ? `–${fmtPerGB(hi)}` : ''}，是入门月付（${fmtPerGB(entryMonthly.perGB)}/GB）的 ${(lo / entryMonthly.perGB).toFixed(1)} 倍以上，只适合当备用。`);
  }
  dedicated.forEach((d) => {
    limits.push(`${d.name} ${fmtYuan(d.price)}/月只含 ${d.totalGB}GB（${fmtPerGB(d.perGB)}/GB）${d.note ? `，${d.note}` : ''}，只适合确有独享线路需求的人。`);
  });
  const longCycles = (['b', 't'] as CycleCode[]).filter((c) => cycles.includes(c));
  if (longCycles.length > 0) {
    const parts = longCycles.map((c) => {
      const prices = facts.rows.filter((r) => r.cycle === c).map((r) => r.price);
      return `${CYCLE_LABELS[c]} ${fmtYuan(Math.min(...prices))}–${fmtYuan(Math.max(...prices))}`;
    });
    limits.push(`${parts.join('、')} 要一次付清，预付越久，承担的套餐变动风险越大，建议先用月付或季付确认体验。`);
  }
  const deviceCaps = getDeviceCaps(facts);
  if (deviceCaps.length > 0) {
    limits.push(`${deviceCaps.map((c) => `${c.name}最多 ${c.max} 台`).join('、')}：资料标了设备数上限，下单前向服务商确认。`);
  }
  // 倍率、设备数、限速、退款的原话在上面的“品牌资料”里逐项列出，不在这里重复

  return { ranks, ladder, ladderText, fitFor, notFitFor, limits };
}
