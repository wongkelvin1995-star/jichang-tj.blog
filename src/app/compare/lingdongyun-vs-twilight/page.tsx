import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { getBrandById } from '@/data/brands';
import { getCouponsByBrandId } from '@/data/coupons';
import { fmtPerGB, fmtYuan } from '@/data/format';
import type { CycleCode } from '@/data/planPrices';
import { CYCLE_LABELS, getPriceFacts, type BrandPriceFacts, type PriceRef } from '@/data/priceFacts';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import {
  GitCompare,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Layers,
  HelpCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '灵动云与暮光：按相同条件比较套餐与规则',
  description: '对照灵动云与暮光加速的档位价格、付款周期、流量包与线路标注。清楚披露商业推广合作，价格由站长核验于 2026-11-03。',
  path: '/compare/lingdongyun-vs-twilight/'
});

const TIERS = [
  { label: '入门档', lingdong: '拂风', twilight: '基础版' },
  { label: '300GB 档', lingdong: '驭浪', twilight: '标准版' },
  { label: '700GB 档', lingdong: '破晓', twilight: '旗舰版' },
  { label: '1500GB 档', lingdong: '凌霄', twilight: '至尊版' },
];

function pick(facts: BrandPriceFacts, name: string, cycle: CycleCode): PriceRef {
  const ref = facts.rows.find((r) => r.name === name && r.cycle === cycle);
  if (!ref) {
    throw new Error(`价格表缺少 ${facts.brandId} ${name} ${cycle}`);
  }
  return ref;
}

function TierCell({ facts, name }: { facts: BrandPriceFacts; name: string }) {
  const monthly = pick(facts, name, 'm');
  const yearly = pick(facts, name, 'y');
  return (
    <>
      <span className="font-bold text-[#17233A]">{name} {fmtYuan(monthly.price)}/月</span>
      <div className="text-[11px] text-[#64748B]">
        每月 {monthly.totalGB}GB，约 {fmtPerGB(monthly.perGB)}/GB；年付 {fmtYuan(yearly.price)}，折合 {fmtYuan(yearly.price / 12)}/月
      </div>
    </>
  );
}

function packsText(facts: BrandPriceFacts): string {
  return facts.packs.map((p) => `${p.name} ${fmtYuan(p.price)}/${p.totalGB}GB`).join('、');
}

export default function CompareLingdongyunVsTwilightPage() {
  const lingdong = getBrandById('lingdongyun')!;
  const twilight = getBrandById('twilight')!;
  const lingdongFacts = getPriceFacts('lingdongyun');
  const twilightFacts = getPriceFacts('twilight');

  const fufeng = pick(lingdongFacts, '拂风', 'm');
  const basic = pick(twilightFacts, '基础版', 'm');
  const yulang = pick(lingdongFacts, '驭浪', 'm');
  const standard = pick(twilightFacts, '标准版', 'm');
  const yulangYearly = pick(lingdongFacts, '驭浪', 'y');
  const standardYearly = pick(twilightFacts, '标准版', 'y');
  const chuanyun = lingdongFacts.cheapestYearly!;
  const lightYearly = twilightFacts.cheapestYearly!;
  const lingdongCoupon = getCouponsByBrandId('lingdongyun')[0];
  const twilightCoupon = getCouponsByBrandId('twilight')[0];
  const couponCell = (coupon?: { coupon_code: string | null; discount_value: number | string | null }) =>
    coupon?.coupon_code
      ? `优惠码 ${coupon.coupon_code}（${coupon.discount_value ?? '折扣幅度未提供'}，站长核验于 2026-11-03）`
      : '暂无已核实优惠码';

  return (
    <article className="py-12">
      <JsonLd data={breadcrumbList([
        { name: '首页', url: `${SITE_META.url}/` },
        { name: '34家机场目录', url: `${SITE_META.url}/airports/` },
        { name: '灵动云 vs 暮光加速', url: `${SITE_META.url}/compare/lingdongyun-vs-twilight/` }
      ])} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <Link href="/airports/" className="hover:text-[#17233A]">34家机场目录</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">灵动云 vs 暮光加速</span>
        </nav>

        {/* Page Header - Apple Liquid Glass */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold px-3 py-1 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1] flex items-center gap-1.5">
              <GitCompare className="w-3.5 h-3.5" />
              <span>双品牌横向对比 · 同口径计算</span>
            </span>
            <span className="text-[#94A3B8]">价格资料日：灵动云 {lingdong.data_date} / 暮光加速 {twilight.data_date} · 站长核验于 2026-11-03</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17233A] tracking-tight leading-tight">
            灵动云与暮光：按相同条件比较套餐与规则
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            同为本站前排推荐品牌，两家在档位价格、付款周期和线路标注上有何不同？本文用同一份价格资料对照，允许各有所长。
          </p>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#17233A]">商业合作与对比准则披露：</strong>
              <span>
                灵动云（推荐位第 1 位）与暮光加速（推荐位第 2 位）均含本站推广合作。以下对照只依据本站价格表计算，价格由站长核验于 2026-11-03；本站没有做过测速。实际支付前请在各自结算页核实最新资费。
              </span>
            </div>
          </div>
        </div>

        {/* Two Brand Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Lingdongyun Card */}
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#CBD5E1] space-y-4 relative overflow-hidden shadow-xs hover:border-[#6378EA]/40 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-base text-[#6378EA]">
                    灵
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#17233A]">{lingdong.name}</h2>
                  <span className="text-[11px] text-[#4F64D6] font-medium">推荐第 1 位 · 旗舰品牌舱</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF2F7] text-[#6378EA] border border-[#9BB7CF]/40 font-semibold shrink-0">
                {lingdongFacts.schemeCount} 个套餐方案
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              {lingdongFacts.mainMonthly.length} 个主力月付档，月付到三年付各个周期和一次性流量包都有。资料标注 {lingdongFacts.lineNote}，主力档不限速、1 倍率。
            </p>

            <div className="pt-2 flex items-center justify-between gap-2 text-xs">
              <Link href="/airports/lingdongyun/" className="text-[#6378EA] hover:text-[#4F64D6] font-semibold flex items-center gap-1">
                <span>查看灵动云详细资料</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={lingdong.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="text-[#64748B] hover:text-[#17233A] font-semibold flex items-center gap-1"
              >
                <span>前往注册入口（商业链接）</span>
                <ExternalLink className="w-3 h-3 text-[#6378EA]" />
              </a>
            </div>
          </div>

          {/* Twilight Card */}
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#CBD5E1] space-y-4 relative overflow-hidden shadow-xs hover:border-[#6378EA]/40 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#9BB7CF] to-[#17233A] p-0.5">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-base text-[#17233A]">
                    暮
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#17233A]">{twilight.name}</h2>
                  <span className="text-[11px] text-[#64748B] font-medium">推荐第 2 位</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#17233A] border border-[#CBD5E1] font-semibold shrink-0">
                同价流量更多
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              {twilightFacts.mainMonthly.length} 个主力月付档，入门 {fmtYuan(basic.price)} 含 {basic.totalGB}GB，300GB 档 {fmtYuan(standard.price)} 低于灵动云同档。资料标注 {twilightFacts.lineNote}。
            </p>

            <div className="pt-2 flex items-center justify-between gap-2 text-xs">
              <Link href="/airports/twilight/" className="text-[#6378EA] hover:text-[#4F64D6] font-semibold flex items-center gap-1">
                <span>查看暮光加速资料</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={twilight.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="text-[#64748B] hover:text-[#17233A] font-semibold flex items-center gap-1"
              >
                <span>前往注册入口（商业链接）</span>
                <ExternalLink className="w-3 h-3 text-[#6378EA]" />
              </a>
            </div>
          </div>

        </div>

        {/* Side-by-Side Comparison Table */}
        <section className="liquid-glass rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] mb-10 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#6378EA]" />
            <span>核心维度同口径参数对照表</span>
          </h2>
          <p className="text-xs text-[#64748B]">
            以下数字来自本站价格表（站长核验于 2026-11-03）；资料没有写明的项目标为“未标注”，不作推断：
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]">
                  <th className="py-3 px-3 w-1/4">对比维度</th>
                  <th className="py-3 px-3 w-3/8 text-[#6378EA] font-bold">灵动云（Lingdong Cloud）</th>
                  <th className="py-3 px-3 w-3/8 text-[#17233A] font-bold">暮光加速（Twilight）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {TIERS.map((tier) => (
                  <tr key={tier.label}>
                    <td className="py-3.5 px-3 font-semibold text-[#17233A]">{tier.label}</td>
                    <td className="py-3.5 px-3"><TierCell facts={lingdongFacts} name={tier.lingdong} /></td>
                    <td className="py-3.5 px-3"><TierCell facts={twilightFacts} name={tier.twilight} /></td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">最低年付</td>
                  <td className="py-3.5 px-3 text-[#475569]">{chuanyun.name} {fmtYuan(chuanyun.price)}（每月 {chuanyun.monthlyGB}GB）</td>
                  <td className="py-3.5 px-3 text-[#475569]">{lightYearly.name} {fmtYuan(lightYearly.price)}（每月 {lightYearly.monthlyGB}GB）</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">一次性流量包</td>
                  <td className="py-3.5 px-3 text-[#475569]">{packsText(lingdongFacts)}</td>
                  <td className="py-3.5 px-3 text-[#475569]">{packsText(twilightFacts)}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">付款周期</td>
                  <td className="py-3.5 px-3 text-[#475569]">{lingdongFacts.cycles.map((c) => CYCLE_LABELS[c]).join('、')}</td>
                  <td className="py-3.5 px-3 text-[#475569]">{twilightFacts.cycles.map((c) => CYCLE_LABELS[c]).join('、')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">线路标注</td>
                  <td className="py-3.5 px-3 text-[#475569]">{lingdongFacts.lineNote}</td>
                  <td className="py-3.5 px-3 text-[#475569]">{twilightFacts.lineNote}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">倍率 / 设备 / 限速</td>
                  <td className="py-3.5 px-3 text-[#475569]">1 倍率、不限设备、不限速（站长核验的统一口径）</td>
                  <td className="py-3.5 px-3 text-[#475569]">1 倍率、不限设备、不限速（站长核验的统一口径）</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-[#17233A]">优惠码</td>
                  <td className="py-3.5 px-3">
                    <span className="text-amber-700 font-medium">{couponCell(lingdongCoupon)}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-amber-700 font-medium">{couponCell(twilightCoupon)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive: How to Choose */}
        <section className="liquid-glass rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] mb-10 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#6378EA]" />
            <span>两者之间如何按自身情况取舍？</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#6378EA]">适合优先考虑灵动云的情况：</div>
              <p>
                1. 想把预付周期拉到两年或三年：灵动云有两年付、三年付（站长确认结算页提供，官网价格说明页只写到年付，以结算页为准），暮光的资料只到年付；<br />
                2. 更看重线路标注明确：灵动云标注 IEPL 专线并带 BGP 入口，暮光未注明 IEPL 或 IPLC；<br />
                3. 轻度使用：最低年付 {fmtYuan(chuanyun.price)} 比暮光的 {fmtYuan(lightYearly.price)} 低，每月流量同为 {chuanyun.monthlyGB}GB；一次性流量包同容量也更便宜。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#17233A]">适合优先考虑暮光加速的情况：</div>
              <p>
                1. 只买入门月付：同样 {fmtYuan(basic.price)}，暮光每月 {basic.totalGB}GB，灵动云每月 {fufeng.totalGB}GB；<br />
                2. 每月用 300GB 左右：标准版月付 {fmtYuan(standard.price)}、年付 {fmtYuan(standardYearly.price)}，低于驭浪的 {fmtYuan(yulang.price)} 和 {fmtYuan(yulangYearly.price)}；<br />
                3. 一次性流量包容量更多样：三档分别为 150GB、400GB、800GB，与灵动云相同，但每档价格高 ¥20–60，这一项反而是灵动云更便宜。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
              <div className="font-bold text-[#17233A]">价格相同的部分：</div>
              <p>
                700GB 和 1500GB 两档，两家的月付和年付价格相同，独享定制线路也同为 ¥680/月、500GB。选这几档时，差别主要在线路标注和付款周期，不在价格。
              </p>
            </div>
          </div>
        </section>

        {/* Checklist Before Buying Either */}
        <section className="p-6 rounded-2xl bg-[#F0F5F9] border border-[#CBD5E1] text-xs text-[#475569] leading-relaxed space-y-3 mb-10">
          <div className="flex items-center gap-2 font-bold text-[#17233A] text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>购买任何一家前的通用避坑核对提醒</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>首月优先月付：</strong>无论灵动还是暮光，在确认本地运营商（电信/联通/移动）晚高峰表现满意前，切勿冲动购买大金额年付；</li>
            <li><strong>核实结算实付：</strong>双方推广链接中的 <code className="text-[#17233A] font-semibold">?code=xxxx</code> 均为邀请代码，不自动抵扣金额，实付以订单最终提示为准；</li>
            <li><strong>查验退款政策：</strong>两家的资料都没有写明退款规则，购买前请查阅各自的用户服务协议（ToS），确认是否支持退款及具体手续费限制。</li>
          </ul>
        </section>

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <Link href="/airports/" className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#17233A] font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>返回 34 家完整目录</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/airports/lingdongyun/" className="text-[#6378EA] hover:text-[#4F64D6] font-semibold">
              灵动云详情 →
            </Link>
            <Link href="/airports/twilight/" className="text-[#17233A] hover:text-[#6378EA] font-semibold">
              暮光加速详情 →
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
