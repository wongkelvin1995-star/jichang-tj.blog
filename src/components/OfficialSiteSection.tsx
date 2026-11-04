import React from 'react';
import { ExternalLink, Globe, CheckCircle2, Info, ShieldCheck } from 'lucide-react';
import { OFFICIAL_PURCHASE_NOTE, type OfficialSite } from '@/data/officialSites';

interface Props {
  brandName: string;
  site: OfficialSite;
  affiliateUrl: string;
}

/**
 * 品牌页“官网介绍”区块：给读者官网地址，说明本站不是官网，并写明在本页购买不影响价格。
 * 官网链接是普通外链（不带推广参数，不加 nofollow / sponsored）；推广链接单独放，保留 sponsored。
 */
export default function OfficialSiteSection({ brandName, site, affiliateUrl }: Props) {
  return (
    <section
      id="official"
      aria-labelledby="official-heading"
      className="liquid-glass rounded-2xl p-5 sm:p-7 border border-[#6378EA]/40 space-y-5 scroll-mt-24 shadow-xs"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 id="official-heading" className="text-lg font-bold text-[#17233A] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#6378EA]" />
          <span>{brandName}官网介绍</span>
        </h2>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#4F64D6] border border-[#CBD5E1] font-semibold">
          官网地址由站长提供
        </span>
      </div>

      {/* Official address */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#CBD5E1]">
        <div className="min-w-0">
          <div className="text-xs text-[#64748B] mb-1 font-medium">{brandName}官网地址</div>
          <code className="block font-mono font-bold text-base sm:text-lg text-[#17233A] break-all">{site.host}</code>
          <div className="text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
            普通链接，不带推广参数；本站 {site.checked_on} 打开过这个官网的首页和价格页。
          </div>
        </div>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-[#4F64D6] bg-white hover:bg-[#F8FAFC] border border-[#6378EA]/40 transition-colors shrink-0"
        >
          <span>访问 {brandName} 官网</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Price statement requested by the site owner */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          <strong>{OFFICIAL_PURCHASE_NOTE.headline}</strong>
          {OFFICIAL_PURCHASE_NOTE.body(brandName)}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
          >
            <span>前往 {brandName} 注册入口</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-emerald-700/80">商业链接，详见推广说明</span>
        </div>
      </div>

      {/* What the official site says about itself */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <div className="font-bold text-[#17233A]">官网自述（品牌自己的说法，本站未测试）</div>
          <ul className="list-disc list-outside pl-4 space-y-1.5 text-[#475569] leading-relaxed">
            {site.claims.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <div className="space-y-1.5">
          <div className="font-bold text-[#17233A]">官网上能找到什么</div>
          <ul className="list-disc list-outside pl-4 space-y-1.5 text-[#475569] leading-relaxed">
            {site.sections.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm">
        <div className="font-bold text-[#17233A] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#6378EA]" />
          <span>去官网时留意</span>
        </div>
        <ul className="list-disc list-outside pl-4 space-y-1.5 text-[#475569] leading-relaxed">
          {site.tips.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>

      {/* Price cross-check against the official pages */}
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="font-bold text-[#17233A]">官网价格与本站价格表对照（{site.checked_on}）</div>
        <p className="flex items-start gap-1.5 text-[#475569] leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{site.price_check.matched}</span>
        </p>
        {site.price_check.differences.map((line) => (
          <p key={line} className="flex items-start gap-1.5 text-[#475569] leading-relaxed p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
            <Info className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
            <span><strong className="text-[#17233A]">差异，价格以结算页为准：</strong>{line}</span>
          </p>
        ))}
      </div>

      <p className="text-[11px] text-[#94A3B8] leading-relaxed">
        本站（jichang-tj.blog）是选购博客，不是{brandName}官网，不代收款、不开通账号、不提供客服；账号、订阅和售后请找{brandName}官方渠道。官网自述会随官网改版变化，以官网当前页面为准。
      </p>
    </section>
  );
}
