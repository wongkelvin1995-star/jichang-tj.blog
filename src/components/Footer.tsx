import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { BRANDS } from '@/data/brands';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';
import { ShieldCheck, Info, Compass, BookOpen, Building2, CheckCircle2 } from 'lucide-react';

const CORE_LINKS = [
  { label: '首页推荐', href: '/' },
  { label: `${SITE_META.brand_count} 家完整目录`, href: '/airports/' },
  { label: '套餐价格对比', href: '/#plans' },
  { label: '优惠码汇总', href: '/deals/' },
  { label: '灵动云 vs 暮光加速对比', href: '/compare/lingdongyun-vs-twilight/' },
  { label: '每 GB 成本计算器', href: '/tools/cost-per-gb/' },
  { label: '套餐匹配器', href: '/tools/plan-finder/' },
];

const POLICY_LINKS = [
  { label: '编辑准则与推荐依据', href: '/editorial-policy/' },
  { label: '推广说明与透明度', href: '/disclosure/' },
  { label: '关于本站与作者声明', href: '/about/' },
];

/** 指南标题取冒号前的短句，页脚放得下 */
const shortTitle = (title: string) => title.split(/[：，]/)[0];

export default function Footer() {
  const guides = ARTICLES.filter((a) => a.published_at !== null);
  const fixedBrands = BRANDS.filter((b) => b.fixed_position);
  const contactEmail = SITE_META.correction_contact.split('（')[0];

  return (
    <footer className="mt-20 border-t border-[#E2E8F0] bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Col 1: Identity & Purpose */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#17233A] tracking-tight">{SITE_META.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1] font-semibold">
                jichang-tj.blog
              </span>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-lg">
              {SITE_META.description}本站完整收录 {SITE_META.brand_count} 家机场品牌，重点推介灵动云、暮光加速、FLY V、隐形人和浪网，并区分服务商公开条款、资料分析与实测状态。
            </p>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#17233A] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6378EA]" />
                <span>商业关系与展示排序说明</span>
              </div>
              <p>
                {SITE_META.ranking_disclosure} 前 {SITE_META.fixed_editorial_positions} 位为固定编辑推荐安排，其余保持登记表稳定顺序。本站是独立选购博客，不是任何品牌的官方网站；部分入口包含推广链接，你通过它购买本站会获得佣金，佣金由服务商承担，你的购买价格与直接在官网购买相同，不加价，也不改动页面上的价格与规则记录。
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#64748B] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                价格、倍率与设备口径、{SITE_META.brand_count} 个优惠码：{VERIFICATION.label}。套餐价格或订阅规则如有变动，以官方页面为准。
              </span>
            </div>
          </div>

          {/* Col 2: Core navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#17233A] mb-3 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#6378EA]" />
              <span>核心栏目</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              {CORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#6378EA] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sitemap.xml" className="hover:text-[#6378EA] transition-colors text-xs text-[#94A3B8]">
                  XML 网站地图 (Sitemap)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Guides */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#17233A] mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#6378EA]" />
              <span>选购指南</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              {guides.map((article) => (
                <li key={article.slug}>
                  <Link href={`/guides/${article.slug}/`} className="hover:text-[#6378EA] transition-colors">
                    {shortTitle(article.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Fixed-position brands */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#17233A] mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#6378EA]" />
              <span>固定推荐 {fixedBrands.length} 家</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              {fixedBrands.map((brand) => (
                <li key={brand.id} className="flex items-center gap-2">
                  <span className="w-5 text-[11px] font-semibold text-[#94A3B8] tabular-nums">{brand.display_rank}.</span>
                  <Link href={`/airports/${brand.id}/`} className="hover:text-[#6378EA] transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/airports/" className="text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6] transition-colors">
                  查看全部 {SITE_META.brand_count} 家 →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Editorial & Trust */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#17233A] mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#6378EA]" />
              <span>事实核验与准则</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              {POLICY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#6378EA] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-[#6378EA] transition-colors text-xs text-[#94A3B8] break-all"
                >
                  纠错反馈：{contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© 2026 {SITE_META.name} (jichang-tj.blog). 保留所有权利。</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>资料整理基准日：{SITE_META.prepared_on}</span>
            <span className="hidden sm:inline">·</span>
            <span>价格核验日期：{VERIFICATION.verified_on}（{VERIFICATION.verified_by}）</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
