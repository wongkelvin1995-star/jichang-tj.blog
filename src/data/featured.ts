import { BRANDS } from '@/data/brands';
import { fmtYuan } from '@/data/format';
import { CYCLE_LABELS, getPriceFacts, type BrandPriceFacts } from '@/data/priceFacts';

/**
 * 首屏 5 家重点推荐的优势文案
 * 1. 卡片顺序由 position 决定（站长 2026-11-04 指定 FLY V 放第 3 张）；卡片上的“第 N 位”徽章仍读 brands.ts 的 display_rank，两者是两回事。
 * 2. 数字来自价格表 planPrices.ts（站长已在结算页核验）；改价格后要重新核对，scripts/audit_site.mjs 会校验这些比较。
 * 3. “五家中”只比较这 5 家，“34 家”比较全站价格表。
 * 4. advantages 是卡片下方的补充优势（站长 2026-11-04 要求：删掉卡片上的“官网介绍 · 通过本站购买不影响价格”，换成这几家的优势），
 *    只给灵动云、FLY V、隐形人三家写（audit_site.mjs 核对）。条目全部由价格表数出来，不手写数字；品牌自己的说法要标注“资料标注”，
 *    不写没有依据的话，也不写“唯一”“最全”这类排他说法。
 */
interface FeaturedPickCopy {
  brand_id: string;
  position: number;
  display_label: string;
  headline: string;
  proof: string;
  advantages?: (facts: BrandPriceFacts) => string[];
}

/** 月付到三年付这样的周期跨度，不含一次性流量包。 */
const cycleSpan = (f: BrandPriceFacts) => {
  const cycles = f.cycles.filter((c) => c !== 'o');
  return { text: `${CYCLE_LABELS[cycles[0]]}到${CYCLE_LABELS[cycles[cycles.length - 1]]}`, count: cycles.length };
};

/** 有年付档的套餐名，按年付价从低到高。 */
const yearlyPlanNames = (f: BrandPriceFacts) =>
  f.rows.filter((r) => r.cycle === 'y').sort((a, b) => a.price - b.price).map((r) => r.name);

const FEATURED_COPY: FeaturedPickCopy[] = [
  {
    brand_id: "lingdongyun",
    position: 1,
    display_label: "灵动云",
    headline: "附站长检测记录",
    proof: "主力档标注不限速、1 倍率；检测记录是 2026-11-01 的一次延迟与解锁检测，不含带宽。",
    advantages: (f) => {
      const main = f.mainMonthly;
      return [
        f.lineNote,
        `${main[0].name}到${main[main.length - 1].name} ${main.length} 档月付，${cycleSpan(f).text}都有`,
        `另有${f.cheapestYearly!.name}年付 ${fmtYuan(f.cheapestYearly!.price)}、${f.packs.length} 档一次性流量包`
      ];
    }
  },
  {
    brand_id: "twilight",
    position: 2,
    display_label: "暮光加速",
    headline: "套餐实惠",
    proof: "基础版 ¥20/月含 120GB，五家中入门实付最低（与灵动云同价，流量更多）。"
  },
  {
    brand_id: "flyv",
    position: 3,
    display_label: "FLY V",
    headline: "多设备更省心",
    proof: "入门方案 ¥25/月含 150GB，月付档标注不限速、设备不限、1 倍率；另有标注永久有效的单次流量包。",
    advantages: (f) => {
      const main = f.mainMonthly;
      const span = cycleSpan(f);
      const tier = (name: string) => name.replace('方案', '');
      return [
        `${tier(main[0].name)}到${tier(main[main.length - 1].name)} ${main.length} 档月付，${span.text} ${span.count} 个周期`,
        `${f.cheapestYearly!.name} ${fmtYuan(f.cheapestYearly!.price)}/年，每月 ${f.cheapestYearly!.monthlyGB}GB`,
        `另有${f.dedicated[0].name} ${fmtYuan(f.dedicated[0].price)}/月`
      ];
    }
  },
  {
    brand_id: "invisible",
    position: 4,
    display_label: "隐形人",
    headline: "年付小包单价低",
    proof: "星耀风暴 ¥109/年，每月 80GB，约 ¥0.114/GB，是 34 家最低价年付档里每 GB 最低的。",
    advantages: (f) => {
      const entry = f.entryMonthly!;
      const otherCycles = f.rows.filter((r) => r.name === entry.name && r.cycle !== 'm').map((r) => CYCLE_LABELS[r.cycle]);
      const yearly = yearlyPlanNames(f);
      const neverExpire = f.packs.length > 0 && f.packs.every((p) => p.note?.includes('永不过期'));
      return [
        `${entry.name} ${fmtYuan(entry.price)}/月 ${entry.totalGB}GB 起${otherCycles.length > 0 ? `，另有${otherCycles.join('、')}` : ''}`,
        `年付 ${yearly.length} 档：${yearly[0]}到${yearly[yearly.length - 1]}`,
        `${f.packs.length} 款一次性买断流量包${neverExpire ? '，标注永不过期' : ''}`
      ];
    }
  },
  {
    brand_id: "wavenet",
    position: 5,
    display_label: "浪网",
    headline: "大流量月付划算",
    proof: "商业档 ¥200/月含 2000GB，折合 ¥0.10/GB，五家月付大流量档中最低。"
  }
];

export const FEATURED_PICKS = FEATURED_COPY
  .map(({ advantages, ...copy }) => ({
    ...copy,
    brand: BRANDS.find((b) => b.id === copy.brand_id)!,
    advantages: advantages ? advantages(getPriceFacts(copy.brand_id)) : []
  }))
  .sort((a, b) => a.position - b.position);
