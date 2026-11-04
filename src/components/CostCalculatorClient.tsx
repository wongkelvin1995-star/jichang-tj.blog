'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck } from 'lucide-react';

export default function CostCalculatorClient() {
  const [amount, setAmount] = useState<number>(28);
  const [traffic, setTraffic] = useState<number>(280);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [usedTraffic, setUsedTraffic] = useState<number>(80);
  const [periodMonths, setPeriodMonths] = useState<number>(1);

  // Calculations
  const validMultiplier = multiplier > 0 ? multiplier : 1;
  const effectiveTraffic = traffic > 0 ? traffic / validMultiplier : 0;
  
  // Advertised unit cost per GB
  const advertisedUnitCost = effectiveTraffic > 0 
    ? (amount / effectiveTraffic).toFixed(3) 
    : '0.000';

  // Actual usage unit cost per GB
  const actualUsageUnitCost = usedTraffic > 0 
    ? (amount / usedTraffic).toFixed(3) 
    : '0.000';

  // Monthly equivalent amount
  const monthlyEquivalent = periodMonths > 0 
    ? (amount / periodMonths).toFixed(2) 
    : amount.toFixed(2);

  // Waste ratio
  const unusedTraffic = Math.max(0, effectiveTraffic - usedTraffic);
  const wasteRatio = effectiveTraffic > 0 
    ? ((unusedTraffic / effectiveTraffic) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">每GB真实成本折算器</span>
        </nav>

        {/* Header - Apple Liquid Glass */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <Calculator className="w-3.5 h-3.5" />
            <span>精算法则</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            机场每GB成本折算器：额度单价 vs 实耗单价
          </h1>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            严格按照数据约定执行统一口径计算，彻底分清“标称额度单价”与“真实消耗单价”。
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Controls Form */}
          <div className="md:col-span-6 liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-4">
            <h2 className="text-base font-bold text-[#17233A] flex items-center gap-2">
              <span>输入套餐参数</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                单次实付总金额（元）
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 focus:outline-none"
              />
              <span className="text-[10px] text-[#94A3B8]">输入购物车最终支付的真实人民币</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                标称额度（GB / 周期）
              </label>
              <input
                type="number"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                常用节点平均倍率（x）
              </label>
              <input
                type="number"
                step="0.1"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 focus:outline-none"
              />
              <span className="text-[10px] text-[#94A3B8]">如使用2倍率节点，则实际有效额度减半</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                周期内真实消耗用量（GB）
              </label>
              <input
                type="number"
                value={usedTraffic}
                onChange={(e) => setUsedTraffic(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 focus:outline-none"
              />
              <span className="text-[10px] text-[#94A3B8]">未用完在清零日将直接作废</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                付款跨越月数（月付选1，年付选12）
              </label>
              <input
                type="number"
                value={periodMonths}
                onChange={(e) => setPeriodMonths(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#17233A] font-bold focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Board */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Box A: Advertised vs Actual */}
            <div className="liquid-glass rounded-2xl p-6 border border-[#CBD5E1] space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#17233A]">折算结果看板</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] font-medium">标称额度单价</div>
                  <div className="text-2xl font-black text-[#17233A] mt-1">
                    ¥{advertisedUnitCost}
                    <span className="text-xs font-normal text-[#94A3B8]"> / GB</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-1">全额用尽时的理论单价</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1]">
                  <div className="text-xs text-[#4F64D6] font-bold">实际使用单价</div>
                  <div className="text-2xl font-black text-[#6378EA] mt-1">
                    ¥{actualUsageUnitCost}
                    <span className="text-xs font-normal text-[#64748B]"> / GB</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-1">你为真实下行支付的单价</div>
                </div>
              </div>

              {/* Monthly Equivalent */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#64748B] font-medium">折合月度实际支出</div>
                  <div className="text-[10px] text-[#94A3B8]">按付款周期月数均摊</div>
                </div>
                <div className="text-xl font-bold text-[#17233A]">
                  ¥{monthlyEquivalent} <span className="text-xs font-normal text-[#94A3B8]">/ 月</span>
                </div>
              </div>

              {/* Waste Meter */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">闲置浪费率：</span>
                  <span className="font-bold text-amber-700">{wasteRatio}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#6378EA] to-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, Number(wasteRatio)))}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#94A3B8] flex justify-between">
                  <span>有效消耗：{usedTraffic} GB</span>
                  <span>闲置作废：{unusedTraffic.toFixed(0)} GB</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Educational Policy Reference */}
        <div className="p-6 rounded-2xl liquid-glass border border-[#E2E8F0] text-xs text-[#64748B] leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#17233A]">
            <ShieldCheck className="w-4 h-4 text-[#6378EA]" />
            <span>计算公式与口径说明</span>
          </div>
          <p>
            1. <strong>有效标称额度</strong> = 标称流量额度 ÷ 节点倍率<br />
            2. <strong>标称额度单价</strong> = 实付金额 ÷ 有效标称额度<br />
            3. <strong>实际使用单价</strong> = 实付金额 ÷ 实际消耗流量<br />
            4. <strong>闲置浪费率</strong> = (有效标称额度 - 实际消耗流量) ÷ 有效标称额度 × 100%
          </p>
        </div>

      </div>
    </div>
  );
}
