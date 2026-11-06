import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { articleHref, articleUpdatedAt, getCategory } from '@/data/categories';
import type { ArticleBrief } from '@/types';

/**
 * 文章卡片：分类、标题、一句话摘要、阅读时间和更新日期。首页、指南索引、分类页共用，
 * 摘要用 article.summary（不是 meta description），保证卡片紧凑。
 */
export default function ArticleCard({ article, showCategory = true, rank }: { article: ArticleBrief; showCategory?: boolean; rank?: number }) {
  const category = getCategory(article.category);
  return (
    <Link
      href={articleHref(article.slug)}
      className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white/80 p-4 transition-colors hover:border-[#9BB7CF]"
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#64748B]">
          {rank !== undefined && (
            <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E2E8F0] bg-[#F1F5F9] text-[10px] font-bold">{rank}</span>
          )}
          {showCategory && (
            <span className="rounded-full border border-[#CBD5E1] bg-[#F0F5F9] px-2 py-0.5 font-semibold text-[#4F64D6]">{category.name}</span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#6378EA]" />
            约 {article.read_time_minutes} 分钟
          </span>
        </div>
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#17233A] transition-colors group-hover:text-[#6378EA] sm:text-base">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-[#64748B]">{article.summary}</p>
      </div>
      <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
        <span>更新于 {articleUpdatedAt(article)}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#6378EA]">
          阅读
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
