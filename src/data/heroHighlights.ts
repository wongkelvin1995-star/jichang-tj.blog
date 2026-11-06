import { BRANDS } from '@/data/brands';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { getPriceFacts, type BrandPriceFacts, type PriceRef } from '@/data/priceFacts';

/**
 * 首屏简介里的重点推荐：每家一句优势 + 价格。
 * 1. 顺序按 brands.ts 的 display_rank，这里不维护排名。
 * 2. 价格由价格表实时算出；优势里的比较结论（如“年付约 8 折”）由 scripts/audit_site.mjs 校验，改价格后会提醒重写。
 * 3. 这是编辑推荐，含推广合作；价格由站长在结算页核验（见 verification.ts）。
 */
interface HeroHighlightCopy {
  brand_id: string;
  display_name?: string;
  headline: string;
  detail: (facts: BrandPriceFacts) => string;
}

const monthly = (ref: PriceRef) => `${ref.name} ${fmtYuan(ref.price)}/月 ${ref.totalGB}GB`;
const yearly = (ref: PriceRef) => `${ref.name} ${fmtYuan(ref.price)}/年，每月 ${ref.monthlyGB}GB`;

const HERO_COPY: HeroHighlightCopy[] = [
  {
    brand_id: 'lingdongyun',
    headline: '附站长检测记录',
    detail: (f) => `${f.lineNote}（资料标注），${monthly(f.entryMonthly!)}，月付到三年付都有`
  },
  {
    brand_id: 'twilight',
    headline: '套餐实惠',
    detail: (f) => `${monthly(f.entryMonthly!)}，与灵动云同价、流量更多`
  },
  {
    brand_id: 'breezenet',
    headline: '入门单价低',
    detail: (f) => `${monthly(f.entryMonthly!)}，约 ${fmtPerGB(f.entryMonthly!.perGB)}/GB，乘风、破风年付约 8 折`
  },
  {
    brand_id: 'flycat',
    headline: '年付门槛低',
    detail: (f) => `${yearly(f.cheapestYearly!)}；${monthly(f.entryMonthly!)}`
  },
  {
    brand_id: 'dalaoyun',
    headline: '年付划算',
    detail: (f) => `${monthly(f.entryMonthly!)}（入门套餐价格资料待核对），凌云、御云两档年付约 79 折`
  },
  {
    brand_id: 'invisible',
    headline: '年付小包单价低',
    detail: (f) => `${yearly(f.cheapestYearly!)}，约 ${fmtPerGB(f.cheapestYearly!.perGB)}/GB`
  },
  {
    brand_id: 'flyv',
    display_name: 'FLY V',
    headline: '多设备更省心',
    detail: (f) => `${monthly(f.entryMonthly!)}，常规周期套餐设备不限（资料标注）`
  },
  {
    brand_id: 'wavenet',
    headline: '大流量月付划算',
    detail: (f) => {
      const top = f.mainMonthly[f.mainMonthly.length - 1];
      return `${monthly(top)}，约 ${fmtPerGB(top.perGB)}/GB`;
    }
  }
];

export const HERO_HIGHLIGHTS = HERO_COPY
  .map((copy) => {
    const brand = BRANDS.find((b) => b.id === copy.brand_id)!;
    return {
      brand_id: copy.brand_id,
      name: copy.display_name ?? brand.name,
      display_rank: brand.display_rank,
      headline: copy.headline,
      detail: copy.detail(getPriceFacts(copy.brand_id))
    };
  })
  .sort((a, b) => a.display_rank - b.display_rank);
