import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { Clock, ArrowRight, HelpCircle, GitCompare, BookOpen } from 'lucide-react';

export default function EditorialArticlesSection() {
  // 精选区块展示前 6 篇通用方法指南；其余按预算和场景的指南在下方单独列出，保证每篇都能从首页一步到达
  const articles = ARTICLES.slice(0, 6);
  const budgetGuides = ARTICLES.slice(6);

  return (
    <section id="guides" className="py-16 border-t border-[#E2E8F0]/80 bg-white/40 backdrop-blur-sm scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>STEP 5 · 精选选购与使用指南</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              按读者真实问题解剖选购规则
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
              共 {ARTICLES.length} 篇指南：先是 {articles.length} 篇讲通用选购方法的指南，再是 {budgetGuides.length} 篇按预算和使用场景、用本站价格表现算的指南。文中数字来自价格表，本站不测速，也不偏袒特定品牌。
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs text-xs text-[#64748B]">
            指南共 <strong className="text-[#6378EA]">{ARTICLES.length} 篇</strong> · 均已发布
          </div>
        </div>

        {/* 前 6 篇通用方法指南卡片（3 列 × 2 行） */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((art) => (
            <div
              key={art.slug}
              className="rounded-2xl liquid-glass-card p-6 border border-[#E2E8F0] hover:border-[#9BB7CF] hover:shadow-lg transition-all flex flex-col justify-between group bg-white/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]">
                      通用必读 · {art.priority}
                    </span>
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#6378EA]" />
                      <span>约 {art.read_time_minutes} 分钟</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4F64D6] px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] font-medium">
                    {art.published_at ? `发布于 ${art.published_at}` : '已发布'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17233A] group-hover:text-[#6378EA] transition-colors mb-2.5 tracking-tight line-clamp-2 min-h-[3rem]">
                  {art.title}
                </h3>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-3.5 space-y-1 text-xs">
                  <div className="flex items-start gap-1.5 text-[#17233A]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#6378EA] shrink-0 mt-0.5" />
                    <span className="font-semibold line-clamp-2">核心问题：{art.primary_question}</span>
                  </div>
                  <p className="text-[#64748B] pl-5 leading-relaxed line-clamp-2">
                    <strong>分析结论：</strong>{art.conclusion_scope}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-[#64748B] mb-4">
                  <div className="line-clamp-1"><strong>适用读者：</strong>{art.target_reader}</div>
                  <div className="line-clamp-1"><strong>核验依据：</strong>{art.required_evidence}</div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {art.internal_links.slice(0, 2).map((link) => (
                    <span key={link.href} className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] text-[10px]">
                      {link.label}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/guides/${art.slug}/`}
                  className="inline-flex items-center gap-1 text-[#6378EA] group-hover:text-[#4F64D6] font-semibold shrink-0"
                >
                  <span>阅读全文</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 按预算和使用场景的指南：每篇都从首页一步到达 */}
        {budgetGuides.length > 0 && (
          <div className="rounded-2xl liquid-glass-card p-6 border border-[#E2E8F0] bg-white/80 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]">
                按预算和场景算账
              </span>
              <span className="text-xs text-[#64748B]">数字取自本站价格表，价格由站长核验于 2026-11-03</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetGuides.map((art) => (
                <Link
                  key={art.slug}
                  href={`/guides/${art.slug}/`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 hover:border-[#9BB7CF] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#17233A] group-hover:text-[#6378EA] transition-colors line-clamp-2">
                      {art.title}
                    </div>
                    <div className="mt-1 text-xs text-[#64748B] line-clamp-2">{art.primary_question}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-[#94A3B8] group-hover:text-[#6378EA] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Brand Comparison Spotlight Banner - Apple Metallic Aurora Sheen */}
        <div className="p-6 sm:p-7 rounded-2xl liquid-glass border border-[#CBD5E1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1] flex items-center gap-1">
                <GitCompare className="w-3 h-3" />
                <span>双品牌同口径比较</span>
              </span>
              <span className="text-xs text-[#94A3B8]">商业推广关系明确披露</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#17233A] tracking-tight">
              灵动云与暮光：按相同条件比较套餐与规则
            </h3>
            <p className="text-xs text-[#64748B] max-w-2xl leading-relaxed">
              同为前排推荐品牌，两家在档位价格、付款周期和线路标注上有何不同？同一份价格资料、同费用口径对照，让数字说明各自适合的人群。
            </p>
          </div>

          <Link
            href="/compare/lingdongyun-vs-twilight/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-sm hover:scale-[1.01] transition-all shrink-0"
          >
            <span>查阅横向对比详情</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
