import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import PlanFinderClient from '@/components/PlanFinderClient';
import { BRAND_COUNT } from '@/data/guideStats';
import { PLANS } from '@/data/packages';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import { Search } from 'lucide-react';

const OPTION_COUNT = PLANS.reduce((sum, plan) => sum + plan.price_options.length, 0);

export const metadata: Metadata = buildMetadata({
  title: '套餐匹配器：按每月用量和预算筛出符合的机场套餐',
  description: `输入每月需要的流量和预算，从 ${BRAND_COUNT} 家机场、${OPTION_COUNT} 个价格选项里筛出流量够用、单价最低的月付与年付档位，附用量估算器。价格由站长核验，不含一次性流量包。`,
  path: '/tools/plan-finder/'
});

export default function PlanFinderPage() {
  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([
        { name: '首页', url: `${SITE_META.url}/` },
        { name: '套餐匹配器', url: `${SITE_META.url}/tools/plan-finder/` }
      ])} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">套餐匹配器</span>
        </nav>

        {/* Header */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <Search className="w-3.5 h-3.5" />
            <span>实用工具</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            套餐匹配器：按每月用量和预算筛出符合的套餐
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed max-w-3xl">
            先估一下每月用多少流量，再填预算，工具会从 {BRAND_COUNT} 家机场的 {OPTION_COUNT} 个价格选项里，把流量够用、单价最低的月付和年付档位列出来。所有计算都在你的浏览器里完成，数据来自本站价格表，不会上传任何输入。
          </p>
        </div>

        <PlanFinderClient />

        {/* How it works */}
        <section className="mt-10 liquid-glass rounded-2xl p-6 border border-[#E2E8F0] space-y-3 text-sm text-[#475569] leading-relaxed">
          <h2 className="text-base font-bold text-[#17233A]">它是怎么算的</h2>
          <ul className="list-disc list-outside pl-5 space-y-1.5">
            <li>只保留“每月发放额度 ≥ 你填的用量”的月付和年付档；年付按每月额度匹配，但实付是一次付清的整年费用。</li>
            <li>每 GB 单价 = 实付金额 ÷ 周期总流量，按标称流量计算、不按倍率折算，排序只看这一项，不看品牌排名。</li>
            <li>“折合月价”只用于比较，不是每月支出；预算留空表示不限制。</li>
            <li>不含一次性流量包（不按月重置，适合低频备用）和独享定制线路（月付 500 元以上）。</li>
          </ul>
          <p className="text-xs text-[#64748B]">
            选出候选后，再按<Link href="/guides/refund-and-purchase-checklist/" className="text-[#6378EA] font-semibold">购买前核对清单</Link>确认退款、设备和流量规则；想按预算和用量一起比较，看<Link href="/guides/value-for-money/" className="text-[#6378EA] font-semibold">性价比机场怎么选</Link>，想自己算真实单价，看<Link href="/guides/cost-per-gb/" className="text-[#6378EA] font-semibold">每 GB 成本怎么算</Link>。
          </p>
        </section>
      </div>
    </div>
  );
}
