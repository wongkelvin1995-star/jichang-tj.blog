'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PaymentPeriodType, PlanComparisonRow } from '@/types';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { VERIFICATION } from '@/data/verification';
import { ArrowUpDown, ShieldAlert, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const PERIOD_FILTERS: { id: PaymentPeriodType; label: string }[] = [
  { id: 'monthly', label: '入门月付' },
  { id: 'annual', label: '最低年付' },
  { id: 'onetime_traffic_pack', label: '一次性流量包' }
];

export default function PackageComparisonTable({ rows }: { rows: PlanComparisonRow[] }) {
  const [sortBy, setSortBy] = useState<'editorial' | 'price_asc' | 'price_desc' | 'per_gb_asc'>('editorial');
  const [filterPeriod, setFilterPeriod] = useState<PaymentPeriodType>('monthly');
  // 个别档位在套餐详情里标了设备数上限（usageNotes 里带“最多 N 台”），脚注要如实说明
  const hasDeviceCap = rows.some((r) => r.usageNotes.some((note) => note.includes('最多')));

  // Filter and sort. Each view holds a single payment period, so price sorting stays comparable.
  const displayRows = useMemo(() => {
    const list = rows.filter(r => r.periodType === filterPeriod);

    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.actualAmount - b.actualAmount);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.actualAmount - a.actualAmount);
    } else if (sortBy === 'per_gb_asc') {
      list.sort((a, b) => a.perGB - b.perGB);
    } else {
      // Default: editorial rank
      list.sort((a, b) => a.displayRank - b.displayRank);
    }

    return list;
  }, [rows, filterPeriod, sortBy]);

  return (
    <section id="plans" className="py-16 border-t border-[#E2E8F0]/80 bg-white/40 backdrop-blur-sm scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
              STEP 3 · 价格与周期
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              套餐比较：分清实付总价与月均折算
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
              年付低价的前提是首日一次性支付整年费用。每家这里只列一档，完整价格选项见各品牌页。以下表格严格区分<strong className="text-[#17233A]">实际付款金额</strong>与折合月价；价格由{VERIFICATION.label}，之后仍可能调整，以结算页为准。
            </p>
          </div>

          {/* Filter Controls - Apple Segmented */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Period Segmented */}
            <div className="flex items-center p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] text-xs">
              {PERIOD_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterPeriod(filter.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    filterPeriod === filter.id
                      ? 'bg-white text-[#6378EA] shadow-xs border border-[#CBD5E1]'
                      : 'text-[#64748B] hover:text-[#17233A]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] bg-white px-3 py-1.5 rounded-xl border border-[#CBD5E1]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6378EA]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                aria-label="排序方式"
                className="bg-transparent text-[#17233A] font-medium focus:outline-none cursor-pointer"
              >
                <option value="editorial">按编辑推荐顺序</option>
                <option value="price_asc">实付金额：从低到高</option>
                <option value="price_desc">实付金额：从高到低</option>
                <option value="per_gb_asc">每 GB 单价：从低到高</option>
              </select>
            </div>

            <div className="text-xs text-[#64748B]">
              当前 <strong className="text-[#17233A]">{displayRows.length}</strong> 家
            </div>
          </div>
        </div>

        {/* Table Container - Apple Liquid Glass */}
        <div className="liquid-glass rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-auto max-h-[720px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] font-semibold whitespace-nowrap">
                  <th className="py-3.5 px-4">推荐位 / 品牌</th>
                  <th className="py-3.5 px-4">套餐名称</th>
                  <th className="py-3.5 px-4">付款周期</th>
                  <th className="py-3.5 px-4">实付金额</th>
                  <th className="py-3.5 px-4">折合月价</th>
                  <th className="py-3.5 px-4">流量额度</th>
                  <th className="py-3.5 px-4">每 GB 单价</th>
                  <th className="py-3.5 px-4">倍率</th>
                  <th className="py-3.5 px-4">设备 / 限速</th>
                  <th className="py-3.5 px-4">资料状态</th>
                  <th className="py-3.5 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {displayRows.map((row) => (
                  <tr
                    key={row.rowId}
                    className="hover:bg-[#F0F5F9]/70 transition-colors"
                  >
                    {/* Brand */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="w-5 h-5 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold flex items-center justify-center border border-[#E2E8F0]">
                          {row.displayRank}
                        </span>
                        <div>
                          <span className="font-bold text-[#17233A]">{row.brandName}</span>
                          {row.brandId === 'lingdongyun' && (
                            <span className="ml-1.5 text-[10px] px-1 py-0.2 rounded bg-[#EBF2F7] text-[#6378EA] font-semibold">
                              主推
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Plan Name */}
                    <td className="py-3.5 px-4 font-medium text-[#17233A] min-w-[140px]">
                      <div>{row.planName}</div>
                      {row.note && (
                        <div className="text-[10px] text-[#94A3B8] font-normal mt-0.5">{row.note}</div>
                      )}
                    </td>

                    {/* Period */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        {row.periodLabel}
                      </span>
                    </td>

                    {/* Actual Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-[#17233A] text-sm">
                        {fmtYuan(row.actualAmount)}
                      </span>
                    </td>

                    {/* Calculated Monthly */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {row.calculatedMonthly !== null ? (
                        <span className="font-semibold text-[#6378EA]">
                          {fmtYuan(row.calculatedMonthly)} / 月
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">-</span>
                      )}
                    </td>

                    {/* Traffic */}
                    <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">
                      {row.trafficLabel}
                    </td>

                    {/* Per GB */}
                    <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">
                      {fmtPerGB(row.perGB)}
                    </td>

                    {/* Multiplier */}
                    <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                      {row.multiplier || "未标注"}
                    </td>

                    {/* Devices & Speed */}
                    <td className="py-3.5 px-4 text-[#64748B] min-w-[130px]">
                      {row.usageNotes.length > 0
                        ? row.usageNotes.map((item) => <div key={item}>{item}</div>)
                        : "未标注"}
                    </td>

                    {/* Verification Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {row.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{VERIFICATION.label}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>待核验</span>
                        </span>
                      )}
                      <div className="text-[10px] text-[#94A3B8] mt-0.5">资料日 {row.dataDate}</div>
                    </td>

                    {/* Action Link */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/airports/${row.brandId}/`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6]"
                      >
                        <span>全部价格</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Disclaimer */}
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#6378EA] shrink-0" />
              <span>注：请以购买前结算页的实时金额为准。倍率、设备数、限速为站长核验的统一口径（1 倍率、不限设备、不限速）{hasDeviceCap ? '；个别档位在套餐详情里标了设备数上限，以该行标注为准' : ''}。</span>
            </div>
            <Link href="/tools/cost-per-gb/" className="text-[#6378EA] hover:underline font-semibold shrink-0">
              使用每GB实际成本计算器 →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
