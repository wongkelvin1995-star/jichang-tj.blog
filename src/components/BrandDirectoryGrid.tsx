'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { fmtYuan } from '@/data/format';
import { SITE_META } from '@/data/site';
import { Brand } from '@/types';
import { Search, ExternalLink, ShieldCheck, ArrowRight, Sparkles, Filter } from 'lucide-react';

const FIXED_COUNT = SITE_META.fixed_editorial_positions;

export default function BrandDirectoryGrid({ brands }: { brands: Brand[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'fixed'>('all');

  // Filter and search
  const filteredBrands = useMemo(() => {
    let list = brands;
    if (filterMode === 'fixed') {
      list = list.filter(b => b.fixed_position);
    }
    if (!searchQuery.trim()) return list;

    const query = searchQuery.trim().toLowerCase();
    return list.filter(b => {
      if (b.name.toLowerCase().includes(query)) return true;
      if (b.id.toLowerCase().includes(query)) return true;
      if (b.aliases.some(a => a.toLowerCase().includes(query))) return true;
      if (b.protocol_architecture && b.protocol_architecture.toLowerCase().includes(query)) return true;
      if (b.selection_tip && b.selection_tip.toLowerCase().includes(query)) return true;
      return false;
    });
  }, [brands, searchQuery, filterMode]);

  return (
    <section id="directory" className="py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STEP 2 · 极简品牌矩阵</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              34 家机场资料目录
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
              以下按本站<strong className="text-[#17233A]">编辑推荐顺序</strong>完整展示；前 {FIXED_COUNT} 位为固定推荐安排，其余 {SITE_META.brand_count - FIXED_COUNT} 位按登记表稳定顺序排列。涉及商业推广合作，不代表独立测速、销量或用户投票排名。
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs text-xs">
              <span className="text-[#64748B]">名录总数：</span>
              <strong className="text-[#17233A] ml-1">34 家</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs text-xs">
              <span className="text-[#64748B]">固定推荐位：</span>
              <strong className="text-[#6378EA] ml-1">前 {FIXED_COUNT} 位</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs text-xs">
              <span className="text-[#64748B]">当前匹配：</span>
              <strong className="text-[#17233A] ml-1">{filteredBrands.length} 家</strong>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar - Apple Segmented Style */}
        <div className="liquid-glass rounded-2xl p-4 mb-8 border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索中文名、别名或线路（如 有一说一 / WaveNet / IEPL）..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 text-sm text-[#17233A] placeholder-[#94A3B8] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#17233A]"
              >
                清除
              </button>
            )}
          </div>

          {/* Filter Mode Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]">
            <button
              onClick={() => setFilterMode('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-[#17233A] shadow-xs border border-[#CBD5E1]'
                  : 'text-[#64748B] hover:text-[#17233A]'
              }`}
            >
              全部 34 家目录
            </button>
            <button
              onClick={() => setFilterMode('fixed')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                filterMode === 'fixed'
                  ? 'bg-white text-[#6378EA] shadow-xs border border-[#CBD5E1]'
                  : 'text-[#64748B] hover:text-[#17233A]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>前 {FIXED_COUNT} 位固定推荐</span>
            </button>
          </div>
        </div>

        {/* 34 Brands Minimalist Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <div className="liquid-glass rounded-2xl p-12 text-center border border-[#E2E8F0] my-8">
            <p className="text-base text-[#17233A] font-semibold">没有找到符合条件的品牌</p>
            <p className="text-xs text-[#64748B] mt-1">请尝试更换关键词，或点击下方按钮恢复完整 34 家目录。</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterMode('all'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#6378EA] hover:bg-[#4F64D6] text-white text-xs font-semibold transition-colors"
            >
              恢复显示全部 34 家
            </button>
          </div>
        )}

        {/* Compliance Footer inside directory */}
        <div className="mt-8 p-4 rounded-xl bg-[#F0F5F9] border border-[#E2E8F0] flex items-center gap-3 text-xs text-[#64748B]">
          <ShieldCheck className="w-4 h-4 text-[#6378EA] shrink-0" />
          <span>
            特别提示：本目录默认完整呈现所有 34 家收录品牌。价格由站长核验于 2026-11-03，线路为资料标注；本站没有做过测速，不伪造评测内容。
          </span>
        </div>

      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  const isFixed = brand.fixed_position;

  return (
    <div className={`relative rounded-2xl liquid-glass-card p-5 border transition-all duration-300 flex flex-col justify-between ${
      brand.featured 
        ? 'border-[#6378EA]/60 shadow-md shadow-[#6378EA]/10 bg-white' 
        : isFixed
          ? 'border-[#CBD5E1] hover:border-[#9BB7CF]'
          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
    } hover:-translate-y-1 hover:shadow-lg hover:shadow-[#17233A]/5`}>
      
      {/* Top Bar: Rank Badge + Aliases */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
              brand.featured
                ? 'bg-[#6378EA] text-white shadow-xs'
                : isFixed
                  ? 'bg-[#F0F5F9] text-[#4F64D6] border border-[#CBD5E1]'
                  : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
            }`}>
              {brand.display_rank}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#17233A] tracking-tight">
                  {brand.name}
                </h3>
                {brand.featured && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EBF2F7] text-[#6378EA] border border-[#9BB7CF]/40 font-bold">
                    主推旗舰
                  </span>
                )}
                {isFixed && !brand.featured && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0F5F9] text-[#475569] border border-[#E2E8F0]">
                    固定推荐
                  </span>
                )}
              </div>
              {brand.aliases.length > 0 && (
                <div className="text-[11px] text-[#64748B] truncate max-w-[200px]">
                  别名：{brand.aliases.join(' / ')}
                </div>
              )}
            </div>
          </div>

          {/* Verification Pill */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] shrink-0">
            {brand.verified_at ? "已核验" : "待核验"}
          </span>
        </div>

        {/* Line Note & Starting Price Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-[#F0F5F9] text-[#475569] border border-[#E2E8F0]">
            {brand.protocol_architecture || "线路未标注"}
          </span>
          {brand.starting_price?.amount != null && (
            <span className="px-2 py-0.5 rounded bg-[#F8FAFC] text-[#6378EA] border border-[#E2E8F0] font-semibold">
              {brand.starting_price.period} {fmtYuan(brand.starting_price.amount)} 起
            </span>
          )}
        </div>

        {/* Price Summary */}
        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
          {brand.selection_tip}
        </p>
      </div>

      {/* Bottom Actions: Site Detail & Affiliate Outbound */}
      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <Link
          href={`/airports/${brand.id}/`}
          className="inline-flex items-center gap-1 font-semibold text-[#6378EA] hover:text-[#4F64D6] transition-colors"
        >
          <span>查看资料与事实</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={brand.affiliate_url}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-white text-[#475569] hover:text-[#17233A] border border-[#CBD5E1] transition-colors"
        >
          <span>前往注册</span>
          <ExternalLink className="w-3 h-3 text-[#6378EA]" />
        </a>
      </div>
    </div>
  );
}
