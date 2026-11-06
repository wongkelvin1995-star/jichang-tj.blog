'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { fmtYuan } from '@/data/format';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';
import type { DirectoryBrand, LineTag } from '@/data/directory';
import { Search, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

const FIXED_COUNT = SITE_META.fixed_editorial_positions;

type PriceBand = 'all' | 'low' | 'mid' | 'high';
/** 按入门月付分三档，每档都有品牌：18 元以内、18–22 元、22 元以上 */
const PRICE_BANDS: { id: PriceBand; label: string; test: (price: number) => boolean }[] = [
  { id: 'all', label: '不限价格', test: () => true },
  { id: 'low', label: '¥18 以内', test: (p) => p <= 18 },
  { id: 'mid', label: '¥18–22', test: (p) => p > 18 && p <= 22 },
  { id: 'high', label: '¥22 以上', test: (p) => p > 22 }
];
const LINE_FILTERS: { id: 'all' | LineTag; label: string }[] = [
  { id: 'all', label: '全部线路' },
  { id: 'IPLC', label: '标注 IPLC' },
  { id: 'IEPL', label: '标注 IEPL' },
  { id: 'BGP', label: '标注 BGP' }
];

/**
 * 34 家目录：紧凑小卡 + 筛选。默认只显示前 14 位固定推荐（首页）或全部（完整目录页），
 * 搜索和筛选永远在 34 家里找。34 个品牌卡始终在页面 HTML 里（不显示的只是隐藏），链接不会因为折叠而消失。
 * 线路筛选用的是资料里的线路标注文字，本站没有测试过任何线路。
 */
export default function BrandDirectoryGrid({
  brands,
  defaultView = 'all',
  showHeader = true
}: {
  brands: DirectoryBrand[];
  defaultView?: 'fixed' | 'all';
  showHeader?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'fixed' | 'all'>(defaultView);
  const [line, setLine] = useState<'all' | LineTag>('all');
  const [band, setBand] = useState<PriceBand>('all');
  const [onlyCheck, setOnlyCheck] = useState(false);

  const isFiltering = query.trim() !== '' || line !== 'all' || band !== 'all' || onlyCheck;

  const visibleIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bandTest = PRICE_BANDS.find((b) => b.id === band)!.test;
    const ids = new Set<string>();
    brands.forEach((b) => {
      if (!isFiltering && view === 'fixed' && !b.fixed) return;
      if (q) {
        const hit =
          b.name.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.aliases.some((a) => a.toLowerCase().includes(q)) ||
          (b.line ?? '').toLowerCase().includes(q) ||
          (b.couponCode ?? '').toLowerCase().includes(q);
        if (!hit) return;
      }
      if (line !== 'all' && !b.lineTags.includes(line)) return;
      if (band !== 'all' && !(b.entryPrice !== null && bandTest(b.entryPrice))) return;
      if (onlyCheck && !b.needsCheck) return;
      ids.add(b.id);
    });
    return ids;
  }, [brands, query, view, line, band, onlyCheck, isFiltering]);

  const reset = () => {
    setQuery('');
    setLine('all');
    setBand('all');
    setOnlyCheck(false);
    setView('all');
  };

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      active ? 'bg-white text-[#4F64D6] border-[#6378EA]/50 shadow-xs' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#17233A]'
    }`;

  return (
    <section id="directory" className="py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {!showHeader && <h2 className="sr-only">{SITE_META.brand_count} 家机场资料目录</h2>}

        {showHeader && (
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">{SITE_META.brand_count} 家机场资料目录</h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
              按本站<strong className="text-[#17233A]">编辑推荐顺序</strong>排列：前 {FIXED_COUNT} 位是固定推荐安排，其余 {SITE_META.brand_count - FIXED_COUNT} 位按登记表稳定顺序。含商业推广合作，不代表测速、销量或用户投票排名。可以搜索，也可以按线路标注和入门月付筛选。
            </p>
          </div>
        )}

        {/* 搜索与筛选 */}
        <div className="liquid-glass rounded-2xl p-4 mb-5 border border-[#E2E8F0] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="搜索品牌、别名、线路或优惠码"
                placeholder="搜索品牌、别名、线路或优惠码"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#CBD5E1] focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 text-sm text-[#17233A] placeholder-[#94A3B8] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] w-fit">
              <button type="button" onClick={() => setView('fixed')} className={chip(view === 'fixed' && !isFiltering)}>前 {FIXED_COUNT} 位固定推荐</button>
              <button type="button" onClick={() => setView('all')} className={chip(view === 'all' || isFiltering)}>全部 {SITE_META.brand_count} 家</button>
            </div>
            <div className="text-xs text-[#64748B] sm:ml-auto">
              显示 <strong className="text-[#17233A]">{visibleIds.size}</strong> / {brands.length} 家
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {LINE_FILTERS.map((f) => (
              <button key={f.id} type="button" onClick={() => setLine(f.id)} className={chip(line === f.id)}>{f.label}</button>
            ))}
            <span className="mx-1 hidden h-4 w-px bg-[#E2E8F0] sm:block" />
            {PRICE_BANDS.map((b) => (
              <button key={b.id} type="button" onClick={() => setBand(b.id)} className={chip(band === b.id)}>{b.id === 'all' ? '入门月付不限' : `月付 ${b.label}`}</button>
            ))}
            <span className="mx-1 hidden h-4 w-px bg-[#E2E8F0] sm:block" />
            <button type="button" onClick={() => setOnlyCheck(!onlyCheck)} className={chip(onlyCheck)}>只看资料待核对</button>
            {(isFiltering || view === 'fixed') && (
              <button type="button" onClick={reset} className="text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6] px-1">清除筛选</button>
            )}
          </div>
        </div>

        {/* 品牌小卡：34 张都在 HTML 里，不显示的只是隐藏 */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <li key={brand.id} className={visibleIds.has(brand.id) ? '' : 'hidden'}>
              <BrandCard brand={brand} />
            </li>
          ))}
        </ul>

        {visibleIds.size === 0 && (
          <div className="liquid-glass rounded-2xl p-10 text-center border border-[#E2E8F0] my-6">
            <p className="text-base text-[#17233A] font-semibold">没有找到符合条件的品牌</p>
            <p className="text-xs text-[#64748B] mt-1">换个关键词，或者清除筛选，回到完整的 {SITE_META.brand_count} 家目录。</p>
            <button type="button" onClick={reset} className="mt-4 px-4 py-2 rounded-xl bg-[#6378EA] hover:bg-[#4F64D6] text-white text-xs font-semibold transition-colors">清除筛选</button>
          </div>
        )}

        <div className="mt-6 p-3.5 rounded-xl bg-[#F0F5F9] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#64748B] leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
          <span>
            价格由{VERIFICATION.label}，线路是资料标注，本站没有做过测速；标“资料待核对”的品牌，是站长的机场资料自己标注存疑的，请以结算页为准。
          </span>
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: DirectoryBrand }) {
  return (
    <div
      className={`relative h-full rounded-2xl liquid-glass-card p-4 border transition-colors flex flex-col justify-between gap-3 ${
        brand.featured ? 'border-[#6378EA]/60 bg-white' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 shrink-0 rounded-md text-[11px] font-bold ${
                brand.featured ? 'bg-[#6378EA] text-white' : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
              }`}
            >
              {brand.rank}
            </span>
            <h3 className="min-w-0 truncate text-sm font-bold text-[#17233A]">
              <Link href={`/airports/${brand.id}/`} className="hover:text-[#6378EA] transition-colors">{brand.name}</Link>
            </h3>
            {brand.featured && <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-[#EBF2F7] text-[#6378EA] border border-[#9BB7CF]/40 font-bold">主推</span>}
          </div>
          {brand.needsCheck && (
            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-semibold">资料待核对</span>
          )}
        </div>
        <p className="line-clamp-2 min-h-[2rem] text-[11px] leading-relaxed text-[#64748B]">{brand.line ?? '资料未标注线路'}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {brand.entryPrice !== null && <span className="font-semibold text-[#6378EA]">月付 {fmtYuan(brand.entryPrice)} 起</span>}
          {brand.entryPlan && <span className="text-[#94A3B8]">{brand.entryPlan}</span>}
        </div>
        {brand.couponCode && (
          <div className="text-[11px] text-[#64748B]">
            优惠码 <code className="font-mono font-bold text-[#17233A] select-all">{brand.couponCode}</code>
            {brand.discount && <span className="ml-1 text-[#94A3B8]">（{brand.discount}）</span>}
          </div>
        )}
      </div>
      <div className="pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <Link href={`/airports/${brand.id}/`} className="inline-flex items-center gap-1 font-semibold text-[#6378EA] hover:text-[#4F64D6] transition-colors">
          <span>资料与价格</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <a
          href={brand.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-white text-[#475569] hover:text-[#17233A] border border-[#CBD5E1] transition-colors"
        >
          <span>前往注册</span>
          <ExternalLink className="w-3 h-3 text-[#6378EA]" />
        </a>
      </div>
    </div>
  );
}
