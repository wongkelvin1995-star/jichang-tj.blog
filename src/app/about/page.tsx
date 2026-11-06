import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import { Info, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '关于本站与作者说明',
  description: '了解机场推荐博客的定位、资料来源、更新与纠错机制：价格由站长核验，资料来自站长提供的机场资料，不编造作者资历，不伪造测速和评价。',
  path: '/about/'
});

export default function AboutPage() {
  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([{ name: '首页', url: `${SITE_META.url}/` }, { name: '关于本站', url: `${SITE_META.url}/about/` }])} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">关于本站</span>
        </nav>

        {/* Header */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <Info className="w-3.5 h-3.5" />
            <span>网站简介</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            关于“机场推荐”（jichang-tj.blog）
          </h1>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            按预算、套餐规则和使用需求整理机场资料，让每一次订阅都选得更清楚。
          </p>
        </div>

        {/* Core Narrative */}
        <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">网站完整简介</h2>
            <p>
              机场推荐是一份围绕订阅价格、流量规则和使用门槛整理的选购博客。本站完整收录 34 家机场品牌，重点推介灵动云、暮光加速、FLY V、隐形人和浪网，并根据已有资料逐项说明付款周期、流量发放、优惠条件与客户端要求。我们将服务商公开说明、资料分析和实际测试分别标注，帮助你在购买前看清适合自己的条件。
            </p>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">作者与维护团队声明</h2>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#17233A] leading-relaxed space-y-1">
              <p>
                本站由<strong>【机场推荐独立编辑团队】</strong>日常维护。资料来源、核实日期及尚未确认的项目会在相关页面以明确标签注明。如发现价格或规则变化，可通过实际可用的纠错邮箱（<code className="text-[#6378EA] font-semibold">feedback@jichang-tj.blog</code>）反馈。部分入口含推广链接，通过链接注册或购买会为本站带来佣金；佣金由服务商承担，你的购买价格与直接在官网购买相同，不加价。优惠及实际支付金额请在结算前仔细核对。
              </p>
            </div>
            <p className="text-xs text-[#94A3B8]">
              【遵守事实规范】：本站绝不编造虚假的“10年资深专家”、“百万读者推荐”等虚构资历；所有作者说明均遵循真实身份底线。
            </p>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">联系与反馈</h2>
            <p className="text-xs text-[#64748B]">
              无论是服务商资料勘误、价格更新提报，还是合作咨询，均可通过以下渠道联系我们：
            </p>
            <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] text-xs flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6378EA]" />
              <span className="font-semibold text-[#17233A]">联络信箱：</span>
              <a href="mailto:feedback@jichang-tj.blog" className="text-[#6378EA] hover:underline font-semibold">
                feedback@jichang-tj.blog
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
