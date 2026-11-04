import React from 'react';
import type { Metadata } from 'next';
import BrandDirectoryGrid from '@/components/BrandDirectoryGrid';
import { BRANDS } from '@/data/brands';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import { Info } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: '34家机场完整资料目录｜编辑推荐顺序与品牌名录',
  description: `收录34家机场品牌，前${SITE_META.fixed_editorial_positions}位按固定编辑推荐顺序排列，包含别名、线路标注、入门月付与最低年付价格，以及注册入口。价格由站长核验于 2026-11-03。`,
  path: '/airports/'
});

export default function AirportsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">34家机场完整目录</span>
        </nav>

        <div className="p-5 rounded-2xl liquid-glass border border-[#CBD5E1] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#6378EA]">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#17233A]">34 家机场品牌全景目录</h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                前 {SITE_META.fixed_editorial_positions} 位固定顺序 · 价格由站长核验于 2026-11-03 · 包含英文别名识别与商业跳转披露
              </p>
            </div>
          </div>

          <Link
            href="/editorial-policy/"
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#6378EA] border border-[#CBD5E1] transition-colors shrink-0 shadow-2xs"
          >
            查阅编辑推荐准则
          </Link>
        </div>
      </div>

      <BrandDirectoryGrid brands={BRANDS} />
    </div>
  );
}
