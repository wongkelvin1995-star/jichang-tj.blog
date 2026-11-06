import React from 'react';
import Link from 'next/link';
import { ArrowRight, GitCompare } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { articleHref, articleUpdatedAt, getCategory, latestUpdatedArticles } from '@/data/categories';
import { popularGuides } from '@/data/homeContent';

/** 热门教程（编辑排序，不是访问量）+ 最近更新（按实质更新日自动排）+ 双品牌对比专题入口 */
export default function GuideHighlights() {
  const popular = popularGuides(6);
  const latest = latestUpdatedArticles(6);

  return (
    <section id="guides" className="py-12 scroll-mt-16 border-t border-[#E2E8F0]/80 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">热门教程</h2>
              <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
                新手最常遇到的问题，由编辑按先后顺序排列，不是访问量统计（本站没有访问数据）。
              </p>
            </div>
            <Link href="/guides/" className="inline-flex items-center gap-1 text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6]">
              全部指南
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((a, i) => (
              <ArticleCard key={a.slug} article={a} rank={i + 1} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-[#17233A] mb-3">最近更新</h2>
            <ul className="divide-y divide-[#E2E8F0] rounded-2xl border border-[#E2E8F0] bg-white/80">
              {latest.map((a) => (
                <li key={a.slug}>
                  <Link href={articleHref(a.slug)} className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[#17233A] group-hover:text-[#6378EA] transition-colors">{a.title}</span>
                      <span className="text-[11px] text-[#94A3B8]">{getCategory(a.category).name}</span>
                    </span>
                    <span className="shrink-0 text-[11px] text-[#64748B]">{articleUpdatedAt(a)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-lg font-bold text-[#17233A] mb-3">专题对比</h2>
            <div className="rounded-2xl liquid-glass border border-[#CBD5E1] p-5 space-y-2.5 shadow-xs">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]">
                <GitCompare className="w-3 h-3" />
                双品牌同口径比较
              </span>
              <h3 className="text-base font-bold text-[#17233A] tracking-tight">灵动云与暮光：按相同条件比较套餐与规则</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                同为前排推荐品牌，用同一份价格资料对照档位价格、付款周期、流量包和线路标注；含商业推广合作，已在页面披露。
              </p>
              <Link
                href="/compare/lingdongyun-vs-twilight/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-sm transition-colors"
              >
                查阅横向对比
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
