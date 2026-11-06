import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import PackageComparisonTable from '@/components/PackageComparisonTable';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { getComparisonRows } from '@/data/packages';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: '机场套餐价格对比：34 家入门月付、最低年付与一次性流量包',
  description: `把 ${SITE_META.brand_count} 家机场的入门月付、最低年付和一次性流量包放在同一张表里，分清实付金额与折合月价，附倍率、设备数和限速的资料标注。价格由${VERIFICATION.label}。`,
  path: '/plans/'
});

export default function PlansPage() {
  const canonical = `${SITE_META.url}/plans/`;
  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([{ name: '首页', url: `${SITE_META.url}/` }, { name: '套餐价格对比', url: canonical }])} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="font-semibold text-[#6378EA]">套餐价格对比</span>
        </nav>
        <header className="space-y-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17233A] sm:text-4xl">机场套餐价格对比：{SITE_META.brand_count} 家入门月付、最低年付与一次性流量包</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-[#475569] sm:text-base">
            这张表按编辑推荐顺序列出每家的入门月付、最低年付和最低价一次性流量包，也可以按实付金额或每 GB 单价重新排序。“实付金额”是付款当天要付的钱，“折合月价”只用于比较；倍率、设备数和限速照各家资料里的写法，资料没写的显示“未标注”。想按自己的用量和预算筛选，用<Link href="/tools/plan-finder/" className="font-semibold text-[#6378EA]">套餐匹配器</Link>；想算真实单价，用<Link href="/tools/cost-per-gb/" className="font-semibold text-[#6378EA]">每 GB 成本计算器</Link>。
          </p>
        </header>
      </div>
      <PackageComparisonTable rows={getComparisonRows()} variant="full" />
    </div>
  );
}
