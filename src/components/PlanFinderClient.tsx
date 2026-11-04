'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { PLANS } from '@/data/packages';
import { VERIFICATION } from '@/data/verification';
import { Calculator, Search, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';

type Period = 'monthly' | 'annual';

interface Candidate {
  id: string;
  brandId: string;
  brandName: string;
  rank: number;
  planName: string;
  period: Period;
  price: number;
  monthlyGB: number;
  perGB: number;
  perMonth: number;
  note?: string;
}

/** 月付价达到这个数的档位视为独享或定制线路，不参与匹配 */
const DEDICATED_MONTHLY_PRICE = 500;

// 只匹配月付和年付（每月发放）；一次性流量包不按月重置，另见“偶尔使用怎么选”
const CANDIDATES: Candidate[] = PLANS.flatMap((plan) => {
  const brand = BRANDS.find((b) => b.id === plan.brand_id)!;
  return plan.price_options.flatMap((option) => {
    if (option.period_type !== 'monthly' && option.period_type !== 'annual') return [];
    if (option.payment_amount === null || !option.total_traffic_gb || !plan.advertised_traffic_gb) return [];
    if (option.period_type === 'monthly' && option.payment_amount >= DEDICATED_MONTHLY_PRICE) return [];
    const months = option.period_type === 'monthly' ? 1 : 12;
    return [{
      id: option.id,
      brandId: brand.id,
      brandName: brand.name,
      rank: brand.display_rank,
      planName: plan.plan_name,
      period: option.period_type,
      price: option.payment_amount,
      monthlyGB: plan.advertised_traffic_gb,
      perGB: option.payment_amount / option.total_traffic_gb,
      perMonth: option.payment_amount / months,
      note: option.notes
    }];
  });
});

const num = (v: string, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};

export default function PlanFinderClient() {
  // 用量估算器（默认值是常见估算，可改）
  const [hd, setHd] = useState('10');
  const [hdRate, setHdRate] = useState('3');
  const [uhd, setUhd] = useState('0');
  const [uhdRate, setUhdRate] = useState('7');
  const [dailyGB, setDailyGB] = useState('5');
  const [downloadGB, setDownloadGB] = useState('10');
  const [marginPct, setMarginPct] = useState('20');

  const estimate = useMemo(() => {
    const base = num(hd) * num(hdRate) + num(uhd) * num(uhdRate) + num(dailyGB) + num(downloadGB);
    return Math.ceil(base * (1 + num(marginPct) / 100));
  }, [hd, hdRate, uhd, uhdRate, dailyGB, downloadGB, marginPct]);

  // 匹配条件
  const [usage, setUsage] = useState('100');
  const [period, setPeriod] = useState<'all' | Period>('all');
  const [budget, setBudget] = useState('');
  const [includeOversized, setIncludeOversized] = useState(false);
  const [limit, setLimit] = useState(12);

  // 默认只看额度不超过用量 3 倍的档位：买太大的档位，闲置额度会把真实单价抬高
  const results = useMemo(() => {
    const need = num(usage);
    const cap = budget.trim() === '' ? null : num(budget);
    const ceiling = includeOversized ? Infinity : Math.max(need * 3, 60);
    return CANDIDATES
      .filter((c) => c.monthlyGB >= need && c.monthlyGB <= ceiling)
      .filter((c) => period === 'all' || c.period === period)
      .filter((c) => cap === null || (period === 'all' ? c.perMonth <= cap : c.price <= cap))
      .sort((a, b) => a.perGB - b.perGB || a.price - b.price);
  }, [usage, period, budget, includeOversized]);

  const shown = results.slice(0, limit);
  const budgetLabel = period === 'annual' ? '年付上限（元）' : period === 'monthly' ? '月付上限（元）' : '折合月价上限（元）';

  return (
    <div className="space-y-8">
      {/* Step 1: usage estimator */}
      <section className="liquid-glass rounded-2xl p-6 border border-[#CBD5E1] space-y-4">
        <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#6378EA]" />
          <span>第一步：估算每月用量（可跳过，直接填下面的用量）</span>
        </h2>
        <p className="text-xs text-[#64748B] leading-relaxed">
          每小时流量的默认值是常见估算，不同播放器和清晰度差别很大，建议按自己手机或路由器的流量统计修改。估算值只用来选档位，不是任何套餐的承诺。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Field label="1080p 视频 小时/月" value={hd} onChange={setHd} />
          <Field label="1080p 每小时 GB" value={hdRate} onChange={setHdRate} />
          <Field label="4K 视频 小时/月" value={uhd} onChange={setUhd} />
          <Field label="4K 每小时 GB" value={uhdRate} onChange={setUhdRate} />
          <Field label="网页、社交、AI 对话 GB/月" value={dailyGB} onChange={setDailyGB} />
          <Field label="下载与上传 GB/月" value={downloadGB} onChange={setDownloadGB} />
          <Field label="预留余量 %" value={marginPct} onChange={setMarginPct} />
          <div className="p-3 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1] flex flex-col justify-center">
            <div className="text-[#64748B]">估算月用量</div>
            <div className="text-xl font-extrabold text-[#17233A]">{estimate} GB</div>
            <button
              type="button"
              onClick={() => setUsage(String(estimate))}
              className="mt-1 text-[11px] font-semibold text-[#6378EA] hover:text-[#4F64D6] text-left"
            >
              用这个值去匹配 →
            </button>
          </div>
        </div>
      </section>

      {/* Step 2: matcher */}
      <section className="liquid-glass rounded-2xl p-6 border border-[#CBD5E1] space-y-4">
        <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
          <Search className="w-5 h-5 text-[#6378EA]" />
          <span>第二步：按用量和预算筛选套餐</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Field label="每月需要的流量 GB" value={usage} onChange={setUsage} />
          <div>
            <label className="block text-[#64748B] mb-1 font-medium">付款周期</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'all' | Period)}
              className="w-full px-2.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-semibold focus:border-[#6378EA] focus:outline-none"
            >
              <option value="all">月付和年付都看</option>
              <option value="monthly">只看月付</option>
              <option value="annual">只看年付</option>
            </select>
          </div>
          <Field label={budgetLabel} value={budget} onChange={setBudget} placeholder="留空表示不限" />
        </div>
        <label className="flex items-center gap-2 text-xs text-[#64748B]">
          <input
            type="checkbox"
            checked={includeOversized}
            onChange={(e) => setIncludeOversized(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#6378EA]"
          />
          <span>也显示额度超过用量 3 倍的大档位（账面单价更低，但用不完就是浪费）</span>
        </label>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>
            符合条件 <strong className="text-[#17233A]">{results.length}</strong> 个价格选项，按每 GB 单价从低到高，显示前 {Math.min(limit, results.length)} 个。
          </span>
          {results.length > limit && (
            <button type="button" onClick={() => setLimit(limit + 12)} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">
              再显示 12 个
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-sm text-[#475569] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>没有同时满足用量和预算的档位。可以放宽预算、降低用量，或者改成“月付和年付都看”；用量很低的话也可以看<Link href="/guides/occasional-use/" className="text-[#6378EA] font-semibold">偶尔使用怎么选</Link>。</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] whitespace-nowrap">
                  <th className="py-2.5 px-3">推荐位 / 品牌</th>
                  <th className="py-2.5 px-3">套餐</th>
                  <th className="py-2.5 px-3">周期</th>
                  <th className="py-2.5 px-3">实付</th>
                  <th className="py-2.5 px-3">折合月价</th>
                  <th className="py-2.5 px-3">每月流量</th>
                  <th className="py-2.5 px-3">每 GB</th>
                  <th className="py-2.5 px-3 text-right">查看</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {shown.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F0F5F9]/70">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="inline-flex w-5 h-5 mr-1.5 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold items-center justify-center border border-[#E2E8F0]">{c.rank}</span>
                      <span className="font-bold text-[#17233A]">{c.brandName}</span>
                    </td>
                    <td className="py-2.5 px-3 min-w-[120px]">
                      <div className="font-medium text-[#17233A]">{c.planName}</div>
                      {c.note && <div className="text-[10px] text-[#94A3B8]">{c.note}</div>}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-[#475569]">{c.period === 'monthly' ? '月付' : '年付'}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap font-bold text-[#17233A]">{fmtYuan(c.price)}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-[#6378EA] font-semibold">{fmtYuan(Math.round(c.perMonth * 100) / 100)}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-[#475569]">{c.monthlyGB}GB</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-[#475569]">{fmtPerGB(c.perGB)}</td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <Link href={`/airports/${c.brandId}/`} className="inline-flex items-center gap-1 font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                        <span>品牌页</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ul className="text-[11px] text-[#64748B] leading-relaxed space-y-1 list-disc list-outside pl-4">
          <li>价格来自本站价格表，{VERIFICATION.label}；套餐价格或订阅规则如有变动，以官方页面为准。</li>
          <li>每 GB 按标称流量计算，本站口径 1 倍率、不限设备、不限速；年付按每月发放额度匹配，钱是一次付清的。</li>
          <li>不含一次性流量包和独享定制线路；流量包适合低频备用，见<Link href="/guides/occasional-use/" className="text-[#6378EA] font-semibold">偶尔使用怎么选</Link>和<Link href="/guides/billing-and-traffic-rules/" className="text-[#6378EA] font-semibold">月付年付与重置规则</Link>。</li>
          <li>品牌页里的注册入口是推广链接，你的购买价格与官网相同，佣金由服务商承担，不加价。</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 text-xs">
        <Link href="/tools/cost-per-gb/" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] font-semibold text-[#6378EA] hover:border-[#6378EA]/40">
          <span>每 GB 成本折算器</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
        <Link href="/guides/cost-per-gb/" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] font-semibold text-[#6378EA] hover:border-[#6378EA]/40">
          <span>每 GB 成本怎么算</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link href="/guides/value-for-money/" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] font-semibold text-[#6378EA] hover:border-[#6378EA]/40">
          <span>性价比机场怎么选</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[#64748B] mb-1 font-medium">{label}</label>
      <input
        type="number"
        min={0}
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#17233A] font-semibold focus:border-[#6378EA] focus:outline-none"
      />
    </div>
  );
}
