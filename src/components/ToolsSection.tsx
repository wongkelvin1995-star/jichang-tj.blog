'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

/** 首页底部的工具入口：每 GB 成本折算器的迷你演示，常见问题已经挪到首页靠前的位置（HomeFaq）。 */
export default function ToolsSection() {
  // Mini calculator state
  const [amount, setAmount] = useState<number>(28);
  const [traffic, setTraffic] = useState<number>(280);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [usedTraffic, setUsedTraffic] = useState<number>(80);

  // Calculations
  const effectiveTraffic = multiplier > 0 ? traffic / multiplier : traffic;
  const advertisedUnitCost = effectiveTraffic > 0 ? (amount / effectiveTraffic).toFixed(2) : '0.00';
  const actualUsageUnitCost = usedTraffic > 0 ? (amount / usedTraffic).toFixed(2) : '0.00';

  return (
    <section id="tools" className="py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tool Entry Chamber - Apple Liquid Glass */}
        <div className="rounded-3xl liquid-glass p-6 sm:p-8 border border-[#CBD5E1] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#6378EA]/10 via-[#9BB7CF]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Tool intro */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
                <Calculator className="w-3.5 h-3.5" />
                <span>实用测算工具</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
                每GB成本折算器：标称单价 vs 实际使用单价
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                许多套餐标榜“0.1元/GB”，但如果当月你只消耗了一小半流量，你的真实单价可能高达 0.35元/GB。输入你的实付金额与真实月消耗，立即看清两套完全不同的单价口径。
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/tools/cost-per-gb/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6378EA] hover:text-[#4F64D6]"
                >
                  <span>打开全功能成本测算器（含跨周期保活与倍率加权）</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/tools/plan-finder/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6378EA] hover:text-[#4F64D6]"
                >
                  <span>套餐匹配器：填用量和预算，直接筛出符合的档位</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Mini Demo */}
            <div className="lg:col-span-6 rounded-2xl bg-white p-5 sm:p-6 border border-[#CBD5E1] shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
                <div>
                  <label className="block text-[#64748B] mb-1 font-medium">实付金额 (元)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#64748B] mb-1 font-medium">套餐标称 (GB)</label>
                  <input
                    type="number"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#64748B] mb-1 font-medium">节点倍率 (x)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={multiplier}
                    onChange={(e) => setMultiplier(Number(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#64748B] mb-1 font-medium">真实月用量 (GB)</label>
                  <input
                    type="number"
                    value={usedTraffic}
                    onChange={(e) => setUsedTraffic(Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:outline-none"
                  />
                </div>
              </div>

              {/* Result Preview */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E2E8F0]">
                <div className="p-3 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1]">
                  <div className="text-[11px] text-[#64748B]">标称额度单价</div>
                  <div className="text-xl font-bold text-[#17233A] mt-0.5">
                    ¥{advertisedUnitCost} <span className="text-xs font-normal text-[#64748B]">/ GB</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-1">假定流量 100% 用完</div>
                </div>

                <div className="p-3 rounded-xl bg-[#EBF2F7] border border-[#9BB7CF]/60">
                  <div className="text-[11px] text-[#4F64D6] font-semibold">实际使用单价</div>
                  <div className="text-xl font-bold text-[#6378EA] mt-0.5">
                    ¥{actualUsageUnitCost} <span className="text-xs font-normal text-[#64748B]">/ GB</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-1">
                    未用额度浪费：{Math.max(0, traffic - usedTraffic)} GB
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
