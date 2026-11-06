import { PRICE_SHEETS, type BrandPriceSheet, type CycleCode, type PriceRow } from '@/data/planPrices';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { getBrandTerms } from '@/data/brandTerms';

/**
 * 由价格表算出来的品牌事实（纯计算），页面上的入门月付、最低年付等数字都从这里取。
 * - 价格选项：价格表里的一行，即“某个套餐 × 某个付款周期”。
 * - 套餐方案：同一品牌下不同名称的套餐，不论它有几种付款周期。
 */
export const CYCLE_LABELS: Record<CycleCode, string> = {
  m: '月付',
  q: '季付',
  h: '半年付',
  y: '年付',
  b: '两年付',
  t: '三年付',
  o: '一次性流量包'
};

export const CYCLE_MONTHS: Record<CycleCode, number> = { m: 1, q: 3, h: 6, y: 12, b: 24, t: 36, o: 0 };

const CYCLE_ORDER: CycleCode[] = ['m', 'q', 'h', 'y', 'b', 't', 'o'];

/** 月付价达到这个数的档位视为独享或定制线路，不算主力档位。 */
const DEDICATED_MONTHLY_PRICE = 500;

export interface PriceRef {
  name: string;
  cycle: CycleCode;
  price: number;
  monthlyGB: number | null;
  totalGB: number;
  perGB: number;
  note?: string;
}

export interface BrandPriceFacts {
  brandId: string;
  dataDate: string;
  lineNote: string;
  historical: boolean;
  rows: PriceRef[];
  schemeCount: number;
  optionCount: number;
  cycles: CycleCode[];
  /** 入门月付：实付金额最低的月付套餐（同价取每 GB 更低的） */
  entryMonthly: PriceRef | null;
  /** 实付金额最低的年付套餐 */
  cheapestYearly: PriceRef | null;
  /** 月付到年付里每 GB 最低的一行（不含两年付、三年付和一次性流量包） */
  bestPerGB: PriceRef | null;
  /** 主力月付档，按价格从低到高，不含独享或定制线路 */
  mainMonthly: PriceRef[];
  dedicated: PriceRef[];
  /** 一次性流量包，按价格从低到高 */
  packs: PriceRef[];
}

function toRef([name, cycle, price, monthlyGB, totalGB, note]: PriceRow): PriceRef {
  return { name, cycle, price, monthlyGB, totalGB, perGB: price / totalGB, note };
}

function byPriceThenPerGB(a: PriceRef, b: PriceRef): number {
  return a.price - b.price || a.perGB - b.perGB;
}

function summarize(sheet: BrandPriceSheet): BrandPriceFacts {
  const rows = sheet.rows.map(toRef);
  const monthly = rows.filter((r) => r.cycle === 'm').sort(byPriceThenPerGB);
  const yearly = rows.filter((r) => r.cycle === 'y').sort(byPriceThenPerGB);
  const regular = rows.filter((r) => ['m', 'q', 'h', 'y'].includes(r.cycle));

  return {
    brandId: sheet.brandId,
    dataDate: sheet.dataDate,
    lineNote: sheet.lineNote,
    historical: sheet.historical === true,
    rows,
    schemeCount: new Set(rows.map((r) => r.name)).size,
    optionCount: rows.length,
    cycles: CYCLE_ORDER.filter((c) => rows.some((r) => r.cycle === c)),
    entryMonthly: monthly[0] ?? null,
    cheapestYearly: yearly[0] ?? null,
    bestPerGB: [...regular].sort((a, b) => a.perGB - b.perGB)[0] ?? null,
    mainMonthly: monthly.filter((r) => r.price < DEDICATED_MONTHLY_PRICE),
    dedicated: monthly.filter((r) => r.price >= DEDICATED_MONTHLY_PRICE),
    packs: rows.filter((r) => r.cycle === 'o').sort(byPriceThenPerGB)
  };
}

const FACTS_BY_BRAND = new Map(PRICE_SHEETS.map((sheet) => [sheet.brandId, summarize(sheet)]));

export function getPriceFacts(brandId: string): BrandPriceFacts {
  const facts = FACTS_BY_BRAND.get(brandId);
  if (!facts) {
    throw new Error(`价格表缺少品牌：${brandId}`);
  }
  return facts;
}

export interface DeviceCap {
  name: string;
  max: number;
}

/**
 * 价格表备注里写明了设备数上限的套餐（按套餐名去重），MD 里写成“限 N 台设备”。
 * 页面要把这些套餐单独标出来，并提示以结算页为准。
 */
export function getDeviceCaps(facts: BrandPriceFacts): DeviceCap[] {
  const caps = new Map<string, DeviceCap>();
  facts.rows.forEach((r) => {
    const match = r.note?.match(/(?:最多|限)\s*(\d+)\s*台/);
    if (match && !caps.has(r.name)) {
      caps.set(r.name, { name: r.name, max: Number(match[1]) });
    }
  });
  return [...caps.values()];
}

/** 目录卡片上的一句话价格摘要。 */
export function buildSelectionTip(facts: BrandPriceFacts): string {
  const { entryMonthly, cheapestYearly, packs } = facts;
  const parts: string[] = [];

  if (entryMonthly) {
    parts.push(`入门月付：${entryMonthly.name} ${fmtYuan(entryMonthly.price)}/${entryMonthly.totalGB}GB`);
  }
  parts.push(
    cheapestYearly
      ? `最低年付：${cheapestYearly.name} ${fmtYuan(cheapestYearly.price)}（每月 ${cheapestYearly.monthlyGB}GB）`
      : '价格表没有年付档'
  );
  if (packs.length > 0) {
    parts.push(`一次性流量包 ${fmtYuan(packs[0].price)}/${packs[0].totalGB}GB 起`);
  }

  return `${parts.join('；')}。`;
}

/** 品牌页“价格摘要”的逐条事实。 */
export function buildPriceFactLines(facts: BrandPriceFacts): string[] {
  const { entryMonthly, cheapestYearly, bestPerGB, packs, dedicated } = facts;
  const lines = [
    `价格表共 ${facts.schemeCount} 个套餐方案、${facts.optionCount} 个价格选项；付款周期：${facts.cycles.map((c) => CYCLE_LABELS[c]).join('、')}。`
  ];

  if (entryMonthly) {
    lines.push(`入门月付：${entryMonthly.name} ${fmtYuan(entryMonthly.price)}/月，每月 ${entryMonthly.totalGB}GB，约 ${fmtPerGB(entryMonthly.perGB)}/GB。`);
  }

  lines.push(
    cheapestYearly
      ? `最低年付：${cheapestYearly.name} ${fmtYuan(cheapestYearly.price)}/年，每月 ${cheapestYearly.monthlyGB}GB，折合 ${fmtYuan(cheapestYearly.price / 12)}/月、约 ${fmtPerGB(cheapestYearly.perGB)}/GB。`
      : '价格表没有年付档，长期使用无法靠年付压低单价。'
  );

  if (bestPerGB) {
    lines.push(`月付到年付里每 GB 最低：${bestPerGB.name} ${CYCLE_LABELS[bestPerGB.cycle]} ${fmtYuan(bestPerGB.price)}，约 ${fmtPerGB(bestPerGB.perGB)}/GB。`);
  }

  if (packs.length > 0) {
    const perGBs = packs.map((p) => p.perGB);
    const lo = Math.min(...perGBs);
    const hi = Math.max(...perGBs);
    lines.push(`一次性流量包 ${packs.length} 档：最低 ${packs[0].name} ${fmtYuan(packs[0].price)}/${packs[0].totalGB}GB，每 GB 约 ${fmtPerGB(lo)}${hi > lo ? `–${fmtPerGB(hi)}` : ''}。`);
  } else {
    lines.push('价格表没有一次性流量包。');
  }

  dedicated.forEach((d) => {
    lines.push(`独享或定制线路：${d.name} ${fmtYuan(d.price)}/月含 ${d.totalGB}GB（约 ${fmtPerGB(d.perGB)}/GB）${d.note ? `，${d.note}` : ''}。`);
  });

  return lines;
}

/**
 * 品牌页“购买前核对清单”：只列这一家自己的事项（价格资料日、有没有长周期、设备数上限、退款原话）。
 * 通用的付款前步骤放在《购买前核对清单》一篇里，品牌页用链接指过去；倍率、设备数、限速的原话在“品牌资料”里，不在这里重复。
 */
export function buildPurchaseChecklist(facts: BrandPriceFacts): string[] {
  const { rows } = facts;
  const items: string[] = [];

  const longCycleParts = (['b', 't'] as CycleCode[]).flatMap((cycle) => {
    const prices = rows.filter((r) => r.cycle === cycle).map((r) => r.price);
    return prices.length > 0
      ? [`${CYCLE_LABELS[cycle]} ${fmtYuan(Math.min(...prices))}–${fmtYuan(Math.max(...prices))}`]
      : [];
  });
  if (longCycleParts.length > 0) {
    items.push(`${longCycleParts.join('、')} 都要一次付清，第一次建议先用月付确认体验。`);
  }

  const deviceCaps = getDeviceCaps(facts);
  if (deviceCaps.length > 0) {
    items.push(`${deviceCaps.map((c) => `${c.name}最多 ${c.max} 台`).join('、')}：资料标了设备数上限，家里设备多的话先数一数。`);
  }

  const refund = getBrandTerms(facts.brandId).refund;
  items.push(refund ? `退款：资料写“${refund}”，具体条件和手续费以服务条款为准。` : '退款：资料没写，先按不可退款准备。');
  return items;
}
