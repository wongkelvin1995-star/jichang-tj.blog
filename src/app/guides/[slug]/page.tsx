import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import FavoriteButton from '@/components/account/FavoriteButton';
import HistoryTracker from '@/components/account/HistoryTracker';
import { GUIDE_BODIES } from '@/content/guides';
import { ARTICLES, getArticleBySlug } from '@/data/articles';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import {
  Clock,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Layers,
  ArrowRight
} from 'lucide-react';

// 旧路径（lingdongyun-plans-and-rules 等）的 301 重定向在 next.config.ts 里统一配置

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

function isPublished(slug: string): boolean {
  const article = getArticleBySlug(slug);
  return Boolean(article && article.published_at !== null && GUIDE_BODIES[slug]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: '未找到文章' };
  }

  // 草稿（没有正文或未发布）不进 sitemap，也不开放索引；正式发布后由根布局的索引开关统一控制
  const isDraft = !isPublished(slug);

  return {
    ...buildMetadata({
      title: article.title,
      description: `${article.primary_question}${article.conclusion_scope}`,
      path: `/guides/${article.slug}/`,
      article: article.published_at
        ? { publishedTime: article.published_at, modifiedTime: article.substantive_updated_at }
        : undefined
    }),
    ...(isDraft ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const Body = GUIDE_BODIES[slug];
  const published = isPublished(slug);
  const canonical = `${SITE_META.url}/guides/${article.slug}/`;
  const jsonLd: object[] = [
    breadcrumbList([
      { name: '首页', url: `${SITE_META.url}/` },
      { name: article.title, url: canonical }
    ])
  ];
  if (published) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: `${article.primary_question}${article.conclusion_scope}`,
      url: canonical,
      mainEntityOfPage: canonical,
      datePublished: article.published_at,
      dateModified: article.substantive_updated_at ?? article.published_at,
      author: { '@type': 'Organization', name: article.author_or_editor },
      publisher: { '@type': 'Organization', name: SITE_META.name, url: SITE_META.url },
      inLanguage: 'zh-CN',
      isAccessibleForFree: true
    });
  }

  return (
    <article className="py-12">
      {jsonLd.map((data, i) => <JsonLd key={i} data={data} />)}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <Link href="/#guides" className="hover:text-[#17233A]">选购指南</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold px-3 py-0.5 rounded-full bg-[#F0F5F9] text-[#6378EA] border border-[#CBD5E1]">
                通用选购指南 · {article.priority}
              </span>
              <span className="text-[#64748B] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#6378EA]" />
                <span>预计阅读：{article.read_time_minutes} 分钟</span>
              </span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full border font-medium ${published ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              {published ? '已发布' : '草稿 · 未开放索引'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            本文回答：{article.primary_question}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap items-center gap-4">
              <div>作者 / 编辑：<span className="text-[#17233A] font-semibold">{article.author_or_editor}</span></div>
              {article.published_at && <div>发布：<span className="text-[#17233A] font-semibold">{article.published_at}</span></div>}
              {article.substantive_updated_at && <div>更新：<span className="text-[#17233A] font-semibold">{article.substantive_updated_at}</span></div>}
            </div>
            <FavoriteButton type="article" id={article.slug} />
          </div>
        </div>
        {published && <HistoryTracker type="article" id={article.slug} title={article.title} href={`/guides/${article.slug}/`} />}

        {/* Scope note */}
        <div className="p-4 rounded-2xl bg-[#F0F5F9] border border-[#CBD5E1] text-xs text-[#475569] leading-relaxed mb-8 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
          <span>
            本文是通用选购方法指南，不偏袒特定服务商；文中价格来自本站价格表，由站长核验于 2026-11-03，之后仍可能调整；本站没有测速数据。部分品牌入口含推广合作，详见<Link href="/disclosure/" className="text-[#6378EA] font-semibold">推广说明</Link>。
          </span>
        </div>

        {/* Body */}
        {Body ? (
          <div className="liquid-glass-card rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] space-y-5 mb-8">
            <Body />
          </div>
        ) : (
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 mb-8 text-sm text-[#475569]">
            <div className="font-bold text-[#17233A]">正文待发布</div>
            <p>这篇指南还在整理资料，目前只有大纲：{article.conclusion_scope}</p>
          </div>
        )}

        {/* Scope & limitations */}
        <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#6378EA]" />
              <span>本文能回答什么、不能回答什么</span>
            </h2>
            <p className="text-xs sm:text-sm"><strong className="text-[#17233A]">能回答：</strong>{article.conclusion_scope}</p>
            <div className="text-xs sm:text-sm">
              <strong className="text-[#17233A]">读者还会问：</strong>
              <ul className="list-disc list-outside pl-5 mt-1 space-y-1 text-[#64748B]">
                {article.supporting_questions.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </div>
            <div className="text-xs sm:text-sm">
              <strong className="text-amber-800 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />不能由本文推断的：</strong>
              <ul className="list-disc list-outside pl-5 mt-1 space-y-1 text-amber-800">
                {article.limitations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-base font-bold text-[#17233A] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#6378EA]" />
              <span>相关页面</span>
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {article.internal_links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#6378EA] border border-[#CBD5E1] hover:border-[#6378EA]/40 transition-colors flex items-center gap-1"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <Link href="/#guides" className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#17233A] font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>返回指南专栏</span>
          </Link>
          <Link href="/airports/" className="text-[#6378EA] hover:text-[#4F64D6] font-semibold">
            浏览 34 家机场名录 →
          </Link>
        </div>

      </div>
    </article>
  );
}
