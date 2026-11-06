import { BRANDS } from '@/data/brands';
import { fmtYuan } from '@/data/format';
import { CYCLE_LABELS, getPriceFacts, type BrandPriceFacts } from '@/data/priceFacts';

/**
 * 首屏 5 家重点推荐
 * 1. 卡片顺序由 position 决定（站长 2026-11-04 指定 FLY V 放第 3 张）；卡片上的“第 N 位”徽章仍读 brands.ts 的 display_rank，两者是两回事。
 * 2. headline 和 proof 是手写的一句优势和依据，里面的比较来自价格表 planPrices.ts（站长已在结算页核验）；改价格后要重新核对，
 *    scripts/audit_site.mjs 会校验这些比较。“五家中”只比较这 5 家，“34 家”比较全站价格表。
 * 3. 每张卡片下方固定三项（站长 2026-11-06 要求 5 家都一样）：专线、价格推荐、套餐优势，由下面的函数按价格表数出来，不手写数字。
 *    专线写价格表里的线路备注（品牌层面的标注，本站未测试），不自己改写成“IEPL 专线”：备注写“未注明 IEPL/IPLC”的就照写。
 *    不写“唯一”“最全”这类排他说法。
 */
export type FeaturedFactLabel = '专线' | '价格推荐' | '套餐优势';
export interface FeaturedFact {
  label: FeaturedFactLabel;
  text: string;
}

interface FeaturedPickCopy {
  brand_id: string;
  position: number;
  display_label: string;
  headline: string;
  proof: string;
}

const CYCLE_ORDER = ['m', 'q', 'h', 'y', 'b', 't'];

/** 付款周期：连续的写“月付到三年付都有”，不连续的逐个列出，不暗示没有的周期；只有月付返回 null。 */
function cycleText(f: BrandPriceFacts): string | null {
  const cycles = f.cycles.filter((c) => c !== 'o');
  if (cycles.length <= 1) return null;
  const contiguous = cycles.every((c, i) => c === CYCLE_ORDER[i]);
  return contiguous
    ? `${CYCLE_LABELS[cycles[0]]}到${CYCLE_LABELS[cycles[cycles.length - 1]]}都有`
    : `${cycles.map((c) => CYCLE_LABELS[c]).join('、')}可选`;
}

/** 价格表的线路备注就是品牌层面的标注；备注本身以“专线”开头时加“标注为”，避免读成“专线：专线”。 */
function lineText(f: BrandPriceFacts): string {
  return f.lineNote.startsWith('专线') ? `标注为${f.lineNote}` : f.lineNote;
}

/** 价格推荐：入门月付，再加最低年付；没有年付档的品牌改写最大的主力月付档。 */
function priceText(f: BrandPriceFacts): string {
  const entry = f.entryMonthly!;
  const parts = [`入门月付 ${fmtYuan(entry.price)}/月 · ${entry.name} ${entry.totalGB}GB`];
  if (f.cheapestYearly) {
    parts.push(`最低年付 ${fmtYuan(f.cheapestYearly.price)}/年 · ${f.cheapestYearly.name}`);
  } else {
    const top = f.mainMonthly[f.mainMonthly.length - 1];
    parts.push(`大流量月付 ${fmtYuan(top.price)}/月 · ${top.name} ${top.totalGB}GB`);
  }
  return parts.join('；');
}

/** 套餐优势：主力月付档数量和跨度、付款周期、一次性流量包（没有流量包的写独享或定制线路）。 */
function planText(f: BrandPriceFacts, brandName: string): string {
  const main = f.mainMonthly;
  // 去掉品牌名前缀和“方案”二字，让“入门方案到商业方案”读作“入门到商业”
  const tier = (name: string) => name.replace(new RegExp(`^${brandName}\\s*`), '').replace(/方案$/, '');
  const first = main[0];
  const last = main[main.length - 1];
  const parts = [`${tier(first.name)}到${tier(last.name)} ${main.length} 档月付`];
  parts.push(cycleText(f) ?? `每月 ${first.monthlyGB ?? first.totalGB}GB 到 ${last.monthlyGB ?? last.totalGB}GB`);
  if (f.packs.length > 0) {
    const lasting = f.packs.every((p) => p.note?.includes('流量不过期'))
      ? '流量不过期'
      : f.packs.every((p) => p.note?.includes('永不过期'))
        ? '永不过期'
        : f.packs.every((p) => p.note?.includes('永久有效'))
          ? '永久有效'
          : null;
    parts.push(`另有 ${f.packs.length} 档一次性流量包${lasting ? `（标注${lasting}）` : ''}`);
  } else if (f.dedicated.length > 0) {
    parts.push(`另有${f.dedicated[0].name} ${fmtYuan(f.dedicated[0].price)}/月`);
  }
  return parts.join('，');
}

function buildFacts(brandId: string, brandName: string): FeaturedFact[] {
  const f = getPriceFacts(brandId);
  return [
    { label: '专线', text: lineText(f) },
    { label: '价格推荐', text: priceText(f) },
    { label: '套餐优势', text: planText(f, brandName) }
  ];
}

const FEATURED_COPY: FeaturedPickCopy[] = [
  {
    brand_id: "lingdongyun",
    position: 1,
    display_label: "灵动云",
    headline: "附站长检测记录",
    proof: "资料标注所有套餐不限速、全节点统一 1x 倍率；检测记录是 2026-11-01 的一次延迟与解锁检测，不含带宽。"
  },
  {
    brand_id: "twilight",
    position: 2,
    display_label: "暮光加速",
    headline: "套餐实惠",
    proof: "基础版入门实付在五家中最低（与灵动云同价，流量更多）。"
  },
  {
    brand_id: "flyv",
    position: 3,
    display_label: "FLY V",
    headline: "多设备更省心",
    proof: "常规周期套餐设备不限、全节点 1 倍率（资料标注）。"
  },
  {
    brand_id: "invisible",
    position: 4,
    display_label: "隐形人",
    headline: "年付小包单价低",
    proof: "星耀风暴年付档每月 80GB，约 ¥0.114/GB，五家最低价年付档中每 GB 最低（34 家中第 3 低）。"
  },
  {
    brand_id: "wavenet",
    position: 5,
    display_label: "浪网",
    headline: "大流量月付划算",
    proof: "商业档折合 ¥0.10/GB，五家月付大流量档中最低。"
  }
];

export const FEATURED_PICKS = FEATURED_COPY
  .map((copy) => ({
    ...copy,
    brand: BRANDS.find((b) => b.id === copy.brand_id)!,
    advantages: buildFacts(copy.brand_id, copy.display_label)
  }))
  .sort((a, b) => a.position - b.position);
