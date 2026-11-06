import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '推广说明与商业合作披露',
  description: '说明本站的推广链接怎么工作：佣金由服务商承担、购买价格与官网一致、链接里的 code= 不是优惠码，以及第三方链接的边界。',
  path: '/disclosure/'
});

export default function DisclosurePage() {
  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([{ name: '首页', url: `${SITE_META.url}/` }, { name: '推广说明', url: `${SITE_META.url}/disclosure/` }])} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">推广说明与合作披露</span>
        </nav>

        {/* Header */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>合规声明</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            推广说明与商业合作透明披露
          </h1>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            遵循行业诚信准则与搜索引擎规范，本站向读者完全公开网站的商业合作形式与链接运作机制。
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">1. 什么是推广链接（Affiliate Link）？</h2>
            <p>
              当您在本站点击标有“前往注册”或“商业链接”的按钮时，系统将通过带有特定追踪代码（如 <code>/#/?code=xxxx</code>）的网址将您引导至对应机场服务商的官方或授权注册页面。
            </p>
            <p className="text-xs text-[#64748B]">
              若您通过该链接完成账户注册并付费订阅套餐，该服务商可能会向本站支付一定比例的技术推广佣金。该笔佣金由服务商的推广预算承担，<strong>绝不会增加您的实际订阅价格</strong>。
            </p>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">2. 推广合作是否会影响客观测评与推荐？</h2>
            <p>
              不会。本站的编辑准则明确规定：商业合作绝不干预内容事实。我们在推荐灵动云作为旗舰品牌舱的同时，始终如实揭示全站 34 家品牌的不同优缺点、付款周期风险与倍率陷阱。
            </p>
            <p className="text-xs text-[#64748B]">
              我们建议读者根据自身真实用量选择最匹配的方案，而非盲目购买高价长周期套餐。
            </p>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A]">3. 第三方网站与安全免责声明</h2>
            <p>
              本站仅提供选购信息与客观链接。用户在跳转至第三方服务商网站后，所进行的账号注册、密码设置、实名认证或资金支付行为，均受该第三方网站之用户服务条款与隐私政策约束。
            </p>
            <p className="text-xs text-[#64748B]">
              付款前请务必确认收款商户真实性与退款条款，妥善保管个人账户安全。
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
