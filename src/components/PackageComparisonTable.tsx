'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PaymentPeriodType, PlanComparisonRow } from '@/types';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { NEEDS_CHECK_IDS } from '@/data/needsCheckIds';
import { VERIFICATION } from '@/data/verification';
import { ArrowUpDown, ShieldAlert, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * 列宽（占整张表的百分比，合计 100）：固定列宽，切换“入门月付 / 最低年付 / 一次性流量包”或排序时框架不会跳动。
 * 顺序：品牌、套餐名称、付款周期、实付金额、折合月价、流量额度、每 GB 单价、倍率、设备/限速、资料状态、操作。
 */
const COLUMN_WIDTHS = ['11.2%', '10.4%', '6.2%', '6.8%', '8%', '8.9%', '6.8%', '10.4%', '14%', '9.8%', '7.5%'];
/** 首页精简版少三列（倍率、设备/限速、资料状态）：品牌、套餐、周期、实付、折合月价、流量、每 GB、操作 */
const COMPACT_WIDTHS = ['16%', '19%', '8%', '10%', '12%', '13%', '11%', '11%'];

const PERIOD_FILTERS: { id: PaymentPeriodType; label: string }[] = [
  { id: 'monthly', label: '入门月付' },
  { id: 'annual', label: '最低年付' },
  { id: 'onetime_traffic_pack', label: '一次性流量包' }
];

/**
 * variant="full"：完整表（/plans/ 页），34 行全部展开；variant="compact"：首页精简版，只列前 limit 行并链到完整页。
 * 两种都保留“入门月付 / 最低年付 / 一次性流量包”切换和排序。
 */
export default function PackageComparisonTable({ rows, variant = 'full', limit }: { rows: PlanComparisonRow[]; variant?: 'full' | 'compact'; limit?: number }) {
  const full = variant === 'full';
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
  const shownRows = limit ? displayRows.slice(0, limit) : displayRows;
  const widths = full ? COLUMN_WIDTHS : COMPACT_WIDTHS;

  return (
    <section id="plans" className={`${full ? 'py-10' : 'py-16 border-t border-[#E2E8F0]/80 bg-white/40 backdrop-blur-sm'} scroll-mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
              {full ? `全部 ${displayRows.length} 家` : '价格与周期'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              {full ? '分清实付总价与月均折算' : '套餐比较：先看前几家的实付与月均'}
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
              年付低价的前提是首日一次性支付整年费用。每家这里只列一档，完整价格选项见各品牌页。表格严格区分<strong className="text-[#17233A]">实际付款金额</strong>与折合月价；价格由{VERIFICATION.label}，之后仍可能调整，以结算页为准。
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
              {limit && limit < displayRows.length ? (
                <>显示 <strong className="text-[#17233A]">{shownRows.length}</strong> / {displayRows.length} 家</>
              ) : (
                <>当前 <strong className="text-[#17233A]">{displayRows.length}</strong> 家</>
              )}
            </div>
          </div>
        </div>

        {/* Table Container - Apple Liquid Glass
            宽屏（xl，1280px 以上）：整张表按固定列宽排满框，不再有左右拖动条，也不再框内滚动，34 行一次展开；
            表头吸附在页头下面（页头高 65px），往下滚页面时表头一直在。
            窄屏：仍是框内滚动（表格最小宽 1180px），表头固定在框内顶部。
            外框用 overflow-clip 而不是 overflow-hidden：只裁圆角，不会变成滚动容器，吸附表头才对页面滚动生效。 */}
        <div className="liquid-glass rounded-2xl border border-[#E2E8F0] overflow-clip shadow-xs">
          <div className={full ? 'overflow-auto max-h-[80vh] xl:overflow-visible xl:max-h-none' : 'overflow-x-auto'}>
            <table className={`w-full ${full ? 'min-w-[1180px]' : 'min-w-[820px]'} table-fixed text-left text-xs border-collapse`}>
              <colgroup>
                {widths.map((width, i) => (
                  <col key={i} style={{ width }} />
                ))}
              </colgroup>
              <thead className={full ? 'sticky top-0 xl:top-[65px] z-10 shadow-[0_1px_0_#E2E8F0,0_6px_10px_-8px_rgba(23,35,58,0.25)]' : ''}>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] font-semibold whitespace-nowrap">
                  <th className="py-3 px-3">推荐位 / 品牌</th>
                  <th className="py-3 px-3">套餐名称</th>
                  <th className="py-3 px-3">付款周期</th>
                  <th className="py-3 px-3">实付金额</th>
                  <th className="py-3 px-3">折合月价</th>
                  <th className="py-3 px-3">流量额度</th>
                  <th className="py-3 px-3">每 GB 单价</th>
                  {full && (
                    <>
                      <th className="py-3 px-3">倍率</th>
                      <th className="py-3 px-3">设备 / 限速</th>
                      <th className="py-3 px-3">资料状态</th>
                    </>
                  )}
                  <th className="py-3 px-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {shownRows.map((row) => (
                  <tr
                    key={row.rowId}
                    className="hover:bg-[#F0F5F9]/70 transition-colors"
                  >
                    {/* Brand */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 shrink-0 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold flex items-center justify-center border border-[#E2E8F0]">
                          {row.displayRank}
                        </span>
                        <div>
                          <span className="font-bold text-[#17233A]">{row.brandName}</span>
                          {row.brandId === 'lingdongyun' && (
                            <span className="ml-1.5 text-[10px] px-1 py-0.2 rounded bg-[#EBF2F7] text-[#6378EA] font-semibold">
                              主推
                            </span>
                          )}
                          {!full && NEEDS_CHECK_IDS.includes(row.brandId) && (
                            <div className="mt-0.5 inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-semibold">
                              资料待核对
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Plan Name */}
                    <td className="py-3 px-3 font-medium text-[#17233A] break-words">
                      <div>{row.planName}</div>
                      {row.note && (
                        <div className="text-[10px] text-[#94A3B8] font-normal mt-0.5">{row.note}</div>
                      )}
                    </td>

                    {/* Period */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        {row.periodType === 'onetime_traffic_pack' ? '一次性' : row.periodLabel}
                      </span>
                    </td>

                    {/* Actual Amount */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-[#17233A] text-sm">
                        {fmtYuan(row.actualAmount)}
                      </span>
                    </td>

                    {/* Calculated Monthly */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {row.calculatedMonthly !== null ? (
                        <span className="font-semibold text-[#6378EA]">
                          {fmtYuan(row.calculatedMonthly)} / 月
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">-</span>
                      )}
                    </td>

                    {/* Traffic */}
                    <td className="py-3 px-3 text-[#475569]">
                      {row.trafficLabel}
                    </td>

                    {/* Per GB */}
                    <td className="py-3 px-3 text-[#475569] whitespace-nowrap">
                      {fmtPerGB(row.perGB)}
                    </td>

                    {full && (<>
                    {/* Multiplier */}
                    <td className="py-3 px-3 text-[#64748B] break-words">
                      {row.multiplier || "未标注"}
                    </td>

                    {/* Devices & Speed：各家 MD 的原话，可能较长，允许换行 */}
                    <td className="py-3 px-3 text-[#64748B] break-words space-y-0.5">
                      {row.usageNotes.length > 0
                        ? row.usageNotes.map((item) => <div key={item}>{item}</div>)
                        : "未标注"}
                    </td>

                    {/* Verification Status：固定列宽下“站长核验于 日期”允许折成两行 */}
                    <td className="py-3 px-3">
                      {row.isVerified ? (
                        <span className="flex items-start gap-1 text-[11px] leading-snug text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{VERIFICATION.label}</span>
                        </span>
                      ) : (
                        <span className="flex items-start gap-1 text-[11px] leading-snug text-amber-600 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>待核验</span>
                        </span>
                      )}
                      <div className="text-[10px] text-[#94A3B8] mt-0.5">资料日 {row.dataDate}</div>
                      {NEEDS_CHECK_IDS.includes(row.brandId) && (
                        <div className="mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-semibold">
                          资料待核对
                        </div>
                      )}
                    </td>

                    </>)}

                    {/* Action Link */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
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
              <span>注：请以购买前结算页的实时金额为准。倍率、设备数、限速照各家资料标注显示，“未标注”表示资料没写；{hasDeviceCap ? '个别档位标了设备数上限，以该行标注为准；' : ''}标“资料待核对”的品牌，是站长的机场资料自己标注存疑的；每家完整的资料见品牌页。</span>
            </div>
            {full ? (
              <Link href="/tools/cost-per-gb/" className="text-[#6378EA] hover:underline font-semibold shrink-0">
                使用每GB实际成本计算器 →
              </Link>
            ) : (
              <Link href="/plans/" className="text-[#6378EA] hover:underline font-semibold shrink-0">
                查看全部 {displayRows.length} 家价格对比 →
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
