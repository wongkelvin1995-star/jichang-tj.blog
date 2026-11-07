import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, ShieldCheck, Zap, Layers, Clock, Compass } from 'lucide-react';
import { BRANDS } from '@/data/brands';
import { FEATURED_PICKS } from '@/data/featured';
import { fmtYuan } from '@/data/format';
import { HERO_HIGHLIGHTS } from '@/data/heroHighlights';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';

export default function CelestialHero() {
  const lingdongyun = BRANDS.find(b => b.id === 'lingdongyun')!;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Subtle Aurora Ambient Sheen (Light & Clean, does not carry text) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Soft Ice Blue Aurora Glow */}
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#6378EA]/10 via-[#9BB7CF]/15 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#9BB7CF]/20 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Oversized Apple-Style Title & Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#CBD5E1] shadow-xs shadow-[#17233A]/5">
              <span className="w-2 h-2 rounded-full bg-[#6378EA] animate-pulse" />
              <span className="text-xs font-semibold text-[#475569] tracking-wide">
                收录 {SITE_META.brand_count} 家机场 · 按付款周期与流量规则整理
              </span>
            </div>

            {/* Oversized Brand Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#17233A] tracking-tight leading-[1.08] sm:leading-[1.06]">
              2026机场推荐｜<br />
              <span className="bg-gradient-to-r from-[#17233A] via-[#4F64D6] to-[#6378EA] bg-clip-text text-transparent">
                高性价比套餐对比与新手选购指南
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
              {SITE_META.description}
            </p>

            <p className="text-sm sm:text-base font-bold text-[#17233A] max-w-2xl">本站重点推荐：</p>

            {/* Hero highlights: order follows display_rank, prices come from the price table */}
            <ul className="space-y-1.5 text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
              {HERO_HIGHLIGHTS.map((item) => (
                <li key={item.brand_id} className="flex gap-2">
                  <Link
                    href={`/airports/${item.brand_id}/`}
                    className="shrink-0 font-bold text-[#17233A] hover:text-[#6378EA] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <span>
                    <span className="font-semibold text-[#4F64D6]">{item.headline}</span>
                    ：{item.detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl">
              同时收录全站 {SITE_META.brand_count} 家机场名录，供你对照比较。以上价格已在各家结算页核验（{VERIFICATION.verified_on}）；套餐价格或订阅规则如有变动，以官方页面为准。
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/airports/lingdongyun/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-lg shadow-[#6378EA]/25 hover:scale-[1.02] transition-all"
              >
                <span>查看灵动云详细资料</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#directory"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-[#17233A] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#9BB7CF] shadow-xs hover:scale-[1.01] transition-all"
              >
                <Compass className="w-4 h-4 text-[#6378EA]" />
                <span>浏览全部 34 家目录</span>
              </a>
            </div>

            {/* Transparency Note */}
            <div className="flex items-center gap-2 text-xs text-[#64748B] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#6378EA] shrink-0" />
              <span>本站推荐位含推广合作，详见准则与披露。</span>
            </div>
          </div>

          {/* Right Column: Floating Flagship Airport Card (悬浮式旗舰机场卡片 · 灵动云) */}
          <div className="lg:col-span-5">
            <div className="floating-hero-card rounded-3xl p-6 sm:p-8 border border-[#9BB7CF]/50 relative group transition-all duration-300 hover:shadow-2xl hover:shadow-[#6378EA]/15">
              
              {/* Outer Top Metallic Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#17233A] bg-[#F0F5F9] border border-[#CBD5E1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6378EA]" />
                  本站优选 · 旗舰品牌舱
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF2F7] text-[#4F64D6] border border-[#9BB7CF]/40">
                  推荐第 1 位
                </span>
              </div>

              {/* Chamber Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5 shadow-md shadow-[#6378EA]/20">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-2xl text-[#6378EA]">
                    灵
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#17233A] tracking-tight">{lingdongyun.name}</h2>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium">Lingdong Cloud</p>
                </div>
              </div>

              {/* Core Pitch on Frosted Surface */}
              <div className="p-4 rounded-2xl bg-[#F0F5F9]/80 border border-[#E2E8F0] mb-5">
                <div className="text-xs font-bold text-[#6378EA] uppercase tracking-wider mb-1">
                  先看懂套餐，再决定怎么选
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  集中了解套餐付款方式、流量发放和客户端要求，核对适用条件后，再选择需要的方案。避免盲目因年付低折算而冲动下单。
                </p>
              </div>

              {/* Verified Facts Grid (Strict Contract: no fake metrics) */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span>线路架构</span>
                  </div>
                  <div className="font-bold text-[#17233A]">{lingdongyun.protocol_architecture}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                    <Layers className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span>入门月付参考</span>
                  </div>
                  <div className="font-bold text-[#17233A]">
                    {fmtYuan(lingdongyun.starting_price!.amount!)}/月起 <span className="text-[10px] text-[#94A3B8] font-normal">（已核验）</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span>付款周期</span>
                  </div>
                  <div className="font-bold text-[#17233A]">月付到三年付</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span>资料状态</span>
                  </div>
                  <div className="font-bold text-[#4F64D6]">{VERIFICATION.label}</div>
                </div>
              </div>

              {/* Action Buttons in Chamber */}
              <div className="space-y-3">
                <Link
                  href="/airports/lingdongyun/"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-md shadow-[#6378EA]/20 hover:scale-[1.01] transition-all"
                >
                  <span>查看灵动云详细资料与套餐</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={lingdongyun.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#475569] hover:text-[#17233A] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] transition-colors"
                >
                  <span>前往灵动云注册入口</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6378EA]" />
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]/60">
                    商业链接
                  </span>
                </a>
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#94A3B8]">
                  优惠及实际支付金额请在灵动云结算前仔细核验
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Five Featured Picks: order comes from display_rank in brands.ts */}
        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17233A] tracking-tight mb-5">
            本站重点推荐 5 家
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FEATURED_PICKS.map((pick) => (
              <div
                key={pick.brand_id}
                className={`flex flex-col p-5 rounded-2xl bg-white border ${
                  pick.brand_id === lingdongyun.id
                    ? 'border-[#6378EA]/70 ring-1 ring-[#6378EA]/20 shadow-md shadow-[#6378EA]/10'
                    : 'border-[#E2E8F0] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-[#17233A]">{pick.display_label}</h3>
                  <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF2F7] text-[#4F64D6] border border-[#9BB7CF]/40">
                    第 {pick.brand.display_rank} 位
                  </span>
                </div>

                <div className="text-sm font-bold text-[#6378EA] mb-1.5">{pick.headline}</div>
                <p className="text-xs text-[#475569] leading-relaxed mb-2">{pick.proof}</p>
                <div className="text-[11px] text-[#94A3B8] mb-3">{VERIFICATION.label} · 资料日 {pick.brand.data_date}</div>
                {pick.advantages.length > 0 ? (
                  <ul data-featured-advantages={pick.brand_id} className="mb-4 space-y-1.5">
                    {pick.advantages.map((item) => (
                      <li key={item.label} className="flex items-start gap-1.5 text-[11px] font-medium leading-snug text-[#334155]">
                        <Check className="w-3 h-3 mt-0.5 shrink-0 text-[#6378EA]" strokeWidth={3} />
                        <span>
                          <strong className="font-bold text-[#17233A]">{item.label}</strong>：{item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mb-1" />
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-xs font-semibold whitespace-nowrap">
                  <Link
                    href={`/airports/${pick.brand_id}/`}
                    className="inline-flex items-center gap-1 text-[#17233A] hover:text-[#6378EA] transition-colors"
                  >
                    <span>查看详情</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={pick.brand.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="inline-flex items-center gap-1 text-[#475569] hover:text-[#17233A] transition-colors"
                  >
                    <span>前往注册</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span className="text-[10px] px-1 py-0.5 rounded bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]/60 font-medium">
                      商业链接
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-[#64748B] leading-relaxed">
            以上为编辑推荐，含推广合作，排名为固定编辑展示顺序，不是测速或销量结果。专线为资料标注，本站没有测试线路。价格与规则以各家结算页为准。
          </p>
        </div>
      </div>
    </section>
  );
}
